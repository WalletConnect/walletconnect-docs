---
description: StarkNet JSON-RPC Methods
---

# StarkNet

We define new types for starknet:
- `FELT`, a number represented by a hex string (prefixed with 0x). It follows the [StarkNet Field Element spec](https://starknet.io/docs/how_cairo_works/cairo_intro.html#field-elements)
- `ABI`, a representation of a StarkNet contract’s interface. As [StarkNet ABI Spec](https://docs.starknet.io/documentation/develop/Contracts/contract-abi/)


## starknet_requestAddInvokeTransaction

Requests the wallet to sign and submit a [INVOKE transaction](https://docs.starknet.io/documentation/develop/Blocks/transactions/#invoke_transaction)

### Parameters

```
1. `FELT`, sender address
2. `Object`, Transaction request.
    2.1. `calls` : `Object[]` array of calls to perform
        2.1.1. `contractAddress` : `Felt`
        2.1.2. `entrypoint` : `Felt`
        2.1.3. `calldata` : `Felt[]` (Optional)
    2.2. `abi` : `ABI` (Optional) the abi of the contract for better displaying
    2.3. `executionParams` : `Object` (Optional) Parameters suggested by the dapp
        2.3.1. `nonce` : `Felt` (Optional)
        2.3.2. `maxFee` : `Felt` (Optional)
        2.3.3. `version` : `Felt` (Optional)
```


### Example Parameters

```javascript
[
   "0x003a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
   {
       calls : [
           {
              contractAddress : "0x003a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
              entrypoint : "0x555278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
              calldata : ["0x003", "0xa82705a5b27e2bbc4a64"]
           },
          {
             contractAddress : "0x00111178a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
             entrypoint : "0x0022228a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
          },
      ]
   },
];
```

### Returns

`FELT`, The hash of the transaction submitted by the wallet

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_requestAddInvokeTransaction",
  "params":[{see above}],
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x01d666de4dc4d7e888190475ea6381a862e7d77cc3cb425e72ebf85e1d5144fa"
}
```


## starknet_signTypedData

Request the wallet to sign an *Off-chain message* as defined here [Starknet Off-chain message spec](https://community.starknet.io/t/signing-transactions-and-off-chain-messages/66).  This is similar to Ethereum's EIP-712

### Parameters

account, message
```
1. `FELT`, account address used for signing.
2. `Object`, typed data to sign containing type information, a domain separator, and data. It follows the Starknet Off-chain message spec
```

### Example Parameters

```javascript
[
  "0x003a8278a26f32452f156260d81b93efb0eca126b44df7b005a5b27e2bbc4a64",
  {
      types: {
          StarkNetDomain: [
              { name: 'name', type: 'felt' },
              { name: 'version', type: 'felt' },
              { name: 'chainId', type: 'felt' },
          ],
          Person: [
              { name: 'name', type: 'felt' },
              { name: 'wallet', type: 'felt' },
          ],
          Mail: [
              { name: 'from', type: 'Person' },
              { name: 'to', type: 'Person' },
              { name: 'contents', type: 'felt' },
          ],
      },
      primaryType: 'Mail',
      domain: {
          name: 'StarkNet Mail',
          version: '1',
          chainId: 1,
      },
      message: {
          from: {
              name: 'Cow',
              wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          },
          to: {
              name: 'Bob',
              wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
          },
          contents: 'Hello, Bob!',
      }
  },
];
```

### Returns

`FELT[]`: Signature: Array of Felts

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
  "result": ["0x1", "0x072e509b65029052eb6c299d53a04e16605b915621c", "0x07897a4646"]
}
```

