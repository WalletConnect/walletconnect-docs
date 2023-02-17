# Cast Server API

## Register

Registers an account and push subscription symmetric key. The `subscriptionAuth` must be attached in the request so the Cast server can verify if wallet proved ownership of an address.

`POST /:project_id/register`

Body:

```jsonc
{
    "account": string,
    "symKey": string,
    "subscriptionAuth": string,
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
  "failed": string[][],
  "notFound": string[]
}
```
