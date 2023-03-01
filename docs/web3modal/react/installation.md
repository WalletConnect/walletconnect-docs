# Installation

Web3Modal offers out of the box support for React and integrates very well with a popular React hook library called [wagmi](https://wagmi.sh/). To get started with their CLI, click [here](https://wagmi.sh/cli/create-wagmi). Alternatively follow our manual setup guide below.

## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Add Packages

```bash npm2yarn
npm install @web3modal/ethereum @web3modal/react wagmi ethers@^5
```

## Import

```tsx
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
```

## Configure

Configure wagmi and Web3Modal clients. Refer to [wagmi](https://wagmi.sh/) docs to see how to set up custom chains, providers and work with their client.

For more information on versioning, see the [docs](../about.md/#versioning).

```tsx
const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  w3mProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: "<YOUR_PROJECT_ID>",
    version: 1, // or 2
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

## Add Connect Wallet Button

```tsx
import { Web3Button } from "@web3modal/react";

export const YourApp = () => {
  return <Web3Button />;
};
```

## Usage

See [hooks](./hooks.md) and [components](components.md) docs for further instructions.

## Examples

- Full NextJS [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/nextjs)
- Standalone NextJS [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/nextjs-standalone)
