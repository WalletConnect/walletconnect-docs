# Installation

## 1. Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated project id. We will need this in a latter step.

## 2. Install Packages

Install the WalletConnect client package.

:::info
For additional type packages refer to our [TypeScript Guide](../guides/typescript).

For platform-specific instructions, refer to our [React Native](../guides/react-native) and [Node.js](../guides/nodejs.md) guides.
:::

```bash npm2yarn
npm install --save @walletconnect/sign-client@rc
```

## 3. Initialize Client

Initialize client by passing `projectId` we created before.

```js
import SignClient from "@walletconnect/sign-client";

const signClient = await SignClient.init({
  projectId: "<YOUR_PROJECT_ID>",
});
```

## Migrating from v1.x

We recommend you install v1 and v2 together for maximum compatbility. To support both versions without dependency conflicts, use the v1 version `@walletconnect/legacy-client@2.0.0-rc.0`.

For more information check our [migration guide](../../advanced/migrating-from-v1.0.md).