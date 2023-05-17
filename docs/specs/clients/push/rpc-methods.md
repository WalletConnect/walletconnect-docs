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

### wc_pushMessage

Used to publish a notification message to a peer through push topic. Response is expected on the same topic.

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
  "type": string
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

Used to inform the peer to close and delete a push subscription through push topic. The reason field should be a human-readable message defined by the SDK consumer to be shown on the peer's side.

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
```

### wc_pushSubscribe

Used to subscribe push subscription to a peer through subscribe topic. Response is expected on the response topic

**Request**

```jsonc
// wc_pushSubscribe params
{
  "subscriptionAuth": string
}

| IRN     |          |
| ------- | -------- | 
| TTL     | 86400    |
| Tag     | 4006     |

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
| Tag     | 4007     |
```


### wc_pushUpdate

Used to update a push subscription with a new push subscription, replacing an existing push subscription through push topic.

**Note:** this method is atomically performing two methods (wc_pushDelete + wc_pushSubscribe)

**Request**

```jsonc
// wc_pushUpdate params
{
  "subscriptionAuth": string // new subscription
}

| IRN     |          |
| ------- | -------- | 
| TTL     | 86400    |
| Tag     | 4008     |

```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 4009     |
```

### wc_pushPropose

Used to request push subscription to a peer through pairing topic. Response is expected on the response topic.

- Success response is equivalent to push subscription acceptance.
- Error response is equivalent to push subscription rejection.

**Request**

```jsonc
// wc_pushPropose params
{
  "publicKey": string,
  "metadata": Metadata,
  "account": string,
  "scope": string
}

| IRN     |          |
| ------- | -------- | 
| TTL     | 86400    |
| Tag     | 4010     |

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
| Tag     | 4011     |
```