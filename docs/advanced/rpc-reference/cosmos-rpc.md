---
description: Cosmos JSON-RPC Methods
---

# Cosmos

## cosmos_getAccounts

This method returns an array of key pairs available to sign from the wallet mapped with an associated algorithm and address on the blockchain.

### Parameters

    none

### Returns

    1.`Array` - Array of accounts:
    	1.1. `Object` - Account Data object with parameters:
    		1.1.1. `algo` : `STRING` - algorithm used for signing
    		1.1.2. `address` : `STRING` - corresponding address for keypair
    		1.1.3. `pubkey` : `STRING` - base64 encoded public key for keypair

### Example

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cosmos_getAccounts",
    "params": {}
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result":  [
        {
            "algo": "secp256k1",
            "address": "cosmos1sguafvgmel6f880ryvq8efh9522p8zvmrzlcrq",
            "pubkey": "AgSEjOuOr991QlHCORRmdE5ahVKeyBrmtgoYepCpQGOW"
        }
    ]
}
```

## cosmos_signDirect

This method returns a signature for the provided document to be signed targeting the requested signer address corresponding to the keypair returned by the account data.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `signerAddress` : `STRING` -  corresponding address for keypair
    	1.2. `signDoc` : `Object` - Document to be signed:
    		1.2.2. `chainId` : `STRING` - identifier of blockchain
    		1.2.1. `accountNumber` : `STRING` - blockchain account number
    		1.2.3. `authInfoBytes` : `DATA` - encoded authentication information
    		1.2.4. `bodyBytes` : `DATA` - encoded body of message to sign

### Returns

    1. `Object` - Signing parameters:
    	1.1. `signature` : `Object` -  corresponding signature for signed documented
            1.1.1. `pub_key` : `Object` - public key for keypair
                1.1.1.1: `type` : `STRING` - type of public key
                1.1.1.2: `value` : `STRING` - value of public key
            1.1.2. `signature`: `STRING` - corresponding signature for signed documented
    	1.2. `signed` : `Object` - Signed document:
    		1.2.2. `chainId` : `STRING` - identifier of blockchain
    		1.2.1. `accountNumber` : `STRING` - blockchain account number
    		1.2.3. `authInfoBytes` : `DATA` - encoded authentication information
    		1.2.4. `bodyBytes` : `DATA` - encoded body of message to sign

### Example

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cosmos_signDirect",
    "params": {
        "signerAddress": "cosmos1sguafvgmel6f880ryvq8efh9522p8zvmrzlcrq",
        "signDoc":  {
            "chainId": "cosmoshub-4",
            "accountNumber": "1"
            "authInfoBytes": "CgoKABIECgIIARgBEhMKDQoFdWNvc20SBDIwMDAQwJoM",
            "bodyBytes": "CpABChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEnAKLWNvc21vczFwa3B0cmU3ZmRrbDZnZnJ6bGVzamp2aHhobGMzcjRnbW1rOHJzNhItY29zbW9zMXF5cHF4cHE5cWNyc3N6ZzJwdnhxNnJzMHpxZzN5eWM1bHp2N3h1GhAKBXVjb3NtEgcxMjM0NTY3"
        }
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result":  {
        "signature": {
            "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value": "AgSEjOuOr991QlHCORRmdE5ahVKeyBrmtgoYepCpQGOW"
            },
            "signature": "AnTrXtS2lr9CBwhTpRa8ZlKcVR9PeIXGaTpvodyJU05QvRKVjIkQfOZl5JhdkfxCY+a6rhwCOYVcbKQTJlMw4w=="
        },
        "signed": {
            "chainId": "cosmoshub-4",
            "accountNumber": "1"
            "authInfoBytes": "CgoKABIECgIIARgBEhMKDQoFdWNvc20SBDIwMDAQwJoM",
            "bodyBytes": "CpABChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEnAKLWNvc21vczFwa3B0cmU3ZmRrbDZnZnJ6bGVzamp2aHhobGMzcjRnbW1rOHJzNhItY29zbW9zMXF5cHF4cHE5cWNyc3N6ZzJwdnhxNnJzMHpxZzN5eWM1bHp2N3h1GhAKBXVjb3NtEgcxMjM0NTY3"
        }
    }
}
```

## cosmos_signAmino

This method returns a signature for the provided document to be signed targeting the requested signer address corresponding to the keypair returned by the account data.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `signerAddress` : `STRING` -  corresponding address for keypair
    	1.2. `signDoc` : `Object` - Document to be signed:
    		1.2.2. `chain_id` : `STRING` - identifier of blockchain
    		1.2.1. `account_number` : `STRING` - blockchain account number
    		1.2.3. `sequence` : `STRING` - blockchain account sequence
    			1.2.4. `memo` : `STRING` - amino message memo
    		1.2.5. `msgs` : `Array` - array of amino messages to be signed:
    			1.2.5.1. `Object` - amino message object:
    				1.2.5.1.1. - `type` : `STRING` - amino message type
    				1.2.5.1.2. - `value` : `STRING` - amino message value
    		1.2.6. `fee` : `Object` - fee description object
    				1.2.6.1. `amount` : `Array` - array of currency fees:
    					1.2.6.1.1. `Object` - currency fee description object:
    						1.2.6.1.1.1. `denom` : `STRING` - currency denomination
    						1.2.6.1.1.2. `amount` : `STRING` - currency amount
    				1.2.6.2. `gas` : `STRING` - gas limit for execution

### Returns

    1. `Object` - Signing parameters:
    	1.1. `signature` : `Object` -  corresponding signature for signed documented
            1.1.1. `pub_key` : `Object` - public key for keypair
                1.1.1.1: `type` : `STRING` - type of public key
                1.1.1.2: `value` : `STRING` - value of public key
            1.1.2. `signature`: `STRING` - corresponding signature for signed documented
    	1.2. `signed` : `Object` - Signed document:
    		1.2.2. `chain_id` : `STRING` - identifier of blockchain
    		1.2.1. `account_number` : `STRING` - blockchain account number
    		1.2.3. `sequence` : `STRING` - blockchain account sequence
    			1.2.4. `memo` : `STRING` - amino message memo
    			1.2.5. `msgs` : `Array` - array of amino messages to be signed:
    			1.2.5.1. `Object` - amino message object:
    				1.2.5.1.1. - `type` : `STRING` - amino message type
    				1.2.5.1.2. - `value` : `STRING` - amino message value
    		1.2.6. `fee` : `Object` - fee description object
    				1.2.6.1. `amount` : `Array` - array of currency fees:
    					1.2.6.1.1. `Object` - currency fee description object:
    						1.2.6.1.1.1. `denom` : `STRING` - currency denomination
    						1.2.6.1.1.2. `amount` : `STRING` - currency amount
    				1.2.6.2. `gas` : `STRING` - gas limit for execution

### Example

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "cosmos_signAmino",
    "params": {
        "signerAddress": "cosmos1sguafvgmel6f880ryvq8efh9522p8zvmrzlcrq",
        "signDoc": {
            "chain_id": "foochain",
            "account_number": "7",
            "sequence": "54"
            "memo": "hello, world",
            "msgs": [],
            "fee": { "amount": [], "gas": "23" }
        }
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result":  {
        "signature": {
            "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value": "AgSEjOuOr991QlHCORRmdE5ahVKeyBrmtgoYepCpQGOW"
            },
            "signature": "AnTrXtS2lr9CBwhTpRa8ZlKcVR9PeIXGaTpvodyJU05QvRKVjIkQfOZl5JhdkfxCY+a6rhwCOYVcbKQTJlMw4w=="
        },
        "signed": {
            "chain_id": "foochain",
            "account_number": "7",
            "sequence": "54"
            "memo": "hello, world",
            "msgs": [],
            "fee": { "amount": [{"denom": "ufoo", "amount": "10000"}], "gas": "23" }
        }
    }
}
```
