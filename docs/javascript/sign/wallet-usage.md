# Wallet Usage

Sign API establishes a session between a wallet and a dapp in order to expose a set of blockchain accounts that can sign transactions or messages using a secure remote JSON-RPC transport with methods and events. This library is compatible with NodeJS, browsers and React-Native applications (NodeJS modules require polyfills for React-Native).

## Install

```bash npm2yarn
npm install --save @walletconnect/sign-client@rc @walletconnect/types@rc
```

## Initializing the client

Initialize client as a controller using [your project id](/2.0/introduction/cloud#project-id).

```js
const signClient = await SignClient.init({
  projectId: "<YOUR PROJECT ID>",
  // optional parameters
  relayUrl: "<YOUR RELAY URL>",
  metadata: {
    name: "Wallet name",
    description: "A short description for your wallet",
    url: "<YOUR WALLET'S URL>",
    icons: ["<URL TO WALLET'S LOGO/ICON>"],
  },
 }
});
```

## Setting up event listeners

WalletConnect v2.0 allows any method or event to be emited. The following requirements should be satisfied in order to have a particular event :

**1. Add listeners for desired `SignClient` events.**

```js
// Subscribe to session_proposal event(s)
client.on("session_proposal", (event) => {
  // Show session proposal data to the user i.e. in a modal with options to approve / reject it
});

client.on("session_event", ({ event }) => {
  // Handle session events, such as "chainChanged", "accountsChanged", etc.
});

client.on("session_update", ({ topic, params }) => {
  // React to session update
});

client.on("session_delete", (event) => {
  // React to session delete event
});

client.on("pairing_delete", (event) => {
  // React to pairing delete event
});
```

**2. Call the `.emit` method and pass the necessary data for the particular event.**

## Pairing and session permissions

### URI

The pairing proposal between a wallet and a dapp is made using an [URI](https://github.com/WalletConnect/walletconnect-specs/blob/bc3c79dbe7542cdd59613d967acb2e4151c21b81/sign/pairing-uri.md). In WalletConnect v2.0 the session and pairing are decoupled from each other. This means that a URI is shared to construct a pairing proposal and only after settling the pairing then the dapp can propose a session using that pairing. In simpler words, the dapp generates an URI that can be used by the wallet for pairing.

### Namespaces

The `namespaces` parameter is used to specify the list of chains, methods and events that are intended to be used in the session. In other words, namespaces are the minimal requirement for a wallet to establish a session with a dapp. The following is an example,

```js
namespaces: {
    eip155: {
      accounts: ["eip155:1:0x0000000000..."],
      methods: ["personal_sign", "eth_sendTransaction"],
      events: ["accountsChanged"],
      extension: [
        {
          accounts: ["eip:137"],
          methods: ["eth_sign"],
          events: [],
        },
      ],
    },
  },
```

If you are looking for a more in-depth explanation about namespaces, checkout the [glossary](http://localhost:3000/2.0/introduction/glossary#namespaces).

### Extension

The `extension` parameter is used to specify methods that are not shared by all the accounts/chains of the namespace. For example, chain A may have a special method that is not shared by chain B - in this case, we would create an extension that would only include chain B. Here's an example,

```js
extension: [
        {
          accounts: ["eip:137"],
          methods: ["eth_sign"],
          events: [],
        },
      ],
```

### Pairing with `uri`

To create a pairing proposal, simply pass the `uri` received from the dapp into the `signClient.pair()` function.

```js
// This will trigger the `session_proposal` event
await signClient.pair({ uri });

// Approve session proposal, use id from session proposal event and respond with namespace(s) that satisfy dapps request and contain approved accounts
const { topic, acknowledged } = await signClient.approve({
  id: 123,
  namespaces: {
    eip155: {
      accounts: ["eip155:1:0x0000000000..."],
      methods: ["personal_sign", "eth_sendTransaction"],
      events: ["accountsChanged"],
      extension: [
        {
          accounts: ["eip:137"],
          methods: ["eth_sign"],
          events: [],
        },
      ],
    },
  },
});

// Optionally await acknowledgement from dapp
const session = await acknowledged();

// Or: reject session proposal
await signClient.reject({
  id: 123,
  reason: {
    code: 1,
    message: "rejected",
  },
});
```

### Pairing with QR Codes

To facilitate better user experience, it is possible to pair wallets with dapps by scanning QR codes. This can be implemented by using any QR code scanning library (example, [react-qr-reader](https://www.npmjs.com/package/react-qr-reader)). After scanning the QR code, pass the obtained `uri` into the `signClient.pair()` function. A useful reference for implementing QR codes for pairing is the [react wallet example](https://github.com/WalletConnect/web-examples/blob/main/wallets/react-wallet-v2/).
