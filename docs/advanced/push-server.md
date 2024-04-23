# Push Server

The Push Server sends WalletConnect protocol activity using FCM or APNs to users. The Push Server can be used with our [Notify API](../web3wallet/notify/introduction.mdx) and [Web3Wallet SDK](../web3wallet/about.mdx).

Several options exist for setting up the Push Server:

1. Using [WalletConnect Cloud](#setup-in-walletconnect-cloud) (recommended)
2. Self-host the [Push Server](https://github.com/WalletConnect/push-server)
3. Write your own implementation using the [spec](https://specs.walletconnect.com/2.0/specs/servers/push/spec)

It is recommended that you use WalletConnect Cloud for simplicity and ease of integration. Typically you only need to self-host if you have concerns about our hosted platform having access to your FCM or APNs server credentials, such as for regulatory reasons. If you want to self-host or implement against the spec, please reach out to devrel@walletconnect.com for assistance.

## Setup in WalletConnect Cloud

1. Create a Project in the Cloud App. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/) and sign up for an account.

2. To get your project's Push URL, from the Cloud App, go into the settings tab and click on `Create Push URL`.

![create-push-url](/assets/create-push-url.png)

3. From the same settings tab, you will see the FCM and the APNS settings becomes available to setup. Add your [FCM](#firebase-cloud-messaging-fcm) and/or [APNs](#apple-push-notifications-apns) details.

![fmc-and-apns-details-form](/assets/apns-fmc-details.png)

### Firebase Cloud Messaging (FCM)

Google's FCM allows you to use send notifications to both Android and Apple devices. At this time, we only support Android devices via FCM.

Currently we only support Cloud Messaging API (Legacy) but are currently working on supporting Firebase Cloud Messaging API (V1) very soon.

- Enable Legacy Cloud Messaging API in the Firebase Project Settings
  ![legacy-fcm-cloud-messaging](/assets/legacy-fcm-cloud-messaging-api.png)
- [Set up Android](https://firebase.google.com/docs/cloud-messaging/android/client)
- [Set up Apple](https://firebase.google.com/docs/cloud-messaging/ios/client)

### Apple Push Notifications (APNs)

Apple recommends using a Token-Based Connection for APNS over a Certificate-Based connection. Please refer to their documentation for instructions on obtaining either.

- [Token-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns)
- [Certificate-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
