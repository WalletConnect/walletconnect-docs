# Data Structures

In this document we define data structures and definitions used in the chat api

## Invite

Invite is an encrypted payload used in wc_chatInvite which will be tracked by the json-rpc id to index on the client-side with the following params.

```jsonc
{
  "message": string,
  "account": string,
  "publicKey": string,
  "signature": string, // optional
}
```

## Media

Media is an optional parameter used in wc_chatMessage to append a media file reference sent together with the plaintext message.

```jsonc
{
  "type": string,
  "data": string,
}
```

## Message

An array of Messages is returned on `getMessages(params: {topic: string;})`

```jsonc
{
  "topic": string,
  "message" : string,
  "authorAccount": string, // to distinguish who sent it. Could also be a flag
  "timestamp": Int64,
  "media": Media // optional
}
```

## Thread

A map of type `Map<string, Thread>` is returned on `getThreads(params: {account: string;}`. Topic is the key of the map.

```jsonc
{
  "topic": string,
  "selfAccount": string,
  "peerAccount": string
}
```
