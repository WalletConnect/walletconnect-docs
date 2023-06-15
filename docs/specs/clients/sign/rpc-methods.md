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

### wc_sessionPropose

Used to propose a session through topic A. Requires a success response with associated data.

- Success response is equivalent to session approval.
- Error response is equivalent to session rejection.
- This method _might_ require a special timeout, because it needs end-user interaction to respond.
- Proposer must use the relay parameter selected and sent by the responder, if different than the proposed one.

**Request**

```jsonc
// wc_sessionPropose params
{
  "relays": [
    {
      "protocol": string,
      "data": string // Optional
    },
  ],
  "proposer": {
    "publicKey": string,
    "metadata": Metadata
  },
  "requiredNamespaces": {
    "<namespace_name>" : {
      "chains": [string],
      "methods": [string],
      "events": [string]
    }
  },
}

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1100     |
```

**Response**

```jsonc
// Success result
{
  "relay": {
    "protocol": string,
    "data": string // Optional
  },
  "responderPublicKey": string,
}

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1101     |
```

### wc_sessionSettle

Used to settle a session over topic B.

**Request**

```jsonc
// wc_sessionSettle params
{
  "relay": {
    "protocol": string,
    "data": string // Optional
  },
  "controller": {
    "publicKey": string,
    "metadata": Metadata
  },
  "namespaces": {
    "<namespace_name>" : {
      "accounts": [string],
      "methods": [string],
      "events": [string]
    }
  },
  "expiry": Int64, // seconds
}

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1102     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1103     |
```

### wc_sessionUpdate

Used to update the namespaces of a session.

**Request**

```jsonc
// wc_sessionUpdate params
{
  "namespaces": {
    "<namespace_name>" : {
      "accounts": [string],
      "methods": [string],
      "events": [string]
    }
  }
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 1104     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 1105     |
```

### wc_sessionExtend

Used to extend the lifetime of a session.

- The expiry is the absolute timestamp of the expiration date, in seconds.

**Request**

```jsonc
// wc_sessionExtend params
{
  "expiry": number
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 1106     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 1107     |
```

### wc_sessionRequest

Sends a CAIP-27 request to the peer client. The client should immediately reject the request and respond an error if the target session permissions doesn't include the requested method or chain ID.

##### Expiry
Param `Expiry` is an optional Unix timestamp. Sets the time until which the responder can respond to this request. If request is expired responder should respond with a specific error code.

If this parameter is not specified, the request is considered indefinite.

##### Expiry validation
`Expiry` should be between `.now() + MIN_INTERVAL` and `.now() + MAX_INTERVAL` where:
- `MIN_INTERVAL` is 300 (5 mins)
- `MAX_INTERVAL` is 604800 (7 days)

If expiry validation failed wallet should respond with `.sessionRequestExpired (code 8000)` error

##### TTL extension
When DApp is setting `expiry` params, client should insure that Relay Publish payload method `ttl` fit `expiry` value. Otherwise request `ttl` must be increased by the required value. Check [Relay Publish payload method](../../servers/relay/relay-server-rpc.md)

**Request**

```jsonc
// wc_sessionRequest params
{
  "request": {
    "method": string,
    "params": any,
    "expiry": number // optional
  },
  "chainId": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1108     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1109     |
```

### wc_sessionEvent

**Request**

```jsonc
// wc_sessionEvent params
{
  "event": {
    "name": string,
    "data": any
  },
  "chainId": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1110     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 300      |
| Tag     | 1111     |
```

### wc_sessionDelete

Used to inform the peer to close and delete a session. The reason field should be a human-readable message defined by the SDK consumer to be shown on the peer's side.

**Request**

```jsonc
// wc_sessionDelete params
{
  "code": Int64,
  "message": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 1112     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Tag     | 1113     |
```

### wc_sessionPing

Used to evaluate if peer is currently online. Timeout at 30 seconds

**Request**

```jsonc
// wc_sessionPing params
{
  // empty
}

| IRN     |          |
| ------- | -------- |
| TTL     | 30       |
| Tag     | 1114     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 30       |
| Tag     | 1115     |
```
