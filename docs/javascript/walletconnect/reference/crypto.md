# Crypto

## Members

| Name     | Type                                                 | Description |
| -------- | ---------------------------------------------------- | ----------- |
| client   | [Client](/javascript/walletconnect/reference/client) | TODO        |
| context  | `string`                                             | TODO        |
| keychain | `-`                                                  | TODO        |
| logger   | [Logger](https://github.com/pinojs/pino)             | Pino logger |
| name     | `string`                                             | TODO        |

## Mehods

### `init`

#### Description

TODO

#### Example

```ts
init(): Promise<void>
```

---

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

### `decrypt`

#### Description

TODO

#### Example

```ts
decrypt(topic: string, encrypted: string): Promise<string>
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

### `encrypt`

#### Description

TODO

#### Example

```ts
encrypt(topic: string, message: string): Promise<string>
```

---

### `generateKeyPair`

#### Description

TODO

#### Example

```ts
generateKeyPair(): Promise<string>
```

---

### `generateSharedKey`

#### Description

TODO

#### Interfaces

[[CryptoTypes.Participant](/javascript/walletconnect/reference/interfaces#cryptotypesparticipant)]

#### Example

```ts
generateSharedKey(self: CryptoTypes.Participant, peer: CryptoTypes.Participant, overrideTopic?: string): Promise<string>
```

---

### `hasKeys`

#### Description

TODO

#### Example

```ts
hasKeys(tag: string): Promise<boolean>
```

---
