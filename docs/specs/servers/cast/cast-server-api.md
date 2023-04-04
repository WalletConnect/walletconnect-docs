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
Response:

```jsonc
{
    "id": string
}
```

Webhook payload:
```jsonc
{
    "id": string,
    "event": string // subscribe or unsubscribed
    "account": string // CAIP-10 account
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

## Generate Subscription

Used to generate a new push subscription for a dapp, returns a web did document that should be stored at dapp's domain

`GET /generate-subscription`

Response:

```jsonc
{
    "didDoc": DidDocument,
}
``` 

Failed
```jsonc
{
  "reason": string
}
```

