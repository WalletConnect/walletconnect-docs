# Cast Server API

## Register

Registers an account and push subscription symmetric key

`POST /register`

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
