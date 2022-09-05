# RPC Methods

This doc should be used as a _source-of-truth_ and reflect the latest decisions and changes applied to the WalletConnect collection of client-to-client JSON-RPC methods for all platforms SDKs.

## Definitions

- **Nullables:** Fields flagged as `Optional` can be ommited from the payload.
- Unless explicitly mentioned that a response requires associated data, all methods response's follow a default JSON-RPC pattern for the success and failure cases:

```jsonc
// Success
result: true

// Failure
error: {
  "code": number,
  "message": string
}
```

### wc_authRequest

Used to request authentication signature to a peer through topic P. Response is expected on topic R with shared symKey.

Parameters for request and response are compliant with [CAIP-74](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-74.md) (aka CACAO)

- Success response is equivalent to authentication acceptance.
- Error response is equivalent to authentication rejection.

**Request**

```jsonc
// wc_authRequest params
{
  "requester": {
    "publicKey": string,
    "metadata": Metadata,
  },
  "payloadParams": PayloadParams
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Prompt  | true     |
| Tag     | 3000     |

```

**Response**

```jsonc
// Success result
{
  "header": CacaoHeader,
  "payload": CacaoPayload,
  "signature": CacaoSignature
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Prompt  | false    |
| Tag     | 3001     |
```


### wc_pairingDelete

Used to inform the peer to close and delete a pairing. The associated authentication state of the given pairing must also be deleted.

**Request**

```jsonc
// wc_pairingDelete params
{
  "code": Int64,
  "message": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Prompt  | false    |
| Tag     | 1000     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Prompt  | false    |
| Tag     | 1001     |
```

### wc_pairingPing

Used to evaluate if peer is currently online. Timeout at 30 seconds

**Request**

```jsonc
// wc_pairingPing params
{
  // empty
}

| IRN     |          |
| ------- | -------- |
| TTL     | 30       |
| Prompt  | false    |
| Tag     | 1002     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 30       |
| Prompt  | false    |
| Tag     | 1003     |
```
