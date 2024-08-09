---
description: Dogecoin JSON-RPC Methods
---

# Dogecoin
We define an account as the group of addresses derived using the same account value in their [derivation paths](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#user-content-Path_levels). We use the first address of the [external chain](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#examples) ("first external address"), as the identifier for an account. An account's total balance is defined as the sum of all unspent transaction outputs (UTXOs) belonging to its entire group of addresses.

1. Dapps **must** only display the first external address as a connected account.
2. Wallets **must** only offer to connect the first external address(es).

### Account Definition
The derivation path levels in the [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#path-levels) standard is: 
```
m / purpose' / coin_type' / account' / change / address_index
```

Addresses with different `purpose`, `change` and `address_index` values are considered to belong to the same account. We use the first external P2PKH (purpose = 44) address as the default account identifier.

For a specific seed phrase and path `m/44'/3'/0'/0/0` we get account 0 with identifier `DTyt9wHTgizR8CwK8HAsWDaoMMxcaRuLWJ`. Its total balance is the sum of all UTXO balances on all addresses with derivation paths:
* `m/44'/3'/0'/change/address_index`

If the wallet user changes to account 1 we get path `m/44'/3'/1'/0/0` with identifier `DBcZSePDaMMduBMLymWHXhkE5ArFEvkagU`. Its total balance is the sum of all UTXO balances on all addresses with derivation paths:
* `m/44'/3'/1'/change/address_index`

## sendTransfer
This method is used to sign and submit a transfer of any `amount` of Dogecoin to a single `recipientAddress`, optionally including a `changeAddress` for the change amount and `memo` set as the OP_RETURN value by supporting wallets. The transaction will be signed and broadcasted upon user approval.

### Parameters
* `Object`
    * `connectedAccount` : `String` - _(Required)_ The connected account's first external address.
    * `recipientAddress` : `String` - _(Required)_ The recipient's public address.
    * `amount` : `String` - _(Required)_ The amount of Dogecoin to send, denominated in satoshis (Dogecoin base unit).
    * `changeAddress` : `String` - _(Optional)_ The sender's public address to receive change.
    * `memo` : `String` - _(Optional)_ The OP_RETURN value as a hex string without 0x prefix, maximum 80 bytes.

### Returns
* `Object` 
    * `tx_id` : `String` - The transaction id as a hex string without 0x prefix.

### Example
The example below specifies a simple transfer of 1.23 DOGE (123000000 Satoshi).

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "sendTransfer",
    "params": {
        "connectedAccount": "DTyt9wHTgizR8CwK8HAsWDaoMMxcaRuLWJ",
        "recipient": "DBcZSePDaMMduBMLymWHXhkE5ArFEvkagU",
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
    * `receiveAddresses`: `Array` - External addresses to receive Bitcoin from others.
    * `changeAddresses`: `Array` - Internal addresses to receive Bitcoin from self.

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
        "connectedAccount": "DTyt9wHTgizR8CwK8HAsWDaoMMxcaRuLWJ"
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "utxoAddresses": [
            "DA6rZ9aV3mkz9uxNvddzzbXEEcSPN8SCUS",
            "DQtDvESv45bjityF8fbBWtx3BMTKHopRVD",
            "DLYfEgqNXLSTZdqfNk6n8Z6Mkp7quipeY8",
            "DPecwfFPebAZJ9Rdy3DPgCM5n1AgXcP67p"
        ],
        "receiveAddresses": [
            "DS8EX9F1hwBDNfRwQewjUo9vMWWWiZQmXD",
            "DDtQfA541GQU2KDrY3ofF5F5hsKxkFiUuG",
            "D5A6wPFhCNChUiQHGXftD8DiNgc2G7yT1L"
        ],
        "changeAddresses": [
            "DPWvt4hN9C15hdo38H2Dgxj9ge6VFb4eoS",
            "DFG9R8ENG4mK5gUiU1VRr3FBT13LfWJ4Fb",
            "D7rakaGgZvaBH1vGTxnsQ3ZdV7ejX57hRy"
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
        "connectedAccount": "DTyt9wHTgizR8CwK8HAsWDaoMMxcaRuLWJ"
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "utxoAddresses": [
            "DTyt9wHTgizR8CwK8HAsWDaoMMxcaRuLWJ"
        ],
        "receiveAddresses": [
            "DTyt9wHTgizR8CwK8HAsWDaoMMxcaRuLWJ"
        ],
        "changeAddresses": [
            "DTyt9wHTgizR8CwK8HAsWDaoMMxcaRuLWJ"
        ]
    }
}
```
Assuming the only returned address is the `connectedAccount` address, no new request to `getAccountAddresses` is needed. Dapps only need to monitor the balance and UTXOs of the `connectedAccount` address for static wallets.

## signPsbt
This method is for use-cases requiring granular control over what UTXOs to spend or requiring more than a single recipient, change or OP_RETURN output.

**TBD**
