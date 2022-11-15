# Installation

Web3Modal is split into granular packages that allow you to compose exact functionality required for your app. In most cases you will want to use "framework" and "chain" packages for your app. As of now we support `@web3modal/react` and `@web3modal/ethereum`. Support for more frameworks and non-evm chains is coming soon.

## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Add Packages

```bash npm2yarn
npm install @web3modal/ethereum @web3modal/react wagmi ethers
```

## Import

```tsx
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
```

## Configure

Configure wagmi and Web3Modal clients. Please refer to [wagmi](https://wagmi.sh/) documentation for more advanced topics like custom chain creation, using other providers like infura or alchemy etc. For now, we will use best default settings for web3modal.

```tsx
const chains = [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Moda", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
```

## Add react components

You don't have to wrap `Web3Modal` inside `WagmiConfig`, in fact, we recommend placing it somewhere outside of your main app, thus removing extra re-rendering work.
See [Customization](../about#options) docs for more information about modal props.

```tsx
function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal
        projectId="<YOUR_PROJECT_ID>"
        theme="dark"
        accentColor="default"
        ethereumClient={ethereumClient}
      />
    </>
  );
}
```

## Add connect button

```tsx
import { Web3Button } from "@web3modal/react";

function HomePage() {
  return <Web3Button />;
}
```

## Examples

- Full NextJS [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/react)
- Standalone NextJS [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/react-standalone)
