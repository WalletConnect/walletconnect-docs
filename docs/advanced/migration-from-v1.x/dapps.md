# Dapps

Dapps should have an easy migration from v1.0 to v2.0 by simply replacing the package version on your `package.json` or checking the specific migration paths for each package below:

The followings steps describe the various paths for dapps to migrate to v2:

1. [web3-provider](#web3-provider)
2. [ethereum-provider](#ethereum-provider)
3. [Web3Modal v1.0](#web3modal-v1.0)
4. [Web3Modal v2.0](#web3modal-v2.0)
5. [react-native-dapp](#react-native-dapp)
6. [web3-onboard](#web3-onboard)
7. [Dynamic](#dynamic)
8. [solana-labs/wallet-adapter](#solana-labs/wallet-adapter)

#### web3-provider

If you are using `@walletconnect/web3-provider`, we stopped supporting this provider in favor of the improved version published under `@walletconnect/ethereum-provider` and you will be able to check the latest version on NPM [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

#### ethereum-provider

If you are using `@walletconnect/ethereum-provider`, you can simply change the version number in your `package.json` to the latest which you can check on NPM [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

#### Web3Modal v1.0

We recommend that you replace your existing integration with the latest version of Web3Modal, we recommend following one of these paths:

- [Full Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about): This provides the full Web3modal experience with [wagmi](https://wagmi.sh/) which allows users to connect wallets, perform transactions and manage accounts easy.
- [Standalone Web3Modal](https://docs.walletconnect.com/2.0/web3modal/advanced/standalone/sign/about): A leaner version of Web3Modal if you want to use SignClient and your own web3 library.

If you still want to use Web3Modal v1.0 but just upgrade the WalletConnect `ethereum-provider` to v2.0 then you can update to the latest version available on NPM which you can find [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

#### Web3Modal v2.0

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

For more documentation, follow the docs for Web3Modal [here](https://docs.walletconnect.com/2.0/web3modal/about)

#### react-native-dapp

If you are using `@walletconnect/react-native-dapp`, we are currently in alpha for `web3modal-react-native`. Please note this is in alpha and subject to change. The repo can be found [here](https://github.com/WalletConnect/web3modal-react-native).

In the meantime, you can check out the other React Native Examples [repo](https://github.com/WalletConnect/react-native-examples/tree/main/dapps/v2Explorer) which integreates [Universal Provider](https://docs.walletconnect.com/2.0/web/providers/universal) + our [Cloud Explorer API](https://docs.walletconnect.com/2.0/cloud/explorer). This provides the foundations for a React Native dapp to connect to wallets.

#### web3-onboard

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

#### Dynamic

Switching to v2 is straightforward using [Dynamic](https://www.dynamic.xyz/). To upgrade, ensure you are using v0.15 or later of `@dynamic-labs/sdk-react` . Once set up, visit your Dynamic developer dashboard and head to the integrations page. Select the WalletConnect card, toggle v2 on and add your WalletConnect `project ID`. Once enabled, Dynamic will automatically use WalletConnect v2 for wallets that support it, and v1 for wallets that don’t.

#### solana-labs/wallet-adapter

If you are using `solana-labs/wallet-adapter`, this is already working on WalletConnect v2 so there is nothing to change here. There will be a new version released with an updated UI modal coming shortly.
