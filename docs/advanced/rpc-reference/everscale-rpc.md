---
description: Everscale JSON-RPC Methods
---

# Everscale

# WC JSON-RPC for Everscale

### ever_sign

Signature of a random message for authentication.

##### Parameters:

    1. message - some message in base64;
    2. withSignatureId - bool or number
    3. hashData - bool

##### Returns:

    1. signature - string signature in base64;
    2. pubkey - public key of the wallet's address;

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_sign",
  "params": {
        "message": "some message in base64",
        "withSignatureId": true,
        "hashData": true
    }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "signature": "0xa3f207... in base64",
        "pubkey": "0x07bf94e...37e3"
    }
}
```

### ever_sendMessage

Creates message, sends it to the network, monitors its processing and returns transaction's id.

##### Parameters:

    1. value - amount of coins attached to the message;
    2. bounce - should the answer message be generated in case of an error;
    3. destAddress - message destination address;
    4. destPayload - message destination payload;
        4.1. abi - destination contract ABI;
        4.2. method - destination contract method;
        4.3. params - destination contract method params

##### Returns:

    1. txId - transaction's id in blockchain;

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_sendMessage",
  "params": {
        "source_address": "0:695e42...b8d",
        "value": 1000000000,
        "bounce": False,
        "destAddress": "0:b38d96...708",
        "destPayload": {
            "abi": "",
            "method": "",
            "params": {}
        },
    }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "txId": "743e1c0046b82a48a2cf8cbe9a2059ce6f3862cfae377c77d9f1b4efd88d7acb"
    }
}
```

### ever_signMessage

Message that can then be sent to the blockchain.

##### Parameters:

    1. value - amount of coins attached to the message;
    2. bounce - should the answer message be generated in case of an error;
    3. destAddress - message destination address;
    4. destPayload - message destination payload;
       4.1. abi - destination contract ABI;
       4.2. method - destination contract method;
       4.3. params - destination contract method params

##### Returns:

    1. signedExtMessage - signed external message;
    2. expireAt - мessage expiration timestamp

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_processMessage",
  "params": {
        "source_address": "0:695e42...b8d",
        "value": 1000000000,
        "bounce": False,
        "destAddress": "0:b38d96...708",
        "destPayload": {
            "abi": "",
            "method": "",
            "params": {}
        },
    }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "signedExtMessage": "c0b0996a9f0ea8e472041857ff2da9cf8086a78603f823a7170891f43a217ff1",
        "expireAt": 1685594678
    }
}
```

### ever_sendExternalMessage

Sends an external message to the contract.

##### Parameters:

    1. destAddress - message destination address;
    2. destPayload - message destination payload;
        2.1. abi - destination contract ABI;
        2.2. method - destination contract method;
        2.3. params - destination contract method params

##### Returns:

    1. txId - transaction's id in blockchain;

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_sendExternalMessage",
  "params": {
        "sourceAddress": "0:695e42...b8d",
        "destAddress": "0:b38d96...708",
        "destPayload": {
            "abi": "",
            "method": "",
            "params": {}
        },
    }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "txId": "743e1c0046b82a48a2cf8cbe9a2059ce6f3862cfae377c77d9f1b4efd88d7acb"
    }
};
```

### ever_broadcastMessage

Sends an internal message from the user account without waiting for the transaction.

##### Parameters:

    1. value - amount of coins attached to the message;
    2. bounce - should the answer message be generated in case of an error;
    3. destAddress - message destination address;
    4. destPayload - message destination payload;
        4.1. abi - destination contract ABI;
        4.2. method - destination contract method;
        4.3. params - destination contract method params

##### Returns:

    1. hash: string - external message hash;
    2. account: string - destination account address (equals to source_address);
    3. expireAt: number - мessage expiration timestamp

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_broadcastMessage",
  "params": {
        "sourceAddress": "0:695e42...b8d",
        "value": 1000000000,
        "bounce": False,
        "destAddress": "0:b38d96...708",
        "destPayload": {
            "abi": "",
            "method": "",
            "params": {}
        },
    }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "hash": "743e1c0046b82a48a2cf8cbe9a2059ce6f3862cfae377c77d9f1b4efd88d7acb",
        "account": "0:695e42...b8d",
        "expireAt": 1684327417543
    }
};
```

### ever_broadcastExternalMessage

Sends an external message to the contract without waiting for the transaction.

##### Parameters:

    1. destAddress - message destination address;
    2. destPayload - message destination payload;
        2.1. abi - destination contract ABI;
        2.2. method - destination contract method;
        2.3. params - destination contract method params

##### Returns:

    1. hash: string - external message hash;
    2. account: string - destination account address (equals to source_address);
    3. expireAt: number - мessage expiration timestamp

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_broadcastExternalMessage",
  "params": {
        "sourceAddress": "0:695e42...b8d",
        "destAddress": "0:b38d96...708",
        "destPayload": {
            "abi": "",
            "method": "",
            "params": {}
        },
    }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "hash": "743e1c0046b82a48a2cf8cbe9a2059ce6f3862cfae377c77d9f1b4efd88d7acb",
        "account": "0:b38d96...708",
        "expireAt": 1684327417543
    }
}
```

### ever_addTokenAsset

Adds asset (TIP-3 or native tokens) to the selected account.

##### Parameters:

    1. rootContract - asset root address. Note: you can add native coin by leaving this field empty

##### Returns:

    1. newAsset: bool - returns true if the account did not have this asset before

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_addTokenAsset",
  "params": {
        "sourceAddress": "0:695e42...b8d",
        "rootContract": "0:b38d96...708"
    }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "newAsset": true
    }
}
```

### ever_encryptData

Encrypts arbitrary data with specified algorithm for each specified recipient.

##### Parameters:

    1. recipientPublicKeys - public keys of recipients. Hex encoded;
    2. algorithm - encryption algorithm. Currently supports only “ChaCha20Poly1305”
    3. data - base64 encoded data;

##### Returns:

    1. encryptedData - encrypted data for each recipient
        1.1. algorithm - encryption algorithm
        1.2. sourcePublicKey - hex encoded encryptor's public key
        1.3. recipientPublicKey - hex encoded recipient public key
        1.4. data - base64 encoded data
        1.5. nonce - base64 encoded nonce

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_encryptData",
  "params": {
       "sourceAddress": "0:695e42...b8d",
       "recipientPublicKeys": ["0x6e74...4e95", "0x9532...403f"],
       "algorithm": "ChaCha20Poly1305",
       "data": "ZGF0YQ=="
  }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "encryptedData": [
           {
            "algorithm": "ChaCha20Poly1305",
            "sourcePublicKey": "0x209f...d08f",
	      "recipientPublicKey": "0x6e74...4e95",
            "data": "ZW5jRGF0YTE=",
            "nonce": "bm9uY2Ux"
           },
           {
            "algorithm": "ChaCha20Poly1305",
            "sourcePublicKey": "0x209f...d08f",
            "recipientPublicKey": "0x6e74...4e95",
            "data":"ZW5jRGF0YTI=",
            "nonce":"bm9uY2Uy"
           }
        ]
    }
};
```

### ever_decryptData

Decrypts encrypted data.

##### Parameters:

    1. algorithm - encryption algorithm. Currently supports only “ChaCha20Poly1305”
    2. recipientPublicKey - hex encoded recipient public key
    3. data - base64 encoded data
    4. nonce - base64 encoded nonce

##### Returns:

    1. data - base64 encoded decrypted data

##### Example:

```
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_decryptData",
  "params": {
       "sourceAddress": "0:695e42...b8d",
       "algorithm": "ChaCha20Poly1305",
       "recipientPublicKey": "0x6e74...4e95",
       "data": "ZW5jRGF0YTE=",
       "nonce": "bm9uY2Ux"
  }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
       "data": "ZGF0YQ=="
   }
};
```
