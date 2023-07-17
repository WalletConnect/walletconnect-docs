# Getting Started

This doc will walk you through how to get your dapp ready to start using the Push API. For simplicity, we're going to say there are two types of push notification a dapp may want to send.

1. Custom Push Nofications: These notifications can be sent from your dapp and are always encrypted. Examples include sending a notification when a user gains a new follower or when someone expresses interest in purchasing their NFT. In this example, we will cover **this** scenario.

2. User Action Push Notifications: Your dapp will send these notifications when you need the user to sign or send a transaction from their wallet. Examples include authorizing your dapp or minting an NFT. These actions must be completed before anything happens. **Push API is not requried** to send these notifications. To read more about User Action Push Notifications, go [here](../../echo/usage.md).

## Implementation

Once you've finished the previous step, you're ready to start implementing the Push API.

### Initialization

The Push Dapp client is responsible for initiating the connection with the cast server and is also in charge of registering and notifying clients. To initialize the Push Dapp client, create a `Push.Dapp.Params.Init` object in the Android Application class with the `CoreClient` and the cast server URL if available. The `Push.Dapp.Params.Init` object will then be passed to the `PushDappClient` initialize function.

The `PushDappClient` should be initialized in the Application class.

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=$projectId"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val appMetaData = Core.Model.AppMetaData(
    name = "Dapp Name",
    description = "Dapp Description",
    url = "Dapp URL",
    icons = /*list of icon URL strings*/,
    redirect = "kotlin-dapp-wc:/request" // Custom Redirect URI
)
CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)
val init = Push.Dapp.Params.Init(core = CoreClient, castUrl = /*optional castUrl*/)
PushDappClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

### Register for Subscriptions

The `PushDappClient` needs a `PushDappClient.Delegate` passed to it for it to be able to expose asynchronous updates sent from the Wallet.

```kotlin
val dappDelegate = object : PushDappClient.Delegate {
    override fun onPushResponse(pushResponse: Push.Dapp.Event.Response) {
        // Triggered when the request has been accepted by the wallet. The pushResponse contains the accepted subscription
    }
    override fun onPushRejected(rejection: Push.Dapp.Event.Rejected) {
        // Triggered when the request has been rejected by the wallet. The rejection contains the reason for the rejection
    }
    override fun onDelete(pushDelete: Push.Dapp.Event.Delete) {
        // Triggered when the wallet deletes the subscription. The pushDelete contains the topic that was deleted
    }
    override fun onError(error: Push.Model.Error) {
        // Triggered when there's an error inside the SDK
    }
}
PushDappClient.setDelegate(dappDelegate)
```

### Request to Send Push Notifications

Send a push subscription request to a wallet on the pairing topic with an account. If successful, return the request ID. If unsuccessful, return the error.

```kotlin
val account = // CAIP-10 compliant account address
val pairingTopic = //pairing topic
val requestParams = Push.Dapp.Params.Request(account, pairingTopic)
PushDappClient.request(
    requestParams,
    onSuccess = { pushRequestId: Push.Dapp.Model.RequestId ->
        // callback for when the request has been sent successfully
    },
    onError = { pushError: Push.Model.Error ->
        // callback for when the request has failed
    }
)
```

### Send a Push Notification

With an active push subscription, send a notification to a wallet on the established push topic. If unsuccessful, an error is returned in the callback.

```kotlin
val pushTopic = // active push subscription topic
val pushMessage = Push.Model.Message(
    title = /*title*/,
    body = /*body*/,
    icon = /*icon url*/,
    url = /*url*/
)
val notifyParams = Push.Dapp.Params.Notify(pushTopic, pushMessage)
PushDappClient.notify(notifyParams) { error ->
    // callback for when the notify has failed
}
```

### Get Active Subscriptions

Get a list of all the active subscriptions. Returns a map with the topic as the key and `Push.Model.Subscription` as the value.

```kotlin
PushDappClient.getActiveSubscriptions()
```

### Delete a Subscription

To delete a subscription, pass `Push.Dapp.Params.Delete` with the push topic that is to be deleted. If unsuccessful, an error is returned in the callback.

```kotlin
val pushTopic = // active push subscription topic
val deleteParams = Push.Dapp.Params.Delete(topic = pushTopic)
PushDappClient.delete(deleteParams) { error ->
    // callback for when the delete has failed
}
```
