# Keys Server API

## Encryption Keys

### Register Encryption Key

Used to register a new encryption key

`POST /encryption/register`

Body:

```jsonc
{
    "idAuth": string
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
    "idAuth": string
}
```

## Identity Keys

### Register Identity Key

Used to register a new identity key

`POST /identity/register`

Body:

```jsonc
{
    "cacao": string
}
```

### Resolve Identity Key

Used to get a cacao matching an identity key

`POST /identity/resolve`

Query Params:

```jsonc
{
    "publicKey": string,
}
```
