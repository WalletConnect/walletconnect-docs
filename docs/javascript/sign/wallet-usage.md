# Wallet Usage

Sign API establishes a session between a wallet and a dapp in order to expose a set of blockchain accounts that can sign transactions or messages using a secure remote JSON-RPC transport with methods and events. This library is compatible with NodeJS, browsers and React-Native applications (NodeJS modules require polyfills for React-Native).

## Install

```bash npm2yarn
npm install --save @walletconnect/sign-client@experimental @walletconnect/types@experimental
```


## Initializing the client
Initialize client as a controller using [your project id](http://localhost:3000/2.0/introduction/cloud#project-id).

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

**1. Include the event in pairing namespace.**

```js
client.on("session_event", ({ event }) => {
  // Handle session events, such as "chainChanged", "accountsChanged", etc.
});

client.on("session_update", ({ topic, params }) => {
  const { namespaces } = params;
  const _session = client.session.get(topic);
  // Overwrite the `namespaces` of the existing session with the incoming one.
  const updatedSession = { ..._session, namespaces };
  // Integrate the updated session state into your dapp state.
  onSessionUpdate(updatedSession);
});

client.on("session_delete", () => {
  // Session was deleted -> reset the dapp state, clean up from user session, etc.
});
```
**2. Call the `.emit` method and pass the necessary data for the particular event.**


## Pairing and session permissions

### URI
The pairing proposal between a wallet and a dapp is made using an [URI](https://github.com/WalletConnect/walletconnect-specs/blob/bc3c79dbe7542cdd59613d967acb2e4151c21b81/sign/pairing-uri.md). In WalletConnect v2.0 the session and pairing are decoupled from each other. This means that a URI is shared to construct a pairing proposal and only after settling the pairing then the dapp can propose a session using that pairing. In simpler words, the dapp generates an URI that can be used by the wallet for pairing.

### Namespaces

The `namespaces` parameter is used to specify the namespaces and chains that are intended to be used in the session. The following is an example,

```js
namespaces: {
    eip155: {
      accounts: ["eip155:1:0x0000000000..."],
      methods: ["presonal_sign", "eth_sendTransaction"],
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
// uri : string (e.g. wc:a281567bb3e4...)

signClient.pair({ uri })
```

### Pairing with QR Codes

To facilitate better user experience, it is possible to pair wallets with dapps by scanning QR codes. This can be implemented by using any QR code scanning library (example, [react-qr-reader](https://www.npmjs.com/package/react-qr-reader)). After scanning the QR code, pass the obtained `uri` into the `signClient.pair()` function. A useful reference for implementing QR codes for pairing is the [react wallet example](https://github.com/WalletConnect/web-examples/blob/main/wallets/react-wallet-v2/).