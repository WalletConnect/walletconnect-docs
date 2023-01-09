# Dapp Usage


### **Initialize Sign Client**

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

val init = Sign.Params.Init(core = CoreClient)

SignClient.initialize(init) { error ->
    // Error will be thrown if there's an isssue during initalization
}
```

The Dapp client is responsible for initiating the connection with wallets and defining the required namespaces (CAIP-2) from the Wallet and is also in charge of sending requests. To initialize the Sign client, create a `Sign.Params.Init` object in the Android Application class with the Core Client. The `Sign.Params.Init` object will then be passed to the `SignClient` initialize function.

#
## **Dapp**

### **SignClient.DappDelegate**

```kotlin
val dappDelegate = object : SignClient.DappDelegate {
    override fun onSessionApproved(approvedSession: Sign.Model.ApprovedSession) {
        // Triggered when Dapp receives the session approval from wallet
    }

    override fun onSessionRejected(rejectedSession: Sign.Model.RejectedSession) {
        // Triggered when Dapp receives the session rejection from wallet
    }

    override fun onSessionUpdate(updatedSession: Sign.Model.UpdatedSession) {
        // Triggered when Dapp receives the session update from wallet
    }

    override fun onSessionExtend(session: Sign.Model.Session) {
        // Triggered when Dapp receives the session extend from wallet
    }

    override fun onSessionEvent(sessionEvent: Sign.Model.SessionEvent) {
        // Triggered when the peer emits events that match the list of events agreed upon session settlement
    }

    override fun onSessionDelete(deletedSession: Sign.Model.DeletedSession) {
        // Triggered when Dapp receives the session delete from wallet
    }

    override fun onSessionRequestResponse(response: Sign.Model.SessionRequestResponse) {
        // Triggered when Dapp receives the session request response from wallet
    }

    override fun onConnectionStateChange(state: Sign.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }

    override fun onError(error: Sign.Model.Error) {
        // Triggered whenever there is an issue inside the SDK
    }
}

SignClient.setDappDelegate(dappDelegate)
```

The SignClient needs a `SignClient.DappDelegate` passed to it for it to be able to expose asynchronously updates sent from the Wallet.

#

### **Connect**

```kotlin
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val chains: List<String> = /*List of chains that wallet will be requested for*/
val methods: List<String> = /*List of methods that wallet will be requested for*/
val events: List<String> = /*List of events that wallet will be requested for*/
val namespaces: Map<String, Sign.Model.Namespaces.Proposal> = mapOf(namespace, Sign.Model.Namespaces.Proposal(accounts, methods, events))
val pairing: Core.Model.Pairing = /*Either an active or inactive pairing*/
val connectParams = Sign.Params.Connect(namespaces, pairing)

fun SignClient.connect(connectParams, 
    { onSuccess -> 
        /*callback that returns letting you know that you have successfully initiated connecting*/ 
    }, 
    { error -> 
        /*callback for error while trying to initiate a connection with a peer*/ 
    }
)
```

#
### **Get List of Settled Sessions**

```kotlin
SignClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `SignClient.getListOfSettledSessions()` which will return a list of type `Session`.

#
### **Get list of pending session requests for a topic**

```kotlin
SignClient.getPendingRequests(topic: String)
```

To get a list of pending session requests for a topic, call `SignClient.getPendingRequests()` and pass a topic which will return
a `PendingRequest` object containing requestId, method, chainIs and params for pending request.

#
## Project ID

For the Project ID look at [Project ID](https://www.walletconnect.com).
