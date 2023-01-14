# Overview

The Echo Server is a push server for the WalletConnect v2 Protocol. It allows clients to send push notifications to their users.

## Options for receiving notifications:

1. Use the hosted platform (recommended)
2. Host the rust implementation
3. Write their own implementation using the spec

### Firebase Cloud Messaging (FCM)

Google's FCM API allows you to use send notifications to both Android and Apple devices. Please refer to their docs on set up.
- [Set up Android](https://firebase.google.com/docs/cloud-messaging/android/client)
- [Set up Apple](https://firebase.google.com/docs/cloud-messaging/ios/client)


### Apple Push Notifications (APNs)

Apple recommends using a Token-Based Connection for APNs over a Certificate-Based connection. Please refer to their documentation for instructions on obtaining either.
- [Token-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns) 
- [Certificate-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)

