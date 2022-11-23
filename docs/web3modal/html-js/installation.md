# Installation

Web3Modal is built using standard web technologies like web-components and es modules, which means that it can be used in any front-end environment. It works particularly well with [wagmi core](https://wagmi.sh/) library that offers big suite of helper actions to speed up and simplify web3 development flows.

## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Add Packages

```bash npm2yarn
npm install @web3modal/ethereum @web3modal/ui @web3modal/core @wagmi/core ethers
```

## Import

```js
import { chain, configureChains, createClient } from "@wagmi/core";
import { ClientCtrl, ConfigCtrl } from "@web3modal/core";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
```

## Configure

```js
const chains = [chain.mainnet];

// Wagmi Core Client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// Web3Modal
ConfigCtrl.setConfig({
  projectId,
  theme: "dark",
  accentColor: "default",
});
ClientCtrl.setEthereumClient(ethereumClient, chains);

// Import ui library AFTER configuration is complete
import("@web3modal/ui");
```

## Add Web Components to your index.html

```html
<body>
  <w3m-core-button></w3m-core-button>
  <w3m-modal></w3m-modal>

  <script type="module" src="main.js"></script>
</body>
```

## Examples

- Minimal [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/html)
