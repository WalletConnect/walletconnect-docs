# Installation

:::caution
**The WalletConnect Auth SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see significant and breaking changes.
:::

## 1. Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## 2. Install Packages

Install the WalletConnect client package.

:::info
For additional type packages refer to our [TypeScript Guide](../guides/typescript).
:::

```bash npm2yarn
npm i @walletconnect/auth-client
npm i better-sqlite3 # required for @walletconnect/core in Node envs
```
