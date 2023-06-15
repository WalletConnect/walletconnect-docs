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

## Payloads

### wc_syncSet

Used to set a new value to a new or existing key in the synced store for the published topic. This request does not have a response.

**Request**

```jsonc
// wc_syncSet params
{
  "key": string,
  "value": string 
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Prompt  | false    |
| Tag     | 5000     |

```


### wc_syncDel

Used to delete a key-value pair in the synced store for the published topic. This request does not have a response.

**Request**

```jsonc
// wc_syncDel params
{
  "key": string,
}

| IRN     |          |
| ------- | -------- |
| TTL     | 2592000  |
| Prompt  | false    |
| Tag     | 5002     |

```
