# Node.js

## Install

:::info

For Node.js, the WalletConnect client additionally requires `better-sqlite3` to manage storage internally.

:::

```bash npm2yarn
npm install --save @walletconnect/sign-client@rc better-sqlite3
```

## Create Session

1. Initiate your WalletConnect client with the relay server, using [your Project ID](../../advanced/relay-server.md).

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
