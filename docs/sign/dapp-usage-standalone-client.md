---
description: Quick Start For Dapps using Standalone Client
---

# Dapp Usage

This library is compatible with NodeJS, browsers and React-Native applications \(NodeJS modules require polyfills for React-Native\).

## Install

```bash npm2yarn
npm install --save @walletconnect/sign-client@rc @walletconnect/types@rc
```

## Create a Session

**1. Initiate your WalletConnect client with the relay server, using [your Project ID](../other/cloud.md#project-id).**

```javascript
import SignClient from "@walletconnect/sign-client";

const signClient = await SignClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  metadata: {
    name: "Example Dapp",
    description: "Example Dapp",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
});
```

**2. Add listeners for desired `SignClient` events.**

```javascript
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

**3. Connect the application and specify session permissions.**

```javascript
import QRCodeModal from "@walletconnect/qrcode-modal";

// ...

try {
  const { uri, approval } = await client.connect({
    // Optionally: pass a known prior pairing (e.g. from `client.pairing.values`) to skip the `uri` step.
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
    QRCodeModal.open(uri, () => {
      console.log("EVENT", "QR Code Modal closed");
    });
  }

  // Await session approval from the wallet.
  const session = await approval();
  // Handle the returned session (e.g. update UI to "connected" state).
  await onSessionConnected(session);
} catch (e) {
  console.error(e);
} finally {
  // Close the QRCode modal in case it was open.
  QRCodeModal.close();
}
```

## Making Requests

Once the session has been established successfully, you can start making JSON-RPC requests to be approved and signed by the wallet:

```javascript
const result = await client.request({
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

> For more information on available JSON-RPC requests, see the [JSON-RPC reference](../advanced/rpc-reference/ethereum-rpc.md).
