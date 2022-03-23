# Encoder

## Members

| Name    | Type                                                 | Description |
| ------- | ---------------------------------------------------- | ----------- |
| client  | [Client](/javascript/walletconnect/reference/client) | TODO        |
| context | `string`                                             | TODO        |
| logger  | [Logger](https://github.com/pinojs/pino)             | Pino logger |
| name    | `string`                                             | TODO        |

## Mehods

### `decode`

#### Description

TODO

#### Interfaces

[[JsonRpcPayload](/javascript/walletconnect/reference/interfaces#jsonrpcpayload)]

#### Example

```ts
decode(topic: string, encrypted: string): Promise<JsonRpcPayload>
```

---

### `encode`

#### Description

TODO

#### Interfaces

[[JsonRpcPayload](/javascript/walletconnect/reference/interfaces#jsonrpcpayload)]

#### Example

```ts
encode(topic: string, payload: JsonRpcPayload): Promise<string>
```

---
