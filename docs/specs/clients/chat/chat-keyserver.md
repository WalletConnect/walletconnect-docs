# Chat Keyserver

Chat keyserver is a REST API that allows chat users to register their blockchain accounts for public discoverability.
In future it is worth to consider that keyserver records are stored on blockchain and remain fully controlled by account's owner.

## Register

Used for registering a record with CAIP10 account.

`POST /register`

Body:

```jsonc
{
    "account": string,
    "publicKey": string
}
```

## Resolve

Used for resolving record by CAIP10 account.

`GET /resolve?account=string`

Response:

```jsonc
{
    "account": string,
    "publicKey": string
}
```
