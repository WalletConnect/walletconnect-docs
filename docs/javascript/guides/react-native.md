# React Native

## Install

:::info

For React Native, the WalletConnect client additionally requires `@react-native-async-storage/async-storage`, `react-native-get-random-values` and `@walletconnect/react-native-compat`
to manage storage internally and provide all necessary polyfills.

:::

```bash npm2yarn
npm install --save @walletconnect/sign-client@rc @walletconnect/react-native-compat@rc @react-native-async-storage/async-storage react-native-get-random-values
```

## Set Up

Add following import before using `@walletconnect/sign-client`, this is usually done in your `App` component.

```javascript
import "@walletconnect/react-native-compat";
```

## Create Session

1. Initiate your WalletConnect client with the relay server, using [your Project ID](../../advanced/api-reference/project-id.md).

```javascript
import SignClient from "@walletconnect/sign-client";

const signClient = await SignClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  metadata: {
    name: "Test Wallet",
    description: "Test Wallet",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
});
```
