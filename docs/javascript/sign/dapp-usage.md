---
description: Quick Start For Dapps using Standalone Client
---

# Dapp Usage

This library is compatible with NodeJS, browsers and React-Native applications \(NodeJS modules require polyfills for React-Native\).

:::info
For an example implementation, please refer to our `react-dapp-v2` [example](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2).
:::

## Install Packages

Install the WalletConnect Sign and Web3Modal packages.

```bash npm2yarn
npm install @wwalletconnect/sign-client
npm install @web3modal/standalone
```

## Create a Session

**1. Initiate your WalletConnect client with the relay server, using [your Project ID](../../cloud/relay.md).**

```javascript
import SignClient from "@walletconnect/sign-client";

const signClient = await SignClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  // optional parameters
  relayUrl: "<YOUR RELAY URL>",
  metadata: {
    name: "Example Dapp",
    description: "Example Dapp",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
});
```

**2. Add listeners for desired `SignClient` events.**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners](../core/pairing-api.md).
:::

```javascript
signClient.on("session_event", ({ event }) => {
  // Handle session events, such as "chainChanged", "accountsChanged", etc.
});

signClient.on("session_update", ({ topic, params }) => {
  const { namespaces } = params;
  const _session = signClient.session.get(topic);
  // Overwrite the `namespaces` of the existing session with the incoming one.
  const updatedSession = { ..._session, namespaces };
  // Integrate the updated session state into your dapp state.
  onSessionUpdate(updatedSession);
});

signClient.on("session_delete", () => {
  // Session was deleted -> reset the dapp state, clean up from user session, etc.
});
```

**3. Create a new Web3Modal instance.**

```javascript
import Web3Modal from "@web3modal/standalone";

const web3Modal = new Web3Modal({
  projectId: "<YOUR_PROJECT_ID>",
  // `standaloneChains` can also be specified when calling `web3Modal.openModal(...)` later on.
  standaloneChains: ["eip155:1"],
});
```

**4. Connect the application and specify session permissions.**

```javascript
try {
  const { uri, approval } = await signClient.connect({
    // Optionally: pass a known prior pairing (e.g. from `signClient.core.pairing.getPairings()`) to skip the `uri` step.
    pairingTopic: pairing?.topic,
    // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
    requiredNamespaces: {
      eip155: {
        methods: [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData",
        ],
        chains: ["eip155:1"],
        events: ["chainChanged", "accountsChanged"],
      },
    },
  });

  // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
  if (uri) {
    web3Modal.openModal({ uri });
    // Await session approval from the wallet.
    const session = await approval();
    // Handle the returned session (e.g. update UI to "connected" state).
    // * You will need to create this function *
    onSessionConnect(session);
    // Close the QRCode modal in case it was open.
    web3Modal.closeModal();
  }
} catch (e) {
  console.error(e);
}
```

## Making Requests

Once the session has been established successfully, you can start making JSON-RPC requests to be approved and signed by the wallet:

```javascript
const result = await signClient.request({
  topic: session.topic,
  chainId: "eip155:1",
  request: {
    id: 1,
    jsonrpc: "2.0",
    method: "personal_sign",
    params: [
      "0x1d85568eEAbad713fBB5293B45ea066e552A90De",
      "0x7468697320697320612074657374206d65737361676520746f206265207369676e6564",
    ],
  },
});
```

> For more information on available JSON-RPC requests, see the [JSON-RPC reference](../../advanced/rpc-reference/ethereum-rpc.md).
