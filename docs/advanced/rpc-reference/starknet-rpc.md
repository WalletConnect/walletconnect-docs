---
description: Starknet JSON-RPC Methods
---

For reference, the offical JSON-RPC specification for interacting with Starknet nodes can be found [here](https://github.com/starkware-libs/starknet-specs/blob/master/api/starknet_write_api.json). This document represents a modified version of it for compatibility for WalletConnect.

While very similar to the Ethereum specification, the Starknet one [differs slightly](https://github.com/starkware-libs/starknet-specs/blob/master/starknet_vs_ethereum_node_apis.md). Of note, and not mentioned in the Starknet vs. Ethereum APIs document, transaction hashes are computed over unsigned transactions rather than signed transactions.

Additionally, we define a type `Felt` that is used to encode all manner of strings and addresses in Starknet. A `Felt` is represented as an up to 63 hex digit string with the leading 4 bits zeroed.

# Starknet

## starknet_signInvokeTransaction

Signs a transaction that can be submitted to the network at a later time using with `starknet_addInvokeTransaction`.

### Parameters

1. `Object` - Transaction parameters:
  1.1. `function_invocation` : `Object` -  encodes the function to call
    1.1.1. `contract_address` : `Felt` - contract to call
    1.1.2. `entry_point_selector` : `Felt` - encoded function selector to call 
    1.1.3. `calldata` : `Array` - contract to call
      1.1.3.1. `Felt` - encoded parameters passed to function

### Returns

1. `Object`
  1.1. `signature` : `Felt` - corresponding signature for signed transaction


### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_signInvokeTransaction",
  "params": {
    "function_invocation": {
      "contract_address": "0x0...",
      "entry_point_selector": "",
      "calldata": ["0x0..."]
    },
    "max_fee": "0x",
    "version": "0x"
  },
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "signature": "0x0..."
  }
}
```

