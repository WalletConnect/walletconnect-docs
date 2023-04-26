import Container from '../../components/Container';

# Installation

:::caution
**The Web3Modal SDK is currently in Alpha and is not production-ready**.

It's public API and associated documentation may still see significant and breaking changes.
:::


The Web3Modal SDK simplifies the modal integration process for dapp developers. Please note that only V2 [WCURIs](../../specs/clients/core/pairing/pairing-uri) will work with this SDK, as V1 is being deprecated by June 28th, 2023.

If you need assistance at any point during development, please feel free to reach out to us via [Github Discussions](https://github.com/orgs/WalletConnect/discussions) or on Discord in the dapp-dev-support [channel](https://discord.com/channels/492410046307631105/1040019697271328838).

## Obtain Project ID

Every project that uses WalletConnect SDKs needs to obtain a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in). This process is completely free and only takes a few minutes.

## Add Packages

Install the Web3Modal SDK package.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="rn-cli" label="React Native CLI">

```bash npm2yarn
npm install @web3modal/react-native
```

Additionally add these extra packages to help with async storage, polyfills, modals and SVG's.

```bash npm2yarn
npm install @react-native-async-storage/async-storage react-native-get-random-values react-native-modal react-native-svg
```

On iOS, use CocoaPods to add the native modules to your project:

```
npx pod-install
```

## Apply Polyfills

In your root file, add this lines:

```javascript
import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
```


</TabItem>

<TabItem value="expo" label="Expo">

```
npx expo install @web3modal/react-native
```

Additionally add these extra packages to help with async storage, polyfills, modals and SVG's.

```
npx expo install @react-native-async-storage/async-storage react-native-get-random-values react-native-modal react-native-svg
```

### Additional Setup for Expo SDK 48+

If you are using Expo SDK 48+, there's an [issue](https://github.com/expo/expo/issues/17270) with `react-native-get-random-values`, so we need to temporarily fix this by installing their crypto library and copying [this](https://github.com/WalletConnect/web3modal-react-native/blob/main/example/expo-crypto-shim.js) file in your root folder.

```
npx expo install expo-crypto
```

## Apply Polyfills

In your root file, add this lines:

```javascript
// import './expo-crypto-shim.js' --> Only for Expo SDK 48+
import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
```

</TabItem>

</Tabs>
