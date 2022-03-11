# Installation

## 1. Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in / sign up. Create new project or find an existing one. Copy your project id, this will be used latter on when initializing WalletConnect client.

## 2. Install Packages

Install WalletConnect client package. For additional type packages refer to our [TypeScript Guide](/javascript/guides/typescript).

```bash npm2yarn
npm install --save @walletconnect/client@experimental
```

## 3. Initialize Client

You only need `projectId` and `relayUrl` to get started with a client. Please see [Reference](/javascript/walletconnect/reference) page for aditional options.

```js
import WalletConnectClient from "@walletconnect/client";

const client = await WalletConnectClient.init({
  projectId: "<YOUR PROJECT ID FROM STEP 1>",
  relayUrl: "wss://relay.walletconnect.com",
});
```
