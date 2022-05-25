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
    	1.1. `Object` - Account Data object with paramters:
    		1.1.1. `algo` : `STRING` - algorithm used for signing
    		1.1.2. `address` : `STRING` - corresponding address for keypair
    		1.1.3. `pubkey` : `STRING` - public key for keypair

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
        "pubkey": "0204848ceb8eafdf754251c2391466744e5a85529ec81ae6b60a187a90a9406396"
      }
    ]
}
```

## cosmos_signDirect

This method returns a signature for the provided document to be signed targetting the requested signer address corresponding to the keypair returned by the account data.

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
    	1.1. `signature` : `STRING` -  corresponding signature for signed documented
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
      "authInfoBytes": "0a0a0a0012040a020801180112130a0d0a0575636f736d12043230303010c09a0c",
      "bodyBytes": "0a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d120731323334353637",
    },
	}
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
		"signature": "2d5b65f75c5baf109347ae37459330d3cb87577b51e5a2f8ea232256700575656869024dffe8e96ece863f238e060656ea75a576207f5b11a630ca041e80ae75",
		"signDoc": {
      "chainId": "cosmoshub-4",
      "accountNumber": "1"
      "authInfoBytes": "0a0a0a0012040a020801180112130a0d0a0575636f736d12043230303010c09a0c",
      "bodyBytes": "0a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d120731323334353637",
    }
	}
}
```

## cosmos_signAmino

This method returns a signature for the provided document to be signed targetting the requested signer address corresponding to the keypair returned by the account data.

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
    	1.1. `signature` : `STRING` -  corresponding signature for signed documented
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
		"signDoc":   {
      "chain_id": "foochain",
      "account_number": "7",
      "sequence": "54"
      "memo": "hello, world",
      "msgs": [],
      "fee": { "amount": [], "gas": "23" },
    }
	}
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
		"signature": "0274eb5ed4b696bf42070853a516bc66529c551f4f7885c6693a6fa1dc89534e50bd12958c89107ce665e4985d91fc4263e6baae1c0239855c6ca413265330e3",
		"signDoc": {
      "chain_id": "foochain",
      "account_number": "7",
      "sequence": "54"
      "memo": "hello, world",
      "msgs": [],
      "fee": { "amount": [], "gas": "23" },
    }
	}
}
```
