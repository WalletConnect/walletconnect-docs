# Data Structures

In this document we define data structures and definitions used in the chat api

## Invite

Invite is an encrypted payload used in wc_chatInvite which will be tracked by the json-rpc id to index on the client-side with the following params.

```jsonc
{
  "message": string, // character limit is 200. Must be checked by SDK before sending
  "account": string,
  "publicKey": string,
}
```

## Media

Media is an optional parameter used in wc_chatMessage to append a media file reference sent together with the plaintext message.

```jsonc
{
  "type": string,
  "data": string, // Decide on data limit
}
```

## Message

An array of Messages is returned on `getMessages(params: {topic: string;})`

```jsonc
{
  "message" : string, // character limit is 1000. Must be checked by SDK before sending
  "authorAccount": string, // to distinguish who sent it. Could also be a flag
  "timestamp": Int64,
  "media": Media // optional
}
```

## PendingOrRejectedThread

```jsonc
{
  "topic": string | undefined,
  "selfAccount": string,
  "peerAccount": string,
  "status": 'pending' | 'rejected'
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
