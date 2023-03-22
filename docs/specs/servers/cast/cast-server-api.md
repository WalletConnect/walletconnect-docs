# Cast Server API

## Register Account

Registers an account and push subscription symmetric key. The `subscriptionAuth` must be attached in the request so the Cast server can verify if wallet proved ownership of an address.

`POST /register`

Body:

```jsonc
{
    "account": string,
    "symKey": string,
    "subscriptionAuth": string,
    "relayUrl": string
}
```

### Register Webhook

Used to register a webhook that would return when accounts are subscribed or unsubscribed

`POST /register-webhook`

Body:

```jsonc
{
    "events": string[], // subscribed or unsubscribed
    "webhook": string
}
```


## Notify

Used to notify a message to a set of accounts

`POST /notify`

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

## Generate Subscribe Topic

Used to notify a message to a set of accounts

`GET /generate-subscribe-topic`

Response:

```jsonc
{
    "topic": string,
    "publicKey": string,
    "didDocument" DidDocument
}
``` 

Failed
```jsonc
{
  "reason": string
}
```

