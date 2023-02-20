# Cast Server API

## Register

Registers an account and push subscription symmetric key

`POST /:project_id/register`

Body:

```jsonc
{
    "account": string,
    "symKey": string,
    "relayUrl": string
}
```

## Notify

Used to notify a message to a set of accounts

`POST /:project_id/notify`

Body:

```jsonc
{
    "notification": {
        "title": string,
        "body": string,
        "icon": string,
        "url": string
    },
    "accounts": string[]
}
``` 

Response: 

```jsonc
{
  "sent": string[],
  "failed": Failed[],
  "notFound": string[]
}
```

Failed
```jsonc
{
  "account": string,
  "reason": string
}
```
