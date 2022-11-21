# RPC Methods

This doc should be used as a _source-of-truth_ and reflect the latest decisions and changes applied to the WalletConnect collection of client-to-client JSON-RPC methods for all platforms SDKs.

## Definitions

- **Nullables:** Fields flagged as `Optional` can be omitted from the payload.
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

### wc_pushRequest

Used to request push subscription to a peer through topic P. Response is expected on the same topic.

- Success response is equivalent to push subscription acceptance.
- Error response is equivalent to push subscription rejection.

**Request**

```jsonc
// wc_pushRequest params
{
  "publicKey": string,
  "metadata": Metadata,
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Prompt  | true     |
| Tag     | 4000     |

```

**Response**

```jsonc
// Success result
{
  "publicKey": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Prompt  | false    |
| Tag     | 4001     |
```

