# Dapps

The followings steps describe the various steps necessary for dapps to migrate to WalletConnect v2.0.

1. [Getting Started](#getting-started)
2. [Testing Your Integration](./dapp-checklist.md)
3. [Submitting Your Dapp to the WalletConnect Explorer](../explorer-submission.md#for-dapps)

---

## Getting Started

In order to get started, we recommend identifying which library your dapp utilizes. If none of your approaches are listed, feel free to reach out to us via Github Discussions [here.](https://github.com/orgs/WalletConnect/discussions/new?category=v1-v2-migration-support)

1. [web3-provider](#web3-provider)
2. [ethereum-provider](#ethereum-provider)
3. [Web3Modal v1.0](#web3modal-v10)
4. [Web3Modal v2.0](#web3modal-v20)
5. [react-native-dapp](#react-native-dapp)
6. [web3-onboard](#web3-onboard)
7. [Dynamic](#dynamic)
8. [solana-labs/wallet-adapter](#solana-labswallet-adapter)
9. [web3-react](#web3-react)
10. [ConnectKit](#connectkit)
11. [wagmi](#wagmi)

### web3-provider

If you are using `@walletconnect/web3-provider`, we stopped supporting this provider in favor of the improved version published under `@walletconnect/ethereum-provider` and you will be able to check the latest version on NPM [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

### ethereum-provider

:::caution

For usage with Typescript, make sure you are using Typescript version `5.0.0` or higher.

:::

- Ensure you have a `projectId` from the WalletConnect Cloud. You can get one [here](https://cloud.walletconnect.com/).
- Upgrade `@walletconnect/ethereum-provider` from `1.x.x` to `2.x.x`.

Previously, you would have passed in an `infuraId` like:

```typescript
import WalletConnectProvider from '@walletconnect/ethereum-provider'

const web3Provider = new WalletConnectProvider({
  infuraId: 'INFURA_ID'
})
```

The new implementation requires `projectId` and `chains` instead. Here is an example of the new initialization:

```typescript
import { EthereumProvider } from '@walletconnect/ethereum-provider'

const provider = await EthereumProvider.init({
  projectId: 'WALLETCONNECT_PROJECT_ID', // required
  chains: [1], // required
  showQrCode: true // requires @web3modal/standalone
})
```

- Install `@web3modal/standalone` if you want to use the QR Code modal. You can find more information about Web3Modal [here](https://docs.walletconnect.com/2.0/web3modal/about).

### Web3Modal v1.0

We recommend that you replace your existing integration with the latest version of Web3Modal by following one of these paths:

- [Full Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about): This provides the full Web3modal experience with [wagmi](https://wagmi.sh/) which allows users to connect wallets, perform transactions and manage accounts easy.
- [Standalone Web3Modal](https://docs.walletconnect.com/2.0/web3modal/advanced/standalone/sign/about): A leaner version of Web3Modal if you want to use SignClient and your own web3 library.

If you still want to use Web3Modal v1.0 but just upgrade the WalletConnect `ethereum-provider` to v2.0, you can update to the latest version available on NPM which you can find [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

### Web3Modal v2.0

If you are using our redesigned Web3Modal (often referred to as Web3Modal v2.0), you can simply enable v2.0 by using the feature flag `version: 2` when injecting modal connectors. Please ensure that you are using a minimum version of `2.2.0`. Here is a code example:

```typescript
import { w3mConnectors } from '@web3modal/ethereum'
import { createClient } from 'wagmi'

// ...

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    chains,
    version: 2 // add this line
  }),
  provider
})

// ...
```

For more documentation, follow the docs for Web3Modal [here](https://docs.walletconnect.com/2.0/web3modal/about).

### react-native-dapp

If you are using `@walletconnect/react-native-dapp`, we are currently in alpha for `web3modal-react-native`. Please note this is in alpha and subject to change. The repo can be found [here](https://github.com/WalletConnect/web3modal-react-native).

In the meantime, you can check out the other React Native examples [repo](https://github.com/WalletConnect/react-native-examples/tree/main/dapps/v2Explorer), which integrate [Universal Provider](https://docs.walletconnect.com/2.0/web/providers/universal) and our [Cloud Explorer API](https://docs.walletconnect.com/2.0/cloud/explorer). This provides the foundations for a React Native dapp to connect to wallets.

### web3-onboard

If you are using the WalletConnect package with [Blocknative's web3-onboard](https://onboard.blocknative.com/docs/wallets/walletconnect#install), the migration is straightforward. The latest WalletConnect package is backwards-compatible (until the WalletConnect v1.0 shutdown comes into effect).
When you are ready to transition, bump the `@web3-onboard/walletconnect` package version to >= `2.3.0` and adjust the initialization params to include:

```typescript
{
  /**
  * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
  */
  version: 2,

  /**
  * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
  */
  projectId: string
}
```

_Note: The `@web3-onboard/walletconnect` package will default to `version` 1 until the WC v1 sunset is complete_

### Dynamic

Switching to WalletConnect v2.0 is straightforward using [Dynamic](https://www.dynamic.xyz/). To upgrade, ensure you are using v0.15 or later for `@dynamic-labs/sdk-react`. Once set up, visit your Dynamic developer dashboard and head to the integrations page. Select the WalletConnect card, toggle v2.0 on and add your WalletConnect `project ID`. Once enabled, Dynamic will automatically use WalletConnect v2.0 for wallets that support it, and v1.0 for wallets that don’t.

### solana-labs/wallet-adapter

If you are using `solana-labs/wallet-adapter`, this is already working on WalletConnect v2.0, so there is nothing to change here. There will be a new version released with an updated UI modal shortly.

### web3-react

[web3-react](https://github.com/Uniswap/web3-react) has created their own modules for WalletConnect v2.0. You can test their playground [here](https://web3-react-mu.vercel.app/) and read their example implementation [here](https://github.com/Uniswap/web3-react/blob/main/example/connectors/walletConnectV2.ts). In order to get started with the migration, we suggest upgrading your `@web3-react/types`, `@web3-react/store` and `@web3-react/core` as well as installing `@web3-react/walletconnect-v2`.

After you have the respective packages, you will have to obtain a projectId from the WalletConnect Cloud and add it your `.env` file.

You will need to then initialize WalletConnect v2.0 as a connector as referenced [here](https://github.com/Uniswap/web3-react/blob/main/example/components/connectorCards/WalletConnectV2Card.tsx).

```typescript
import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { MAINNET_CHAINS } from '../chains'

const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number)

export const [walletConnectV2, hooks] = initializeConnector<WalletConnectV2>(
  actions =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: process.env.walletConnectProjectId,
        chains: [mainnet],
        optionalChains,
        showQrModal: true
      }
    })
)
```

Note: Be sure to test with several chains in order to complete your implementation of WalletConnect v2.0.

Then use the `@web3-react/walletconnect-v2` package with the following methods in your components.

- `URIListener`: Event listener for when v2 URI is created. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/example/components/connectorCards/WalletConnectV2Card.tsx#L26).
- `activate`: Create a session pairing with WalletConnect v2. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/packages/walletconnect-v2/src/index.ts#L133).
- `deactivate`: Disconnect your session from your wallet. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/packages/walletconnect-v2/src/index.ts#L171).
- `connectEagerly`: Connect to v2 protocol on mount. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/packages/walletconnect-v2/src/index.ts#L113).

Sample codes of reference can be found in:

- [WalletConnectV2Card.tsx](https://github.com/Uniswap/web3-react/blob/main/example/components/connectorCards/WalletConnectV2Card.tsx)
- [CardWithSelect.tsx](https://github.com/Uniswap/web3-react/blob/main/example/components/ConnectWithSelect.tsx)

### ConnectKit

To migrate to WalletConnect v2.0 using ConnectKit, you need to upgrade `connectkit` and `wagmi` to the latest version.

:::caution

WalletConnect V2 is only supported in ConnectKit v1.3.0 and above

:::

:::info

For version 1.4.0 and above, you need to remove `ethers` and install `viem` instead.

```bash
yarn remove ethers
yarn add wagmi@latest viem@latest
```

:::

Run the following command to install it using Yarn:

```bash
yarn add connectkit@^latest wagmi@^latest
```

WalletConnect v2.0 requires a projectId to be set and included in the configuration.
You can easily get a `projectId` by creating an account on the [WalletConnect Cloud](https://cloud.walletconnect.com/).

Create a new environment variable `WALLETCONNECT_PROJECT_ID` in your `.env` file and set it to your projectId.

```bash
WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

Next, update your code by including the `walletConnectProjectId` inside the config object for `getDefaultClient`:

```typescript
...
const client = createClient(
  getDefaultClient({
    ...
+    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    ...
  }),
);
...
```

Note:

- For a version specific upgrade, refer to the [official migration guide](https://docs.family.co/connectkit/migration-guide#migration-guide) from Family.
- When customizing your configuration for advanced usage, it is important to include the `projectId` within your `WalletConnectConnector` object. You can learn more about it [here](https://wagmi.sh/react/connectors/walletConnect#projectid).
- Make sure you have compatible versions of ethers and viem. Check your project's dependencies to ensure compatibility with ConnectKit.

For a comprehensive example, refer to the provided sample code:

- [ConnectKit with Next.js](https://github.com/family/connectkit/tree/main/examples/nextjs)
- [ConnectKit with React (Vite)](https://github.com/family/connectkit/tree/main/examples/vite)
- [ConnectKit with React (CRA)](https://github.com/family/connectkit/tree/main/examples/cra)

### wagmi

To migrate to WalletConnect v2.0 using wagmi, you need to upgrade `wagmi` to either `0.12.x` if you are using `ethers` or `1.x.x` if you are using `viem`.

:::caution

WalletConnect v2.0 is only supported in wagmi `0.12.x` and above.

:::

#### Upgrading to wagmi `0.12.x`

Run the following command to install it using Yarn:

```bash
yarn add wagmi@^0.12.0
```

WalletConnect v2.0 requires a projectId to be set and included in the configuration.
You can easily get a `projectId` by creating an account on the [WalletConnect Cloud](https://cloud.walletconnect.com/).

Create a new environment variable `WALLETCONNECT_PROJECT_ID` in your `.env` file and set it to your projectId.

```bash
WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

Next, update your code by including the `walletConnectProjectId` inside the config object for `WalletConnectConnector`:

```typescript
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const connector = new WalletConnectConnector({
  options: {
    projectId: process.env.WALLETCONNECT_PROJECT_ID,
    showQrModal: true
  }
})

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [connector],
});

...
```

#### Upgrading to wagmi `1.x.x`

wagmi 1.x.x drops support for `ethers` and only supports `viem`. If you are using `ethers`, you will need to migrate to `viem` before upgrading to wagmi `1.x.x`.

```bash
yarn remove ethers
yarn add wagmi viem@latest
```

WalletConnect v2.0 requires a projectId to be set and included in the configuration.
You can easily get a `projectId` by creating an account on the [WalletConnect Cloud](https://cloud.walletconnect.com/).

Create a new environment variable `WALLETCONNECT_PROJECT_ID` in your `.env` file and set it to your projectId.

```bash
WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

Next, update your code by including the `walletConnectProjectId` inside the config object for `WalletConnectConnector`:

```typescript
import { createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])

const connector = new WalletConnectConnector({
  chains,
  options: {
    projectId: process.env.WALLETCONNECT_PROJECT_ID,
  },
}),

const config = createConfig({
  connectors: [connector],
  publicClient,
})

...
```

wagmi `1.x.x` introduces several breaking changes due to the migration from `ethers` to `viem`.
For a version-specific upgrade, refer to:

- [Official migration guide](https://wagmi.sh/react/migration-guide) for wagmi
- [ethers.js -> viem migration guide](https://wagmi.sh/react/migration-guide) for viem
