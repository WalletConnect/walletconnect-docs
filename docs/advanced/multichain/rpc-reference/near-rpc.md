---
description: NEAR JSON-RPC Methods
---

# NEAR

The method names below are based on the [Bridge Wallets](https://github.com/near/NEPs/blob/master/specs/Standards/Wallets/BridgeWallets.md#) Standard for NEAR.

## near_getAccounts

Retrieve all accounts visible to the session. `publicKey` references the underlying `FullAccess` key linked to each account.

### Parameters

    none

### Returns

    1.`Array` - Array of accounts:
        1.1. `Object`
            1.1.1. `accountId` : `String` - The account name to which the publicKey corresponds as plain text
            1.1.2. `publicKey` : `String` - The public counterpart of the key used to sign, expressed as a string with format `<key-type>:<base58-key-bytes>`

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "near_getAccounts",
  "params": {}
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [{
    "accountId": "alice.near",
    "publicKey": "ed25519:DmnRVNb89cLKZY1cH1Zcr3rxMVD9r1cVfnDac7RFwM94"
  }]
}
```

## near_signIn

For dApps that often sign gas-only transactions, `FunctionCall` access keys can be created for one or more accounts to greatly improve the UX. While this could be achieved with `signTransactions`, it suggests a direct intention that a user wishes to sign in to a dApp's smart contract.

### Parameters

    1. `Object` - Sign In parameters:
    	1.1. `permission` : `Object` -  Function call key permission parameters
                1.1.1. `receiverId` : `String` - smart contract for witch the function call access key will be created
                1.1.2. `methodNames` : `Array<String>` - list of methods that can be called on the smart contract
    	1.2. `accounts` : `Array` - list of accounts for which a FunctionCall access key will be added:
                1.2.1. `Object` - Account
                    1.2.1.1. `accountId` : `String` - The account name to which the publicKey corresponds as plain text
                    1.2.1.2. `publicKey` : `String` - The public counterpart of the key used to sign, expressed as a string with format `<key-type>:<base58-key-bytes>`

### Returns

    void

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "near_signIn",
  "params": {
    "permission": {
      "receiverId": "guest-book.testnet",
      "methodNames": []
    },
    "accounts": [{
        "accountId": "alice.near",
        "publicKey": "ed25519:DmnRVNb89cLKZY1cH1Zcr3rxMVD9r1cVfnDac7RFwM94"
    }]
  }
}

```

## near_signOut

Delete one or more `FunctionCall` access keys created with `signIn`. While this could be achieved with `signTransactions`, it suggests a direct intention that a user wishes to sign out from a dApp's smart contract.

### Parameters

    1.`Array` - Array of accounts:
        1.1. `Object`
            1.1.1. `accountId` : `String` - The account name to which the publicKey corresponds as plain text
            1.1.2. `publicKey` : `String` - The public counterpart of the key used to sign, expressed as a string with format `<key-type>:<base58-key-bytes>`

### Returns

    void

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "near_signOut",
  "params": {
    "accounts": [{
      "accountId": "alice.near",
      "publicKey": "ed25519:DmnRVNb89cLKZY1cH1Zcr3rxMVD9r1cVfnDac7RFwM94"
    }]
  }
}
```

## near_signTransaction

Sign a transaction. It makes use of [near-api-js](https://github.com/near/near-api-js) to enable interoperability with dApps that will already use it for constructing transactions and communicating with RPC endpoints.

[Transaction](https://nomicon.io/RuntimeSpec/Transactions) passed to `signTransaction` must be encoded.

### Parameters

     1. `Object` - Signing parameters:
    	1.1. `transaction` : `Uint8Array` - Encoded Transaction via transactions.Transaction.encode()

### Returns

The result of `signTransaction` and is encoded [SignedTransaction](https://nomicon.io/RuntimeSpec/Transactions#signed-transaction) model.

     1. `Uint8Array` - Encoded SignedTransaction via transactions.SignedTransaction.encode()

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "near_signTransaction",
  "params": {
    "transaction": {
    "type": "Buffer",
      "data": [32, 0, 0, 0, 100, 101, 118, 45, 49, 54, 55, 49, 51, 56, 55, 51, 57, 56 ...]
    }
  }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
  "type": "Buffer",
    "data": [32, 0, 0, 0, 100, 101, 118, 45, 49, 54, 55, 49, 51, 56, 55, 51, 57, 56 ...]
  }
}
```

## near_signTransactions

Sign a list of transactions. It makes use of [near-api-js](https://github.com/near/near-api-js) to enable interoperability with dApps that will already use it for constructing transactions and communicating with RPC endpoints.

[Transactions](https://nomicon.io/RuntimeSpec/Transactions) passed to `signTransactions` must be encoded.

### Parameters

    1. `Array<Object>` - Signing parameters:
    	1.1. `transactions` : `Array<Uint8Array>` - Array of Encoded Transaction via transactions.Transaction.encode()

### Returns

The result of `signTransactions` and are encoded [SignedTransaction](https://nomicon.io/RuntimeSpec/Transactions#signed-transaction) models.

    1. `Array<Uint8Array>` - Array of Encoded SignedTransaction via transactions.SignedTransaction.encode()

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "near_signTransactions",
  "params": {
  "transactions": [
      { "type": "Buffer", "data": [32, 0, 0, 0, 100, 101, 118, 45, 49, 54, 55, 49, 53, 52, 49, 55, 56, 57, 51, 50 ...] },
      { "type": "Buffer", "data": [32, 0, 0, 0, 100, 101, 118, 45, 49, 54, 55, 49, 53, 52, 49, 55, 56, 57, 51, 50 ...] }
    ]
  }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    { "type": "Buffer", "data": [32, 0, 0, 0, 100, 101, 118, 45, 49, 54, 55, 49, 53, 52, 49, 55, 56, 57, 51, 50 ...] },
    { "type": "Buffer", "data": [32, 0, 0, 0, 100, 101, 118, 45, 49, 54, 55, 49, 53, 52, 49, 55, 56, 57, 51, 50 ...] }
  ]
}

```
