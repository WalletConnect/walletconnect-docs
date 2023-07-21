# Installation

To get started with [Web3Wallet](../web3wallet/wallet-usage.md), [Sign](../dapps/dapp-sign-usage.md), or [Auth](../dapps/dapp-auth-usage.md), follow the instructions below.

## 1. Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. You will need this in a later step.

## 2. Install Packages

Install the WalletConnect client package.

```dart
flutter pub add walletconnect_flutter_v2
```

## 3. Platform Specific Setup

Depending on your platform, you will have to add different permissions to get the package to work.

### MacOS

Add the following to your `DebugProfile.entitlements` and `Release.entitlements` files so that it can connect to the WebSocket server.

```xml
<key>com.apple.security.network.client</key>
<true/>
```
