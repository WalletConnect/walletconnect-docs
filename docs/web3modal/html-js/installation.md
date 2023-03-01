# Installation

Web3Modal is built using standard web technologies like web-components and es modules, which means that it can be used in any front-end environment. It works particularly well with [wagmi core](https://wagmi.sh/) library that offers big suite of helper actions to speed up and simplify web3 development flows.

### Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

### Add Packages

```bash npm2yarn
npm install @web3modal/ethereum @web3modal/html @wagmi/core ethers@^5
```

## Import

```js
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import { configureChains, createClient } from "@wagmi/core";
import { arbitrum, mainnet, polygon } from "@wagmi/core/chains";
```

## Configure

See [configuration](../configuration.md) docs for full Web3Modal options list.

For more information on versioning, see the [docs](../about.md/#versioning).

:::info
Minimum version of @wagmi/core 0.9.3 is required to use `version: 2`
:::

```js
const chains = [arbitrum, mainnet, polygon];

// Wagmi Core Client
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

// Web3Modal and Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal(
  { projectId: "<YOUR_PROJECT_ID>" },
  ethereumClient
);
```

### Add Connect Wallet Button

```js
<body>
  <w3m-core-button></w3m-core-button>
</body>
```

## Usage

See [actions](./actions.md) and [components](components.md) docs for further instructions.

## Examples

- Minimal HTML [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/html)
