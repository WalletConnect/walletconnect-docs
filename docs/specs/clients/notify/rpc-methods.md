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

## Methods

### wc_notifySubscribe

Used to subscribe notify subscription to a peer through subscribe topic. Response is expected on the response topic

**Request**

```jsonc
// wc_notifySubscribe params
{
  "subscriptionAuth": string
}

| IRN     |          |
| ------- | -------- | 
| TTL     | 86400    |
| Tag     | 4000     |

```

**Response**

```jsonc
// Success resu0t
{
  "responseAuth": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4001     |
```

### wc_notifyMessage

Used to publish a notification message to a peer through notify topic. Response is expected on the same topic.

- Success response is equivalent to notify message acknowledgement.
- Error response is equivalent to notify message failed to decrypt.


**Request**

```jsonc
// wc_notifyMessage params
{
  "messageAuth": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Tag     | 4002     |

```

**Response**

```jsonc
// Success result
{
  "receiptAuth": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Tag     | 4003     |

```

### wc_notifyDelete

Used to inform the peer to close and delete a notify subscription through notify topic. The reason field should be a human-readable message defined by the SDK consumer to be shown on the peer's side.

**Request**

```jsonc
// wc_notifyDelete params
{
  "deleteAuth": string 
}
| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4004     |
```

**Response**

```jsonc
{
  "responseAuth": string
}
true
| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4005     |
```

### wc_notifyUpdate

Used to update a notify subscription with a new notify subscription, replacing an existing notify subscription through notify topic.

**Note:** this method is atomically performing two methods (wc_notifyDelete + wc_notifySubscribe)

**Request**

```jsonc
// wc_notifyUpdate params
{
  "updateAuth": string // new subscription
}

| IRN     |          |
| ------- | -------- | 
| TTL     | 86400    |
| Tag     | 4008     |

```

**Response**

```jsonc
// Success result
{
  "responseAuth": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4009     |
```
