# Relay Client

## Purpose

This document aims to define a set of rules that RelayClient should perform when publishing a message.

## Rules

Rules define the default behaviors that RelayClient must respect when publishing every message.

- **Publishing retrials** - given that a message publish fails. RelayClient must make three retries before throwing an error to its consumer.
- **Error handling** - given that a message publish fails. After making three retries, RelayClient must throw an error with a descriptive message to its consumer.
- **Offline support** - given that RelayClient detects no Internet availability or web-socket connection. After making three retries, RelayClient must throw an error with a descriptive message to its consumer.

## Server-Client Extended RPC ID

When communicating with the server using `publish`, `subscribe`, or `unsubscribe`, Json RPC Ids should have 19 characters of entropy to avoid collisions.

The same function that is used to generate an ID for client-client communication can be used to generate an ID for client-server communication, it just needs to accept an override for the number of characters of entropy.

```javascript
export function payloadId(entropy = 3): number {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
```

Instead of 3, the server should use a payloadId with an entropy set to 6.

## API

The Relay Client API defines a public interface with set of supported methods. It is consumed by an instance of SDK, where it allows to publish a message on a topic and subscribe or unsubscribe the given topic.

```kotlin
interface Relay {

    /*Publishes a message over the network on given topic*/
    fun publish(topic: String, message: String, policy: Policy)

    /*Subscribes on topic to receive messages*/
    fun subscribe(topic: String)

    /*Unsubscribes from a topic*/
    fun unsubscribe(topic: String, subscriptionId: String)

    /*Opens a Web-Socket connection*/
    fun connect()

    /*Closes a Web-Socket connection*/
    fun disconnect()
    
    /*Listening for new incoming messages*/
    fun on("relay_message", (topic: string, message: string, publishedAt: Int64, receivedAt: Int64) => {})
}
```

### Policy

The policy object defines the policy's parameters.

```jsonc
{
    "ttl" : seconds,
    "tag" : number, // Optional / default = 0
}
```

### Message Id

A Relay message is globally available and it's always a utf8 string. Therefore the message id is derived as the sha256 hash.

```sh
message_id = sha256(message)
```

## FAQ

- What is a RelayClient? - an instance of Relay on the client-side used by any sdk instance.
