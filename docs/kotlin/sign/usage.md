# Usage

### **Initialize Sign Client**

```kotlin
val appMetaData = Sign.Model.AppMetaData(
    name = "Wallet Name",
    description = "Wallet Description",
    url = "Wallet Url",
    icons = listOfIconUrlStrings
)

val connectionType = Sign.ConnectionType.AUTOMATIC or Sign.ConnectionType.MANUAL

val init = Sign.Params.Init(
    application = application,
    relayServerUrl = /*websocket server with scheme, authority, and projectId as query parameter*/
    appMetaData = appMetaData,
    connectionType = connectionType
)

// or

val init = Sign.Params.Init(
    application = application,
    useTls = /*true or false*/,
    hostName = /*websocket server with scheme and authority*/,
    projectId = /*projectId*/,
    appMetaData = appMetaData,
    connectionType = connectionType
)

SignClient.initalize(init)
```

The wallet client will always be responsible for exposing accounts (CAPI10 compatible) to a Dapp and therefore is also in charge of signing.
To initialize the Sign client, create a `Sign.Params.Init` object in the Android Application class. The Init object will need the
application class, the Project ID, and the apps's AppMetaData. The `Sign.Params.Init` object will then be passed to the `SignClient`
initialize function. `Sign.Params.Init` also allows for custom URLs by passing URL string into the `hostName` property.

We allow developers to choose between the `Sign.ConnectionType.MANUAL` and `Sign.ConnectionType.AUTOMATIC`connection type. The default
one(`Sign.ConnectionType.AUTOMATIC`) disconnects wss connection when app enters background and reconnects when app is brought back to the
foreground. The `Sign.ConnectionType.MANUAL` allows developers to control when to open WebSocket connection and when to close it.
Accordingly, `SignClient.WebSocket.open()` and `SignClient.WebSocket.close()`.

Above, there are two example on how to create the initalizing parameters.

&nbsp;

## **Wallet**

### **SignClient.WalletDelegate**

```kotlin
val walletDelegate = object : SignClient.WalletDelegate {
    override fun onSessionProposal(sessionProposal: Sign.Model.SessionProposal) {
        // Triggered when wallet receives the session proposal sent by a Dapp
    }

    override fun onSessionRequest(sessionRequest: Sign.Model.SessionRequest) {
        // Triggered when a Dapp sends SessionRequest to sign a transaction or a message
    }

    override fun onSessionDelete(deletedSession: Sign.Model.DeletedSession) {
        // Triggered when the session is deleted by the peer
    }

    override fun onSessionSettleResponse(settleSessionResponse: Sign.Model.SettledSessionResponse) {
        // Triggered when wallet receives the session settlement response from Dapp
    }

    fun onSessionUpdateResponse(sessionUpdateResponse: Sign.Model.SessionUpdateResponse) {
        // Triggered when wallet receives the session update response from Dapp
    }

    fun onConnectionStateChange(state: Sign.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }
}
SignClient.setWalletDelegate(walletDelegate)
```

The SignClient needs a `SignClient.WalletDelegate` passed to it for it to be able to expose asynchronous updates sent from the Dapp.

&nbsp;

### **Pair Clients**

```kotlin
val pair = Sign.Params.Pair("wc:...")
SignClient.pair(pair)
```

To pair the wallet with the Dapp, call the SignClient.pair function which needs a `Sign.Params.Pair` parameter.
`Sign.Params.Pair` is where the WC Uri will be passed.

&nbsp;

### **Session Approval**

NOTE: addresses provided in `accounts` array should follow [CAPI10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md)
semantics.

```kotlin
val proposerPublicKey: String = /*Proposer publicKey from SessionProposal object*/
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val accounts: List<String> = /*List of accounts on chains*/
val methods: List<String> = /*List of methods that wallet approves*/
val events: List<String> = /*List of events that wallet approves*/
val namespaces: Map<String, Sign.Model.Namespaces.Session> = mapOf(namespace, Sign.Model.Namespaces.Session(accounts, methods, events))

val approveParams: Sign.Params.Approve = Sign.Params.Approve(proposerPublicKey, namespaces)
SignClient.approveSession(approveParams) { error -> /*callback for error while approving a session*/ }
```

To send an approval, pass a Proposer's Public Key along with the map of namespaces to the `SignClient.approveSession` function.

&nbsp;

### **Session Rejection**

```kotlin
val proposerPublicKey: String = /*Proposer publicKey from SessionProposal object*/
val rejectionReason: String = /*The reason for rejecting the Session Proposal*/
val rejectionCode: String = /*The code for rejecting the Session Proposal*/
For reference use CAIP-25: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md

val rejectParams: Sign.Params.Reject = Reject(proposerPublicKey, rejectionReason, rejectionCode)
SignClient.rejectSession(rejectParams) { error -> /*callback for error while rejecting a session*/ }
```

To send a rejection for the Session Proposal, pass a proposerPublicKey, rejection reason and rejection code to
the `SignClient.rejectSession` function.

&nbsp;

### **Session Disconnect**

```kotlin
val disconnectionReason: String = /*The reason for disconnecting the Session*/
val disconnectionCode: String = /*The code for for disconnecting the Session*/
val sessionTopic: String = /*Topic from the Session*/
For reference use CAIP-25: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md
val disconnectParams = Sign.Params.Disconnect(sessionTopic, disconnectionReason, disconnectionCode)

SignClient.disconnect(disconnectParams) { error -> /*callback for error while disconnecting a session*/ }
```

To disconnect from a settled session, pass a disconnection reason with code and the Session topic to the `SignClient.disconnect`
function.

&nbsp;

### **Respond Request**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val jsonRpcResponse: Sign.Model.JsonRpcResponse.JsonRpcResult = /*Settled Session Request ID along with request data*/
val result = Sign.Params.Response(sessionTopic = sessionTopic, jsonRpcResponse = jsonRpcResponse)

SignClient.respond(result) { error -> /*callback for error while responding session request*/ }
```

To respond to JSON-RPC method that were sent from Dapps for a session, submit a `Sign.Params.Response` with the session's topic and request
ID along with the respond data to the `SignClient.respond` function.

### **Reject Request**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val jsonRpcResponseError: Sign.Model.JsonRpcResponse.JsonRpcError = /*Session Request ID along with error code and message*/
val result = Sign.Params.Response(sessionTopic = sessionTopic, jsonRpcResponse = jsonRpcResponseError)

SignClient.respond(result) { error -> /*callback for error while responding session request*/ }
```

To reject a JSON-RPC method that was sent from a Dapps for a session, submit a `Sign.Params.Response` with the settled session's topic and
request ID along with the rejection data to the `SignClient.respond` function.

&nbsp;

### **Session Update**

NOTE: addresses provided in `accounts` array should follow [CAPI10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md)
semantics.

```kotlin
val sessionTopic: String = /*Topic of Session*/
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val accounts: List<String> = /*List of accounts on chains*/
val methods: List<String> = /*List of methods that wallet approves*/
val events: List<String> = /*List of events that wallet approves*/
val namespaces: Map<String, Sign.Model.Namespaces.Session> = mapOf(namespace, Sign.Model.Namespaces.Session(accounts, methods, events))
val updateParams = Sign.Params.Update(sessionTopic, namespaces)

SignClient.update(updateParams) { error -> /*callback for error while sending session update*/ }
```

To update a session with namespaces, submit a `Sing.Params.Update` object with the session's topic and namespaces to update session with
to `SignClient.Update`.

&nbsp;

### **Session Extend**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val extendParams = Sign.Params.Extend(sessionTopic = sessionTopic)

WalletConnectClient.extend(exdendParams) { error -> /*callback for error while extending a session*/ }
```

To extend a session, create a `Sign.Params.Extend` object with the session's topic to update the session with to `Sign.Extend`. Session is
extended by 7 days.

&nbsp;

### **Session Ping**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val pingParams = Sign.Params.Ping(sessionTopic)
val listener = object : Sign.Listeners.SessionPing {
    override fun onSuccess(pingSuccess: Model.Ping.Success) {
        // Topic being pinged
    }

    override fun onError(pingError: Model.Ping.Error) {
        // Error
    }
}

WalletConnectClient.ping(pingParams, listener)
```

To ping a peer with a session, call `SignClient.ping` with the `Sign.Params.Ping` with a session's topic. If ping is successful, topic is
echo'd in listener.

&nbsp;

&nbsp;

## **Daap**

### **SignClient.DappDelegate**

```kotlin
val dappDelegate = object : SignClient.DappDelegate {
    override fun onSessionApproved(approvedSession: Sign.Model.ApprovedSession) {
        // Triggered when Dapp receives the session approval from wallet
    }

    override fun onSessionRejected(rejectedSession: Sign.Model.RejectedSession) {
        // Triggered when Dapp receives the session rejection from wallet
    }

    fun onSessionUpdate(updatedSession: Sign.Model.UpdatedSession) {
        // Triggered when Dapp receives the session update from wallet
    }

    fun onSessionExtend(session: Sign.Model.Session) {
        // Triggered when Dapp receives the session extend from wallet
    }

    override fun onSessionEvent(sessionEvent: Sign.Model.SessionEvent) {
        // Triggered when the peer emits events that match the list of events agreed upon session settlement
    }

    fun onSessionDelete(deletedSession: Sign.Model.DeletedSession) {
        // Triggered when Dapp receives the session delete from wallet
    }

    fun onSessionRequestResponse(response: Sign.Model.SessionRequestResponse) {
        // Triggered when Dapp receives the session request response from wallet
    }

    fun onConnectionStateChange(state: Sign.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }
}
SignClient.setWalletDelegate(dappDelegate)
```

The SignClient needs a `SignClient.DappDelegate` passed to it for it to be able to expose asynchronously updates sent from the Wallet.

&nbsp;

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

&nbsp;

### **Get List of Settled Sessions**

```kotlin
SignClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `SignClient.getListOfSettledSessions()` which will return a list of type `Session`.

&nbsp;

### **Get List of Settled Pairings**

```kotlin
SignClient.getListOfSettledPairings()
```

To get a list of the most current settled pairings, call `SignClient.getListOfSettledPairings()` which will return a list of type `Pairing`.

&nbsp;

### **Get list of pending session requests for a topic**

```kotlin
SignClient.getPendingRequests(topic: String)
```

To get a list of pending session requests for a topic, call `SignClient.getPendingRequests()` and pass a topic which will return
a `PendingRequest` object containing requestId, method, chainIs and params for pending request.

&nbsp;

## Project ID

For the Project ID look at [Project ID](../../api/project-id.md).
