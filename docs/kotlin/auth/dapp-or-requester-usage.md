# Dapp / Requester Usage

We recommend looking at example implementations of Requester at our [Kotlin Github repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/auth/requester)

### **Initialize Auth Client**

To initialize the Auth client, create a `Auth.Params.Init` object in the Android Application class. The Init object will need the
application class, the Project ID, and the application AppMetaData. The `Auth.Params.Init` object will then be passed to the `AuthClient`
`initialize` function. `Auth.Params.Init` also allows for custom URLs by passing URL string into the `relayUrl` property. `iss` parameter should be null for Dapp / Requester.

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"

RelayClient.initialize(relayServerUrl = serverUrl, connectionType = ConnectionType.AUTOMATIC, application = this)

AuthClient.initialize(
    init = Auth.Params.Init(
        relay = RelayClient,
        appMetaData = Auth.Model.AppMetaData(
            name = "Kotlin.Requester",
            description = "Kotlin AuthSDK Requester Implementation",
            url = "kotlin.requester.walletconnect.com",
            icons = listOf("https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Gradient/Icon.png"),
            redirect = "kotlin-requester-wc:/request"
        ),
        iss = null
    )
) { error ->
    Log.e("Requester initialize", error.throwable.stackTraceToString())
}
```

### Connection types

We allow developers to choose between the `ConnectionType.MANUAL` and `ConnectionType.AUTOMATIC`connection type. The default
one(`ConnectionType.AUTOMATIC`) disconnects wss connection when app enters background and reconnects when app is brought back to the
foreground. The `ConnectionType.MANUAL` allows developers to control when to open WebSocket connection and when to close it.
Accordingly, `RelayClient.disconnect()` and `RelayClient.connect()`.

---
### **AuthClient.RequesterDelegate**

The AuthClient needs a `AuthClient.RequesterDelegate` passed to it to be able to expose asynchronously updates sent from the Wallet / Responder.

```kotlin
object RequesterDelegate : AuthClient.RequesterDelegate {
    init {
        AuthClient.setRequesterDelegate(this)
    }

    override fun onAuthResponse(authResponse: Auth.Event.AuthResponse) {
        // Triggered when Wallet / Responder respondes to authorisation request. Result can be either signed Cacao object or Error
    }

    override fun onConnectionStateChange(connectionStateChange: Auth.Event.ConnectionStateChange) {
        // Triggered whenever the connection state is changed
    }

    override fun onError(error: Auth.Event.Error) {
        //Triggered whenever the error occurs with Relay Server
    }
}
```

---
## **Methods**

### **Request**

The `AuthClient.request` asynchronously exposes the pairing URI that must be shared with wallet out of bound, as qr code or mobile linking.
To establish a session between peers, Wallet / Responder must pass the received uri to `AuthClient.pair` method on their side. Dapp / Requester will receive respone via `AuthClient.RequesterDelegate` on `onAuthReponse` callback.

```kotlin
fun randomNonce(): String = Random.nextBytes(16).bytesToHex()

val requestParams = Auth.Params.Request(
    chainId = "1", // is the EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts MUST be resolved.
    domain = "kotlin.requester.walletconnect.com", // is the RFC 3986 authority that is requesting the signing.
    nonce = randomNonce(), // is a randomized token typically chosen by the relying party and used to prevent replay attacks, at least 8 alphanumeric characters.
    aud = "https://kotlin.requester.walletconnect.com/login", //  is an RFC 3986 URI referring to the resource that is the subject of the signing (as in the subject of a claim).
    type = null, // (Not yet implemented) Type of signing. Currently ignored and always set to `eip4361`. 
    nbf = null, // (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.
    exp = null, // (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.
    statement = "Sign in with wallet.", // (optional) is a human-readable ASCII assertion that the user will sign, and it must not contain '\n' (the byte 0x0a).
    requestId = null, // (optional) is an system-specific identifier that may be used to uniquely refer to the sign-in request.
    resources = null, // (optional) is a list of information or references to information the user wishes to have resolved as part of authentication by the relying party. They are expressed
    // as RFC 3986 URIs.
)

AuthClient.request(requestParams,
    onPairing = { pairing ->
        // Callback with Auth.Model.Pairing that contains uri for making pairing with wallet / responder
    },
    onError = { error ->
        Log.e("Requester request", error.throwable.stackTraceToString())
    }
)
```