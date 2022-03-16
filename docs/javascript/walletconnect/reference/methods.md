# Methods

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

## `client.approve()`

#### Description

Approves proposal (i.e pairing / signing / send ...)

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

## `client.off()`

#### Description

Removes event subscription. Same as [removeListener](/javascript/walletconnect/reference/methods#clientremovelistener)

#### Example

```ts
off(event: string, listener: Function): void
```

---

## `client.on()`

#### Description

Creates event subscription

#### Example

```ts
on(event: string, listener: Function): void
```

---

## `client.once()`

#### Description

Creates event subscription that only triggers once

#### Example

```ts
once(event: string, listener: Function): void
```

---

## `client.pair()`

#### Description

Creates / starts pairing request for a given uri

#### Interfaces

[[ClientTypes.PairParams](/javascript/walletconnect/reference/interfaces#clienttypespairparams)]
[[PairingTypes.Settled](/javascript/walletconnect/reference/interfaces#pairingtypessettled)]

#### Example

```ts
pair(params: ClientTypes.PairParams): Promise<PairingTypes.Settled>
```

---

## `client.ping()`

#### Description

Pings given topic, usefull to check if connection is still valid

#### Interfaces

[[ClientTypes.PingParams](/javascript/walletconnect/reference/interfaces#clienttypespingparams)]

#### Example

```ts
ping(params: ClientTypes.PingParams): Promise<void>
```

---

## `client.reject()`

#### Description

Rejects proposal (i.e pairing / signing / send ...)

#### Interfaces

[[ClientTypes.RejectParams](/javascript/walletconnect/reference/interfaces#clienttypesrejectparams)]

#### Example

```ts
reject(params: ClientTypes.RejectParams): Promise<void>
```

---

## `client.removeListener()`

#### Description

Removes event subscription. Same as [off](/javascript/walletconnect/reference/methods#clientoff)

#### Example

```ts
removeListener(event: string, listener: Function): void
```

---

## `client.request()`

#### Description

Requests for method permissions on specified chains

#### Interfaces

[[ClientTypes.RequestParams](/javascript/walletconnect/reference/interfaces#clienttypesrequestparams)]

#### Example

```ts
request(params: ClientTypes.RequestParams): Promise<any>
```

---

## `client.respond()`

#### Description

Responds to [request](/javascript/walletconnect/reference/methods#clientrequest)

#### Interfaces

[[ClientTypes.RespondParams](/javascript/walletconnect/reference/interfaces#clienttypesrespondparams)]

#### Example

```ts
respond(params: ClientTypes.RespondParams): Promise<void>
```

---

## `client.update()`

#### Description

Updates session to i.e. include / exclude accounts

#### Interfaces

[[ClientTypes.UpdateParams](/javascript/walletconnect/reference/interfaces#clienttypesupdateparams)]

#### Example

```ts
update(params: ClientTypes.UpdateParams): Promise<void>
```

---

## `client.upgrade()`

#### Description

Upgrades pairing i.e. extending it

#### Interfaces

[[ClientTypes.UpgradeParams](/javascript/walletconnect/reference/interfaces#clienttypesupgradeparams)]

#### Example

```ts
upgrade(params: ClientTypes.UpgradeParams): Promise<void>
```

---
