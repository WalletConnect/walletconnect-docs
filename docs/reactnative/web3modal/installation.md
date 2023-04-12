import Container from '../../components/Container';

# Installation

:::caution
**The Web3Modal SDK is currently in Alpha and is not production-ready**.

It's public API and associated documentation may still see significant and breaking changes.
:::


Web3Modal SDK simplifies the modal integration process for dapp developers. Only V2 [WCURIs](../../specs/clients/core/pairing/pairing-uri) will work with this SDK as V1 is being deprecated by 28 June 2023.

We have written a simple tutorial for Expo on how to get started. This same approach is applicable for React Native CLI. At any point of development, feel free to reach out via [Github Discussions](https://github.com/orgs/WalletConnect/discussions) or Discord in the `dapp-dev-support` [channel.](https://discord.com/channels/492410046307631105/1040019697271328838)

## Obtain Project ID

Every project using WalletConnect SDKs needs to obtain projectId from [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in). This is absolutely free and only takes a few minutes.

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

<Tabs>
<TabItem value="e48" label="SDK 48+">

Expo 48 has an [issue](https://github.com/expo/expo/issues/17270) with `react-native-get-random-values`, so we need to temporarily fix this with their crypto library.

```
npx expo install expo-crypto
```

### Create shim file

Copy [this](https://github.com/WalletConnect/web3modal-react-native/blob/main/example/expo-crypto-shim.js) file in your root folder

## Apply Polyfills

In your root file, add this lines:

```javascript
import './expo-crypto-shim.js'
import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
```

</TabItem>

<TabItem value="e47" label="SDK < 48">

## Apply Polyfills

In your root file, add this lines:

```javascript
import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
```
</TabItem>


</Tabs>


</TabItem>

</Tabs>
