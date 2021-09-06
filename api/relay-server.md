# Relay Server API Reference

## WebSocket API \(JSON-RPC\)

### Subscribe

```javascript
// Request (Client -> Server)
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "waku_subscribe",
  "params": {
    "topic": "<TOPIC_ID>",
  }
}

// Response (Server -> Client)
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "<SUBSCRIPTION_ID>"
}
```

### Publish

```javascript
// Request (Client -> Server)
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "waku_publish",
  "params": {
    "topic": "<TOPIC_ID>",
    "message": "<MESSAGE_PAYLOAD>",
    "ttl": 86400
  }
}

// Response (Server -> Client)
{
  "id": 2,
  "jsonrpc": "2.0",
  "result": true
}
```

### Subscription

```javascript
// Request (Server -> Client)
{
  "id": 3,
  "jsonrpc": "2.0",
  "method": "waku_subscription",
  "params": {
    "id": "<SUBSCRIPTION_ID>",
    "data": {
      "topic": "<TOPIC_ID>",
      "message": "<MESSAGE_PAYLOAD>",
    }
  }
}

// Response (Client -> Server)
{
  "id": 3,
  "jsonrpc": "2.0",
  "result": true
}
```

### Unsubscribe

```javascript
// Request (Client -> Server)
{
  "id": 4,
  "jsonrpc": "2.0",
  "method": "waku_unsubscribe",
  "params": {
    "topic": "<TOPIC_ID>",
    "id": "<SUBSCRIPTION_ID>",
  }
}

// Response (Server -> Client)
{
  "id": 4,
  "jsonrpc": "2.0",
  "result": true
}
```

## HTTP API

### Test Hello World

```bash
  GET https://relay.walletconnect.org/hello

  Response:
  Status: 200
  Content-Type: text/plain; charset=utf-8
  Body: Hello World, this is WalletConnect v2.0
```

### Subscribe Push Notification Webhook

```bash
  POST https://relay.walletconnect.org/subscribe
  Content-Type: application/json
  Body:
  {
    "topic": <client_id>,
    "webhook": <push_notification_webhook>
  }

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-8
  Body:
  {
    "success": true
  }
```
