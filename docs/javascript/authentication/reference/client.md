# Client

## Members

| Name       | Type                                                                       | Description          |
| ---------- | -------------------------------------------------------------------------- | -------------------- |
| context    | `string`                                                                   | TODO                 |
| controller | `boolean`                                                                  | TODO                 |
| crypto     | [Crypto](/javascript/authentication/reference/crypto)                      | TODO                 |
| encoder    | [Encoder](/javascript/authentication/reference/encoder)                    | TODO                 |
| events     | [EventEmitter](https://github.com/browserify/events)                       | Node's event emitter |
| heartbeat  | [Heartbeat](/javascript/authentication/reference/heartbeat)                | TODO                 |
| logger     | [Logger](https://github.com/pinojs/pino)                                   | Pino logger          |
| metadata   | [AppMetadata](/javascript/authentication/reference/interfaces#appmetadata) | TODO                 |
| name       | `string`                                                                   | TODO                 |
| pairing    | `-`                                                                        | TODO                 |
| projectId  | `string`                                                                   | TODO                 |
| protocol   | `string`                                                                   | TODO                 |
| relayUrl   | `string`                                                                   | TODO                 |
| relayer    | `-`                                                                        | TODO                 |
| session    | `-`                                                                        | TODO                 |
| storage    | `-`                                                                        | TODO                 |
| version    | `number`                                                                   | TODO                 |

## Methods

### `init`

#### Description

Initializes WalletConnect client

#### Interfaces

[[ClientOptions](/javascript/authentication/reference/interfaces#clientoptions)]

#### Example

```ts
init(options?: ClientOptions): Promise<Client>
```

---

### `approve`

#### Description

Approves proposal (i.e pairing / signing / send ...)

#### Interfaces

[[ClientTypes.ApproveParams](/javascript/authentication/reference/interfaces#clienttypesapproveparams)]
[[SessionTypes.Settled](/javascript/authentication/reference/interfaces#sessiontypessettled)]

#### Example

```ts
approve(params: ClientTypes.ApproveParams): Promise<SessionTypes.Settled>
```

---

### `connect`

#### Description

TODO

#### Interfaces

[[ClientTypes.ConnectParams](/javascript/authentication/reference/interfaces#clienttypesconnectparams)]
[[SessionTypes.Settled](/javascript/authentication/reference/interfaces#sessiontypessettled)]

#### Example

```ts
connect(params: ClientTypes.ConnectParams): Promise<SessionTypes.Settled>
```

---

### `disconect`

#### Description

Disconects from websocket and stops listening to events

#### Interfaces

[[ClientTypes.DisconnectParams](/javascript/authentication/reference/interfaces#clienttypesdisconnectparams)]

#### Example

```ts
disconect(params: SequenceTypes.DeleteParams): Promise<void>
```

---

### `extend`

#### Description

Allows to extend lifespan of a given topic by given time

#### Interfaces

[[ClientTypes.ExtendParams](/javascript/authentication/reference/interfaces#clienttypesextendparams)]

#### Example

```ts
extend(params: SequenceTypes.ExtendParams): Promise<void>
```

---

### `notify`

#### Description

Sends notification to specified topic

#### Interfaces

[[ClientTypes.NotifyParams](/javascript/authentication/reference/interfaces#clienttypesnotifyparams)]

#### Example

```ts
notify(params: SequenceTypes.NotificationEvent): Promise<void>
```

---

### `off`

#### Description

Removes event subscription. Same as [removeListener](/javascript/authentication/reference/client#removelistener)

#### Example

```ts
off(event: string, listener: Function): void
```

---

### `on`

#### Description

Creates event subscription

#### Example

```ts
on(event: string, listener: Function): void
```

---

### `once`

#### Description

Creates event subscription that only triggers once

#### Example

```ts
once(event: string, listener: Function): void
```

---

### `pair`

#### Description

Creates / starts pairing request for a given uri

#### Interfaces

[[ClientTypes.PairParams](/javascript/authentication/reference/interfaces#clienttypespairparams)]
[[PairingTypes.Settled](/javascript/authentication/reference/interfaces#pairingtypessettled)]

#### Example

```ts
pair(params: ClientTypes.PairParams): Promise<PairingTypes.Settled>
```

---

### `ping`

#### Description

Pings given topic, usefull to check if connection is still valid

#### Interfaces

[[ClientTypes.PingParams](/javascript/authentication/reference/interfaces#clienttypespingparams)]

#### Example

```ts
ping(params: ClientTypes.PingParams): Promise<void>
```

---

### `reject`

#### Description

Rejects proposal (i.e pairing / signing / send ...)

#### Interfaces

[[ClientTypes.RejectParams](/javascript/authentication/reference/interfaces#clienttypesrejectparams)]

#### Example

```ts
reject(params: ClientTypes.RejectParams): Promise<void>
```

---

### `removeListener`

#### Description

Removes event subscription. Same as [off](/javascript/authentication/reference/client#off)

#### Example

```ts
removeListener(event: string, listener: Function): void
```

---

### `request`

#### Description

Requests for method permissions on specified chains

#### Interfaces

[[ClientTypes.RequestParams](/javascript/authentication/reference/interfaces#clienttypesrequestparams)]

#### Example

```ts
request(params: ClientTypes.RequestParams): Promise<any>
```

---

### `respond`

#### Description

Responds to [request](/javascript/authentication/reference/client#request)

#### Interfaces

[[ClientTypes.RespondParams](/javascript/authentication/reference/interfaces#clienttypesrespondparams)]

#### Example

```ts
respond(params: ClientTypes.RespondParams): Promise<void>
```

---

### `update`

#### Description

Updates session to i.e. include / exclude accounts

#### Interfaces

[[ClientTypes.UpdateParams](/javascript/authentication/reference/interfaces#clienttypesupdateparams)]

#### Example

```ts
update(params: ClientTypes.UpdateParams): Promise<void>
```

---

### `upgrade`

#### Description

Upgrades pairing i.e. extending it

#### Interfaces

[[ClientTypes.UpgradeParams](/javascript/authentication/reference/interfaces#clienttypesupgradeparams)]

#### Example

```ts
upgrade(params: ClientTypes.UpgradeParams): Promise<void>
```

---
