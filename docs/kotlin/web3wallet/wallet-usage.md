# Wallet Usage

### **Initialize Web3Wallet Client**

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

val initParams = Wallet.Params.Init(core = CoreClient)

Web3Wallet.initialize(initParams) { error ->
    // Error will be thrown if there's an issue during initalization
}
```

The Web3Wallet client will always be responsible for exposing accounts (CAPI10 compatible) to a Dapp and therefore is also in charge of signing.
To initialize the Web3Wallet client, create a `Wallet.Params.Init` object in the Android Application class with the Core Client. The `Wallet.Params.Init` object will then be passed to the `Web3Wallet`initialize function.

### **Web3Wallet.WalletDelegate**

```kotlin
val walletDelegate = object : Web3Wallet.WalletDelegate {
    override fun onSessionProposal(sessionProposal: Wallet.Model.SessionProposal) {
        // Triggered when wallet receives the session proposal sent by a Dapp
    }

    override fun onSessionRequest(sessionRequest: Wallet.Model.SessionRequest) {
        // Triggered when a Dapp sends SessionRequest to sign a transaction or a message
    }

    override fun onAuthRequest(authRequest: Wallet.Model.AuthRequest) {
        // Triggered when Dapp / Requester makes an authorisation request
    }

    override fun onSessionDelete(sessionDelete: Wallet.Model.SessionDelete) {
        // Triggered when the session is deleted by the peer
    }

    override fun onSessionSettleResponse(settleSessionResponse: Wallet.Model.SettledSessionResponse) {
        // Triggered when wallet receives the session settlement response from Dapp
    }

    override fun onSessionUpdateResponse(sessionUpdateResponse: Wallet.Model.SessionUpdateResponse) {
        // Triggered when wallet receives the session update response from Dapp
    }

    override fun onConnectionStateChange(state: Wallet.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }

    override fun onError(error: Wallet.Model.Error) {
        // Triggered whenever there is an issue inside the SDK
    }
}
Web3Wallet.setWalletDelegate(walletDelegate)
```

The Web3Wallet needs a `Web3Wallet.WalletDelegate` passed to it for it to be able to expose asynchronous updates sent from the Dapp.

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
val namespaces: Map<String, Wallet.Model.Namespaces.Session> = mapOf(namespace, Wallet.Model.Namespaces.Session(accounts, methods, events))

val approveParams: Wallet.Params.SessionApprove = Wallet.Params.SessionApprove(proposerPublicKey, namespaces)
Web3Wallet.approveSession(approveParams) { error -> /*callback for error while approving a session*/ }
```

To send an approval, pass a Proposer's Public Key along with the map of namespaces to the `Web3Wallet.approveSession` function.

#

### **Session Rejection**

```kotlin
val proposerPublicKey: String = /*Proposer publicKey from SessionProposal object*/
val rejectionReason: String = /*The reason for rejecting the Session Proposal*/
val rejectionCode: String = /*The code for rejecting the Session Proposal*/
For reference use CAIP-25: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md

val rejectParams: Wallet.Params.SessionReject = SessionReject(proposerPublicKey, rejectionReason, rejectionCode)
Web3Wallet.rejectSession(rejectParams) { error -> /*callback for error while rejecting a session*/ }
```

To send a rejection for the Session Proposal, pass a proposerPublicKey, rejection reason and rejection code to
the `Web3Wallet.rejectSession` function.


#
### **Session Disconnect**

```kotlin
val disconnectionReason: String = /*The reason for disconnecting the Session*/
val disconnectionCode: String = /*The code for for disconnecting the Session*/
val sessionTopic: String = /*Topic from the Session*/
For reference use CAIP-25: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md
val disconnectParams = Wallet.Params.SessionDisconnect(sessionTopic, disconnectionReason, disconnectionCode)

Web3Wallet.disconnectSession(disconnectParams) { error -> /*callback for error while disconnecting a session*/ }
```

To disconnect from un active session, pass a disconnection reason with code and the Session topic to the `Web3Wallet.disconnectSession`
function.


#
### **Respond Request**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val jsonRpcResponse: Wallet.Model.JsonRpcResponse.JsonRpcResult = /*Active Session Request ID along with request data*/
val result = Wallet.Params.SessionRequestResponse(sessionTopic = sessionTopic, jsonRpcResponse = jsonRpcResponse)

Web3Wallet.respondSessionRequest(result) { error -> /*callback for error while responding session request*/ }
```

To respond to JSON-RPC method that were sent from Dapps for a session, submit a `Wallet.Params.SessionRequestResponse` with the session's topic and request
ID along with the respond data to the `Web3Wallet.respondSessionRequest` function.

### **Reject Request**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val jsonRpcResponseError: Wallet.Model.JsonRpcResponse.JsonRpcError = /*Session Request ID along with error code and message*/
val result = Wallet.Params.SessionRequestResponse(sessionTopic = sessionTopic, jsonRpcResponse = jsonRpcResponseError)

Web3Wallet.respondSessionRequest(result) { error -> /*callback for error while responding session request*/ }
```

To reject a JSON-RPC method that was sent from a Dapps for a session, submit a `Wallet.Params.Response` with the settled session's topic and
request ID along with the rejection data to the `Web3Wallet.respondSessionRequest` function.


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
val namespaces: Map<String, Wallet.Model.Namespaces.Session> = mapOf(namespace, Wallet.Model.Namespaces.Session(accounts, methods, events))
val updateParams = Wallet.Params.SessionUpdate(sessionTopic, namespaces)

Web3Wallet.updateSession(updateParams) { error -> /*callback for error while sending session update*/ }
```

To update a session with namespaces, submit a `Wallet.Params.SessionUpdate` object with the session's topic and namespaces to update session with
to `Web3Wallet.updateSession`.


#
### **Session Extend**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val extendParams = Wallet.Params.SessionExtend(sessionTopic = sessionTopic)

Web3Wallet.extendSession(exdendParams) { error -> /*callback for error while extending a session*/ }
```

To extend a session, create a `Wallet.Params.SessionExtend` object with the session's topic to update the session with to `Web3Wallet.extendSession`. Session is
extended by 7 days.


#
### **Authotisation Request Approval**

To approve authorisation request, sign message using `CacaoSigner.sign` which requires private key to sign `Cacao` object that needs to be passed to `Wallet.Params.AuthRequestResponse` object and send to Dapp.
`issuer` parameter describes what did responder authorises. Example `iss` for Ethereum Mainnet: `did:pkh:eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a`. More about `did:pkh` method [here](https://github.com/w3c-ccg/did-pkh/blob/main/did-pkh-method-draft.md).

```kotlin
val request: Wallet.Event.AuthRequest = // Request from onAuthRequest
val signature: Wallet.Model.Cacao.Signature = CacaoSigner.sign(
    request.message, // Message to be signed
    PRIVATE_KEY, // Private key used to signing a message
    SignatureType.EIP191 // or EIP1271
)
val issuer = //Check following link for more reference: https://github.com/w3c-ccg/did-pkh/blob/main/did-pkh-method-draft.md

Web3Wallet.respondSessionRequest(Wallet.Params.AuthRequestResponse(request.id, signature, issuer)) { error ->
    Log.e("Wallet respond approve", error.throwable.stackTraceToString())
}
```


#
### **Format message**

To receive formatted SIWE message, call formatMessage method with following parameters:

```kotlin
val payloadParams: Wallet.Params.PayloadParams = //PayloadParams received in the onAuthRequest callback
val issuer = //MUST be the same as send with the respond methods and follows: https://github.com/w3c-ccg/did-pkh/blob/main/did-pkh-method-draft.md
val formatMessage = Wallet.Params.FormatMessage(event.payloadParams, issuer)

Web3Wallet.formatMessage(formatMessage)
```

### **Sample App**
To check more in details go and visit our Web3Wallet implementation app [here](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/samples/web3wallet).