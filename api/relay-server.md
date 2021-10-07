# Relay Server API

## WebSocket API \(JSON-RPC\)

### Subscribe

#### Interface

```typescript
// Request (Client -> Server)
interface WakuSubscribeRequest {
  id: number;
  jsonrpc: "2.0";
  method: "waku_subscribe";
  params: {
    topic: string;
  };
}

// Response (Server -> Client)
interface WakuSubscribeResponse {
  id: number;
  jsonrpc: "2.0";
  result: string;
}
```

#### Example

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

#### Interface

```typescript
// Request (Client -> Server)
interface WakuPublishRequest {
  id: number;
  jsonrpc: "2.0";
  method: "waku_publish";
  params: {
    topic: string;
    message: string;
    ttl: number;
  };
}

// Response (Server -> Client)
interface WakuPublishResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

#### Example

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

#### Interface

```typescript
// Request (Server -> Client)
interface WakuSubscriptionRequest {
  id: number;
  jsonrpc: "2.0";
  method: "waku_subscription";
  params: {
    id: string;
    data: {
      topic: string;
      message: string;
    };
  };
}

// Response (Client -> Server)
interface WakuSubscriptionResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

#### Example

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

#### Interface

```typescript
// Request (Client -> Server)
interface WakuUnsubscribeRequest {
  id: number;
  jsonrpc: "2.0";
  method: "waku_unsubscribe";
  params: {
    topic: string;
    id: string;
  };
}

// Response (Server -> Client)
interface WakuUnsubscribeResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

#### Example

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
  GET https://relay.walletconnect.com/hello

  Response:
  Status: 200
  Content-Type: text/plain; charset=utf-8
  Body: Hello World, this is WalletConnect v2.0
```

### Subscribe Push Notification Webhook

```bash
  POST https://relay.walletconnect.com/subscribe
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
