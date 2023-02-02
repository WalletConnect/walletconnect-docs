# Wallet Usage


### Initialize Push Client

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=$projectId"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val appMetaData = Core.Model.AppMetaData(
    name = "Dapp Name",
    description = "Dapp Description",
    url = "Dapp Url",
    icons = /*list of icon url strings*/,
    redirect = "kotlin-dapp-wc:/request" // Custom Redirect URI
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)

val init = Push.Wallet.Params.Init(CoreClient)

PushWalletClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

The Push Wallet client is responsible for resubscribing to existing subscriptions. To initialize the Push Wallet client, create a `Push.Wallet.Params.Init` object in the Android Application class with the `CoreClient`. The `Push.Wallet.Params.Init` object will then be passed to the `PushWalletClient` initialize function.

The `PushWalletClient` should be initialized in the Application class.

### PushWalletClient.Delegate

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

The PushWalletClient needs a `PushWalletClient.Delegate` passed to it for it to be able to expose asynchronous updates sent from the Dapp

### Approve Request

```kotlin
val approveParams = Push.Wallet.Params.Approve(id = /*request ID*/)

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

To send an approval for the subscription request, pass `Push.Wallet.Params.Approve` to the `PushWalletClient.approve` function to establish a subscription and notify the Dapp.

### Reject Request

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

To send a rejection for the subscription request, pass `Push.Wallet.Params.Reject` to the `PushWalletClient.reject` function to reject the subscription request and notify the Dapp.

### Get a Map of Active Subscriptions
To get a list of all the active subscriptions, call the `getActiveSubscriptions` function. It will return a map with the topic as the key and `Push.Model.Subscription` as the value.
```kotlin
PushWalletClient.getActiveSubscriptions()
```


### Delete

```kotlin
val pushTopic = // active push subscription topic
val deleteParams = Push.Wallet.Params.Delete(topic = pushTopic)

PushWalletClient.delete(deleteParams) { error ->
    // callback for when the delete has failed
}
```

To delete a subscription, pass `Push.Wallet.Params.Delete` with the push topic that is to be deleted. If unsuccessful, an error is returned in the callback.

### Decrypt Message

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

To decrypt a message sent by Echo server, pass the topic and encrypted message into `Push.Wallet.Params.DecryptMessage`. Pass the variable into `PushWalletClient.decryptMessage` and use the `onSuccess` and `onError` callbacks to react to the result.

### PushMessageService

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

The `PushMessageService` is a wrapper around the `FirebaseMessagingService`. This wrapper class needs to be implemented for the Push SDK to be able to decrypt and notify wallets of a push notification sent from the Dapp in the background. 
This service also needs to be registered in the AndroidManifest.xml file similar to the example in the [FCM documentation](https://firebase.google.com/docs/cloud-messaging/android/client#manifest).