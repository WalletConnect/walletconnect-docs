# Overview

:::note

WalletConnect v2 only supports the [Echo Server spec](../../specs/servers/echo/spec.md).

:::

## Introduction

WalletConnect Push is a push notification protocol that enables apps to notify users of both off-chain and on-chain events. The Push API allows wallet users to register subscriptions for different on-chain or off-chain events that are relevant to the user. The notifications are sent to the respective wallets. Dapp Push Notifications, which are end-to-end encrypted and only visible to the dapp and wallet. These notifications cannot be read by WalletConnect or Apple/Google.

:::note
For wallets, there are two types of push notifications available: Sign Notifications, which are unencrypted and notify users when user interaction is required and Dapp Push Notifications. To learn more about Sign Notifications, review the [Web3Wallet Specs](../../specs/clients/sign/client-api.md).
:::

Echo and Cast servers are essential components of the wallet notification system as Dapps use Cast server to send notifications, which are then forwarded to Echo server for broadcasting via APNS or Firebase.

### Cast Server

Cast Server is responsible for storing notifications and forwarding them to Echo server. Dapps interact with the Cast server by registering with it and calling the `notify` method to broadcast notifications to all subscribers/wallets. The Echo server doesn't see the notification content as it's always encrypted.

### Echo Server

The Echo Server is a push server for the WalletConnect v2 Protocol. It allows clients to send push notifications to their users. The Echo Server can be used alongside our [Push API](./push.md) and [Web3Wallet SDK](../../web3wallet/about.md). Echo is responsible for receiving the notifications and displaying them on the user's mobile device.

#### Options for Receiving Notifications

1. Use the [hosted](./prerequisites.md/#hosted-platform-recommended) platform (recommended).
2. Self-Host our [server](https://github.com/WalletConnect/echo-server).
3. Write their own implementation using the [spec](../../specs/servers/echo/spec.md).

:::note
For inquiries about self-hosting, please contact [Luther](https://t.me/lutherwc) or [Harry](https://t.me/theharryet) on Telegram.
:::

## Getting Started

There are getting started guides for the following clients platforms:

- [Web - Javascript](../../javascript/push/installation.md)
- [iOS - Swift](../../swift/push/installation.md)
- [Android - Kotlin](../../kotlin/push/installation.md)
