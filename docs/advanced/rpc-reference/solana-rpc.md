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

This method returns a transaction with added signature by the targetted public key over the provided transaction.

### Parameters

	1. `Object` - Signing parameters:
		1.1. `feePayer` : `String` - public key of the transaction fee payer
		1.2. `recentBlockhash` : `String` - (optional) a recent blockhash
		1.3. `instructions` : `Array` - instructions to be atomically executed:
			1.3.1. `Object` - instruction
				1.3.1.1. `programId` : `String` - public key of the on chain program
				1.3.1.2. `data` : `String` - base58 encoded calldata for instruction
				1.3.1.3. `keys` : `Array` - account metadata used to define instructions
					1.3.1.3.1. `Object` - key
						1.3.1.3.1.1. `isSigner` : `Boolean` - true if an instruction requires a transaction signature matching `pubkey`
						1.3.1.3.1.2. `isWritable` : `Boolean` - true if the `pubkey` can be loaded as a read-write account
						1.3.1.3.1.3. `pubkey` : `String` - public key of authorized program
		1.4. `nonceInfo` : `Object` - (optional) Nonce information. If populated, transaction will use a durable Nonce hash instead of a recentBlockhash.
			1.4.1 `nonce` : `String` - The current base58 encoded blockhash stored in the nonce
			1.4.2 `nonceInstruction` : `Object` AdvanceNonceAccount Instruction. See `1.3.1` for object layout
		1.5. `signatures` : `Array`, - previous signatures for this instruction set
			1.5.1. `Object` - signature
				1.5.1.2. `pubkey` : `String` - pubkey of the signer
				1.5.1.1. `signature` : `String` - (optional) signature matching `pubkey`

### Returns

	1. `Object` - Signed transaction parameters:
		1.1. `feePayer` : `String` - public key of the transaction fee payer
		1.2. `recentBlockhash` : `String` - (optional) a recent blockhash
		1.3. `instructions` : `Array` - instructions to be atomically executed:
			1.3.1. `Object` - instruction
				1.3.1.1. `programId` : `String` - public key of the on chain program
				1.3.1.2. `data` : `String` - base58 encoded calldata for instruction
				1.3.1.3. `keys` : `Array` - account metadata used to define instructions
					1.3.1.3.1. `Object` - key
						1.3.1.3.1.1. `isSigner` : `Boolean` - true if an instruction requires a transaction signature matching `pubkey`
						1.3.1.3.1.2. `isWritable` : `Boolean` - true if the `pubkey` can be loaded as a read-write account
						1.3.1.3.1.3. `pubkey` : `String` - public key of authorized program
		1.4. `nonceInfo` : `Object` - (optional) Nonce information. If populated, transaction will use a durable Nonce hash instead of a recentBlockhash.
			1.4.1 `nonce` : `String` - The current base58 encoded blockhash stored in the nonce
			1.4.2 `nonceInstruction` : `Object` AdvanceNonceAccount Instruction. See `1.3.1` for object layout
		1.5. `signatures` : `Array`, - previous signatures for this instruction set
			1.5.1. `Object` - signature
				1.5.1.2. `pubkey` : `String` - pubkey of the signer
				1.5.1.1. `signature` : `String` - (optional) signature matching `pubkey`

### Example

```javascript
// Request
{
	"id": 1,
	"jsonrpc": "2.0",
	"method": "solana_signTransaction",
	"params": {
		"feePayer": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
		"recentBlockhash": "2bUz6wu3axM8cDDncLB5chWuZaoscSjnoMD2nVvC1swe",
		"instructions": [{
			"programId": "Vote111111111111111111111111111111111111111",
			"data": "37u9WtQpcm6ULa3VtWDFAWoQc1hUvybPrA3dtx99tgHvvcE7pKRZjuGmn7VX2tC3JmYDYGG7",
			"keys": [{
				"isSigner": true,
				"isWritable": true,
				"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
			}]
		}],
		"signatures": []
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  {
		"feePayer": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
		"recentBlockhash": "2bUz6wu3axM8cDDncLB5chWuZaoscSjnoMD2nVvC1swe",
		"instructions": [{
			"programId": "Vote111111111111111111111111111111111111111",
			"data": "37u9WtQpcm6ULa3VtWDFAWoQc1hUvybPrA3dtx99tgHvvcE7pKRZjuGmn7VX2tC3JmYDYGG7",
			"keys": [{
				"isSigner": true,
				"isWritable": true,
				"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
			}]
		}],
		"signatures": [{
			"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
			"signature": "2Lb1KQHWfbV3pWMqXZveFWqneSyhH95YsgCENRWnArSkLydjN1M42oB82zSd6BBdGkM9pE6sQLQf1gyBh8KWM2c4"
		}]
	}
}
```

## solana_signAllTransactions

This method returns a an array of transactions with added signatures by the targetted public key for the provided transactions.

### Parameters

	1. `Object` - Signing transaction array parameters:
		1.1 `transactions` : `Array` - array of transactions
			1.1.1 `Object` - transaction
				1.1.1.1. `feePayer` : `String` - public key of the transaction fee payer
				1.1.1.2. `recentBlockhash` : `String` - (optional) a recent blockhash
				1.1.1.3. `instructions` : `Array` - instructions to be atomically executed:
					1.1.1.3.1. `Object` - instruction
						1.1.1.3.1.1. `programId` : `String` - public key of the on chain program
						1.1.1.3.1.2. `data` : `String` - base58 encoded calldata for instruction
						1.1.1.3.1.3. `keys` : `Array` - account metadata used to define instructions
							1.1.1.2.1.3.1. `Object` - key
								1.1.1.3.1.3.1.1. `isSigner` : `Boolean` - true if an instruction requires a transaction signature matching `pubkey`
								1.1.1.3.1.3.1.2. `isWritable` : `Boolean` - true if the `pubkey` can be loaded as a read-write account
								1.1.1.3.1.3.1.3. `pubkey` : `String` - public key of authorized program
				1.1.1.4. `nonceInfo` : `Object` - (optional) Nonce information. If populated, transaction will use a durable Nonce hash instead of a recentBlockhash.
					1.1.1.4.1 `nonce` : `String` - The current base58 encoded blockhash stored in the nonce
					1.1.1.4.2 `nonceInstruction` : `Object` AdvanceNonceAccount Instruction. See `1.1.1.3.1` for object layout
				1.1.1.5. `signatures` : `Array`, - previous signatures for this instruction set
					1.1.1.5.1. `Object` - signature
						1.1.1.5.1.2. `pubkey` : `String` - pubkey of the signer
						1.1.1.5.1.1. `signature` : `String` - (optional) signature matching `pubkey`

### Returns

	1. `Object` - Signed transaction array parameters:
		1.1 `transactions` : `Array` - array of transactions
			1.1.1 `Object` - transaction
				1.1.1.1. `feePayer` : `String` - public key of the transaction fee payer
				1.1.1.2. `recentBlockhash` : `String` - (optional) a recent blockhash
				1.1.1.3. `instructions` : `Array` - instructions to be atomically executed:
					1.1.1.3.1. `Object` - instruction
						1.1.1.3.1.1. `programId` : `String` - public key of the on chain program
						1.1.1.3.1.2. `data` : `String` - base58 encoded calldata for instruction
						1.1.1.3.1.3. `keys` : `Array` - account metadata used to define instructions
							1.1.1.3.1.3.1. `Object` - key
								1.1.1.3.1.3.1.1. `isSigner` : `Boolean` - true if an instruction requires a transaction signature matching `pubkey`
								1.1.1.3.1.3.1.2. `isWritable` : `Boolean` - true if the `pubkey` can be loaded as a read-write account
								1.1.1.3.1.3.1.3. `pubkey` : `String` - public key of authorized program
				1.1.1.4. `nonceInfo` : `Object` - (optional) Nonce information. If populated, transaction will use a durable Nonce hash instead of a recentBlockhash.
					1.1.1.4.1 `nonce` : `String` - The current base58 encoded blockhash stored in the nonce
					1.1.1.4.2 `nonceInstruction` : `Object` AdvanceNonceAccount Instruction. See `1.1.1.3.1` for object layout
				1.1.1.5. `signatures` : `Array`, - previous signatures for this instruction set
					1.1.1.5.1. `Object` - signature
						1.1.1.5.1.2. `pubkey` : `String` - pubkey of the signer
						1.1.1.5.1.1. `signature` : `String` - (optional) signature matching `pubkey`

### Example

```javascript
// Request
{
	"id": 1,
	"jsonrpc": "2.0",
	"method": "solana_signAllTransactions",
	"params": {
		"transactions": [{
			"feePayer": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
			"recentBlockhash": "2bUz6wu3axM8cDDncLB5chWuZaoscSjnoMD2nVvC1swe",
			"instructions": [{
				"programId": "Vote111111111111111111111111111111111111111",
				"data": "37u9WtQpcm6ULa3VtWDFAWoQc1hUvybPrA3dtx99tgHvvcE7pKRZjuGmn7VX2tC3JmYDYGG7",
				"keys": [{
					"isSigner": true,
					"isWritable": true,
					"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
				}]
			}],
			"signatures": []
		}]
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  {
		"transactions": [{
			"feePayer": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
			"recentBlockhash": "2bUz6wu3axM8cDDncLB5chWuZaoscSjnoMD2nVvC1swe",
			"instructions": [{
				"programId": "Vote111111111111111111111111111111111111111",
				"data": "37u9WtQpcm6ULa3VtWDFAWoQc1hUvybPrA3dtx99tgHvvcE7pKRZjuGmn7VX2tC3JmYDYGG7",
				"keys": [{
					"isSigner": true,
					"isWritable": true,
					"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
				}]
			}],
			"signatures": [{
				"pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
				"signature": "2Lb1KQHWfbV3pWMqXZveFWqneSyhH95YsgCENRWnArSkLydjN1M42oB82zSd6BBdGkM9pE6sQLQf1gyBh8KWM2c4"
			}]
		}]
	}
}
```

## solana_signMessage

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
