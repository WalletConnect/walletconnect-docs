# Relay Network

## Description

Relay Network is a publish-subscribe network that routes messages between clients subscribed to a topic through a Relay Server

## Properties

- Relay Servers will track subscriptions requested by the clients connected to its API.
- Relay Servers will cache messages that are undelivered until TTL is reached.
- Relay Servers will exchange messages with other peers if they are not connected to a subscribed client.


## Concepts

- Topic is a string identifier that is used by clients to publish and subscribe to messages.
- Subscription is requested by a client and it's indefinite until the client requests to unsubscribe.
- Publication is requested by a client and the Relay server is responsible for routing to its recipient.
- Message is a utf8 string that is sent when publishing to be routed to its recipient.
- Tag is an integer used as metadata to identify what type of message is being sent.
- TTL is the maximum amount of time (in seconds) that a message should be cached if undelivered.
- Prompt is a boolean flag that is used to identify if a message is relevant to registered webhooks.

## Message Id

A Relay message is globally available and it's always a utf8 string. Therefore the message id is derived as the sha256 hash.

```sh
message_id = sha256(message)
```
