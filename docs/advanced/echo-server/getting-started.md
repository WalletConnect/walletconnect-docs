# Getting Started

## Hosted Platform (recommended)

### Prerequisites

1. Create a Project in the Cloud App. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/) and sign up for an account.

2. To get your project's Push URL, from the Cloud App, go into the settings tab and click on `Create Push URL`.

![create push url](/assets/create-push-url.png)

3. From the same settings tab, add the [FCM](#firebase-cloud-messaging-fcm) and/or [APNs](#apple-push-notifications-apns) details.

![fmc and apns details form](/assets/apns-fmc-details.png)


### Register Client

To register your client, make a POST request to the URL of the Echo Server. Use the URL that you created in step 2.

```
POST <ECHO_SERVER_URL>/clients
{
    "client_id": <CLIENT_ID>,
    "type": <TYPE>,
    "token": <DEVICE_TOKEN>
}
```

- `CLIENT_ID`: The Client's ID from the Relay pairing.
- `TYPE`: The push service to use e.g. APNS, FCM. This will be validated against the supported types on the Echo
  Server's side.
- `DEVICE_TOKEN`: The device's token for the push service e.g. FCM, APNS.

### Unregister Device

```
DELETE <ECHO_SERVER_URL>/clients/<CLIENT_ID>
```

- `CLIENT_ID`: The Client's ID from the Relay pairing.


### Firebase Cloud Messaging (FCM)

Google's FCM allows you to use send notifications to both Android and Apple devices. At this time, we only support the API. Please refer to their docs on set up.
- [Set up Android](https://firebase.google.com/docs/cloud-messaging/android/client)
- [Set up Apple](https://firebase.google.com/docs/cloud-messaging/ios/client)


### Apple Push Notifications (APNs)

Apple recommends using a Token-Based Connection for APNs over a Certificate-Based connection. Please refer to their documentation for instructions on obtaining either.
- [Token-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns) 
- [Certificate-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
