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

### wc_chatInvite

Used to invite a peer through topic I. Requires a success response with associated data

- Success response is equivalent to invite acceptance.
- Error response is equivalent to invite rejection.

**Request**

```jsonc
// wc_chatInvite params
{
  "inviteAuth": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Tag     | 2000     |

```

**Response**

```jsonc
// Success result
{
  "responseAuth": string
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Tag     | 2001     |
```

### wc_chatMessage

Used to send a message to its peer through topic T.

- Success response is equivalent to message delivery receipt.
- Error response is equivalent to message delivery failure.

**Request**

```jsonc
// wc_chatMessage params
{
  "messageAuth": string,
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Tag     | 2002     |
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
| Tag     | 2003     |
```

### wc_chatLeave

Used to signal to a peer that a chat thread is being left.

**Request**

```jsonc
// wc_chatLeave params
{
  // empty
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Tag     | 2004     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Tag     | 2005     |
```

### wc_chatPing

Used to evaluate if peer is currently online. Timeout at 30 seconds

**Request**

```jsonc
// wc_chatPing params
{
  // empty
}

| IRN     |          |
| ------- | -------- |
| TTL     | 30       |
| Tag     | 2006     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 30       |
| Tag     | 2007     |
```
