# Engine

## Members

| Name   | Type                                                 | Description                                      |
| ------ | ---------------------------------------------------- | ------------------------------------------------ |
| events | [EventEmitter](https://github.com/browserify/events) | Event object using the Node.js event emitter API |

### `constructor`

#### Description

Consumes an instance of [`Client`](/javascript/authentication/reference/crypto) to instantiate a new
`Engine`.

#### Example

```ts
  constructor(client: IEngine["client"])
```

---

### `connect`

#### Description

TODO

#### Example

```ts
connect(
  params: EngineTypes.ConnectParams,
): Promise<{ uri?: string; approval: () => Promise<SessionTypes.Struct> }>
```

---

### `pair`

#### Description

TODO

#### Example

```ts
pair(params: EngineTypes.PairParams): Promise<PairingTypes.Struct>
```

---

### `approve`

#### Description

TODO

#### Example

```ts
approve(
  params: EngineTypes.ApproveParams,
): Promise<{ topic: string; acknowledged: () => Promise<SessionTypes.Struct> }>
```

---

### `reject`

#### Description

TODO

#### Example

```ts
reject(params: EngineTypes.RejectParams): Promise<void>
```

---

### `updateAccounts`

#### Description

TODO

#### Example

```ts
updateAccounts(params: EngineTypes.UpdateAccountsParams): Promise<void>
```

---

### `updateNamespaces`

#### Description

TODO

#### Example

```ts
updateNamespaces(params: EngineTypes.UpdateNamespacesParams): Promise<void>
```

---

### `updateExpiry`

#### Description

TODO

#### Example

```ts
updateExpiry(params: EngineTypes.UpdateExpiryParams): Promise<void>
```

---

### `request`

#### Description

TODO

#### Example

```ts
request(params: EngineTypes.RequestParams): Promise<JsonRpcResponse>
```

---

### `respond`

#### Description

TODO

#### Example

```ts
respond(params: EngineTypes.RespondParams): Promise<void>
```

---

### `emit`

#### Description

TODO

#### Example

```ts
emit(params: EngineTypes.EmitParams): Promise<void>
```

---

### `ping`

#### Description

TODO

#### Example

```ts
ping(params: EngineTypes.PingParams): Promise<void>
```

---

### `disconnect`

#### Description

TODO

#### Example

```ts
disconnect(params: EngineTypes.DisconnectParams): Promise<void>
```
