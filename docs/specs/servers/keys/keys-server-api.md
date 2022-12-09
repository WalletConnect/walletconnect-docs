# Keys Server API

## Encryption Keys

### Register Encryption Key

Used to register a new encryption key

`POST /encryption/register`

Body:

```jsonc
{
    "account": string,
    "publicKey": string,
    "jwt": string
}
```

### Resolve Encryption Key

Used to get an encryption key for an account

`GET /encryption/resolve`

Query Params:

```jsonc
{
    "account": string,
}
```

Response:

```jsonc
{
    "publicKey": string,
}
```

### Remove Encryption Key

Used to remove an encryption key from the server

`DELETE /encryption/register/:publicKey`

Body:

```jsonc
{
    "account": string,
    "jwt": string
}
```

## Identity Keys

### Register Identity Key

Used to register a new identity key

`POST /identity/register`

Body:

```jsonc
{
    "account": string,
    "publicKey": string,
    "cacao": string
}
```

### Verify Encryption Key

Used to verify that identity key matches account

`POST /identity/verify`

Query Params:

```jsonc
{
    "publicKey": string,
    "account": string,
}
```
