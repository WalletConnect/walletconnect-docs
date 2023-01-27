# Installation

Web3Modal offers out of the box support for React and integrates very well with a popular React hook library called [wagmi](https://wagmi.sh/). To get started with their CLI, click [here](https://wagmi.sh/cli/create-wagmi). Alternatively follow our manual setup guide below.

## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Add Packages

```bash npm2yarn
npm install @web3modal/ethereum @web3modal/react wagmi ethers
```

:::info
Ensure to use latest versions for tools like next, react-scripts, babel, webpack etc. to support es2020 features.
:::

## Import

```tsx
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";
```

## Configure

Configure wagmi and Web3Modal clients. Refer to [wagmi](https://wagmi.sh/) docs to see how to set up custom chains, providers and work with their client.

```tsx
const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "<YOUR_PROJECT_ID>",
    version: "1" | "2",
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
```

## Add Web3Modal and Wagmi Components

You don't have to wrap `Web3Modal` inside `WagmiConfig`. In fact, we recommend placing it somewhere outside of your main app, thus removing extra re-rendering work.
See [Configuration](../configuration.md) docs for full Web3Modal prop list.

```tsx
function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal
        projectId="<YOUR_PROJECT_ID>"
        ethereumClient={ethereumClient}
      />
    </>
  );
}
```

## Usage

See [hooks](./hooks.md) and [components](components.md) docs for further instructions.

## Examples

- Full NextJS [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/react)
- Standalone NextJS [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/react-standalone)
