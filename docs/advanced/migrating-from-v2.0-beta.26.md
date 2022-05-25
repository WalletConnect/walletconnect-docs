# Migrating from v2.0-beta.26

As much as we wanted to avoid this, we had to make some breaking changes between beta-26 and beta-100 (hence the big version jump). We hope this migration guide helps to ease transition to our next version. We are feeling confident that there shouldn't be any other major changes after beta-100 and our main focus will now shift to extensive testing and stability improvements.

All our changes were documented in detail in our new team repo available at [https://github.com/WalletConnect/walletconnect-specs](https://github.com/WalletConnect/walletconnect-specs). We will be bringing some of these contents to docs soon as well.

We have also updated our [web-examples](https://github.com/WalletConnect/web-examples) repo to reflect these changes

## Biggest changes introduced in beta-100 include:

- Changing the client name from WalletConnectClient to SignClient, hence `@walletconnect/client` npm package is now deprecated in favor of `@walletconnect/sign-client`
- Changes to the [pairing uri](https://github.com/WalletConnect/walletconnect-specs/blob/main/sign/pairing-uri.md)
- Removal of permissions in favor of [namespaces](https://github.com/WalletConnect/walletconnect-specs/blob/main/sign/session-proposal.md#session-proposal)
- Changes to [rpc methods](https://github.com/WalletConnect/walletconnect-specs/blob/main/sign/rpc-methods.md) to account for the above
- Removal of `controller` option when initializing the client
- Addition of `approval` promise to connect method (more on this below)
- Addition of `acknowledged` promises to approve, update and extend methods (more on this below)
- We made disconnect method optimistic (i.e. it doesn't wait for acknowledgement from the peer)
- Update methods now override previous data instead of merging 2 together
- React native apps now need to additionally instal `@react-native-async-storage/async-storage`
- Node JS apps now need to additionally install `better-sqlite3`

## Initializing the client

```ts
import SignClient from "@walletconnect/sign-client";

const signClient = await SignClient.init({
  projectId: "<YOUR_CLOUD_PROJECT_ID>",
  relayUrl: "wss://relay.walletconnect.com",
  metadata: {
    name: "<YOUR_APP_NAME>",
    description: "<YOUR_APP_DESCRIPTION>",
    url: "<YOUR_APP_URI>",
    icons: ["<YOUR_APP_ICON_1>"],
  },
});
```

## Propose connection (dapp)

```ts
const { uri, approval } = await signClient.connect({
  requiredNamespaces: {
    eip155: {
      chains: ["eip155:1"],
      methods: ["presonal_sign", "eth_sendTransaction"],
      extension: [
        {
          chains: ["eip:137"],
          methods: ["eth_sign"],
          events: [],
        },
      ],
    },
  },
  pairingTopic: "<EXISTING_PAIRING_TOPIC>", // Optional
  relays: [{ relay: "waku" }], // Optional
});

// uri will be returned, unless you used existing pairingTopic
if (uri) {
  // Do something with uri, for example show it as qr code
}

// You can optionally wait for pairing to be complete by the peer and get session
const session = await approval();
```

## Pair using uri / qr code (wallet)

```ts
// Subscribe to session_proposal event(s)
signClient.on("session_proposal", (event) => {
  // Show session proposal data to the user i.e. in a modal with options to approve / reject it
});

// Consume wc:... uri / qr code, this will trigger session_proposal event we set up above
await signClient.pair({ uri: "<PROPOSAL_URI>" });

// Approve session proposal, use id from session proposal event and respond with namespace(s) that satisfy dapps request and contain approved accounts
const { topic, acknowledged } = await signClient.approve({
  id: 123,
  namespaces: {
    eip155: {
      accounts: ["eip155:1:0x0000000000..."],
      methods: ["presonal_sign", "eth_sendTransaction"],
      events: ["accountsChanged"],
      extension: [
        {
          chains: ["eip:137"],
          methods: ["eth_sign"],
          events: [],
        },
      ],
    },
  },
  relayProtocol: "waku",
});

// Optionally await acknowledgement from dapp
const session = await acknowledged();

// Reject session proposal
await signClient.reject({
  id: 123,
  reason: {
    code: 1,
    message: "rejected",
  },
});
```

## Update session (wallet)

```ts
// As a wallet you can update session namespace, provided namespaces will override existing ones
const { acknowledged } = await signClient.update({
  topic: "<SESSION_TOPIC>",
  namespaces: {
    /* updated namespaces */
  },
});

// Optionally await acknowledgement from dapp
await acknowledged();
```

## Update session (dapp)

```ts
signClient.on("session_update", (event) => {
  // React to session update
});
```

## Extend session expiry by 7 days (wallet)

```ts
// Extend session expiry
const { acknowledged } = await signClient.extend({ topic: "<SESSION_TOPIC>" });

// Optionally await acknowledgement from dapp
await acknowledged();
```

## Extend session expiry by 7 days (dapp)

```ts
signClient.on("session_extend", (event) => {
  // React to session extend event
});
```

## Send session request (dapp)

```ts
await signClient.request({
  topic: "<SESSION_TOPIC>",
  chainId: "<REQUEST_CHAIN>", // Must be allowed within session namespaces
  request: {
    method: "<REQUEST_METHOD>", // Must be allowed within session namespaces
    params: "...",
  },
});
```

## Respond to session request (dapp)

```ts
signClient.on("session_request", (event) => {
  // React to session request event
});

// Respond to session request
await signClient.respond({
  topic: "<SESSION_TOPIC>",
  response: {
    /* json rpc response*/
  },
});
```

## Ping session or pairing (dapp / wallet)

```ts
signClient.on("session_ping", (event) => {
  // React to session ping request
});

signClient.on("pairing_ping", (event) => {
  // React to pairing ping request
});

// Send session or pairing ping request, if peer is live, this will resolve
await signClient.ping({ topic: "<SESSION_OR_PAIRING_TOPIC>" });
```

## Emit session event (dapp / wallet)

```ts
signClient.on("session_event", (event) => {
  // React to session event
});

await signClient.emit({
  topic: "<SESSION_TOPIC>",
  chainId: "<EVENT_CHAIN_ID", // Must be within session namespaces
  event: {
    name: "<EVENT_NAME>", // Must be within session namespaces
    data: "...",
  },
});
```

## Disconnect from session or pairing (dapp / wallet)

```ts
signClient.on("session_delete", (event) => {
  // React to session delete event
});

signClient.on("pairing_delete", (event) => {
  // React to pairing delete event
});

// Disconnect from session or pairing
await signClient.disconnect({
  topic: "<SESSION_OR_PAIRING_TOPIC>",
  reason: { code: 1, message: "" },
});
```
