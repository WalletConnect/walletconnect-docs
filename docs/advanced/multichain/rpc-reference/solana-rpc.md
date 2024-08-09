---
description: Solana JSON-RPC Methods & Events
---

# Solana

The Chain IDs of Solana can be found in [namespaces.chainagnostic.org](https://namespaces.chainagnostic.org/solana/caip10) [(GitHub)](https://github.com/ChainAgnostic/namespaces/blob/main/solana/caip10.md).

## Notifications (Events)

### accountChanged

This methods is sent by the wallet when the active _account_ changes.

**Parameters**

  1.1. `Object`
  	1.1.1. `pubkey` : `String` - public key for keypair

**Returns**

		none

**Example**

```javascript
{
  "jsonrpc": "2.0",
  "method": "accountChanged",
  "params": {
    "publicKey": "722RdWmHC5TGXBjTejzNjbc8xEiduVDLqZvoUGz6Xzbp"
   } 
}  
```

## Methods

### solana_getAccounts

This method returns an Array of public keys available to sign from the wallet.

**Parameters**

    none

**Returns**

    1.`Array` - Array of accounts:
    	1.1. `Object`
    		1.1.1. `pubkey` : `String` - public key for keypair

**Example**

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

### solana_requestAccounts

This method returns an Array of public keys available to sign from the wallet.

**Parameters**

    none

**Returns**

    1.`Array` - Array of accounts:
    	1.1. `Object`
    		1.1.1. `pubkey` : `String` - public key for keypair

**Example**

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

### solana_signMessage

This method returns a signature for the provided message from the requested signer address.

**Parameters**

    1. `Object` - Signing parameters:
    	1.1. `message` : `String` -  the message to be signed (base58 encoded)
    	1.2. `pubkey` : `String` -  public key of the signer

**Returns**

    1. `Object`
    	1.1. `signature` : `String` - corresponding signature for signed message

**Example**

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

### solana_signTransaction

This method returns a signature over the provided instructions by the targeted public key.

**Parameters**

    1. `Object` - Signing parameters:
    	1.1. `transaction` : `TODO` -  the transaction raw bytes encoded on base58
    	1.2. `pubkey` : `TODO` - TODO

**Returns**

    1. `Object`
    	1.1. `transaction` : `TODO` - the signed transaction raw bytes encoded on base58

**Example**

```javascript
// Request
{
	"id": 1,
	"jsonrpc": "2.0",
	"method": "solana_signTransaction",
	"params": {
      "transaction": "abc123...",
      "pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm"
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  { 
      "transaction": "abc123..."
    }
}
```

### solana_signAndSendTransaction

This method request to a wallet to sign and submit a transaction to the network.

**Parameters**

    1. `Object` - Signing parameters:
    	1.1. `transaction` : `TODO` -  the transaction raw bytes encoded on base58
    	1.2. `pubkey` : `TODO` - TODO
			1.3. `sendOptions` : `object` - TODO
				1.3.1. `maxRetries` : `number` \(optional\) - 
				1.3.1. `minContextSlot` : `number` \(optional\) -
				1.3.1. `preflightCommitment` : `string` \(optional\) -
				1.3.1. `skipPreflight` : `boolean` \(optional\) -


**Returns**

    1. `Object`
    	1.1. `transaction` : `TODO` - the signed transaction raw bytes encoded on base58

**Example**

```javascript
// Request
{
	"id": 1,
	"jsonrpc": "2.0",
	"method": "solana_signAndSendTransaction",
	"params": {
      "transaction": "abc123...",
      "pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
			"sendOptions": {
				"maxRetries": 2;
				"minContextSlot": TODO;
				"preflightCommitment": "processed";
				"skipPreflight": false;
			}
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  { 
      "transaction": "abc123..."
    }
}
```

### solana_signAllTransactions

This method request to a wallet to sign and submit a transaction to the network.

**Parameters**

    1. `Object` - Signing parameters:
    	1.1. `transactions` : `Array` -  Array of transactions.
				1.1.1 `String` - serialized transaction, bs58-encoded
    	1.2. `pubkey` : `String` - TODO


**Returns**

    1. `Object`
    	1.1. `transactions` : `Array` -  Array of transactions.
				1.1.1 `String` - signed serialized transaction, bs58-encoded

**Example**

```javascript
// Request
{
	"id": 1,
	"jsonrpc": "2.0",
	"method": "solana_signAndSendTransaction",
	"params": {
      "transaction": [
				"...",
				"...",
				"..."
			],
      "pubkey": "AqP3MyNwDP4L1GJKYhzmaAUdrjzpqJUZjahM7kHpgavm",
	}
}

// Result
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":  { 
      "transaction": [
				"...",
				"...",
				"..."
			],
    }
}
```


