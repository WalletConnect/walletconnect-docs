# Wallet Usage


### **Initialize Sign Client**

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

val init = Sign.Params.Init(core = CoreClient)

SignClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

The wallet client will always be responsible for exposing accounts (CAPI10 compatible) to a Dapp and therefore is also in charge of signing.
To initialize the Sign client, create a `Sign.Params.Init` object in the Android Application class with the Core Client. The `Sign.Params.Init` object will then be passed to the `SignClient`initialize function.

## **Wallet**

### **SignClient.WalletDelegate**

```kotlin
val walletDelegate = object : SignClient.WalletDelegate {
    override fun onSessionProposal(sessionProposal: Sign.Model.SessionProposal, verifyContext: Sign.Model.VerifyContext) {
        // Triggered when wallet receives the session proposal sent by a Dapp
    }

    override fun onSessionRequest(sessionRequest: Sign.Model.SessionRequest, verifyContext: Sign.Model.VerifyContext) {
        // Triggered when a Dapp sends SessionRequest to sign a transaction or a message
    }

    override fun onSessionDelete(deletedSession: Sign.Model.DeletedSession) {
        // Triggered when the session is deleted by the peer
    }

    override fun onSessionSettleResponse(settleSessionResponse: Sign.Model.SettledSessionResponse) {
        // Triggered when wallet receives the session settlement response from Dapp
    }

    override fun onSessionUpdateResponse(sessionUpdateResponse: Sign.Model.SessionUpdateResponse) {
        // Triggered when wallet receives the session update response from Dapp
    }

    override fun onConnectionStateChange(state: Sign.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }

    override fun onError(error: Sign.Model.Error) {
        // Triggered whenever there is an issue inside the SDK
    }
}
SignClient.setWalletDelegate(walletDelegate)
```

`Sign.Model.VerifyContext` provides a domain verification information about SessionProposal and SessionRequest. It consists of origin of a Dapp from where the request has been sent, validation Enum that says whether origin is VALID, INVALID or UNKNOWN and verify url server. 

```kotlin
data class VerifyContext(
    val id: Long,
    val origin: String,
    val validation: Model.Validation,
    val verifyUrl: String
)

enum class Validation {
    VALID, INVALID, UNKNOWN
}
```

The SignClient needs a `SignClient.WalletDelegate` passed to it for it to be able to expose asynchronous updates sent from the Dapp.

#

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

#

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


#
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


#
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


#
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


#
### **Session Extend**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val extendParams = Sign.Params.Extend(sessionTopic = sessionTopic)

SignClient.extend(extendParams) { error -> /*callback for error while extending a session*/ }
```

To extend a session, create a `Sign.Params.Extend` object with the session's topic to update the session with to `Sign.Extend`. Session is
extended by 7 days.



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

SignClient.ping(pingParams, listener)
```

To ping a peer with a session, call `SignClient.ping` with the `Sign.Params.Ping` with a session's topic. If ping is successful, topic is
echo'd in listener.
