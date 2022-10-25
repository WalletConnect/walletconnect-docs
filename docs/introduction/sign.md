# Sign

## Introduction

WalletConnect Sign is a remote signer protocol to communicate securely between web3 wallets and dapps. The protocol establishes a remote pairing between two apps and/or devices using a Relay server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers. The pairing is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this pairing request.

## Getting Started

There are getting started guides for the following clients platforms:

- [Web - Javascript](../javascript/sign/installation.md)
- [iOS - Swift](../swift/sign/installation.md)
- [Android - Kotlin](../kotlin/sign/installation.md)

## Examples and Resources

To view some examples of our Sign SDK at work, check out some of the examples below.

### dApps

- [React Sign dApp (with standalone client) - v2](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2) ([Demo](https://react-app.walletconnect.com/))
- [React Sign dApp (with EthereumProvider + Ethers.js) - v2](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2-with-ethers) ([Demo](https://react-dapp-v2-with-ethers.vercel.app/))
- [React Sign dApp (with EthereumProvider + web3.js) - v2](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2-with-web3js) ([Demo](https://react-dapp-v2-with-web3js.vercel.app/))
- [React Sign dApp (with CosmosProvider) - v2](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2-cosmos-provider) ([Demo](https://react-dapp-v2-cosmos-provider.vercel.app/))

### Wallets

- [React Sign Wallet Ethers - v2](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-wallet-v2) ([Demo](https://react-wallet.walletconnect.com/))

### Native Apps
#### iOS - Swift

- Sample Wallet and Dapp sample apps can be found under the Example directory in [Swift's V2 repository](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example)

#### Android - Kotlin

- Sample Wallet and Dapp .apk files can be found under the latest release tag in [Kotlin's V2 repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tags)