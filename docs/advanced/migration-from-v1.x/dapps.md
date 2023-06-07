# Dapps

The followings steps describe the various paths for dapps to migrate to v2:

1. [web3-provider](#web3-provider)
2. [ethereum-provider](#ethereum-provider)
3. [Web3Modal v1.0](#web3modal-v1.0)
4. [Web3Modal v2.0](#web3modal-v2.0)
5. [react-native-dapp](#react-native-dapp)
6. [web3-onboard](#web3-onboard)
7. [Dynamic](#dynamic)
8. [solana-labs/wallet-adapter](#solana-labs/wallet-adapter)
9. [web3-react](#web3-react)
10. [ConnectKit](#connectkit)

### web3-provider

If you are using `@walletconnect/web3-provider`, we stopped supporting this provider in favor of the improved version published under `@walletconnect/ethereum-provider` and you will be able to check the latest version on NPM [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

### ethereum-provider

If you are using `@walletconnect/ethereum-provider`, you can simply change the version number in your `package.json` to the latest which you can check on NPM [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

### Web3Modal v1.0

We recommend that you replace your existing integration with the latest version of Web3Modal, we recommend following one of these paths:

- [Full Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about): This provides the full Web3modal experience with [wagmi](https://wagmi.sh/) which allows users to connect wallets, perform transactions and manage accounts easy.
- [Standalone Web3Modal](https://docs.walletconnect.com/2.0/web3modal/advanced/standalone/sign/about): A leaner version of Web3Modal if you want to use SignClient and your own web3 library.

If you still want to use Web3Modal v1.0 but just upgrade the WalletConnect `ethereum-provider` to v2.0 then you can update to the latest version available on NPM which you can find [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

### Web3Modal v2.0

If you are using our new redesigned Web3Modal v2.0, you can simply enable v2.0 by using the feature flag `version: 2` when injecting modal connectors. Please ensure that you are using a minimum version of `2.2.0`. Here is a code example:

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

We are currently in developing our new SDK [`@web3modal/react-native`](https://github.com/WalletConnect/web3modal-react-native), which is now available in alpha version.

To ensure a seamless transition, we have developed a comprehensive example [here](https://github.com/WalletConnect/react-native-examples/compare/deprecated-example...deprecated-migration) that simplifies the migration process. 

Follow this steps along with the migration example:
1. Remove `@walletconnect/react-native-dapp` and all it's implementation
2. Remove `crypto` polyfill and `rn-nodeify` logic (if present)
3. Install new packages: `yarn add @web3modal/react-native react-native-get-random-values react-native-modal react-native-svg @react-native-async-storage/async-storage`
4. If the project uses react native < 0.70, install `big-integer` and add `BigInt` polyfill
5. Run `pod install` in `/ios` 

You can also find detailed documentation on how to install & utilize the new SDK [here](https://docs.walletconnect.com/2.0/reactnative/web3modal/about).

The latest SDK introduces a powerful combination of [Universal Provider](https://docs.walletconnect.com/2.0/web/providers/universal) and our [Cloud Explorer API](https://docs.walletconnect.com/2.0/cloud/explorer#cloud-explorer-api). This integration forms the solid foundation for a React Native dapp to effortlessly connect with wallets."

If you need assistance at any point during the migration process, please feel free to reach out to us via [GitHub Discussions](https://github.com/orgs/WalletConnect/discussions/categories/web3modal-sdk-support?discussions_q=is%3Aopen+category%3Aweb3modal-sdk-support).

### web3-onboard

If you are using the WalletConnect package with [Blocknative's web3-onboard](https://onboard.blocknative.com/docs/wallets/walletconnect#install) the migration is straight forward. The latest WC package is backwards compatible (until the WC v1 sunset).
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

Switching to v2 is straightforward using [Dynamic](https://www.dynamic.xyz/). To upgrade, ensure you are using v0.15 or later of `@dynamic-labs/sdk-react` . Once set up, visit your Dynamic developer dashboard and head to the integrations page. Select the WalletConnect card, toggle v2 on and add your WalletConnect `project ID`. Once enabled, Dynamic will automatically use WalletConnect v2 for wallets that support it, and v1 for wallets that don’t.

### solana-labs/wallet-adapter

If you are using `solana-labs/wallet-adapter`, this is already working on WalletConnect v2 so there is nothing to change here. There will be a new version released with an updated UI modal coming shortly.

### web3-react

[web3-react](https://github.com/Uniswap/web3-react) has created their own modules for WalletConnect v2. You can test their playground [here](https://web3-react-mu.vercel.app/) and read their example implementation [here](https://github.com/Uniswap/web3-react/blob/main/example/connectors/walletConnectV2.ts). In order to get started with the migration, we suggest upgrading your `@web3-react/types`, `@web3-react/store` and `@web3-react/core` as well as installing `@web3-react/walletconnect-v2`.

After you have the respective packages, you will have to obtain a projectID from our Cloud Platform and add it your `.env` file.

You will need to then initialize WalletConnect v2 as a connector as referenced [here.](https://github.com/Uniswap/web3-react/blob/main/example/components/connectorCards/WalletConnectV2Card.tsx)

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

Note: Be sure to test with several chains in order to complete your implementation for WalletConnect v2.

Then use the `@web3-react/walletconnect-v2` package with the following methods in your components.

- `URIListener`: Event listener for when v2 URI is created. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/example/components/connectorCards/WalletConnectV2Card.tsx#L26).
- `activate`: Create a session pairing with WalletConnect v2. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/packages/walletconnect-v2/src/index.ts#L133).
- `deactivate`: Disconnect your session from your wallet. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/packages/walletconnect-v2/src/index.ts#L171).
- `connectEagerly`: Connect to v2 protocol on mount. Code reference [here](https://github.com/Uniswap/web3-react/blob/3781fe453c88c7cd6a0fd12c77192ef17dd07619/packages/walletconnect-v2/src/index.ts#L113).

Sample codes of reference can be found in:

- [WalletConnectV2Card.tsx](https://github.com/Uniswap/web3-react/blob/main/example/components/connectorCards/WalletConnectV2Card.tsx)
- [CardWithSelect.tsx](https://github.com/Uniswap/web3-react/blob/main/example/components/ConnectWithSelect.tsx)

### ConnectKit

To migrate to WalletConnect V2 using ConnectKit, you need to upgrade `connectkit` and `wagmi` to the latest version

Run the following command to install it using Yarn:

```bash
yarn add connectkit@^1.3.0 wagmi@^0.12.0
```

WalletConnect v2 requires a project ID to be set and included in the configuration.
You can get a `projectID` from [WalletConnect Cloud](https://cloud.walletconnect.com/) for free.

Create a new environment variable `WALLETCONNECT_PROJECT_ID` in your `.env` file and set it to your project ID.

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

- When customizing your configuration for advanced usage, it is important to include the `projectId` within your `WalletConnectConnector` object. You can learn more about it [here](https://wagmi.sh/react/connectors/walletConnect#projectid)
- Make sure you have compatible versions of ethers and viem. Check your project's dependencies to ensure compatibility with ConnectKit.

For a comprehensive example, refer to the provided sample code:

- [ConnectKit with Next.js](https://github.com/family/connectkit/tree/main/examples/nextjs)
- [ConnectKit with React (Vite)](https://github.com/family/connectkit/tree/main/examples/vite)
- [ConnectKit with React (CRA)](https://github.com/family/connectkit/tree/main/examples/cra)
