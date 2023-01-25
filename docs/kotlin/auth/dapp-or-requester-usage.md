# Dapp / Requester Usage

We recommend looking at example implementations of Requester at our [Kotlin Github repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/auth/requester)

### **Initialize Auth Client**

To initialize the Auth client, initialize first a `CoreClient` in the Android Application class. It will need the application class,
the server URL, connection type and the application AppMetaData. Next, pass CoreClient to AuthClient initialize function.

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val appMetaData = Core.Model.AppMetaData(name = "Kotlin.Requester",
    description = "Kotlin AuthSDK Requester Implementation",
    url = "kotlin.requester.walletconnect.com",
    icons = listOf("https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Gradient/Icon.png"),
    redirect = "kotlin-requester-wc:/request"
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = ConnectionType.AUTOMATIC, application = this, metaData = appMetaData)

AuthClient.initialize(init = Auth.Params.Init(core = CoreClient)) { error -> Log.e(tag(this), error.throwable.stackTraceToString()) }
```

For more context on how to initialize CoreClient, go to [CoreClient docs](../../kotlin/core/installation.md) section.

---
### **AuthClient.RequesterDelegate**

The AuthClient needs a `AuthClient.RequesterDelegate` passed to it to be able to expose asynchronously updates sent from the Wallet / Responder.

```kotlin
object RequesterDelegate : AuthClient.RequesterDelegate {
    init {
        AuthClient.setRequesterDelegate(this)
    }

    override fun onAuthResponse(authResponse: Auth.Event.AuthResponse) {
        // Triggered when Wallet / Responder responds to authorisation request. Result can be either signed Cacao object or Error
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

The `AuthClient.request` sends the authentication request to the responder/wallet.

```kotlin
fun randomNonce(): String = Random.nextBytes(16).bytesToHex()

val requestParams = Auth.Params.Request(
    topic = pairingTopic // a pairing topic is used to send a authentication request, pass it from [Pairing API](../../kotlin/core/pairing.md)
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
    onSuccess = {
        // Callback triggered when the authentication request has been sent successfully. Expose Pairing URL using [Pairing API](../../kotlin/core/pairing.md), to a wallet to establish a secure connection
    },
    onError = { error ->
        Log.e("Requester request", error.throwable.stackTraceToString())
    }
)
```
---
### **CACAO**
More about CACAO can be found [here](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-74.md)

### **SIWE / EIP-4361**
More about SIWE can be found [here](https://eips.ethereum.org/EIPS/eip-4361)

### **Sample App**
To check more in details go and visit our requester implementation app [here](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/auth/requester)