# Relay Server RPC

## Purpose

This document aims to create the JsonRpc contract between a client and a server.

## Definitions

The following definitions are shared concepts across all JSON-RPC methods for the Relay API:

- **topic** - (hex string - 32 bytes) a target topic for the message to be subscribed by the receiver.
- **message** - (utf8 string - variable) a plaintext message to be relayed to any subscribers on the topic.
- **ttl** - (uint32 - 4 bytes) a storage duration for the message to be cached server-side in **seconds** (aka time-to-live).
- **tag** - (uint32 - 4 bytes) a label that identifies what type of message is sent based on the RPC method used.
- **id** - 19 digit unique identifier. We suggest a 13 digit epoch timestamp plus 6 digit entropy


## Methods
### Publish payload

Used when a client publishes a message to a server.

```jsonc
// Request (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_publish",
  "params" : {
    "topic" : string,
    "message" : string,
    "ttl" : seconds,
    "tag" : number,
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": true
}
```

### Batch Publish payload

Used when a client publishes multiple messages to a server.

```jsonc
// PublishedMessage
{
  "topic" : string,
  "message" : string,
  "ttl" : seconds,
  "tag" : number,
}

// Request (client->server)
{
  "id" : "1",
  "jsonrpc": "2.0",
  "method": "irn_batchPublish",
  "params" : {
    "messages": PublishedMessage[]
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": true
}
```

### Subscribe payload

Used when a client subscribes a given topic.

```jsonc
// Request (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_subscribe",
  "params" : {
    "topic" : string
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": string // subscriptionId
}
```

### Batch Subscribe payload

Used when a client subscribes multiple topics.

```jsonc
// Request (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_batchSubscribe",
  "params" : {
    "topics" : string[]
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": string[] // array of subscriptionId's
}
```

### Unsubscribe payload

Used when a client unsubscribes a given topic.

```jsonc
// Request (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_unsubscribe",
  "params" : {
    "topic" : string,
    "id": string
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": true
}
```

### Batch Unsubscribe payload

Used when a client unsubscribes a given topic.

```jsonc
// Subscription
{
  "topic": string,
  "id": string
}

// Request (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_batchUnsubscribe",
  "params" : {
    "subscriptions": Subscription[]
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": true
}
```


### Subscription payload

Used when a server sends a subscription message to a client.

```jsonc
// Request (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_subscription",
  "params" : {
    "id" : string,
    "data" : {
      "topic" : string,
      "message": string,
      "publishedAt: number,
      "tag": number
    }
  }
}

// Response (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": true
}
```

### Fetch Messsages payload

Used when a client wants to fetch all undelivered messages matching a single topic before subscribing.

Response will include a flag `hasMore`. If true, the consumer should fetch again to get the rest of the messages. If false, then all messages have been delivered.

```jsonc
// ReceivedMessage
{
  "topic": string,
  "message": string,
  "publishedAt": number,
  "tag": number
}

// Request (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_fetchMessages",
  "params" : {
    "topic": string
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": {
    "messages": ReceivedMessage[],
    "hasMore": boolean
  }
}
```



### Batch Fetch Messsages payload

Used when a client wants to fetch all undelivered messages matching multiple topics before subscribing.

Response will include a flag `hasMore`. If true, the consumer should fetch again to get the rest of the messages. If false, then all messages have been delivered.

```jsonc
// ReceivedMessage
{
  "topic": string,
  "message": string,
  "publishedAt": number,
  "tag": number
}

// Request (client->server)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "method": "irn_batchFetchMessages",
  "params" : {
    "topics": string[]
  }
}

// Response (server->client)
{
  "id" : 1687239522123456789,
  "jsonrpc": "2.0",
  "result": {
    "messages": ReceivedMessage[],
    "hasMore": boolean
  }
}
```

## FAQ

- What is a client? - Any SDK instance (Sign, Chat, Auth, Notify)
