# Relay Server RPC

## Purpose

This document aims to create the JsonRpc contract between a client and a server.

## Definitions

The following definitions are shared concepts across all JSON-RPC methods for the Relay API:

- **topic** - (hex string - 32 bytes) a target topic for the message to be subscribed by the receiver.
- **message** - (utf8 string - variable - max 10,000 bytes) a plaintext message to be relayed to any subscribers on the topic.
- **ttl** - (uint32 - 4 bytes) a storage duration for the message to be cached server-side in **seconds** (aka time-to-live).
- **tag** - (uint32 - 4 bytes) a label that identifies what type of message is sent based on the rpc method used.
- **prompt** - (boolean - 1 byte) a flag that identifies whether the server should trigger a notification webhook to a client through a push server.
- **id** - (hex string - 32 bytes) a unique identifier for each subscription targeting a topic.

## Publish payload

Used when a client publishes a message to a server.

```jsonc
{
  "id" : "1",
  "jsonrpc": "2.0",
  "method": "irn_publish",
  "params" : {
    "topic" : string,
    "message" : string,
    "ttl" : seconds,
    "tag" : number,
    "prompt" : boolean, // optional / default = false
  }
}
```

## Subscribe payload

Used when a client subscribes a given topic.

```jsonc
{
  "id" : "1",
  "jsonrpc": "2.0",
  "method": "irn_subscribe",
  "params" : {
    "topic" : string
  }
}
```

## Unsubscribe payload

Used when a client unsubscribes a given topic.

```jsonc
{
  "id" : "1",
  "jsonrpc": "2.0",
  "method": "irn_unsubscribe",
  "params" : {
    "topic" : string,
    "id": string
  }
}
```

## Subscription payload

Used when a server sends a subscription message to a client.

```jsonc
{
  "id" : "1",
  "jsonrpc": "2.0",
  "method": "irn_subscription",
  "params" : {
    "id" : string,
    "data" : {
      "topic" : string,
      "message": string
    }
  }
}
```

## FAQ

- What is a client? - Any SDK instance (Sign, Chat, Auth, Push)
