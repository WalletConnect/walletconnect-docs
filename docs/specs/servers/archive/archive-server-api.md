# Archive Server API

## Register

Used to register an intent to persist messages.

`POST /register`

Body:

```jsonc
{
    "tags": string[],
    "relayUrl": string
}
```



## Get Messages

Used to get message archive for a given topic.

`GET /messages`

### Parameters

#### Required

- `topic` (STRING)               = The topic id for which to retrieve the messages. 

#### Optional

- `originId` (NUMBER)            = The ID of the message used as a starting point for the query. 
- `messageCount` (NUMBER)        = The maximum number of messages to retrieve for this query (max possible value is 200).
- `direction` (`forward`|`backward`) = The direction in which messages are retrieved, default is `forward`.

The `direction` parameter indicates if the messages should be retrieved forward or backward in time from `originId`.
`forward` queries can be used to update the client with the latest messages since its last sync.
`backward` queries can be used to retrieve past archive that may have gotten removed from the client storage.

If `originId` is omitted, the absolute origin of the specified direction is used:
- `forward` retrieves messages forward in time from the beginning of archive.
- `backward` retrieves messages backward in time from the latest one in archive. 

#### Example

    topic        = "2b9429ac1df3a4aa10814160f3342fbe5a566c771fc057b45c3df86a09f07a6d"
    originId     = d7da225e7d8c199d2d0f0df9120b6a37c6deef935343d238b7a664b62e0988bc
    messageCount = 100
    direction    = forward

```
/messages?topic=2b9429ac1df3a4aa10814160f3342fbe5a566c771fc057b45c3df86a09f07a6d&originId=d7da225e7d8c199d2d0f0df9120b6a37c6deef935343d238b7a664b62e0988bc&messageCount=100&direction=forward
```

### Response

```jsonc
{
    "topic": string,        // The topic ID of the query
    "direction": string,    // The direction of the query. `forward` or `backward`.
    "nextId": number,       // The ID of the first next message in the specified direction. Used to query next page.
    "messages": string[],   // The list of retrieved messages
}
```

The `originId` message is included in the results `messages` list.

The triplet `topic`, `direction` and `nextId` can be used to continue archive retrieval without necessarily having to keep
the querying context on the client.
