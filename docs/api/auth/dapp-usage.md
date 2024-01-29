import Container from '../../components/Container'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import PlatformTabs from '../../components/PlatformTabs'
import PlatformTabItem from '../../components/PlatformTabItem'

# Dapp Usage

:::caution
Auth API is in the process of being greatly simplified, and will involve breaking changes. Please stand by.
:::

<PlatformTabs
groupId="api-auth"
activeOptions={["web","ios","android","flutter","csharp"]}>

<PlatformTabItem value="web">

:::info
For an example implementation, please refer to our [`react-dapp-auth` example](https://github.com/WalletConnect/web-examples/tree/main/advanced/dapps/react-dapp-auth).
:::

**1. Initialize your WalletConnect AuthClient, using [your Project ID](../../cloud/relay.md).**

```javascript
import AuthClient from '@walletconnect/auth-client'

const authClient = await AuthClient.init({
  projectId: '<YOUR_PROJECT_ID>',
  metadata: {
    name: 'my-auth-dapp',
    description: 'A dapp using WalletConnect AuthClient',
    url: 'my-auth-dapp.com',
    icons: ['https://my-auth-dapp.com/icons/logo.png']
  }
})
```

**2. Subscribe to `auth_response`.**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners.](../core/pairing.mdx)
:::

```javascript
authClient.on('auth_response', ({ params }) => {
  if (Boolean(params.result?.s)) {
    // Response contained a valid signature -> user is authenticated.
  } else {
    // Handle error or invalid signature case
    console.error(params.message)
  }
})
```

You can derive the users' wallet address by destructing and splitting `params.result.p.iss`.

```javascript
const { iss } = params.result.p
const walletAddress = iss.split(':')[4]
console.log(walletAddress)
// "0x977aeFEC1879160eC9560cd16f08e12B6DF52ed1"
```

For the full log of the `params` object:

```
{
    id: 1674070525664600,
    jsonrpc: "2.0",
    result: {
        h: {
            t: "eip4361"
        },
        p: {
            aud: "http://localhost:3000/",
            domain: "localhost",
            version: "1",
            nonce: "dl9Xu8ICZZ0dj4VUS",
            ia": "2023-01-18T19:35:25.664Z",
            statement: "Sign in with wallet.",
            iss: "did:pkh:eip155:1:0x977aeFEC1879160eC9560cd16f08e12B6DF52ed1"
        },
        s: {
            s: "0x9edd446e150fad96ec24ab60c697055dc7c7815cc84a727cafa4a5a0d6f09909764332e14f8bee2430b81e6e4169c3b5bb5cbf7931a569ae78bffc953c8b6a7f1c",
            t: "eip191"
        }
    }
}
```

**3. Request Authentication**

Update your import to include `generateNonce`.

```javascript
import AuthClient, { generateNonce } from '@walletconnect/auth-client'

// ...

const { uri } = await authClient.request({
  aud: '<FULL_URL_OF_LOGIN_PAGE>',
  domain: '<YOUR_DOMAIN>',
  chainId: 'eip155:1',
  type: 'eip4361',
  nonce: generateNonce()
})
```

The `uri` can then be displayed as a QRCode or as a deep link.

**Example deep link (preferred for desktop wallets):**

`mywallet://wc?uri={uri}`

**Example universal link (preferred for mobile wallets):**

`https://mywallet.com/wc?uri={uri}`

</PlatformTabItem>

<PlatformTabItem value="ios">

#### Initial configurations

Make sure that you properly configure Networking, Pair Clients and SignerFactory first

- [Networking](../core/relay.mdx)
- [Pairing](../core/pairing.mdx)
- [SignerFactory](../auth/signer-factory.md)

#### Instantiate a client

Configure the `Auth` instance with your own [SignerFactory](../auth/signer-factory.md) implementation.

```swift
Auth.configure(signerFactory: <SignerFactory>)
```

#### Completed Auth SDK configuration:

```swift
Networking.configure(projectId: <Project ID>, socketFactory: <SocketFactory>)
Pair.configure(metadata: <AppMetadata>)
Auth.configure(signerFactory: <SignerFactory>)
```

#### Subscribe for Auth publishers

When your `Auth` instance receives requests or responses from a peer client it will publish related event. So you should set subscription to handle them.

```swift
Auth.instance.authResponsePublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] _ in
        //handle event
    }.store(in: &publishers)
```

Following publishers are available to subscribe:

```swift
public var authRequestPublisher: AnyPublisher<AuthRequest, Never> {
public var authResponsePublisher: AnyPublisher<(id: RPCID, result: Result<Cacao, AuthError>), Never> {
public let socketConnectionStatusPublisher: AnyPublisher<SocketConnectionStatus, Never>
```

#### Connect Clients and Send Authentication Request

Your App should generate a pairing URI and share it with the wallet. URI can be presented as a QR code or sent via a universal link. Wallet begins subscribing to your App's authentication requests after scanning URI. To create a pairing and send an authentication request, you need to call:

```swift
let uri = try await Pair.instance.create()
try await Auth.instance.request(<RequestParams>, topic: uri.topic)
```

#### Handle Authentication Response

Subscribe for `authResponsePublisher` events.
A response will be either signed CAIP-74 `Cacao` object or `AuthError` in case the signature is invalid, or the requested message has been compromised.

#### Where to go from here

- Try our [Example dApp](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example) that is part of [WalletConnectSwiftV2 repository](https://github.com/WalletConnect/WalletConnectSwiftV2).
- Build API documentation in XCode: go to Product -> Build Documentation

</PlatformTabItem>

<PlatformTabItem value="android">

We recommend looking at example implementations of Requester at our [Kotlin GitHub repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/sample/dapp)

#### **Initialize Auth Client**

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

For more context on how to initialize CoreClient, go to [CoreClient docs](../core/pairing.mdx) section.

---

#### **AuthClient.RequesterDelegate**

The AuthClient needs a `AuthClient.RequesterDelegate` passed to it to be able to expose asynchronously updates sent from the Wallet / Responder.

```kotlin
object RequesterDelegate : AuthClient.RequesterDelegate {
    init {
        AuthClient.setRequesterDelegate(this)
    }

    override fun onAuthResponse(authResponse: Auth.Event.AuthResponse) {
        // Triggered when Wallet / Responder responds to authorization request. Result can be either signed Cacao object or Error
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

#### **Methods**

#### **Request**

The `AuthClient.request` sends the authentication request to the responder/wallet.

```kotlin
fun randomNonce(): String = Random.nextBytes(16).bytesToHex()

val requestParams = Auth.Params.Request(
    topic = pairingTopic // a pairing topic is used to send an authentication request, pass it from [Pairing API](../core/pairing.mdx)
    chainId = "1", // is the EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts MUST be resolved.
    domain = "kotlin.requester.walletconnect.com", // is the RFC 3986 authority that is requesting the signing.
    nonce = randomNonce(), // is a randomized token typically chosen by the relying party and used to prevent replay attacks, at least 8 alphanumeric characters.
    aud = "https://kotlin.requester.walletconnect.com/login", //  is an RFC 3986 URI referring to the resource that is the subject of the signing (as in the subject of a claim).
    type = null, // (Not yet implemented) Type of signing. Currently ignored and always set to `eip4361`.
    nbf = null, // (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.
    exp = null, // (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.
    statement = "Sign in with wallet.", // (optional) is a human-readable ASCII assertion that the user will sign, and it must not contain '\n' (the byte 0x0a).
    requestId = null, // (optional) is a system-specific identifier that may be used to uniquely refer to the sign-in request.
    resources = null, // (optional) is a list of information or references to information the user wishes to have resolved as part of authentication by the relying party. They are expressed
    // as RFC 3986 URIs.
)

AuthClient.request(requestParams,
    onSuccess = {
        // Callback triggered when the authentication request has been sent successfully. Expose Pairing URL using [Pairing API](../core/pairing.mdx), to a wallet to establish a secure connection
    },
    onError = { error ->
        Log.e("Requester request", error.throwable.stackTraceToString())
    }
)
```

---

#### **CACAO**

More about CACAO can be found [here](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-74.md)

#### **SIWE / EIP-4361**

More about SIWE can be found [here](https://eips.ethereum.org/EIPS/eip-4361)

#### **Sample App**

To check more in details go and visit our requester implementation app [here](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/sample/dapp)
</PlatformTabItem>

<PlatformTabItem value="flutter">

To create an instance of `AuthClient`, you need to pass in the core and metadata parameters.

```dart
AuthClient authClient = await AuthClient.createInstance(
    relayUrl: 'wss://relay.walletconnect.com', // The relay websocket URL, leave blank to use the default
    projectId: '123',
    metadata: PairingMetadata(
        name: 'dapp (Requester)',
        description: 'A dapp that can request that transactions be signed',
        url: 'https://walletconnect.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
    ),
);
```

#### Request Authentication

To request authentication use the `request` method on the `authClient` object.

```dart
final AuthRequestResponse auth = await authClient.request(
  params: AuthRequestParams(
    aud: 'http://localhost:3000/login',
    domain: 'localhost:3000',
    chainId: 'eip155:1',
    statement: 'Sign in with your wallet!',
  ),
  pairingTopic: resp.pairingTopic,
);

final uri = auth.uri;
```

The `uri` can then be displayed as a QRCode or as a deep link.

**Example deep link (preferred for desktop wallets):**

`mywallet://wc?uri={uri}`

**Example universal link (preferred for mobile wallets):**

`https://mywallet.com/wc?uri={uri}`

#### Handling Session Approval and Rejection

To handle a session approval and rejection using `AuthResponse` await the response and check for a non-null result to determine approval or rejection.

```dart
final AuthResponse authResponse = await authResponse.completer.future;
if (authResponse.result != null) {
  // Having a result indicates that the signature has been verified.

  // Retrieve the wallet address from a successful response
  final walletAddress = AddressUtils.getDidAddress(authResponse.result!.p.iss);
}
else {
  // Otherwise, you might have received a WalletConnectError if there was an issue verifying the signature.
  final WalletConnectError? error = authResponse.error;
  // Or a JsonRpcError if something went wrong when signing with the wallet.
  final JsonRpcError? error = authResponse.jsonRpcError;
}
```

#### To Test

Run tests using `flutter test`.
Expected flutter version is: >`3.3.10`

#### Useful Commands

- `flutter pub run build_runner build --delete-conflicting-outputs` - Regenerates JSON Generators
- `flutter doctor -v` - get paths of everything installed.
- `flutter pub get`
- `flutter upgrade`
- `flutter clean`
- `flutter pub cache clean`
- `flutter pub deps`
- `flutter pub run dependency_validator` - show unused dependencies and more
- `dart format lib/* -l 120`
- `flutter analyze`

</PlatformTabItem>

<PlatformTabItem value="csharp">

#### Setup

First you must setup `AuthOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var dappOptions = new AuthOptions()
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
var dappClient = await WalletConnectAuthClient.Init(dappOptions);
```

#### Requesting Authentication

Once you have the Auth client initialized, you can make an auth request to a wallet. Making an auth request will give you a `uri` that can be placed into a QR Code or used to open a deeplink.

To setup an auth request, you must build a `RequestParams` that specifies the dApp that is being authenticated

```csharp
var localhostAuthRequest = new RequestParams()
{
    Aud = "http://localhost:3000/login",
    Domain = "localhost:3000",
    ChainId = "eip155:1",
    Nonce = CryptoUtils.GenerateNonce()
};
```

Once you have created the `RequestParams`, you can send the request to be authenticated.

```csharp
var uriData = await dappClient.Request(localhostAuthRequest);
var uri = uriData.Uri;
```

You can grab the `Uri` for the authentication request from `uriData`.

```csharp
ExampleShowQRCode(uriData.Uri);
```

#### Listening to Events

You can listen to authentication responses using the `AuthResponded` event

```csharp
void OnAuthResponded(object sender, AuthResponse args)
{
    var sessionTopic = args.Topic;
    var cacao = args.Response.Result;
    var signature = cacao.Signature;
    Console.WriteLine($"{sessionTopic}: {signature}");
}

dappClient.AuthResponded += OnAuthResponded;
```

You can also listen to authentication errors using the `AuthError` event

```csharp
void OnAuthError(object sender, AuthErrorResponse args)
{
    var sessionTopic = args.Topic;
    var error = args.Error;
    Console.WriteLine($"{sessionTopic}: {error}");
}

dappClient.AuthError += OnAuthError;
```

</PlatformTabItem>

</PlatformTabs>
