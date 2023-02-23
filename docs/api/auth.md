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
- [Universal - Dart](../flutter/dapps/auth/installation.md)
## Useful Links

We've created some sample apps so that you can get a taste of the WalletConnect Auth experience. Here is our [sample wallet](https://react-auth-wallet.walletconnect.com/) and [sample dapp](https://react-auth-dapp.walletconnect.com/).
