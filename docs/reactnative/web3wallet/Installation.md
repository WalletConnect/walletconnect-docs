import Container from '../../components/Container';

# Installation

[Web3Wallet SDK](https://medium.com/walletconnect/simplifying-integration-for-wallet-developers-with-the-new-web3wallet-sdk-8706b69e149c) simplifies the integration process for wallet developers by combining our Sign and Auth APIs. Only V2 [WCURIs](../../specs/clients/core/pairing/pairing-uri) will work with this SDK as V1 is being deprecated by 28 June 2023.

We have written a simple tutorial for Expo on how to get started. This same approach is applicable for React Native CLI. At any point of development, feel free to reach out via [Github Discussions](https://github.com/orgs/WalletConnect/discussions) or Discord in the `wallet-dev-support` [channel.](https://discord.com/channels/492410046307631105/1040018700734038169)

## Obtain Project ID

Every project using WalletConnect SDKs needs to obtain projectId from [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in). This is absolutely free and only takes a few minutes.

## Installation

Install the Web3Wallet SDK package.

```bash npm2yarn
npm install @walletconnect/web3wallet @walletconnect/react-native-compat
```

Additionally add these extra packages to help with async storage, polyfills and the instance of ethers.

```bash npm2yarn
npm install @react-native-async-storage/async-storage react-native-get-random-values fast-text-encoding @ethersproject/shims ethers@5.4
```

For those using Typescript, we recommend adding these dev dependencies:

```bash npm2yarn
npm install npm install --save @walletconnect/jsonrpc-types
```
