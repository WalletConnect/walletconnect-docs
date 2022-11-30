# Relay Client

## Purpose

This document aims to define a set of rules that RelayClient should perform when publishing a message.

## Rules

Rules define the default behaviors that RelayClient must respect when publishing every message.

- **Publishing retrials** - given that a message publish fails. RelayClient must make three retries before throwing an error to its consumer.
- **Error handling** - given that a message publish fails. After making three retries, RelayClient must throw an error with a descriptive message to its consumer.
- **Offline support** - given that RelayClient detects no Internet availability or web-socket connection. After making three retries, RelayClient must throw an error with a descriptive message to its consumer.

## Unpublished messages

The way of handling unpublished messages in the RelayClient should differ depending on the consumer.

- Given that the `api` field inside the `Policy` object equals `1` (sign):

  - once RelayClient fails to publish a message three times in a row, the unpublished message is not persistent in a local storage. Sending a message again is the responsibility of RelayClient's consumer. RelayClient should throw a descriptive error to its consumer once a message publish fails.

- Given that `api` field inside the `Policy` object equals `2` (chat):
  - once RelayClient fails to publish a message three times in a row for no Internet availability or web-socket connection, the unpublished message is persistent in local storage. Once RelayClient detects that connection is again available, messages are sent in the original order. For a better user experience, RelayClient should throw a descriptive error to its consumer once a message publish fails.
  - once RelayClient fails to publish a given message three time in a row for any other reason than no available connection, the unpublished message is persistent in local storage, and RelayClient's consumer is responsible for sending a message again. For a better user experience, RelayClient should throw a descriptive error to its consumer once a message publish fails.

## API

The Relay Client API defines a public interface with set of supported methods. It is consumed by an instance of SDK, where it allows to publish a message on a topic and subscribe or unsubcsribe the given topic.

```kotlin
interface Relay {

    /*Publishes a message over the network on given topic*/
    fun publish(topic: String, message: String, policy: Policy)

    /*Subcribes on topic to receive messages*/
    fun subscribe(topic: String)

    /*Unsubcribes from a topic*/
    fun unsubscribe(topic: String, subscriptionId: String)

    /*Opens a Web-Socket connection*/
    fun connect()

    /*Closes a Web-Socket connection*/
    fun disconnect()
}
```

### Policy

The policy object defines the policy's parameters.

```jsonc
{
    "ttl" : seconds,
    "tag" : number, // Optional / default = 0
    "prompt" : boolean // Optional / default = false
}
```

## FAQ

- What is a RelayClient? - an instance of Relay on the client-side used by any sdk instance.
