# Installation

:::caution
**The WalletConnect Push SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see breaking changes.
:::

## 1. Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## 2. Install Packages

Install the WalletConnect client package.

```bash npm2yarn
npm install @walletconnect/push-client
```

**If you are using the SDK on a server (such as Node.js), you will need to install an additional package:**

```bash npm2yarn
npm install lokijs --save
```

This step is not required if you are using the SDK on the browser-side.
