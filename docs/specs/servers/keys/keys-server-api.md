# Keys Server API

## Invite Keys

### Register Invite Key

Used to register a new invite key

`POST /invite/register`

Body:

```jsonc
{
    "idAuth": string
}
```

### Resolve Invite Key

Used to get an invite key for an account

`GET /invite/resolve`

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

### Remove Invite Key

Used to remove an invite key from the server

`DELETE /invite/register/:publicKey`

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

`GET /identity/resolve`

Query Params:

```jsonc
{
    "publicKey": string,
}
```

Response:

```jsonc
{
    "cacao": string
}
```
