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
