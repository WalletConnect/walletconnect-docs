---
description: Quick Start For Dapps using Cosmos Provider
---

# Cosmos Provider

## Quick Start For Dapps \(Cosmos Provider\)

:::info
You can use the **Test Wallet** to test your integration at [https://react-wallet.walletconnect.com/](https://react-wallet.walletconnect.com/) \([Source code](https://github.com/WalletConnect/walletconnect-monorepo/tree/canary/examples/react-wallet)\). Keep in mind that this is **not a secure wallet - Do not store funds**.
:::

### Install

```bash npm2yarn
npm install --save @walletconnect/client@experimental @walletconnect/cosmos-provider@experimental @walletconnect/types@experimental
```

:::info
Syntax shown below is Javascript ES6 which requires bundling and transpiling to run in web browsers. If unfamiliar we recommend setting up an environment using [Webpack Starter](https://github.com/wbkd/webpack-starter) or [Create React App](https://github.com/facebook/create-react-app)
:::

## Setup

First, instantiate your WalletConnect CosmosProvider

```javascript
import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/client";
import CosmosProvider from "@walletconnect/cosmos-provider";
import { PairingTypes, SessionTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";

// 1. Create a WalletConnect Client
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

// 2. Subscribe to client events

client.on(
  CLIENT_EVENTS.pairing.proposal,
  async (proposal: PairingTypes.Proposal) => {
    // Display the QRCode modal on a new pairing request.
    const { uri } = proposal.signal.params;
    console.log("EVENT", "QR Code Modal opened");
    QRCodeModal.open(uri, () => {
      console.log("EVENT", "QR Code Modal closed");
    });
  }
);

client.on(
  CLIENT_EVENTS.session.deleted,
  (deletedSession: SessionTypes.Settled) => {
    // Perform some cleanup after session was deleted (e.g. via `provider.disconnect()`)
  }
);

// 3. Create CosmosProvider by passing in the `client` instance.
const provider = new CosmosProvider({
  chains: ["cosmoshub-4"],
  client,
});

// 4. Enable session (triggers `CLIENT_EVENTS.pairing.proposal` event).
await provider.connect();
```

## Events \(EIP-1193\)

After setting up your provider you should listen to EIP-1193 events to detect accounts and chain change and also disconnection.

```typescript
// Subscribe to accounts change
provider.on("accountsChanged", (accounts: string[]) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId: number) => {
  console.log(chainId);
});

// Subscribe to session disconnection
provider.on("disconnect", (code: number, reason: string) => {
  console.log(code, reason);
});
```

## Provider Methods

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

// Send JSON RPC requests
const result = await provider.request(payload: RequestArguments);

// Close provider session
await provider.disconnect()
```

## Provider Options

#### Providing a Custom RPC URL Mapping

The `custom` RPC URL mapping should be indexed by chainId and it requires at least one value.

```typescript
const provider = new CosmosProvider({
  // ...
  rpc: {
    custom: {
      "cosmoshub-4": "https://cosmos.mycustomnode.com",
      // ...
    },
  },
});
```
