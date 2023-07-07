import Container from '../../components/Container';

# Installation

The [Web3Wallet SDK](https://medium.com/walletconnect/simplifying-integration-for-wallet-developers-with-the-new-web3wallet-sdk-8706b69e149c) simplifies the integration process for wallet developers by combining our Sign and Auth APIs. Please note that only V2 [WCURIs](../../specs/clients/core/pairing/pairing-uri) will work with this SDK, as V1 is being deprecated by June 28th, 2023.

We have created a simple [tutorial](https://medium.com/walletconnect/how-to-build-a-wallet-in-react-native-with-the-web3wallet-sdk-b6f57bf02f9a) for Expo on how to get started, and this same approach is also applicable for React Native CLI. If you need assistance at any point during development, please feel free to reach out to us via [GitHub Discussions](https://github.com/orgs/WalletConnect/discussions).

## Obtain Project ID

Every project that uses WalletConnect SDKs needs to obtain a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in). This process is completely free and only takes a few minutes.

## Installation

Install the Web3Wallet SDK package.

```bash npm2yarn
npm install @walletconnect/web3wallet @walletconnect/react-native-compat
```

Additionally add these extra packages to help with async storage, polyfills and the instance of ethers.

```bash npm2yarn
npm install @react-native-async-storage/async-storage react-native-get-random-values fast-text-encoding @ethersproject/shims ethers@5.72
```

For those using Typescript, we recommend adding these dev dependencies:

```bash npm2yarn
npm install --save @walletconnect/jsonrpc-types
```
