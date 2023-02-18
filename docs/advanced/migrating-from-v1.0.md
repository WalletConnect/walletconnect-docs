# Migrating from v1.x

The migration from WalletConnect v1.0 to WalletConnect v2.0 is **NOT** backwards-compatible, but in this document we will list all the SDKs that you need to replace to make your transition easier. Please also note the migration schedule that we set for both Wallets and Dapps.

## Migration schedule

WalletConnect v2.0 is **NOT** backwards-compatible with v1.0. Therefore, we must coordinate a migration schedule to ensure end-users do not suffer from this transition.

Most importantly we must migrate Wallets before Dapps can start supporting v2.0. This is because Wallets can support both versions in parallel and route connection requests to corresponding clients using the version number specified in the URI present in the QR Code or Deep Link.

We will be shutting down all Cloud-hosted servers for v1.0 on 28 June 2023. Read our blog post about the [v1.0 shutdown extension](https://medium.com/walletconnect/weve-reset-the-clock-on-the-walletconnect-v1-0-shutdown-now-scheduled-for-june-28-2023-ead2d953b595).

## Migration Changes

The overall UX has not change despite the internal protocol changes thus you will find an almost identical developer experience as well.

The only major difference is that we now require a `projectId` for all our SDKs which you can find more information [here](https://docs.walletconnect.com/2.0/cloud/relay).

You can get your your `projectId` by registering for a WalletConnect Cloud account at [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-up).

The Bridge URL is no longer supported. It has been replaced with the Relay URL, which is `wss://relay.walletconnect.com`.

## Migration Paths

There are different migration paths for Dapps and Wallets.

While Wallets must support v1.0 and v2.0 in parallel.

Dapps will support only one version at a time.

We recommend that Dapps put v2.0 support in staging as early as possible to allow testing with Wallets.

### For Dapps

Dapps should have an easy migration from v1.0 to v2.0 by simply replacing the package version on your package.json or checking the specific migration paths for each package below:

#### For ethereum-provider integrations

If you are using `@walletconnect/ethereum-provider`, you can simply change the version number in your package.json to the latest which you can check on NPM [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

#### For web3-provider integrations

If you are using `@walletconnect/web3-provider`, we stopped supporting this provider in favor of the improved version published under `@walletconnect/ethereum-provider` and you will be able to check the latest version on NPM [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

#### For Web3Modal v2.0 integrations

If you are using our new redesigned Web3Modal v2.0, you can simply enable v2.0 by using the feature flag `version: '2'` when injecting modal connectors. Please ensure that you are using a minimum version of `2.1.1`. Here is a code example:

```typescript
import { modalConnectors } from '@web3modal/ethereum'
import { createClient } from 'wagmi'

// ...

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    appName: 'web3Modal',
    chains,
    version: '2', // add this line
  }),
  provider
})

// ...
```
For more documentation, follow the docs for Web3Modal [here](https://docs.walletconnect.com/2.0/web3modal/about)

#### For Web3Modal v1.0 integrations

We recommend that you replace your existing integration with the latest version of Web3Modal, for which you can find more docs [here](https://docs.walletconnect.com/2.0/web3modal/about).

If you still want to use Web3Modal v1.0 but just upgrade the WalletConnect ethereum-provider to v2.0 then you can update to the latest version available on NPM which you can find [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

#### For react-native-dapp integrations

If you are using `@walletconnect/react-native-dapp`, we currently don't have an equivalent package for this but we will eventually publish a React-Native version of Web3Modal in the upcoming months.

In the meantime, you can list all the wallet mobile links from our [Cloud Explorer API](https://docs.walletconnect.com/2.0/cloud/explorer) and integrate our `@walletconnect/ethereum-provider` package using the latest version available on NPM which you can find [here](https://npmjs.com/package/@walletconnect/ethereum-provider).

#### For web3-onboard integrations

If you are using the WalletConnect package with [Blocknative's web3-onboard](https://onboard.blocknative.com/docs/wallets/walletconnect#install) the migration is straight forward. The latest WC package is backwards compatible (until the WC v1 sunset).
When ready to transition bump the `@web3-onboard/walletconnect` package version to >= `2.3.0` and adjust the initialization params to include: 
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
*note: The `@web3-onboard/walletconnect` package will default to version 1 until the WC v1 sunset is complete*


#### For Dynamic integrations
Switching to v2 is straightforward using [Dynamic](https://www.dynamic.xyz/). To upgrade, ensure you are using v0.15 or later of `@dynamic-labs/sdk-react` . Once set up, visit your Dynamic developer dashboard and head to the integrations page. Select the WalletConnect card, toggle v2 on and add your WalletConnect `project ID`. Once enabled, Dynamic will automatically use WalletConnect v2 for wallets that support it, and v1 for wallets that don’t.


### For Wallets

Wallets must support v1.0 and v2.0 in parallel. Our WalletConnect URIs are versioned and you can route the URI that was either scanned from a QR Code or redirected from a Deep Link, following the schema described in the [EIP-1328](https://eips.ethereum.org/EIPS/eip-1328).

When your wallet receives a v2.0 URI you must route it to the correct SDK.

Below we will list the SDK you must integrate for v2.0 protocol for each platform:

#### iOS Wallets

If you were using our [WalletConnectSwift SDK](https://github.com/WalletConnect/WalletConnectSwift) (or any other community SDK), you must integrate the Web3Wallet SDK for Swift, for which you can find docs [here](https://docs.walletconnect.com/2.0/swift/web3wallet/installation)

#### Android Wallets

If you were using our [WalletConnectKotlin SDK](https://github.com/WalletConnect/kotlin-walletconnect-lib) (or any other community SDK), you must integrate the Web3Wallet SDK for Kotlin, for which you can find docs [here](https://docs.walletconnect.com/2.0/kotlin/web3wallet/installation)

### React-Native Wallets

If you were using our [WalletConnectClient SDK](https://www.npmjs.com/package/@walletconnect/client) (or any other community SDK), you must integrate the Web3Wallet SDK for Javascript which you can find docs [here](https://docs.walletconnect.com/2.0/javascript/web3wallet/installation) and check out the RN Examples [here](https://github.com/WalletConnect/react-native-examples)

### Browser-based Wallets

If you were using our [WalletConnectClient SDK](https://www.npmjs.com/package/@walletconnect/client) (or any other community SDK), you must integrate the Web3Wallet SDK for Javascript which you can find docs [here](https://docs.walletconnect.com/2.0/javascript/web3wallet/installation) and check out the Web Examples [here](https://github.com/WalletConnect/web-examples)

### Unity Wallets 

If you were using our [WalletConnectSharp SDK](https://github.com/WalletConnect/WalletConnectSharp/tree/1.0) (or any other community SDK), you must integrate the Sign Client for Unity which you can find docs [here](https://github.com/WalletConnect/WalletConnectSharp/)


### Flutter Wallets


If you were using OrangeWallet's [WalletConnectDart SDK](https://github.com/Orange-Wallet/wallet-connect-dart) (or any other community SDK), you must integrate the Sign Client for Flutter which you can find docs [here](https://github.com/Eucalyptus-Labs/wallet-connect-v2-dart)


