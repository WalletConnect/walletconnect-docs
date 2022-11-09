# Installation

## 1. Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## 2. Install Packages

For Dapps, only install Auth. If you're building a wallet, you will need to install the [Sign](../sign/installation.md) client too.

### Dapps
```bash npm2yarn
npm install @walletconnect/auth-client
```

### Wallets
```bash npm2yarn
npm install @walletconnect/auth-client
npm install @walletconnect/sign-client
```