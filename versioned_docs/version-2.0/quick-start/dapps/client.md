---
description: Quick Start For Dapps using Standalone Client
---

# Standalone Client

This library is compatible with NodeJS, Browser and React-Native applications \(NodeJS modules required to be polyfilled for React-Native\)

## Install

```bash npm2yarn
npm install --save @walletconnect/client@experimental @walletconnect/types@experimental
```

## Create Session

1. Initiate your WalletConnect client with the relay server, using [your Project ID](../../api/project-id.md).

```javascript
import WalletConnectClient from "@walletconnect/client";

const client = await WalletConnectClient.init({
  projectId: "c4f79cc...",
  relayUrl: "wss://relay.walletconnect.com",
  metadata: {
    name: "Example Dapp",
    description: "Example Dapp",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
});
```

2. Subscribe to the pairing proposal event in order to share the pairing URI

```javascript
import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes } from "@walletconnect/types";

client.on(
  CLIENT_EVENTS.pairing.proposal,
  async (proposal: PairingTypes.Proposal) => {
    // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
    const { uri } = proposal.signal.params;
  }
);
```

3. Connect the application and specify session permissions

```javascript
const session = await client.connect({
  permissions: {
    blockchain: {
      chains: ["eip155:1"],
    },
    jsonrpc: {
      methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
    },
  },
});
```

## JSON-RPC Payloads

Once the session has been established successfully, you can start making JSON-RPC requests to be approved and signed by the wallet

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
