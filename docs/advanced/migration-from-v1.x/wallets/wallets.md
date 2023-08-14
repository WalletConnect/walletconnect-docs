# Wallets

Wallets must support v1.0 and v2.0 in parallel. Our WalletConnect URIs are versioned and you can route the URI that was either scanned from a QR Code or redirected from a Deep Link, following the schema described in the [EIP-1328](https://eips.ethereum.org/EIPS/eip-1328).

When your wallet receives a v2.0 URI you must route it to the correct SDK.

The followings steps describe the various steps necessary for dapps to migrate to v2:

1. [Getting Started](#getting-started)
2. [Integrations Checklist](./wallet-checklist.md)
3. [Explorer Submission](../explorer-submission.md#for-dapps)

---

## Getting Started

Below we will list the SDK you must integrate for v2.0 protocol for each platform:

1. [iOS](#ios)
2. [Android](#android)
3. [React Native](#react-native)
4. [Browser-based](#browser-based)
5. [Unity](#unity)
6. [Flutter](#flutter)

### iOS

If you were using our [WalletConnectSwift SDK](https://github.com/WalletConnect/WalletConnectSwift) (or any other community SDK), you must integrate the Web3Wallet SDK for Swift, for which you can find docs [here](../../../web3wallet/about.mdx).

### Android

If you were using our [WalletConnectKotlin SDK](https://github.com/WalletConnect/kotlin-walletconnect-lib) (or any other community SDK), you must integrate the Web3Wallet SDK for Kotlin, for which you can find docs [here](../../../web3wallet/about.mdx).

### React Native

If you were using our [WalletConnectClient SDK](https://www.npmjs.com/package/@walletconnect/client) (or any other community SDK), you must integrate the Web3Wallet SDK for Javascript which you can find docs [here](../../../web3wallet/about.mdx) and check out the RN Examples [here](https://github.com/WalletConnect/react-native-examples).

### Browser-based

If you were using our [WalletConnectClient SDK](https://www.npmjs.com/package/@walletconnect/client) (or any other community SDK), you must integrate the Web3Wallet SDK for Javascript which you can find docs [here](../../../web3wallet/about.mdx) and check out the Web Examples [here](https://github.com/WalletConnect/web-examples).

### Unity

If you were using our [WalletConnectSharp SDK](https://github.com/WalletConnect/WalletConnectSharp/tree/1.0) (or any other community SDK), you must integrate the Sign Client for Unity which you can find docs [here](https://github.com/WalletConnect/WalletConnectSharp/).

### Flutter

If you were using OrangeWallet's [WalletConnectDart SDK](https://github.com/Orange-Wallet/wallet-connect-dart) (or any other community SDK), you must integrate the Sign Client for Flutter which you can find docs [here](https://github.com/Eucalyptus-Labs/wallet-connect-v2-dart).
