---
description: Tezos JSON-RPC Methods
---

# Tezos

## tezos_getAccounts

This method returns an array of public keys, which correspond to keypairs available in the wallet for signing.

### Parameters

    none

### Returns

    1.`Array` - Array of accounts:
    	1.1. `Object` - Account Data object with parameters:
    		1.1.1. `algo` : `STRING` - algorithm used for signing
    		1.1.2. `address` : `STRING` - corresponding address for keypair
    		1.1.3. `pubkey` : `STRING` - public key for keypair

### Example

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "tezos_getAccounts",
    "params": {}
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result":  [
        {
            "algo": "ed25519",
            "address": "tz1VQA4RP4fLjEEMW2FR4pE9kAg5abb5h5GL",
            "pubkey": "edpku4US3ZykcZifjzSGFCmFr3zRgCKndE82estE4irj4d5oqDNDvf"
        }
    ]
}
```

## tezos_send

This method returns a hash for the provided operations. They will be signed by the keypair corresponding to the requested signer address and sent to the blockchain.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `account` : `STRING` - corresponding address for keypair
    	1.2. `operations` : `Array` - operations to be signed:
    		1.2.1. `Object` - identifier of blockchain
                1.2.1.1. `kind` : `STRING` - type of the transaction
                1.2.1.2. `destination` : `STRING` - recipient of the transaction
                1.2.1.3. `amount` : `STRING` - mutez amount
                1.2.1.4. `source` : `STRING` - (optional) transaction origin
                1.2.1.5. `fee` : `STRING` - (optional) transaction fee
                1.2.1.6. `counter` : `STRING` - (optional) integer of a counter
                1.2.1.7. `gas_limit` : `STRING` - (optional) integer of the gas_limit
                1.2.1.8. `storage_limit` : `STRING` - (optional) integer of the storage_limit
                1.2.1.9. `parameters` : `Json` - (optional) contract call data
                

### Returns

    1. `Object` - Signing parameters:
    	1.1. `operation_hash` : `STRING` - hash of the operation

### Example

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "tezos_send",
    "params": {
        "account": "tz1VQA4RP4fLjEEMW2FR4pE9kAg5abb5h5GL",
        "operations": [
            {
                "kind": "transaction";
                "amount": "1";
                "destination": "tz1VQA4RP4fLjEEMW2FR4pE9kAg5abb5h5GL";
            }
        ]
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result":  {
        "hash": "op..."
    }
}
```

## tezos_sign

This method returns a signature for the provided payload. It will be signed by the keypair corresponding to the requested signer address.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `account` : `STRING` - corresponding address for keypair
    	1.2. `payload` : `STRING` - payload to be signed

### Returns

    1. `Object` - Signing parameters:
    	1.1. `signature` : `STRING` -  signature for signed payload

### Example

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "tezos_sign",
    "params": {
        "account": "tz1VQA4RP4fLjEEMW2FR4pE9kAg5abb5h5GL",
        "payload": "05010000004254",
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result":  {
        "signature": "edsig..."
    }
}
```
