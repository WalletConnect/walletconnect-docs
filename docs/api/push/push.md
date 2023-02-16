# Push

:::note

WalletConnect v2 only supports the [Echo Server spec](https://github.com/WalletConnect/echo-server/blob/main/spec/spec.md).

:::

## Introduction

WalletConnect Push is a push notification protocol that enables apps to notify users of both off-chain and on-chain events. The Push API allows wallet users to register subscriptions for different on-chain or off-chain events that are relevant to the user. The notifications are sent to the respective wallets.

### Echo Server

The Echo Server is a push server for the WalletConnect v2 Protocol. It allows clients to send push notifications to their users. The Echo Server can be used alongside our [Push API](./push.md) and [Web3Wallet SDK](../../web3wallet/about.md).

#### Options for Receiving Notifications

1. Use the [hosted](./prerequisites.md/#hosted-platform-recommended) platform (recommended).
2. Self-Host our [server](https://github.com/WalletConnect/echo-server).
3. Write their own implementation using the [spec](https://github.com/WalletConnect/echo-server/blob/main/spec/spec.md).

:::note
For inquiries about self-hosting, please contact [Luther](https://t.me/lutherwc) or [Harry](https://t.me/theharryet) on Telegram.
:::

## Getting Started

There are getting started guides for the following clients platforms:

- [Web - Javascript](../../javascript/push/installation.md)
- [iOS - Swift](../../swift/push/installation.md)
- [Android - Kotlin](../../kotlin/push/installation.md)
