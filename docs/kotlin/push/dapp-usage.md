# Dapp Usage


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
val init = Push.Dapp.Params.Init(core = CoreClient, castUrl = /*optional castUrl*/)
PushDappClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

The Push Dapp client is responsible for initiating the connection with the cast server and is also in charge of registering and notifying clients. To initialize the Push Dapp client, create a `Push.Dapp.Params.Init` object in the Android Application class with the `CoreClient` and the cast server url if available. The `Push.Dapp.Params.Init` object will then be passed to the `PushDappClient` initialize function.

The `PushDappClient` should be initalized in the Application class.


### PushDappClient.Delegate

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

The PushDappClient needs a `PushDappClient.Delegate` passed to it for it to be able to expose asynchronous updates sent from the Wallet.

### Request

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

Send a push subscription request to a wallet on the pairing topic with an account. If successful, return the request ID. If unsuccesful, return the error.

### Notify

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

With an active push subscription, send a notifification to a wallet on the established push topic. If unsuccessful, an error is returned in the callback.

### Get a Map of Active Subscriptions

```kotlin
PushDappClient.getActiveSubscriptions()
```

Get a list of all the active subscriptions. Returns a map with the topic as the key and `Push.Model.Subscription` as the value.

### Delete

```kotlin
val pushTopic = // active push subscription topic
val deleteParams = Push.Dapp.Params.Delete(topic = pushTopic)
PushDappClient.delete(deleteParams) { error ->
    // callback for when the delete has failed
}
```

To delete a subscription, pass `Push.Dapp.Params.Delete` with the push topic that is to be deleted. If unsuccessful, an error is returned in the callback.