# Verify Server API

## Register Attestation

Used to register a new attestation

`POST /attestation`

Body:

```jsonc
{
    "attestationId": string,
    "origin": string
}
```

## Resolve Attestation

Used to resolve an attestation

`GET /attestation/:attestationId`

Response:

```jsonc
{
    "origin": string
}
```
