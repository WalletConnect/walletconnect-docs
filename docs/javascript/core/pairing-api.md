# Pairing API

## Useful Links

- [Pairing API Spec](../../specs/core/pairing/README.md)
- [Implementation](https://github.com/WalletConnect/walletconnect-monorepo/blob/v2.0/packages/core/src/controllers/pairing.ts)
- [Types](https://github.com/WalletConnect/walletconnect-monorepo/blob/v2.0/packages/types/src/core/pairing.ts)

### Description

The Pairing API is a lightweight API for establishing an encrypted, protocol-agnostic communication layer between peers. Its purpose is to provide a secure channel for proposing protocols or sending requests between dapp and wallet.

### Context

WalletConnect currently offers Sign and Auth SDKs. To allow a reusable communication channel between peers, the Pairing API exposes a standard interface and allows for sending and receiving multi-protocol requests over a single pairing.

Each SDK uses the same implementation of `core/pairing` (via `@walletconnect/core`) to manage pairings. To run multiple SDKs side-by-side (e.g. Sign and Auth), please refer to the [Sharing a Core instance](../guides/shared-core.md) guide.

## Using the Pairing API

The methods listed below are limited to only the public methods of the Pairing API that we recommend you interact with directly.
For an exhaustive list, please refer to the spec and/or implementation linked under [Useful Links](#useful-links) above.

The keyword `sdkClient` is used here as a placeholder for any WalletConnect SDK that implements the Pairing API (e.g. `signClient`, `authClient`, ...).

```ts
 // Creates a new (inactive) pairing. Returns the URI for a peer to consume via `pair`, as well as the pairing topic.
const {topic, uri} = await sdkClient.core.pairing.create()

// Pair with a peer's proposed pairing, extracted from the provided `uri` parameter.
await sdkClient.core.pairing.pair({ uri: "wc:1b3eda3f4..." })

// Activate a previously created pairing (e.g. after the peer has paired), by providing the pairing topic.
await sdkClient.core.pairing.activate({ topic: "1b3eda3f4..." })

// Updates the expiry of an existing pairing, by providing the pairing topic and an `expiry` in seconds (e.g. `60` for one minute from now)
await sdkClient.core.pairing.updateExpiry({ topic: "1b3eda3f4...", expiry: 60 })

// Updates the expiry of an existing pairing, by providing the pairing topic and the desired metadata.
await sdkClient.core.pairing.updateMetadata({ topic: "1b3eda3f4...", metadata: { name: "MyDapp", ... } })

// Returns an array of all existing pairings.
const pairings = sdkClient.core.pairing.getPairings()

// Pings a pairing's peer, by providing the pairing topic.
await sdkClient.core.pairing.ping({ topic: "1b3eda3f4..." })

// Disconnects/Removes a pairing, by providing the pairing topic.
await sdkClient.core.pairing.disconnect({ topic: "1b3eda3f4..." })
```

## Listeners for pairing-related events

The Pairing API currently emits the following events:

- `pairing_ping`
- `pairing_delete`
- `pairing_expire`

Any of these events can be listened for via the standard Node [`EventEmitter` interface](https://nodejs.org/api/events.html#class-eventemitter):

```ts
sdkClient.pairing.events.on("pairing_delete", ({ id, topic }) => {
  // clean up after the pairing for `topic` was deleted.
});
```
