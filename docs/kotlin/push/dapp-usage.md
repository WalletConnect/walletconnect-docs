# Dapp Usage


### **Initialize Push Client**

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

The Push Dapp client is responsible for initiating the connection with the cast server and is also in charge of registering and notifying clients. To initialize the Push Dapp client, create a `Push.Dapp.Params.Init` object in the Android Application class with the Core Client and the cast server url if available. The `Push.Dapp.Params.Init` object will then be passed to the `PushDappClient` initialize function.

#

### **PushDappClient.Delegate**

```kotlin
val dappDelegate = object : PushDappClient.Delegate {
    override fun onPushResponse(pushResponse: Push.Dapp.Event.Response) {
        // Triggered when 
    }

    override fun onPushRejected(rejection: Push.Dapp.Event.Rejected) {
        // Triggered when 
    }

    override fun onDelete(pushDelete: Push.Dapp.Event.Delete) {
        // Triggered when 
    }

    override fun onError(error: Push.Model.Error) {
        // Triggered when 
    }
}

PushDappClient.setDelegate(dappDelegate)
```

The PushDappClient needs a `PushDappClient.Delegate` passed to it for it to be able to expose asynchronous updates sent from the Wallet.

#
### **Request**

```kotlin
val account = //account address
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

Send a request to the Wallet to register

#
### **Notify**

```kotlin
SignClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `SignClient.getListOfSettledSessions()` which will return a list of type `Session`.

#
### **getActiveSubscriptions**

```kotlin
SignClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `SignClient.getListOfSettledSessions()` which will return a list of type `Session`.

#
### **Delete**

```kotlin
SignClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `SignClient.getListOfSettledSessions()` which will return a list of type `Session`.
