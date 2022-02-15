---
description: Quick Start For Dapps using Ethereum Provider
---

# Ethereum Provider

## Quick Start For Dapps \(Ethereum Provider\)

:::info
You can use the **Test Wallet** to test your integration at [https://react-wallet.walletconnect.com/](https://react-wallet.walletconnect.com/) \([Source code](https://github.com/WalletConnect/walletconnect-monorepo/tree/canary/examples/react-wallet)\). Keep in mind that this is **not a secure wallet - Do not store funds**.
:::

### Install

```bash npm2yarn
npm install --save @walletconnect/client@experimental @walletconnect/ethereum-provider@experimental @walletconnect/types@experimental
```

:::info
Syntax shown below is Javascript ES6 which requires bundling and transpiling to run in web browsers. If unfamiliar we recommend setting up an environment using [Webpack Starter](https://github.com/wbkd/webpack-starter) or [Create React App](https://github.com/facebook/create-react-app)
:::

## Setup

First, instantiate your WalletConnect EthereumProvider using the following options: Infura or Custom RPC mapping

<Tabs>
<TabItem value="infura" label="Infura">

```javascript
import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/client";
import EthereumProvider from "@walletconnect/ethereum-provider";
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

// 3. Create EthereumProvider (with default RPC configuration) by passing in the `client` instance.
const provider = new EthereumProvider({
  chainId: 1,
  client,
  rpc: {
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  },
});

// 4. Enable session (triggers `CLIENT_EVENTS.pairing.proposal` event).
await provider.enable();
```

</TabItem>
<TabItem value="customrpc" label="Custom RPC">

```javascript
import EthereumProvider from "@walletconnect/ethereum-provider";

//  3. Create EthereumProvider with custom RPC configuration.
const provider = new EthereumProvider({
  chainId: 1,
  client,
  rpc: {
    custom: {
      1: "https://mainnet.mycustomnode.com",
      3: "https://ropsten.mycustomnode.com",
      100: "https://dai.poa.network",
      // ...
    },
  },
});

// 4. Enable session (triggers `CLIENT_EVENTS.pairing.proposal` event).
await provider.enable();
```

</TabItem>
</Tabs>

Then you can integrate your dapp using your favorite Ethereum library: ethers.js or web3.js

<Tabs>
<TabItem value="ethersjs" label="ethers.js">

```javascript
import { providers } from "ethers";

//  Wrap with Web3Provider from ethers.js
const web3Provider = new providers.Web3Provider(provider);
```

</TabItem>
<TabItem value="web3js" label="web3.js">

```javascript
import Web3 from "web3";

//  Create Web3 instance
const web3 = new Web3(provider);
```

</TabItem>
</Tabs>

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

## Web3 Methods

```typescript
//  Get Accounts
const accounts = await web3.eth.getAccounts();

//  Get Chain Id
const chainId = await web3.eth.chainId();

//  Get Network Id
const networkId = await web3.eth.net.getId();

// Send Transaction
const txHash = await web3.eth.sendTransaction(tx);

// Sign Transaction
const signedTx = await web3.eth.signTransaction(tx);

// Sign Message
const signedMessage = await web3.eth.sign(msg);

// Sign Typed Data
const signedTypedData = await web3.eth.signTypedData(msg);
```

## Provider Options

### Required

In order to resolve non-signing requests you need to provide one of the following:

#### Infura ID

The infuraId will support the following chain IDs: Mainnet \(1\), Ropsten \(3\), Rinkeby\(4\), Goerli \(5\) and Kovan \(42\)

```typescript
const provider = new WalletConnectProvider({
  // ...
  rpc: {
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  },
});
```

#### Providing a Custom RPC URL Mapping

The `custom` RPC URL mapping should be indexed by chainId and it requires at least one value.

```typescript
const provider = new WalletConnectProvider({
  // ...
  rpc: {
    custom: {
      1: "https://mainnet.mycustomnode.com",
      3: "https://ropsten.mycustomnode.com",
      100: "https://dai.poa.network",
      // ...
    },
  },
});
```
