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

### wc_pairingExtend

Used to update the lifetiem of a pairing.

**Request**

```jsonc
// wc_pairingUpdateExpiry params
{
  "expiry": number
}

| IRN     |          |
| ------- | -------- |
| Prompt  | false    |
| Tag     | 1004     |
```

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| Prompt  | false    |
| Tag     | 1005     |
```

### unsupported methods response

Used to respond for requests that are not registered

**Response**

```jsonc
// Success result
true

| IRN     |          |
| ------- | -------- |
| TTL     | 86400    |
| Prompt  | false    |
| Tag     | 0        |
```
