# Session Management

Managing session with WalletConnect v2.0 protocol has improved dramatically. The client will maintain a state of the sessions up-to-date and cached in the key-value storage. Therefore you can rely on the client to track its state on your application and simply use events to update it.

Regardless if you are integrating WalletConnect to an app or a wallet you will be able to follow the instructions below to improve your WalletConnect user experience.

## Initialization

Any state query should be made only after successful initizialiation of the client.

```typescript
import { Client } from "@walletconnect/client";

const client = await Client.init({ ...clientOpts });
```

## State Queries

WalletConnect tracks essentially two sequences (pairing and session) which you can query from your client using the following methods: values, topics and entries.

```typescript
/* ----------- pairing ----------- */

// get all active pairings
const pairings = client.pairing.values;

// get all active pairing topics
const topics = client.pairing.topics;

/* ----------- session ----------- */

// get all active sessions
const sessions = client.session.values;

// get all active session topics
const topics = client.session.topics;
```

## Event Listeners

If you are tracking any of the state variables above in your application, you should also register event listeners for changes made.

```typescript
import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes, SessioTypes } from "@walletconnect/types";

/* ----------- pairing ----------- */

client.on(CLIENT_EVENTS.pairing.created, (pairing: PairingTypes.Settled) => {});
client.on(CLIENT_EVENTS.pairing.updated, (pairing: PairingTypes.Settled) => {});
client.on(CLIENT_EVENTS.pairing.deleted, (pairing: PairingTypes.Settled) => {});

/* ----------- session ----------- */

client.on(CLIENT_EVENTS.session.created, (session: SessionTypes.Settled) => {});
client.on(CLIENT_EVENTS.session.updated, (session: SessionTypes.Settled) => {});
client.on(CLIENT_EVENTS.session.deleted, (session: SessionTypes.Settled) => {});
```

## Pending Requests

When your app reloads you might want to restore some JSON-RPC history of pending requests that still haven't been responded.

```typescript
// get pending request events (topic, request)
// (session proposals would be included here)
const requests = client.pairing.history.pending;

// get pending request events (topic, request, chainId)
const requests = client.session.history.pending;
```
