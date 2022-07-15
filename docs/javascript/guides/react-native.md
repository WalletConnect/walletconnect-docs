# React Native

## Install

:::info

For React Native, the WalletConnect client additionally requires `@react-native-async-storage/async-storage`
to manage storage internally.

:::

```bash npm2yarn
npm install --save @walletconnect/sign-client@rc @react-native-async-storage/async-storage
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
