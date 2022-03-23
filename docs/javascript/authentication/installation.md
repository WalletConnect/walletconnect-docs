# Installation

## 1. Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated project id. We will need this in a latter step.

## 2. Install Packages

Install WalletConnect client package. For additional type packages refer to our [TypeScript Guide](/javascript/guides/typescript).

```bash npm2yarn
npm install --save @walletconnect/client@experimental
```

## 3. Initialize Client

Initialize client by passing `relayUrl` and `projectId` we created before. See [client.init() reference](/javascript/walletconnect/reference/client#init) for more info.

```js
import WalletConnectClient from "@walletconnect/client";

const client = await WalletConnectClient.init({
  projectId: "<YOUR PROJECT ID FROM STEP 1>",
  relayUrl: "wss://relay.walletconnect.com",
});
```
