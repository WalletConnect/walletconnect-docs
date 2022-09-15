# Dapp Usage


### **Initialize Sign Client**

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL

RelayClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this)

val appMetaData = Sign.Model.AppMetaData(
    name = "Wallet Name",
    description = "Wallet Description",
    url = "Wallet Url",
    icons = listOfIconUrlStrings,
    redirect = "kotlin-dapp-wc:/request"
)
val init = Sign.Params.Init(relay = RelayClient, appMetaData = appMetaData)

SignClient.initalize(init)
```

The wallet client will always be responsible for exposing accounts (CAPI10 compatible) to a Dapp and therefore is also in charge of signing.
To initialize the Sign client, create a `Sign.Params.Init` object in the Android Application class. The Init object will need the
initialized firstly RelayClient instance and the apps's AppMetaData. The `Sign.Params.Init` object will then be passed to the `SignClient`
initialize function.

For more contex on how to initialize RelayClient, go to [RelayClient docs](../../kotlin/guides/relay.md) section.


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
}
SignClient.setWalletDelegate(dappDelegate)
```

The SignClient needs a `SignClient.DappDelegate` passed to it for it to be able to expose asynchronously updates sent from the Wallet.



### **Connect**

```kotlin
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val chains: List<String> = /*List of chains that wallet will be requested for*/
val methods: List<String> = /*List of methods that wallet will be requested for*/
val events: List<String> = /*List of events that wallet will be requested for*/
val namespaces: Map<String, Sign.Model.Namespaces.Proposal> = mapOf(namespace, Sign.Model.Namespaces.Proposal(accounts, methods, events))
val pairingTopic: String? =  /* Optional parameter, use it when the pairing between peers is already established*/
val connectParams = Sign.Params.Connect(namespaces, pairingTopic)

fun SignClient.connect(connectParams, { proposedSequence -> /*callback that returns the WalletConnect.Model.ProposedSequence*/ }, { error -> /*callback for error while sending session proposal*/ })
```

The `SignClient.connect` asynchronously exposes the pairing URI that is shared with wallet out of bound, as qr code or mobile linking. The
Sign.Model.ProposedSequence returns either a Pairing or Session flag depending on if there is already an established pairing between peers.
To establish a session between peers, pass the existing pairing's topic to the connect method. The SDK will send the SessionProposal under
the hood for the given topic and expect session approval or rejection in onSessionApproved and onSessionRejected in DappDelegate
accordingly.



### **Get List of Settled Sessions**

```kotlin
SignClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `SignClient.getListOfSettledSessions()` which will return a list of type `Session`.



### **Get List of Settled Pairings**

```kotlin
SignClient.getListOfSettledPairings()
```

To get a list of the most current settled pairings, call `SignClient.getListOfSettledPairings()` which will return a list of type `Pairing`.



### **Get list of pending session requests for a topic**

```kotlin
SignClient.getPendingRequests(topic: String)
```

To get a list of pending session requests for a topic, call `SignClient.getPendingRequests()` and pass a topic which will return
a `PendingRequest` object containing requestId, method, chainIs and params for pending request.



## Project ID

For the Project ID look at [Project ID](https://www.walletconnect.com).
