# Getting Started

This page will walk you through how to get your wallet ready to start using the Push API. For simplicity, we're going to say there are two types of push notification a wallet may want to receive.

1. Custom Push Nofications: These notifications can be rendered within your wallet and are always encrypted. Examples include receiving a notification when you have a new follower or when someone wants to buy your NFT. In this example, we will cover **this** scenario.

2. User Action Push Notifications: Your wallet will receive these notifications when you need to sign or send a transaction. Examples include authorizing your wallet or minting an NFT. These actions must be completed before anything happens. **Push API is not requried** to receive these notifications. To read more about User Action Push Notifications, go [here](../../echo/usage.md).

### Prerequisite

:::tip
Setup [WalletConnect Cloud](https://cloud.walletconnect.com/) with Firebase. Instructions on setting up the Echo Server can be found [here](../../../advanced/echo-server.md#hosted-platform-recommended).
:::

**Android BOM** ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-bom)

### Requirements

* Android min SDK 23
* Java 11

## Installation
root/build.gradle.kts:
```gradle
allprojects {
 repositories {
    mavenCentral()
    maven { url "https://jitpack.io" }
 }
}
```

app/build.gradle.kts

```gradle
implementation(platform("com.walletconnect:android-bom::release_version"))
implementation("com.walletconnect:android-core")
implementation("com.walletconnect:push")
```

## Implementation

Once you've finished the previous step, you're ready to start implementing the Push API.

### Initialization

The Push Wallet client is responsible for creating and maintaining subscriptions. To initialize the Push Wallet client, create a `Push.Wallet.Params.Init` object in the Android Application class with the `CoreClient`. The `Push.Wallet.Params.Init` object will then be passed to the `PushWalletClient` initialize function.

`PushWalletClient` should be initialized in the Application class.

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=$projectId"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val appMetaData = Core.Model.AppMetaData(
    name = "Wallet Name",
    description = "Wallet Description",
    url = "Wallet Url",
    icons = /*list of icon url strings*/,
    redirect = "kotlin-wallet-wc:/request" // Custom Redirect URI
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)

val init = Push.Wallet.Params.Init(CoreClient)

PushWalletClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

### Register for Push Notifications

The `PushMessageService` is a wrapper around the `FirebaseMessagingService`. This wrapper class needs to be implemented for the Push SDK to be able to decrypt and notify wallets of a push notification sent from the Dapp in the background. 
This service also needs to be registered in the AndroidManifest.xml file similar to the example in the [FCM documentation](https://firebase.google.com/docs/cloud-messaging/android/client#manifest).

```kotlin
class CustomFirebaseService: PushMessageService() {

    override fun newToken(token: String) {
        // Triggered when Firebase Cloud Messaging creates a new token and that token is registered with the Echo server
    }

    override fun registeringFailed(token: String, throwable: Throwable) {
        // Triggered when Firebase Cloud Messaging if there is an error with registering with the Echo server with a new token
    }

    override fun onMessage(message: Push.Model.Message, originalMessage: RemoteMessage) {
        // Triggered when a message is sent from the Echo server through Firebase Cloud Messaging and the message contains `Push.Model.Message`. The original FCM RemoteMessage is also returned
    }

    override fun onDefaultBehavior(message: RemoteMessage) {
        // Triggered when a message is sent from the Echo server through Firebase Cloud Messaging and the message does not contain `Push.Model.Message`. The original FCM RemoteMessage returned instead
    }

    override fun onError(throwable: Throwable, defaultMessage: RemoteMessage) {
        // Triggered when there is an error that occurs when a message is received from the Echo server
    }
}
```

```xml
<application...>
    <service
        android:name=".CustomFirebaseService">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>
</application>
```

### Register for Subscriptions

`PushWalletClient` needs a `PushWalletClient.Delegate` passed to it for it to be able to expose asynchronous updates sent from the dapp.

```kotlin
val walletDelegate = object : PushWalletClient.Delegate {
    override fun onPushRequest(pushRequest: Push.Wallet.Event.Request) {
        // Triggered when a request has been sent by the Dapp. The pushRequest contains the request ID
    }

    override fun onPushMessage(message: Push.Wallet.Event.Message) {
        // Triggered when a message has been sent by the Dapp. The message contains the title, body, icon, and url
    }

    override fun onPushDelete(pushDeletedTopic: Push.Wallet.Event.Delete) {
        // Triggered when the Dapp deletes the subscription. The pushDelete contains the topic that was deleted
    }

    override fun onError(error: Push.Model.Error) {
        // Triggered when there's an error inside the SDK
    }
}

PushWalletClient.setDelegate(walletDelegate)
```

### Approve Request

To send an approval for the subscription request, pass `Push.Wallet.Params.Approve` to the `PushWalletClient.approve` function to establish a subscription and notify the Dapp. The request id for `Push.Wallet.Params.Approve` will be available from the `Push.Wallet.Event.Request` of `onPushRequest` from the PushWalletClient.Delegate

```kotlin
val approveParams = Push.Wallet.Params.Approve(id = /*request ID*/, onSign = {/*12*/})

PushWalletClient.approve(
    params = approveParams,
    onSuccess = { 
        // callback for when the approval is successful
    },
    onError = { error: Push.Model.Error ->
        // callback for when the approval has failed
    }
)
```

### Reject Request

To send a rejection for the subscription request, pass `Push.Wallet.Params.Reject` to the `PushWalletClient.reject` function to reject the subscription request and notify the Dapp. The request id for `Push.Wallet.Params.Approve` will be available from the `Push.Wallet.Event.Request` of `onPushRequest` from the PushWalletClient.Delegate.

```kotlin
val rejectParams = Push.Wallet.Params.Reject(id = /*request ID*/, reason = /*Error Reason*/)

PushWalletClient.reject(
    rejectParams,
    onSuccess = { 
        // callback for when the rejection is successful
    },
    onError = { error: Push.Model.Error ->
        // callback for when the rejection has failed
    }
)
```

### Get Active Subscriptions

To get a list of all the active subscriptions, call the `getActiveSubscriptions` function. It will return a map with the topic as the key and `Push.Model.Subscription` as the value.

```kotlin
PushWalletClient.getActiveSubscriptions()
```

### Delete Subscription

```kotlin
val pushTopic = // active push subscription topic
val deleteParams = Push.Wallet.Params.Delete(topic = pushTopic)

PushWalletClient.delete(deleteParams) { error ->
    // callback for when the delete has failed
}
```

To delete a subscription, pass `Push.Wallet.Params.Delete` with the push topic that is to be deleted. If unsuccessful, an error is returned in the callback. The pushTopic can be fetched from the `PushWalletClient.getActiveSubscriptions()`

### Decrypt Message

To decrypt a message sent by Echo server, pass the topic and encrypted message into `Push.Wallet.Params.DecryptMessage`. Pass the variable into `PushWalletClient.decryptMessage` and use the `onSuccess` and `onError` callbacks to react to the result. This function is not needed when using the `PushMessageService`.

```kotlin
val encryptedMessage = Push.Wallet.Params.DecryptMessage(topic = /*topic*/, encryptedMessage = /*encrypted message*/)

PushWalletClient.decryptMessage(
    encryptedMessage,
    onSuccess = { pushMessage: Push.Model.Message -> 
        // callback for when the decryption is successful
    },
    onError = { error: Push.Model.Error -> 
        // callback for when the decryption has failed
    }
)
```
