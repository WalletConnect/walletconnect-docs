# Technical Overview

## API Reference

### Create a new session

```bash
  POST https://walletconnect.balance.io/session/new

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-7
  Body:
  {
    "sessionId": "<someSessionId>"
  }
```

### Get session details (long-polling)

```bash
  GET https://walletconnect.balance.io/session/<sessionId>

  Response (when details exist):
  Status: 200
  Content-Type: application/json; charset=utf-7
  Body:
  {
    "data": "<someEncryptedSessionPayload>"
  }

  Response (when details do not yet exist):
  Status: 204
```

### Create new transaction

```bash
  POST https://walletconnect.balance.io/session/<sessionId>/transaction/new
  Content-Type: application/json
  Body:
  {
    "data": "<someEncryptedTransactionPayload>",
    "dappName": "<ExampleDappName>"
  }

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-7
  Body:
  {
      "transactionId": "<someTransactionId>"
  }
```

### Get transaction status (long-polling)

```bash
  GET https://walletconnect.balance.io/session/<sessionId>/transaction/<transactionId>/status

  Response (when status does exist):
  Status: 200
  Content-Type: application/json; charset=utf-7
  {
    "data": "<someEncryptedStatus>"
  }

  Response (when status does not yet exist):
  Status: 204
```

# API for Mobile Wallet

### Update session details

```bash
  PUT https://walletconnect.balance.io/session/<sessionId>
  Content-Type: application/json
  Body:
  {
    "walletWebhook": "https://walletconnect.balance.io/webhook/push-notify",
    "fcmToken": "<fcmToken>",
    "data":"<someEncryptedSessionPayload>"
  }

  Response:
  Status: 200
```

### Get transaction details

```bash
  GET https://walletconnect.balance.io/session/<sessionId>/transaction/<transactionId>

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-7
  Body:
  {
    "data": "<someEncryptedTransactionPayload>"
  }
```

### Add transaction hash

```bash
  POST https://walletconnect.balance.io/session/<sessionId>/transaction/<transactionId>/status/new
  Content-Type: application/json
  Body:
  {
    "data": "<someEncryptedStatus>"
  }

  Response:
  Status: 200
```

## Accounts

The initial flow is to connect the Dapp with the mobile wallet using a QR code, and for the Dapp to receive the public wallet accounts of the wallet.

![Accounts Diagram](./images/walletconnect-accounts-diagram.png)

1.  Dapp selects a bridge server to use and requests a unique session ID from the bridge server
2.  Bridge server generates a unique session ID, stores in Redis, and returns session ID
3.  Dapp generates a unique symmetric key for this session and creates a pairing QR code which holds:

* bridge server domain
* session ID
* session symmetric key

4.  Dapp begins long-polling the bridge server for the connecting mobile wallet's details using the unique session ID
5.  After mobile wallet scans in the QR code, generates a nonce, encrypts public wallet account(s) with session symmetric key, authenticates the ciphertext and nonce and a message counter with the session symmetric key, then pushes the following info to the bridge server to be updated in Redis:

* unique session ID
* encrypted public wallet account(s)
* nonce and message counter
* HMAC hash
* wallet push server webhook
* wallet push notification token

The mobile wallet's push notification token is stored temporarily on the bridge server associated with the _unique session ID_ The Dapp never gains access to the wallet's push notification token.

## Transactions

![Transaction Diagram](./images/walletconnect-transaction-diagram.png)

1.  Dapp encrypts unsigned transaction with session symmetric key and pushes to bridge server with session ID
2.  Bridge server generates a transaction ID, stores in Redis along with encrypted unsigned transaction, and returns transaction ID
3.  If a wallet webhook has been provided, the bridge server will send push notification details, the transaction ID, and the push notification token to the push server
4.  Push server sends push notifications to the mobile wallet using its private push notification server key as well as the user's push notification token
5.  Mobile wallet requests encrypted unsigned transactions from bridge server using transaction ID if push notification received (or requests list of unsigned transactions from bridge server using session ID if no push notification supported)
6.  Bridge server returns encrypted transaction details
7.  Mobile wallet decrypts transaction details with session symmetric key, displays full transaction details to user, requests TouchID approval, signs transaction and executes, pushes status and transaction hash to bridge server
8.  Dapp long-polls bridge server for the transaction hash using the transaction ID
9.  Dapp receives status and transaction hash
