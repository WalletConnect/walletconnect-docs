# History Server API

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

Used to get message history for a given topic.

`GET /messages`

Params:

```jsonc
{
    "topic": string,
    "pageSize": number,
    "pageNumber": number
}
```

Response:

```jsonc
{
    "messages": string[],
    "pageSize": number,
    "totalPages": number
}
```
