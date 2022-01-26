---
description: Solana JSON-RPC Methods
---

# Solana

## solana_getAccounts

This method returns an Array of public keys available to sign from the wallet.

### Parameters

    none

### Returns

    1.`Array` - Array of accounts:
    	1.1. `Object`
    		1.1.1. `pubkey` : `String` - public key for keypair

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
  "result": [{ "pubkey": "722RdWmHC5TGXBjTejzNjbc8xEiduVDLqZvoUGz6Xzbp" }]
}
```

## solana_requestAccounts

This method returns an Array of public keys available to sign from the wallet.

### Parameters

    none

### Returns

    1.`Array` - Array of accounts:
    	1.1. `Object`
    		1.1.1. `pubkey` : `String` - public key for keypair

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
  "result": [{ "pubkey": "722RdWmHC5TGXBjTejzNjbc8xEiduVDLqZvoUGz6Xzbp" }]
}
```

## solana_signTransaction

This method returns a signature over the provided instuctions by the targetted public key.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `feePayer` : `String` -  public key of the transaction fee payer
    	1.2. `instructions` : `Array` - instructions to be atomically executed:
    		1.2.1. `Object` - instruction
    			1.2.1.1. `programId` : `String` - public key of the on chain program
    			1.2.1.2. `data` : `String | undefined` - encoded calldata for instruction
    			1.2.1.3. `keys` : `Array` - account metadata used to define instructions
    				1.2.1.3.1. `Object` - key
    					1.2.1.3.1.1. `isSigner` : `Boolean` - true if an instruction requires a transaction signature matching `pubkey`
    					1.2.1.3.1.2. `isWritable` : `Boolean` - true if the `pubkey` can be loaded as a read-write account
    					1.2.1.3.1.3. `pubkey` : `String` - public key of authorized program
    	1.3. `recentBlockhash` : `String` - a recent blockhash
    	1.4. `partialSignatures` : `Array`, - (optional) previous partial signatures for this instruction set
    		1.4.1. `Object` - partial signature
    			1.4.1.2. `pubkey` : `String` - pubkey of the signer
    			1.4.1.1. `signature` : `String` - signature matching `pubkey`

### Returns

    1. `Object`
    	1.1. `signature` : `String` - corresponding signature for signed instructions

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
			"data": "37u9WtQpcm6ULa3VtWDFAWoQc1hUvybPrA3dtx99tgHvvcE7pKRZjuGmn7VX2tC3JmYDYGG7",
			"keys": [{
				"isSigner": true,
				"isWritable": true,
				"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
			}]
		}],
		"recentBlockhash": "2bUz6wu3axM8cDDncLB5chWuZaoscSjnoMD2nVvC1swe",
		"signatures": [{
			"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
			"signature": "2Lb1KQHWfbV3pWMqXZveFWqneSyhH95YsgCENRWnArSkLydjN1M42oB82zSd6BBdGkM9pE6sQLQf1gyBh8KWM2c4"
		}]
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  { signature: "2Lb1KQHWfbV3pWMqXZveFWqneSyhH95YsgCENRWnArSkLydjN1M42oB82zSd6BBdGkM9pE6sQLQf1gyBh8KWM2c4" }
}
```

# solana_signMessage

This method returns a signature for the provided message from the requested signer address.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `message` : `String` -  the message to be signed (base58 encoded)
    	1.2. `pubkey` : `String` -  public key of the signer

### Returns

    1. `Object`
    	1.1. `signature` : `String` - corresponding signature for signed message

### Example

```javascript
// Request
{
	"id": 1,
	"jsonrpc": "2.0",
	"method": "solana_signMessage",
	"params": {
		"message": "37u9WtQpcm6ULa3VtWDFAWoQc1hUvybPrA3dtx99tgHvvcE7pKRZjuGmn7VX2tC3JmYDYGG7",
		"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  { signature: "2Lb1KQHWfbV3pWMqXZveFWqneSyhH95YsgCENRWnArSkLydjN1M42oB82zSd6BBdGkM9pE6sQLQf1gyBh8KWM2c4" }
}
```
