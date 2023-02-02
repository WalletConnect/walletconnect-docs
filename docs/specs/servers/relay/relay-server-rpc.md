# Relay Server RPC

## Purpose

This document aims to create the JsonRpc contract between a client and a server.

## Definitions

The following definitions are shared concepts across all JSON-RPC methods for the Relay API:

- **topic** - a target topic for the message to be subscribed by the receiver.
- **message** - a plaintext message to be relayed to any subscribers on the topic.
- **ttl** - a storage duration for the message to be cached server-side in **seconds** (aka time-to-live).
- **tag** - a label that identifies what type of message is sent based on the rpc method used.
- **id** - a unique identifier for each subscription targeting a topic.

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
    "tag" : number, // optional / default = 0
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
