# Wallet's Echo Client Usage 

The Echo SDK enables wallets to receive push notifications from WalletConnect's Echo Server via [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging). This means you will have to setup your project with Firebase before being able to use the `EchoClient`.  

### Prerequisites

Make sure that a service extending the FirebaseMessagingService is added to your manifest as per the [Firebase FCM documentation](https://firebase.google.com/docs/cloud-messaging/android/client#manifest) as well as any other setup Firebase requires [Firebase setup documentation](https://firebase.google.com/docs/android/setup).

### Register Device Token

To register a wallet to receive WalletConnect push notifications, call `CoreClient.Echo.register` and pass the Firebase Access Token.

```kotlin
val firebaseAccessToken: String = //FCM access token received through the Firebase Messaging SDK

CoreClient.Echo.register(
    firebaseAccessToken,
    onSuccess = {
        // callback triggered once registered successfully with the Echo Server
    },
    onError = { error: Throwable ->
        // callback triggered if there's an exception thrown during the registration process
    })
```
