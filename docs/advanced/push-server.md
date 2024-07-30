# Push Server

The Push Server sends WalletConnect protocol activity using FCM or APNs to users. The Push Server can be used with our [WalletKit SDK](../walletkit/overview.mdx).

Several options exist for setting up the Push Server:

1. Using [WalletConnect Cloud](#setup-in-walletconnect-cloud) (recommended)
2. Self-host the [Push Server](https://github.com/WalletConnect/push-server)
3. Write your own implementation using the [spec](https://specs.walletconnect.com/2.0/specs/servers/push/spec)

It is recommended that you use WalletConnect Cloud for simplicity and ease of integration. Typically you only need to self-host if you have concerns about our hosted platform having access to your FCM or APNs server credentials, such as for regulatory reasons. If you want to self-host or implement against the spec, please reach out to devrel@walletconnect.com for assistance.

## Setup in WalletConnect Cloud

1. Create a Project in the Cloud App. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/) and sign up for an account.

2. To get your project's Push URL, from the Cloud App, go into the settings tab and click on `Create Push URL`.

![create-push-url](/assets/create-push-url.png)

3. From the same settings tab, you will see the FCM and the APNS settings becomes available to setup. Add your [FCM](#Firebase Cloud Messaging API (FCM v1)) and/or [APNs](#apple-push-notifications-apns) details.

![fmc-and-apns-details-form](/assets/apns-fmc-details.png)

### Firebase Cloud Messaging API (FCM v1)

:::info
If you already have FCM Legacy enabled and then enable FCM v1, push notifications will automatically be sent with the newer FCM v1 API automatically. No migration of devices/apps is necessary.
:::

- In your [Firebase](https://console.firebase.google.com) project settings, under _Firebase Cloud Messaging API (V1)_, click the Manage Service Accounts link
  ![Manage service accounts link](/assets/push-fcmv1-manage-service-accounts.png)
- You may use the default `firebase-adminsdk` service account, but we recommend making a new, minimally privileged, service account. Eg a ready-made role from Firebase `Firebase Cloud Messaging API Admin` would only give access to messaging and notifications:
  - Click the _Create service account_ button
    ![Create service account button](/assets/push-fcmv1-create-sa-button.png)
  - Provide an arbitrary name and ID. E.g. `WalletConnect Cloud Push Server` and click _Create and Continue_
    ![Provide a name](/assets/push-fcmv1-create-sa.png)
  - Select the `Firebase Cloud Messaging API Admin` role and click _Continue_
    ![Select the `Firebase Cloud Messaging API Admin` role](/assets/push-fcmv1-create-sa-grants.png)
  - Click Done
- Next create keys for the service account by clicking on the `⋮` button next to the service account and selecting _Manage keys_  
  ![Manage keys](/assets/push-fcmv1-sa-manage-keys.png)
  - Click _Add key_ -> _Create new key_  
    ![Create new key](/assets/push-fcmv1-sa-new-key.png)
  - Select _JSON_ and click _Create_
  - A `.json` file containing the service account credentials will be automatically downloaded to your computer
- Upload the credentaials JSON file to your Cloud project's FCM V1 settings and click _Save_

You should now see a green checkbox indicating that FCM V1 has been enabled! Now any clients that register themselves on the Push Server will receive FCM push notifications for relay messages to that client.

### Cloud Messaging API (FCM Legacy)

:::caution
FCM Legacy is deprecated and [will be removed June 20, 2024](https://firebase.google.com/docs/cloud-messaging/migrate-v1). We strongly encourage you to setup FCM v1 (above) instead.

![FCM legacy deprecated](/assets/push-fcm-legacy-deprecated.png)

When FCM v1 is enabled in WalletConnect Cloud, it will replace the use of the legacy FCM API. No migration of devices/apps is necessary.
:::

Google's FCM allows you to use send notifications to both Android and Apple devices. At this time, we only support apps using the FCM client API.

- Enable Legacy Cloud Messaging API in the Firebase project settings
  ![legacy-fcm-cloud-messaging](/assets/legacy-fcm-cloud-messaging-api.png)
- [Set up Android](https://firebase.google.com/docs/cloud-messaging/android/client)
- [Set up Apple](https://firebase.google.com/docs/cloud-messaging/ios/client)

### Apple Push Notifications (APNs)

Apple recommends using a Token-Based Connection for APNS over a Certificate-Based connection. Please refer to their documentation for instructions on obtaining either.

- [Token-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns)
- [Certificate-Based Connection](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
