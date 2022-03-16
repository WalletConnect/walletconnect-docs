# Methods

## `client.approve()`

#### Description

TODO

#### Interfaces

[[ClientTypes.ApproveParams](/javascript/walletconnect/reference/interfaces#clienttypesapproveparams)]
[[SessionTypes.Settled](/javascript/walletconnect/reference/interfaces#sessiontypessettled)]

#### Example

```ts
approve(params: ClientTypes.ApproveParams): Promise<SessionTypes.Settled>
```

---

## `client.connect()`

#### Description

TODO

#### Interfaces

[[ClientTypes.ConnectParams](/javascript/walletconnect/reference/interfaces#clienttypesconnectparams)]
[[SessionTypes.Settled](/javascript/walletconnect/reference/interfaces#sessiontypessettled)]

#### Example

```ts
connect(params: ClientTypes.ConnectParams): Promise<SessionTypes.Settled>
```

---

## `client.disconect()`

#### Description

Disconects from websocket and stops listening to events

#### Interfaces

[[ClientTypes.DisconnectParams](/javascript/walletconnect/reference/interfaces#clienttypesdisconnectparams)]

#### Example

```ts
disconect(params: SequenceTypes.DeleteParams): Promise<void>
```

---

## `client.extend()`

#### Description

Allows to extend lifespan of a given topic by given time

#### Interfaces

[[ClientTypes.ExtendParams](/javascript/walletconnect/reference/interfaces#clienttypesextendparams)]

#### Example

```ts
extend(params: SequenceTypes.ExtendParams): Promise<void>
```

---

## `client.notify()`

#### Description

Sends notification to specified topic

#### Interfaces

[[ClientTypes.NotifyParams](/javascript/walletconnect/reference/interfaces#clienttypesnotifyparams)]

#### Example

```ts
notify(params: SequenceTypes.NotificationEvent): Promise<void>
```

---

## `client.init()`

#### Description

Initializes WalletConnect client

#### Interfaces

[[ClientOptions](/javascript/walletconnect/reference/interfaces#clientoptions)]
[[Client](/javascript/walletconnect/reference/interfaces#client)]

#### Example

```ts
init(options?: ClientOptions): Promise<Client>
```

---

## `client.on()`

#### Description

Creates a listener for given event, passes event data to given callback

---
