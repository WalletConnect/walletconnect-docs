# Getting Started

## Hosted Platform (recommended)

1. Create a Project in the Cloud App. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/) and sign up for an account.

2. Make a POST request to the Echo Server's URL to register your client. The `ECHO_SERVER_URL` URL will be created in the Project's page in the Cloud App.

**To Register**
```
POST <ECHO_SERVER_URL>/clients
{
    "client_id": <CLIENT_ID>,
    "type": <TYPE>,
    "token": <DEVICE_TOKEN>
}
```

**To Unregister**
```
DELETE <ECHO_SERVER_URL>/clients/<CLIENT_ID>
```

3. Go to the Cloud App Project settings to upload your mobile push notification services authentication and authorization methods. This will be done either with [Firebase Cloud Messaging](#firebase-cloud-messaging-fcm) or [Apple Push Notifications](#apple-push-notifications-apns).

### Firebase Cloud Messaging (FCM)

Google's FCM allows you to use send notifications to both Android and Apple devices. At this time, we only support the API. Please refer to their docs on set up.
- [Set up Android](https://firebase.google.com/docs/cloud-messaging/android/client)
- [Set up Apple](https://firebase.google.com/docs/cloud-messaging/ios/client)


### Apple Push Notifications (APNs)

Apple recommends using a Token-Based Connection for APNs over a Certificate-Based connection. Please refer to their documentation for instructions on obtaining either.
- [Token-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns) 
- [Certificate-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
