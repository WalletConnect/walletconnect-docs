---
description: Starknet JSON-RPC Methods
---

# Starknet

We define new types for starknet:

- `FELT`, a number represented by a hex string. Prefixed with 0x. It can be left padded with zeroes or not. It follows the [Cairo Field Element spec](https://www.cairo-lang.org/docs/how_cairo_works/cairo_intro.html#field-elements)
- `ABI`, a representation of a Starknet contract’s interface. As [Starknet ABI Spec](https://docs.starknet.io/documentation/architecture_and_concepts/Contracts/contract-abi/)

## starknet_requestAddInvokeTransaction

Requests the wallet to sign and submit a [INVOKE transaction](https://docs.starknet.io/documentation/architecture_and_concepts/Blocks/transactions/#invoke_transaction)

This request might be processed before the account is deployed. In that scenario the wallet will ask the user to do the deployment and the requested transaction.

### Parameters

```
1. `FELT`, `accountAddress` : Account that is being requested to send a transaction
2. `Object`, `executionRequest` : Transaction requested
    2.1. `calls` : `Object[]` array of calls to perform
        2.1.1. `contractAddress` : `Felt`
        2.1.2. `entrypoint` : `Felt`
        2.1.3. `calldata` : `Felt[]` (Optional)
    2.2. `abis` : `ABI[]` (Optional) one or more contract abis which can be used to display the calls
```

### Example Parameters

```javascript
{
      "accountAddress": "0x003a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
      "executionRequest" : {
            "calls" : [
                {
                  "contractAddress": "0x003a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
                  "entrypoint": "0x555278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
                  "calldata": ["0x003", "0xa82705a5b27e2bbc4a64"]
                },
                {
                    "contractAddress": "0x00111178a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
                    "entrypoint": "0x0022228a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64"
                }
            ],
            "abis" : [{
                "inputs": [{ "name": "amount", "type": "felt" }],
                "name": "set_balance",
                "outputs": [],
                "type": "function"
            }]
      }
}
```

### Returns

1. `FELT`, `transaction_hash` : The hash of the transaction submitted by the wallet

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_requestAddInvokeTransaction",
  "params":{see above}
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": { "transaction_hash" : "0x01d666de4dc4d7e888190475ea6381a862e7d77cc3cb425e72ebf85e1d5144fa" }
}
```

## starknet_signTypedData

Request the wallet to sign an _Off-chain message_ as defined here [Starknet Off-chain message spec](https://community.starknet.io/t/signing-transactions-and-off-chain-messages/66). This is similar to Ethereum's EIP-712

This request might be processed before the account is deployed. In that scenario the wallet will ask the user to do the deployment and sign the data

### Parameters

account, message

```
1. `FELT`, `accountAddress` : account address used for signing.
2. `Object`, `typedData` : typed data to sign containing type information, a domain separator, and data. It follows the Starknet Off-chain message spec
```

### Example Parameters

```javascript
{
    "accountAddress" : "0x003a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
    "typedData" : {
          "types" : {
              "StarkNetDomain ": [
                  { "name" : "name", "type" : "felt" },
                  { "name" : "version", "type" : "felt" },
                  { "name" : "chainId", "type" : "felt" }
              ],
              "Person" : [
                  { "name": "name", "type" : "felt" },
                  { "name": "wallet", "type" : "felt" }
              ],
              "Mail": [
                  { "name": "from", "type": "Person" },
                  { "name": "to", "type": "Person" },
                  { "name": "contents", "type": "felt" }
              ]
          },
          "primaryType" : "Mail",
          "domain" : {
              "name" : "StarkNet Mail",
              "version" : "1",
              "chainId" : 1
          },
          "message" : {
              "from" : {
                  "name" : "Cow",
                  "wallet" : "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
              },
              "to": {
                  "name" : "Bob",
                  "wallet" : "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
              },
              "contents" : "Hello, Bob!"
          }
  }
}
```

### Returns

1. `FELT[]`, `signature` : Signature as an array of Felts

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_signTypedData",
  "params": ["0x003a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64", {see above}]
}


// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": { "signature" : ["0x3a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64", "0x072e509b6502e2bbc4a649052eb6c299d53a04e16605b915621c", "0x07897a1b93efb0eca126b44df4646", "0x072e509b6502e2bbc4a649052eb6c299d53a04e16605b915621c"] }
}
```
