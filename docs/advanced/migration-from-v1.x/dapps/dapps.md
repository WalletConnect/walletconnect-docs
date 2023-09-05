# Dapps

The followings steps describe the various steps necessary for dapps to migrate to WalletConnect v2.0.

1. [Getting Started](#getting-started)
2. [Testing Your Integration](./dapp-checklist.md)
3. [Submitting Your Dapp to the WalletConnect Explorer](../explorer-submission.md#for-dapps)

---

## Getting Started

In order to get started, we recommend identifying which library your dapp utilizes. If none of your approaches are listed, feel free to reach out to us via GitHub Discussions [here.](https://github.com/orgs/WalletConnect/discussions/new?category=v1-v2-migration-support)

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
12. [RainbowKit](#rainbowkit)
13. [Privy](#privy)

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
  showQrModal: true // requires @walletconnect/modal
})
```

- Install `@walletconnect/modal` if you want to use the QR Code modal. You can find more information about WalletConnectModal [here](../../walletconnectmodal/about.mdx).

### Web3Modal v1.0

We recommend that you replace your existing integration with the latest version of Web3Modal by following one of these paths:

- [Web3Modal](../../../web3modal/about.mdx): Web3modal feature rich modal with [wagmi](https://wagmi.sh/), has WalletConnect, extension wallets, connectors, chain switching, account modal and more.
- [WalletConnectModal](../../walletconnectmodal/about.mdx): WalletConnectModal is a lightweight modal to add into your existing workflows.

### Web3Modal v2.0

If you are using our redesigned Web3Modal (often referred to as Web3Modal v2.0), you are ready to go. Please ensure that you are using a minimum version of `2.6.0`. Here is a code example:

```typescript
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { createConfig } from 'wagmi'

// ...
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

const config = createConfig({
  autoConnect: true,
  connectors: [
    w3mConnectors({
      projectId,
      chains
    })
  ],
  publicClient
})

const ethereumClient = new EthereumClient(config, chains)
// ...
```

For more documentation, follow the docs for Web3Modal [here](../../../web3modal/about.mdx).

### react-native-dapp

We are currently developing our new SDK [`@walletconnect/modal-react-native`](../../walletconnectmodal/about.mdx), which is now available in release-candidate version.

To ensure a seamless transition, we have developed a comprehensive example [here](https://github.com/WalletConnect/react-native-examples/compare/deprecated-example...deprecated-migration) that simplifies the migration process.

Follow this steps along with the migration example:

1. Remove `@walletconnect/react-native-dapp` and all it's implementation
2. Remove `crypto` polyfill and `rn-nodeify` logic (if present)
3. Install new packages: `yarn add @walletconnect/modal-react-native react-native-get-random-values react-native-modal react-native-svg @react-native-async-storage/async-storage @react-native-community/netinfo`
4. If the project uses react native < 0.70, install `big-integer` and add `BigInt` polyfill
5. Run `pod install` in `/ios`

You can also find detailed documentation on how to install & utilize the new SDK [here](../../walletconnectmodal/about.mdx).

The latest SDK introduces a powerful combination of [Universal Provider](../../providers/universal.md) and our [Cloud Explorer API](../../../cloud//explorer.md). This integration forms the solid foundation for a React Native dapp to effortlessly connect with wallets."

If you need assistance at any point during the migration process, please feel free to reach out to us via [GitHub Discussions](https://github.com/orgs/WalletConnect/discussions).

### web3-onboard

If you are using the WalletConnect package with [Blocknative's web3-onboard](https://onboard.blocknative.com/docs/wallets/walletconnect#install), the migration is straightforward. The latest WalletConnect package is backwards-compatible (until the WalletConnect v1.0 shutdown comes into effect).
When you are ready to transition, bump the `@web3-onboard/walletconnect` package version to >= `2.3.0` and adjust the initialization params:

```typescript
const walletConnect = walletConnectModule({
  version: 2, // **New Param** Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
  handleUri: uri => console.log(uri),
  projectId: '', // ***New Param* Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
  requiredChains: [1, 56] // chains required to be supported by WC wallet
})

// for optional chains/optionalNamespaces
const onboard = Onboard({
  wallets: [walletConnect],
  chains: [
    // chains that are passed as optional chains to WC wallet after cleaning and parsing as number[]
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    }
    // ...
  ]
})
```

_Note: The `@web3-onboard/walletconnect` package will default to `version` 1 until the WalletConnect v1 sunset is complete_

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

To migrate to WalletConnect v2.0 using wagmi, you need to upgrade `wagmi` to either `0.12.16` if you are using `ethers` or `1.x.x` if you are using `viem`.

:::caution

WalletConnect v2.0 is only supported in wagmi `0.12.8` and above.

:::

#### Upgrading to wagmi `0.12.16`

Run the following command to install it using Yarn:

```bash
yarn add wagmi@^0.12.16
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

### RainbowKit

If you've already adopted RainbowKit `0.12.x` and `1.0.x`, then you're almost there! Just upgrade to the latest RainbowKit patch release and give it a try. RainbowKit has been API compatible with WalletConnect v2 since `0.12.8` was released in April.

RainbowKit has enabled WalletConnect v2 by default with `0.12.15` and `1.0.2`. RainbowKit will continue to support `0.12.x` in case your dApp has not yet upgraded to Wagmi and RainbowKit v1.

**1. Upgrading dependencies**

```bash
npm i @rainbow-me/rainbowkit@^1.0.2 wagmi@^1.2
```

If you're using a version of RainbowKit before `0.12.x` or `1.0.x`, just follow the [Migration Guides](https://www.rainbowkit.com/docs/migration-guide) to get up-to-date.

It is recommended that `0.12.x` dApps also begin to upgrade [wagmi](https://wagmi.sh/react/migration-guide), as improvements to WalletConnect v2 will only be included in future versions of wagmi.

**2. Supplying a projectId**

Every dApp that relies on WalletConnect now needs to obtain a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

Supply your `projectId` to `getDefaultWallets` and individual RainbowKit wallet connectors like the following:

```ts
const projectId = 'YOUR_PROJECT_ID'
const { wallets } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId,
  chains
})
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains })
    ]
  }
])
```

RainbowKit is type-safe and will warn you when a `projectId` is missing. Refer to RainbowKits' examples to see v2 in action:

- [Create React App](https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-create-react-app)
- [Next.js](https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-next)
- [Next.js App Router](https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-next-app)
- [Remix](https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-remix)
- [Vite](https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-vite)

### Privy

To upgrade [Privy](https://www.privy.io/) to use WalletConnect v2.0, **the only thing you need to do is install the [latest version](https://docs.privy.io/reference/react-auth/changelog) of the Privy SDK:**
```sh
npm i @privy-io/react-auth@latest
```
**That's it! You've upgraded to WalletConnect v2.0.**

#### Optional

If you want to configure your own WalletConnect Cloud Project instead of using the default one provided by Privy, proceed to the following steps. This is optional.

#### 1. Get a WalletConnect Cloud Project ID

Go to [**WalletConnect Cloud**](https://cloud.walletconnect.com/) and create a new account. Once your account is created, create a new project and collect the **Project ID**.

#### 2. Configure your Project ID in the PrivyProvider


In the [`config`](https://docs.privy.io/reference/react-auth/interfaces/PrivyProviderProps#config) property of your [`PrivyProvider`](https://docs.privy.io/reference/react-auth/modules#privyprovider), add a `walletConnectCloudProjectId` with your project ID from step 1.

```tsx title='Example configuration of Privy with WalletConnect v2.0 in NextJS'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PrivyProvider } from '@privy-io/react-auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        walletConnectCloudProjectId: 'YOUR_WALLETCONNECT_CLOUD_PROJECT_ID'
      }}
    >
      <Component {...pageProps} />
    </PrivyProvider>
  )
}
```

#### For more information:

- See Privy's full [WalletConnect v2.0 migration guide](https://docs.privy.io/guide/guides/walletconnect-v2).
- Learn more about Privy at our [website](https://www.privy.io/).
