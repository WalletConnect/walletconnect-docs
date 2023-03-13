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
  "account": string,
}

| IRN     |          |
| ------- | -------- | 
| TTL     | 86400    |
| Tag     | 4000     |

```

**Response**

```jsonc
// Success result
{
  "subscriptionAuth": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4001     |
```

### wc_pushMessage

Used to publish a notification message to a peer through topic P. Response is expected on the same topic.

- Success response is equivalent to push message acknowledgement.
- Error response is equivalent to push message failed to decrypt.


**Request**

```jsonc
// wc_pushMessage params
{
  "title": string,
  "body": string,
  "icon": string,
  "url": string,
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4002     |

```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4003     |

```

### wc_pushDelete

Used to inform the peer to close and delete a push subscription. The reason field should be a human-readable message defined by the SDK consumer to be shown on the peer's side.

**Request**

```jsonc
// wc_pushDelete params
{
  "code": Int64,
  "message": string
}
| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4004     |
```

**Response**

```jsonc
// Success result
true
| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4005     |
