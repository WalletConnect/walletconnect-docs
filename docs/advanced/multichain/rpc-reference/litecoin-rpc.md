---
description: Litecoin JSON-RPC Methods
---

# Litecoin
We define an account as the group of addresses derived using the same account value in their [derivation paths](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#user-content-Path_levels). We use the first address of the [external chain](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#examples) ("first external address"), as the identifier for an account. An account's total balance is defined as the sum of all unspent transaction outputs (UTXOs) belonging to its entire group of addresses.

1. Dapps **must** only display the first external address as a connected account.
2. Wallets **must** only offer to connect the first external address(es).

### Account Definition
The derivation path levels in the [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#path-levels), [BIP49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki#user-content-Public_key_derivation), [BIP84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki#public-key-derivation), [BIP86](https://github.com/bitcoin/bips/blob/master/bip-0086.mediawiki#user-content-Public_key_derivation) standards are: 
```
m / purpose' / coin_type' / account' / change / address_index
```

Addresses with different `purpose`, `change` and `address_index` values are considered to belong to the same account. Valid `purpose` values are 44, 49, 84 and 86. We use the first external Native SegWit (purpose = 84) address as the default account identifier.

For a specific seed phrase and path `m/84'/2'/0'/0/0` we get account 0 with identifier `ltc1q8c6fshw2dlwun7ekn9qwf37cu2rn755u9ym7p0`. Its total balance is the sum of all UTXO balances on all addresses with derivation paths:
* `m/44'/2'/0'/change/address_index`
* `m/49'/2'/0'/change/address_index`
* `m/84'/2'/0'/change/address_index`
* `m/86'/2'/0'/change/address_index`

If the wallet user changes to account 1 we get path `m/84'/2'/1'/0/0` with identifier `ltc1qn9h77dt0s6ar78ptxq58t2ne7tyhvfnruc3e7d`. Its total balance is the sum of all UTXO balances on all addresses with derivation paths:
* `m/44'/2'/1'/change/address_index`
* `m/49'/2'/1'/change/address_index`
* `m/84'/2'/1'/change/address_index`
* `m/86'/2'/1'/change/address_index`

## sendTransfer
This method is used to sign and submit a transfer of any `amount` of Litecoin to a single `recipientAddress`, optionally including a `changeAddress` for the change amount and `memo` set as the OP_RETURN value by supporting wallets. The transaction will be signed and broadcasted upon user approval.

### Parameters
* `Object`
    * `connectedAccount` : `String` - _(Required)_ The connected account's first external address.
    * `recipientAddress` : `String` - _(Required)_ The recipient's public address.
    * `amount` : `String` - _(Required)_ The amount of Litecoin to send, denominated in litoshis (Litecoin base unit).
    * `changeAddress` : `String` - _(Optional)_ The sender's public address to receive change.
    * `memo` : `String` - _(Optional)_ The OP_RETURN value as a hex string without 0x prefix, maximum 80 bytes.

### Returns
* `Object` 
    * `tx_id` : `String` - The transaction id as a hex string without 0x prefix.

### Example
The example below specifies a simple transfer of 1.23 LTC (123000000 Litoshi).

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "sendTransfer",
    "params": {
        "connectedAccount": "ltc1q8c6fshw2dlwun7ekn9qwf37cu2rn755u9ym7p0",
        "recipient": "ltc1qn9h77dt0s6ar78ptxq58t2ne7tyhvfnruc3e7d",
        "amount": "123000000",
        "memo": "636861726c6579206c6f766573206865"
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "tx_id": "f007551f169722ce74104d6673bd46ce193c624b8550889526d1b93820d725f7"
    }
}
```

## getAccountAddresses
This method is used to find all addresses with unspent transaction outputs (UTXOs), as well as receive and change addresses to monitor for balance changes. No response can be expected until the user unlocks its wallet and approves the request. Dapps will typically use an indexing service to query for balances and UTXOs for all addresses returned by this method:
* [Blockbook API](https://github.com/trezor/blockbook/blob/master/docs/api.md#get-address)
* [Bitcore API](https://github.com/bitpay/bitcore/blob/master/packages/bitcore-node/docs/api-documentation.md#address)

We recognize that there are two different kinds of wallets:
1. Wallets that generate a new change or receive address for every transaction ("dynamic wallet").
2. Wallets that reuse the first external address for every transaction ("static wallet").

### Parameters
* `Object`
    * `connectedAccount` : `String` - _(Required)_ The connected account's first external address.

### Returns
* `Object` 
    * `utxoAddresses`: `Array` - Addresses with at least one UTXO, including unconfirmed ones. Empty array if no UTXOs.
    * `receiveAddresses`: `Array` - External addresses to receive Litecoin from others.
    * `changeAddresses`: `Array` - Internal addresses to receive Litecoin from self.

Dynamic wallets **should** include minimum 2 and maximum 5 unused addresses in `receiveAddresses` and `changeAddresses` respectively. By returning fewer addresses the user experience worsens as [getAccountAddresses](#getAccountAddresses) must be called more often. By returning more addresses, dapps potentially monitor and learn about future transactions. Wallets **must** never return more than 20 unused addresses to avoid breaking the [gap limit](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#address-gap-limit).

### Example: Dynamic Wallet

The example below specifies a result from a dynamic wallet. Only unused `receiveAddresses` and `changeAddresses` are returned.

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "getAccountAddresses",
    "params": {
        "connectedAccount": "ltc1q8c6fshw2dlwun7ekn9qwf37cu2rn755u9ym7p0"
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "utxoAddresses": [
            "ltc1qj4plcuyhuzw0sycf99gcayzhhcddfj6xkcke5g",
            "LXkGhTKmZpviAtYdDaxWbiJsdg4tA6EzrU",
        ],
        "receiveAddresses": [
            "ltc1qzngausxrx2degdl9epsvwdc3nskdzau72cc83x",
            "ltc1qsdxa6pseqekqg5d3uksaxnwrey2s2ujcx03alc",
            "ltc1qhuvt3sq8xmx9ktzdfznkzvjl5zup7mg9zpwllw"
        ],
        "changeAddresses": [
            "ltc1q4c9qx28ex2n0cdphq0u0yvs2qjv6z0h7l6t450",
            "ltc1qtjd3y5a2axpwzfjcj4y9zy50qfjuxwzm0vu5fq",
            "ltc1qp7ujtprgl0quvcg0dj335p37r2mc2cxdc8xumq"
        ]
    }
}
```
Assuming the dapp monitors all returned addresses for balance changes, a new request to `getAccountAddresses` is only needed when all UTXOs have been spent, all `receiveAddresses` or all `changeAddresses` have been used.

### Example: Static Wallet

The example below specifies a response from a static wallet. The `connectedAccount` address is returned as the only address in `receiveAddresses` and `changeAddresses`. Any UTXO belongs to the `connectedAccount` address.

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "getAccountAddresses",
    "params": {
        "connectedAccount": "ltc1q8c6fshw2dlwun7ekn9qwf37cu2rn755u9ym7p0"
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "utxoAddresses": [
            "ltc1q8c6fshw2dlwun7ekn9qwf37cu2rn755u9ym7p0"
        ],
        "receiveAddresses": [
            "ltc1q8c6fshw2dlwun7ekn9qwf37cu2rn755u9ym7p0"
        ],
        "changeAddresses": [
            "ltc1q8c6fshw2dlwun7ekn9qwf37cu2rn755u9ym7p0"
        ]
    }
}
```
Assuming the only returned address is the `connectedAccount` address, no new request to `getAccountAddresses` is needed. Dapps only need to monitor the balance and UTXOs of the `connectedAccount` address for static wallets.

## signPsbt
This method is for use-cases requiring granular control over what UTXOs to spend or requiring more than a single recipient, change or OP_RETURN output.

**TBD**
