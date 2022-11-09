# Auth

## Introduction

WalletConnect Auth is an authentication protocol that can be used to log-in blockchain wallets into apps. With a simple and lean interface, this API verifies wallet address ownership through a single signature request, realizing login in one action. It enables apps to set up a decentralized and passwordless onboarding flow.

## Key Features

A lightweight SDK that is quick to integrate: WalletConnect Auth is designed to initiate a single signature request. It is therefore 5x smaller than WalletConnect Sign.

Sign-in with Ethereum in just one action: Instead of having to first connect and then sign the request, WalletConnect Auth bundles the SIWE flow into one action.

Compatible with other WalletConnect APIs: WalletConnect Auth can be used in conjunction with any existing and future WalletConnect API to weave together your desired UX. In this case, all core components such as the network layer, the storage layer, and crypto utils will be shared to ensure maximum performance.

Domain binding to prevent phishing (coming in beta!): WalletConnect Auth seeks to be fully compliant with EIP-4361 and is implementing domain binding to provide greater security to users. When processing a login request, the wallet will alert the user if the domain of the website or app does not match the domain registered in the whitelist.

## Getting Started

There are getting started guides for the following clients platforms:

- [Web - Javascript](../javascript/auth/installation.md)
- [iOS - Swift](../swift/auth/installation.md)
- [Android - Kotlin](../kotlin/auth/installation.md)

## Examples and Resources

To view examples of the Sign SDK in use, please see the below web examples.

### dApps
- [React Auth dApp](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-auth) ([Demo](https://react-auth-dapp.vercel.app/))
### Wallets
- [React Auth Wallet](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-wallet-auth) ([Demo](https://react-auth-wallet.vercel.app/))

### Native Apps
#### iOS - Swift

- Sample Wallet and Dapp sample apps can be found under the Example directory in [Swift's V2 repository](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example)

#### Android - Kotlin

- Sample Wallet and Dapp .apk files can be found under the latest release tag in [Kotlin's V2 repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tags)