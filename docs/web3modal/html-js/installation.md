# Installation

## Obtain Project id

Every project using WalletConnect SDKs (including Web3Modal) needs to obtain `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

## Add Packages

```bash npm2yarn
npm install @web3modal/ethereum @web3modal/html @wagmi/core ethers@^5
```

## Implementation

Start by importing Web3Modal and wagmi packages, then create wagmi client using your own settings or our default presets as shown below. Finally, pass wagmi client to Web3Modal as `ethereumClient`.

```js
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createClient } from '@wagmi/core'
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'YOUR_PROJECT_ID'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
const web3modal = new Web3Modal({ projectId }, ethereumClient)
```

## Add connect button

Add our pre-built button component in your app to open/close connection and account modals. Alternatively, use your own button.

```html
<body>
  <w3m-core-button></w3m-core-button>
</body>
```

## Use wagmi core actions

[wagmi core](https://wagmi.sh) provides everything you'll need to start working with accounts, contracts, chains and much more.

```tsx
import { getAccount, readContract, getSigner } from '@wagmi/core'
```
