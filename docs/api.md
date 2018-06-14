# API for Browser Dapp

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
