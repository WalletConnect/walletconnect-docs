# Echo Server

The Echo Server is a push server for the WalletConnect v2 Protocol. It allows clients to send push notifications to their users. The Echo Server can be used alongside our [Push API](../api/push.md) and [Web3Wallet SDK](../web3wallet/about.md).

## Options for Receiving Push Notifications

1. Use the [hosted](#hosted-platform-recommended) platform (recommended).
2. Self-Host our [server](https://github.com/WalletConnect/echo-server).
3. Write your own implementation using the [spec](../../specs/servers/echo/spec.md).

:::note
For inquiries about self-hosting, please contact [Luther](https://t.me/lutherwc) or [Harry](https://t.me/theharryet) on Telegram.
:::

## Hosted Platform (recommended)

1. Create a Project in the Cloud App. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/) and sign up for an account.

2. To get your project's Push URL, from the Cloud App, go into the settings tab and click on `Create Push URL`.

![create-push-url](/assets/create-push-url.png)

3. From the same settings tab, add the [FCM](#firebase-cloud-messaging-fcm) and/or [APNS](#apple-push-notifications-apns) details.

![fmc-and-apns-details-form](/assets/apns-fmc-details.png)

### Firebase Cloud Messaging (FCM)

Google's FCM allows you to use send notifications to both Android and Apple devices. At this time, we only support the API. Please refer to their docs on set up.
- [Set up Android](https://firebase.google.com/docs/cloud-messaging/android/client)
- [Set up Apple](https://firebase.google.com/docs/cloud-messaging/ios/client)


### Apple Push Notifications (APNS)

Apple recommends using a Token-Based Connection for APNS over a Certificate-Based connection. Please refer to their documentation for instructions on obtaining either.

- [Token-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns) 
- [Certificate-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
