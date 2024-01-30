import Container from '../../components/Container'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import PlatformTabs from '../../components/PlatformTabs'
import PlatformTabItem from '../../components/PlatformTabItem'

# Wallet Usage

:::caution
Auth API is in the process of being greatly simplified, and will involve breaking changes. Please stand by.
:::

<PlatformTabs
groupId="api-auth"
activeOptions={["web","ios","android","csharp"]}>

<PlatformTabItem value="web">

:::info
For an example implementation, please refer to our [`react-wallet-auth` example](https://github.com/WalletConnect/web-examples/tree/main/advanced/wallets/react-wallet-auth).
:::

**1. Initialize your WalletConnect AuthClient, using [your Project ID](../../cloud/relay.md).**

```javascript
import AuthClient from '@walletconnect/auth-client'

const authClient = await AuthClient.init({
  projectId: '<YOUR_PROJECT_ID>',
  metadata: {
    name: 'my-auth-wallet',
    description: 'A wallet using WalletConnect AuthClient',
    url: 'my-auth-wallet.com',
    icons: ['https://my-auth-wallet.com/icons/logo.png']
  }
})
```

**2. Listen to authentication requests**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners](../core/pairing.mdx)
:::

```javascript
authClient.on('auth_request', async ({ id, params }) => {
  // the user’s address
  const iss = `did:pkh:eip155:1:${WALLET_ADDRESS}`

  // format the cacao payload with the user’s address
  const message = authClient.formatMessage(params.cacaoPayload, iss)

  // This is a good point to trigger a UI event to provide the user
  // with a button to accept or reject the authentication request,
  // instead of automatically responding.
  const signature = await wallet.signMessage(params.message)

  await authClient.respond(
    {
      id: id,
      signature: {
        s: signature,
        t: 'eip191'
      }
    },
    iss
  )
})
```

**3. Scan QR Code (or paste URI directly)**

Once a QR code is scanned, a pairing must be established using the embedded URI.
This is what allows the `auth_request` events to be received.

```javascript
await authClient.core.pairing.pair({ uri })
```

</PlatformTabItem>

<PlatformTabItem value="ios">

#### Initial configurations

Make sure what you properly configure Networking, Pair Clients and SignerFactory first

- [Networking](../core/relay.mdx)
- [Pairing](../core/pairing.mdx)
- [SignerFactory](../auth/signer-factory.md)

#### Instantiate a Client

Configure the `Auth` instance with Account object and your own [SignerFactory](../auth/signer-factory.md) implementation.

```swift
Auth.configure(
    account: Account("eip155:56:0xe5EeF1368781911d265fDB6946613dA61915a501")!,
    signerFactory: <SignerFactory>
)
```

#### Completed Auth SDK Configuration:

```swift
Networking.configure(projectId: <Project ID>, socketFactory: <SocketFactory>)
Pair.configure(metadata: <AppMetadata>)
Auth.configure(account: <Account>, signerFactory: <SignerFactory>)
```

#### Subscribe for Authorization Publishers

Following publishers are available to subscribe:

```swift
public var authRequestPublisher: AnyPublisher<(request: AuthRequest, context: VerifyContext?), Never>
public var authResponsePublisher: AnyPublisher<(id: RPCID, result: Result<Cacao, AuthError>), Never>
public let socketConnectionStatusPublisher: AnyPublisher<SocketConnectionStatus, Never>
```

#### Authorization Requests

When your `Auth` instance receives requests or responses from a peer client, it will publish a related event. So you should set a subscription to handle them.

```swift
Auth.instance.authRequestPublisher
    .receive(on: DispatchQueue.main)
    .sink { [self self] auth in
        self?.verifyDapp(auth.context)
        self?.showAuthRequest(auth.request)
    }.store(in: &publishers)
```

`VerifyContext` provides domain verification information about `AuthRequest`. It consists of the origin of a Dapp from where the request has been sent, validation `enum` that says whether origin is **unknown**, **valid** or **invalid** and verify URL server.

To enable or disable verification find the **Verify SDK** toggle in your project [cloud](https://cloud.walletconnect.com).

```swift
public struct VerifyContext: Equatable, Hashable {
   public enum ValidationStatus {
       case unknown
       case valid
       case invalid
   }

   public let origin: String?
   public let validation: ValidationStatus
   public let verifyUrl: String
}
```

#### Handle Requests from a Dapp

After pairing with dapp, your wallet will be subscribing for authentication requests. Requests will be published by `authRequestPublisher`. When a wallet receives a request, you want to present it to the user and request a signature. After the user signs the authentication message, the wallet should respond to a dapp.

`Type` parameter represent signature validation method which will be used on DApp side. Supported signature validation methods: [EIP191](https://eips.ethereum.org/EIPS/eip-191), [EIP1271](https://eips.ethereum.org/EIPS/eip-1271). In both cases message will be signed with [EIP191](https://eips.ethereum.org/EIPS/eip-191) standard.

```swift
let signer = MessageSignerFactory.create()
let signature = try signer.sign(message: request.message, privateKey: privateKey, type: .eip191)
try await Auth.instance.respond(requestId: request.id, signature: signature)
```

In case user rejects an authentication request, call:

```swift
try await Auth.instance.reject(requestId: request.id)
```

#### Get Pending Requests

if you've missed some requests you can query them with

```swift
Auth.instance.getPendingRequests()
```

#### Where to go from here

- Try our Showcase wallet that is part of WalletConnectSwiftV2 repository.
- Build API documentation in XCode: go to Product -> Build Documentation

</PlatformTabItem>

<PlatformTabItem value="android">

We recommend looking at example implementations of Responder at our [Kotlin GitHub repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/sample/wallet)

#### **Initialize Auth Client**

To initialize the Auth client, initialize first a `CoreClient` in the Android Application class. It will need the application class,
the server URL, connection type and the application AppMetaData. Next, pass CoreClient to AuthClient initialize function.

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val appMetaData = Core.Model.AppMetaData(name = "Kotlin.Responder",
    description = "Kotlin AuthSDK Responder Implementation",
    url = "kotlin.responder.walletconnect.com",
    icons = listOf("https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Gradient/Icon.png"),
    redirect = "kotlin-responder-wc:/request"
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = ConnectionType.AUTOMATIC, application = this,metaData = appMetaData)

AuthClient.initialize(init = Auth.Params.Init(core = CoreClient)) { error -> Log.e(tag(this), error.throwable.stackTraceToString()) }
```

For more context on how to initialize CoreClient, go to [CoreClient docs](../core/pairing.mdx) section.

---

#### **AuthClient.ResponderDelegate**

The AuthClient needs a `AuthClient.ResponderDelegate` passed to it for it to be able to expose asynchronously updates sent from the Dapp / Requester.

```kotlin
object ResponderDelegate : AuthClient.ResponderDelegate {
    init {
        AuthClient.setResponderDelegate(this)
    }

    override fun onAuthRequest(authRequest: Auth.Event.AuthRequest, verifyContext: Auth.Event.VerifyContext) {
        // Triggered when Dapp / Requester makes an authorization request. Wallet / Responder should display message to user and ask him to approve or reject authorization.
    }

    override fun onConnectionStateChange(connectionStateChange: Auth.Event.ConnectionStateChange) {
        // Triggered whenever the connection state is changed
    }

    override fun onError(error: Auth.Event.Error) {
        //Triggered whenever the error occurs with Relay Server
    }
}
```

`Auth.Event.VerifyContext` provides domain verification information about an AuthRequest. It consists of the origin of a Dapp from where the request has been sent, a validation Enum that says whether the origin is `VALID`, `INVALID` or `UNKNOWN`, and the verify url server.

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

---

#### **Methods**

#### **Authorization Request Approval**

To approve authorization request, sign message using `CacaoSigner.sign` which requires private key to sign `Cacao` object that needs to be passed to `Auth.Params.Respond.Result` object and send to Dapp / Requester.
`issuer` parameter describes what did responder authorizes. Example `iss` for Ethereum Mainnet: `did:pkh:eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a`. More about `did:pkh` method [here](https://github.com/w3c-ccg/did-pkh/blob/main/did-pkh-method-draft.md).

```kotlin
val request: Auth.Event.AuthRequest = // Request from onAuthRequest
val signature: Auth.Model.Cacao.Signature = CacaoSigner.sign(
    request.message, // Message to be signed
    PRIVATE_KEY, // Private key used to signing a message
    SignatureType.EIP191 // or EIP1271
)
val issuer = //Check following link for more reference: https://github.com/w3c-ccg/did-pkh/blob/main/did-pkh-method-draft.md

AuthClient.respond(Auth.Params.Respond.Result(request.id, signature, issuer)) { error ->
    Log.e("Responder respond approve", error.throwable.stackTraceToString())
}
```

#### **Authorization Request Rejection**

To reject authorization request respond Dapp / Requester with `Auth.Params.Respond.Error`. Note: We recommend using defined below error message and error code.

```kotlin
val request: Auth.Event.AuthRequest = // Request from onAuthRequest
AuthClient.respond(
    Auth.Params.Respond.Error(request.id, 12001, "User Rejected Request") // Specifying Error codes will change in future
) { error ->
    Log.e("Responder respond reject", error.throwable.stackTraceToString())
}
```

#### **Format message**

To receive formatted SIWE message, call formatMessage method with following parameters:

```kotlin
val payloadParams: Auth.Params.PayloadParams = //PayloadParams received in the onAuthRequest callback
val issuer = //MUST be the same as send with the respond methods and follows: https://github.com/w3c-ccg/did-pkh/blob/main/did-pkh-method-draft.md
val formatMessage = Auth.Params.FormatMessage(event.payloadParams, issuer)

AuthClient.formatMessage(formatMessage)
```

#### **Get List of Pending Requests**

```kotlin
val pendingRequest: List<Auth.Model.PendingRequest> = AuthClient.getPendingRequest()

```

To get a list of pending request, call `AuthClient.getPendingRequest()` which will return a list of type `Auth.Model.PendingRequest`.

#### **Sample App**

To check more in details go and visit our responder implementation app [here](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/sample/wallet)
</PlatformTabItem>

<PlatformTabItem value="csharp">

#### **Setup**

First you must setup `AuthOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var walletOptions = new AuthOptions()
{
    ProjectId = "39f3dc0a2c604ec9885799f9fc5feb7c",
    Metadata = new Metadata()
    {
        Description = "An example dapp to showcase WalletConnectSharpv2",
        Icons = new[] { "https://walletconnect.com/meta/favicon.ico" },
        Name = "WalletConnectSharpv2 Dapp Example",
        Url = "https://walletconnect.com"
    },
    // Uncomment to disable persistent storage
    // Storage = new InMemoryStorage()
};
```

Once you have `AuthOptions` defined, you can use `WalletConnectAuthClient.Init` to initialize the client

```csharp
var walletClient = await WalletConnectAuthClient.Init(walletOptions);
```

#### **Pairing**

To pair with a dApp given a URI (either thru deep-linking or a QRCode), you must use `Core.Pairing.Pair(uri)` function. This process
is exactly the same as found in the Pairing API.

```csharp
string uri = GrabURIFromDapp();

await walletClient.Core.Pairing.Pair(uri);
```

#### **Responding to Authentication**

Once you have the Auth client initialized, you can respond to auth request from any paired dApp. First, you listen for the `AuthRequested` event. The callback function for the `AuthRequested` event can be an `async void` function. Then, you must build an `iss` string that has the following format

```csharp
var walletAddress = "0x...";
var chainNamespace = "eip155";
var chainId = "1";

var iss = $"did:pkh:{chainNamespace}:{chainId}:{walletAddress}";
```

In the following example, we use NEthereum to sign the message using personal sign. Once the message has been signed, we use `walletClient.Respond` to respond to the auth request.

```csharp
// NEthereum wallet example
var wallet = new Wallet(Wordlist.English, WordCount.Twelve);

// Grab wallet address from new NEthereum wallet
var walletAddress = wallet.GetAddresses(1)[0];

// Example ISS string
var iss = $"did:pkh:eip155:1:{walletAddress}";

async void OnAuthRequested(object sender, AuthRequest request)
{
    var message = walletClient.FormatMessage(request.Parameters.CacaoPayload, iss);

    // Sign auth message using NEthereum
    var signature = await wallet.GetAccount(walletAddress).AccountSigningService.PersonalSign.SendRequestAsync(Encoding.UTF8.GetBytes(message));

    await walletClient.Respond(new Cacao()
    {
        Id = request.Id,
        Signature = new Cacao.CacaoSignature.EIP191CacaoSignature(signature)
    }, iss);
}

walletClient.AuthRequested += OnAuthRequested;
```

You do not need to respond to the authentication request inside the callback. You may respond to the request at anytime using `walletClient.Respond`, however _you must know the request id_ of the request you are responding to.
</PlatformTabItem>

</PlatformTabs>
