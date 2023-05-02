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
    "event": string, // subscribe or unsubscribed
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
        "url": string,
        "type": string
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

Failed:

```jsonc
{
  "account": string,
  "reason": string
}
```

## Subscribe Topic

Used to generate a subscribe topic for a dapp to receive push subscriptions, returns a public key that should be stored on dapps's domain as a did:web document.

**Note:** this method is idempotent and will always return the same key.

`GET /subscribe-topic`

Response:

```jsonc
{
    "publicKey": string
}
``` 

Failed:

```jsonc
{
  "reason": string
}
```

## Authentication Key

Used to generate an authentication key for a dapp to send signed push messages, returns a public key that should be stored on dapps's domain as a did:web document.

**Note:** this method is idempotent and will always return the same key.

`GET /authentication-key`

Response:

```jsonc
{
  "publicKey": string
}
``` 

Failed:

```jsonc
{
  "reason": string
}
```
