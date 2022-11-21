# Node.js

## Install

:::info

For Node.js, the WalletConnect SignClient additionally requires `lokijs` to manage storage internally.

:::

```bash npm2yarn
npm install --save @walletconnect/sign-client lokijs@1.x
```

## Create Session

1. Initiate your WalletConnect client with the relay server, using [your Project ID](../../cloud/cloud-relay.md).

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
