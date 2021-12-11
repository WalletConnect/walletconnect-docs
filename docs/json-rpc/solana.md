---
description: Solana JSON-RPC Methods
---

# Solana

## solana_getAccounts

This method returns an array of public keys available to sign from the wallet mapped with an associated algorithm and address on the blockchain.

### Parameters

    none

### Returns

    1.`Array` - Array of accounts:
    	1.1. `STRING` - public key for keypair

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "solana_getAccounts",
  "params": {}
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": ["722RdWmHC5TGXBjTejzNjbc8xEiduVDLqZvoUGz6Xzbp"]
}
```

## solana_signTransaction

This method returns a signature for the provided instuctions to be signed targetting the requested signer address corresponding to the keypair returned by the account data.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `feePayer` : `STRING` -  public key of the transaction fee payer
    	1.2. `instructions` : `Array` - instructions to be atomically executed:
    		1.2.1. `Object` - instruction
    			1.2.1.1. `programId` : `STRING` - public key of the on chain program
    			1.2.1.2. `data` : `STRING | UNDEFINED` - encoded (hex) calldata for instruction
    			1.2.1.3. `keys` : `ARRAY` - account metadata used to define instructions
    				1.2.1.3.1. `Object` - key
    					1.2.1.3.1.1. `isSigner` : `BOOLEAN` - true if an instruction requires a transaction signature matching `pubkey`
    					1.2.1.3.1.2. `isWritable` : `BOOLEAN` - true if the `pubkey` can be loaded as a read-write account
    					1.2.1.3.1.3. `pubkey` : `STRING` - public key of authorized program
    	1.3. `recentBlockhash` : `string` - a recent blockhash

### Returns

    1. `STRING` - corresponding signature for signed instructions

### Example

```javascript
// Request
{
	"id": 1,
	"jsonrpc": "2.0",
	"method": "solana_signTransaction",
	"params": {
		"feePayer": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
		"instructions": [{
			"programId": "Vote111111111111111111111111111111111111111",
			"data": "020000000400000000000000aa279f0600000000ab279f0600000000ac279f0600000000ad279f0600000000addc3907752933c081090642af850bef1c0bbfc8c82c0a511f15b88f0fe3f594010fe7b46100000000",
			"keys": [{
				"isSigner": true,
				"isWritable": true,
				"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
			}]
		}],
		"recentBlockhash": "2bUz6wu3axM8cDDncLB5chWuZaoscSjnoMD2nVvC1swe"
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  "2Lb1KQHWfbV3pWMqXZveFWqneSyhH95YsgCENRWnArSkLydjN1M42oB82zSd6BBdGkM9pE6sQLQf1gyBh8KWM2c4"
}
```
