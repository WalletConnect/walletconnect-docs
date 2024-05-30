import Container from '../../components/Container'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import PlatformTabs from '../../components/PlatformTabs'
import PlatformTabItem from '../../components/PlatformTabItem'

# Dapp Usage

## Implementation

<PlatformTabs
groupId="api-sign"
activeOptions={["web","ios","android","flutter","csharp", "unity"]}>

<PlatformTabItem value="web">
This library is compatible with Node.js, browsers and React Native applications (Node.js modules require polyfills for React Native).

Dapps will also need to install WalletConnectModal for the UI.

```bash npm2yarn
npm install @walletconnect/modal
```

:::info
For an example implementation, please refer to our `react-dapp-v2` [example](https://github.com/WalletConnect/web-examples/tree/main/advanced/dapps/react-dapp-v2).
:::

#### Install Packages

Dapps will also need to install `WalletConnectModal` for the UI.

```bash npm2yarn
npm install @walletconnect/modal
```

#### Create a Session

**1. Initiate your WalletConnect client with the relay server, using [your Project ID](../../cloud/relay.md).**

```javascript
import SignClient from '@walletconnect/sign-client'

const signClient = await SignClient.init({
  projectId: '<YOUR_PROJECT_ID>',
  // optional parameters
  relayUrl: '<YOUR RELAY URL>',
  metadata: {
    name: 'Example Dapp',
    description: 'Example Dapp',
    url: '#',
    icons: ['https://walletconnect.com/walletconnect-logo.png']
  }
})
```

**2. Add listeners for desired `SignClient` events.**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners](https://specs.walletconnect.com/2.0/specs/clients/core/pairing/pairing-api).
:::

```javascript
signClient.on('session_event', ({ event }) => {
  // Handle session events, such as "chainChanged", "accountsChanged", etc.
})

signClient.on('session_update', ({ topic, params }) => {
  const { namespaces } = params
  const _session = signClient.session.get(topic)
  // Overwrite the `namespaces` of the existing session with the incoming one.
  const updatedSession = { ..._session, namespaces }
  // Integrate the updated session state into your dapp state.
  onSessionUpdate(updatedSession)
})

signClient.on('session_delete', () => {
  // Session was deleted -> reset the dapp state, clean up from user session, etc.
})
```

**3. Create a new WalletConnectModal instance.**

```javascript
import { WalletConnectModal } from '@walletconnect/modal'

const walletConnectModal = new WalletConnectModal({
  projectId: '<YOUR_PROJECT_ID>',
  // `standaloneChains` can also be specified when calling `walletConnectModal.openModal(...)` later on.
  standaloneChains: ['eip155:1']
})
```

**4. Connect the application and specify session permissions.**

```javascript
try {
  const { uri, approval } = await signClient.connect({
    // Optionally: pass a known prior pairing (e.g. from `signClient.core.pairing.getPairings()`) to skip the `uri` step.
    pairingTopic: pairing?.topic,
    // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
    requiredNamespaces: {
      eip155: {
        methods: [
          'eth_sendTransaction',
          'eth_signTransaction',
          'eth_sign',
          'personal_sign',
          'eth_signTypedData'
        ],
        chains: ['eip155:1'],
        events: ['chainChanged', 'accountsChanged']
      }
    }
  })

  // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
  if (uri) {
    walletConnectModal.openModal({ uri })
    // Await session approval from the wallet.
    const session = await approval()
    // Handle the returned session (e.g. update UI to "connected" state).
    // * You will need to create this function *
    onSessionConnect(session)
    // Close the QRCode modal in case it was open.
    walletConnectModal.closeModal()
  }
} catch (e) {
  console.error(e)
}
```

#### Session Authenticate with ReCaps

The authenticate() method enhances the WalletConnect protocol, offering EVM dApps a sophisticated mechanism to request wallet authentication and simultaneously establish a session. This innovative approach not only authenticates the user but also facilitates a seamless session creation, integrating the capabilities defined by ERC-5573, also known as ReCaps.

ReCaps extend the SIWE protocol, enabling users to give informed consent for dApps to exercise scoped capabilities on their behalf. This consent mechanism is crucial for authorizing a dApp to perform actions or access resources, thus ensuring security and trust in dApp interactions. These scoped capabilities are specified through ReCap URIs in the resources field of the AuthRequestParams, which translate to human-readable consent in the SIWE message, detailing the actions a dApp is authorized to undertake.

To initiate an authentication and authorization request, a dApp invokes the authenticate() method, passing in parameters that include desired capabilities as outlined in EIP-5573. The method generates a pairing URI for user interaction, facilitating a streamlined authentication and consent process.

Example of initiating an authentication request with ReCaps:

```typescript
const { uri, response } = await signClient.authenticate({
  chains: ['eip155:1', 'eip155:2'], // chains your dapp requests authentication for
  domain: 'localhost', // your domain
  uri: 'http://localhost/login', // uri
  nonce: '1239812982', // random nonce
  methods: ['personal_sign', 'eth_chainId', 'eth_signTypedData_v4'], // the methods you wish to use
  resources: ['https://example.com'] // any resources relevant to the connection
})

// Present the URI to users as QR code to be able to connect with a wallet
...

// wait for response
const result = await response()

// after a Wallet establishes a connection response will resolve with auths ( authentication objects ) & the established session
const { auths, session } = result;

// now you can send requests to that session
```

#### Making Requests

Once the session has been established successfully, you can start making JSON-RPC requests to be approved and signed by the wallet:

```javascript
const result = await signClient.request({
  topic: session.topic,
  chainId: 'eip155:1',
  request: {
    method: 'personal_sign',
    params: [
      '0x7468697320697320612074657374206d65737361676520746f206265207369676e6564',
      '0x1d85568eEAbad713fBB5293B45ea066e552A90De'
    ]
  }
})
```

> For more information on available JSON-RPC requests, see the [JSON-RPC reference](../../advanced/multichain/rpc-reference/ethereum-rpc.md).

### Restoring a Session

Sessions are saved to localstorage, meaning that even if the web page is reloaded, the session can still be retrieved, as demonstrated in the following code:

```ts
const lastKeyIndex = signClient.session.getAll().length - 1
const lastSession = signClient.session.getAll()[lastKeyIndex]
```

#### Finding a Specific Session

If you need to find a specific session, you can do so by passing in a known `requiredNamespace` and calling `find`.

```ts
const specificSession = _client.find({
  requiredNamespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData'
      ],
      chains: ['eip155:5'],
      events: ['chainChanged', 'accountsChanged']
    }
  }
})
```

</PlatformTabItem>

<PlatformTabItem value="ios">

#### Configure Networking and Pair clients

Make sure that you properly configure Networking and Pair Clients first.

- [Networking](../core/relay.mdx)
- [Pairing](../core/pairing.mdx)

#### Configure Sign Client

In order to initialize a client, call a `configure` method on the Sign instance

```swift
Sign.configure(crypto: CryptoProvider)
```

#### Subscribe for Sign publishers

When your `Sign` instance receives requests from a peer it will publish related event. So you should set subscription to handle them.

To track sessions subscribe to `sessionsPublisher` publisher

```swift
Sign.instance.sessionsPublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] (sessions: [Session]) in
        // reload UI
    }.store(in: &publishers)
```

Following publishers are available to subscribe:

```swift
    public var sessionsPublisher: AnyPublisher<[Session], Never>
    public var sessionProposalPublisher: AnyPublisher<Session.Proposal, Never>
    public var sessionRequestPublisher: AnyPublisher<Request, Never>
    public var socketConnectionStatusPublisher: AnyPublisher<SocketConnectionStatus, Never>
    public var sessionSettlePublisher: AnyPublisher<Session, Never>
    public var sessionDeletePublisher: AnyPublisher<(String, Reason), Never>
    public var sessionResponsePublisher: AnyPublisher<Response, Never>
    public var sessionRejectionPublisher: AnyPublisher<(Session.Proposal, Reason), Never>
    public var sessionUpdatePublisher: AnyPublisher<(sessionTopic: String, namespaces: [String : SessionNamespace]), Never>
    public var sessionEventPublisher: AnyPublisher<(event: Session.Event, sessionTopic: String, chainId: Blockchain?), Never>
    public var sessionUpdateExpiryPublisher: AnyPublisher<(sessionTopic: String, expiry: Date), Never>
```

#### Connect Clients

1. Prepare namespaces that constraints minimal requirements for your dApp:

```Swift
let methods: Set<String> = ["eth_sendTransaction", "personal_sign", "eth_signTypedData"]
let blockchains: Set<Blockchain> = [Blockchain("eip155:1")!, Blockchain("eip155:137")!]
let namespaces: [String: ProposalNamespace] = ["eip155": ProposalNamespace(chains: blockchains, methods: methods, events: []]
```

To learn more on namespaces, check out our [specs](https://specs.walletconnect.com/2.0/specs/clients/sign/namespaces).

2. Your App should generate a pairing URI and share it with a wallet. Uri can be presented as a QR code or sent via a universal link. Wallet begins subscribing for session proposals after receiving URI. In order to create a pairing and send a session proposal, you need to call the following:

```Swift
let uri = try await Sign.instance.connect(requiredNamespaces: namespaces, topic: uri.topic)
```

#### Session Authenticate with ReCaps

The authenticate() method enhances the WalletConnect protocol, offering EVM dApps a sophisticated mechanism to request wallet authentication and simultaneously establish a session. This innovative approach not only authenticates the user but also facilitates a seamless session creation, integrating the capabilities defined by ERC-5573, also known as ReCaps.

ReCaps extend the SIWE protocol, enabling users to give informed consent for dApps to exercise scoped capabilities on their behalf. This consent mechanism is crucial for authorizing a dApp to perform actions or access resources, thus ensuring security and trust in dApp interactions. These scoped capabilities are specified through ReCap URIs in the resources field of the AuthRequestParams, which translate to human-readable consent in the SIWE message, detailing the actions a dApp is authorized to undertake.

To initiate an authentication and authorization request, a dApp invokes the authenticate() method, passing in parameters that include desired capabilities as outlined in EIP-5573. The method generates a pairing URI for user interaction, facilitating a streamlined authentication and consent process.

Example of initiating an authentication request with ReCaps:

```swift
func initiateAuthentication() {
    Task {
        do {
            let authParams = AuthRequestParams.stub() // Customize your AuthRequestParams as needed
            let uri = try await Sign.instance.authenticate(authParams)
            // Present the URI to the user, e.g., show a QR code or send a deep link
            presentAuthenticationURI(uri)
        } catch {
            print("Failed to initiate authentication request: \(error)")
        }
    }
}
```

##### Subscribe to Authentication Responses

Once you have initiated an authentication request, you need to listen for responses from wallets. Responses will indicate whether the authentication request was approved or rejected. Use the authResponsePublisher to subscribe to these events.

Example subscription to authentication responses:

```swift
Sign.instance.authResponsePublisher
    .receive(on: DispatchQueue.main)
    .sink { response in
        switch response.result {
        case .success(let (session, _)):
            if let session = session {
                // Authentication successful, session established
                handleSuccessfulAuthentication(session)
            } else {
                // Authentication successful, but no session created (SIWE-only flow)
                handleSuccessfulAuthenticationWithoutSession()
            }
        case .failure(let error):
            // Authentication request was rejected or failed
            handleAuthenticationFailure(error)
        }
    }
    .store(in: &subscriptions)
```

In this setup, the authResponsePublisher notifies your dApp of the outcome of the authentication request. Your dApp can then proceed based on whether the authentication was successful, rejected, or failed due to an error.

Example of AuthRequestParams:

```swift
extension AuthRequestParams {
    static func stub(
        domain: String = "yourDappDomain.com",
        chains: [String] = ["eip155:1", "eip155:137"],
        nonce: String = "uniqueNonce",
        uri: String = "https://yourDappDomain.com/login",
        statement: String? = "I accept the Terms of Service: https://yourDappDomain.com/tos",
        resources: [String]? = nil, // here your dapp may request authorization with recaps
        methods: [String]? = ["personal_sign", "eth_sendTransaction"]
    ) -> AuthRequestParams {
        return try! AuthRequestParams(
            domain: domain,
            chains: chains,
            nonce: nonce,
            uri: uri,
            statement: statement,
            resources: resources,
            methods: methods
        )
    }
}
```

#### Send Request to the Wallet

Once the session has been established `sessionSettlePublisher` will publish an event. Your dApp can start requesting wallet now.

```Swift
let method = "personal_sign"
let walletAddress = "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83" // This should match the connected address
let requestParams = AnyCodable(["0x4d7920656d61696c206973206a6f686e40646f652e636f6d202d2031363533333933373535313531", walletAddress])
let request = Request(topic: session.topic, method: method, params: requestParams, chainId: Blockchain(chainId)!)
try await Sign.instance.request(params: request)
```

When wallet respond `sessionResponsePublisher` will publish an event so you can verify the response.

#### Extending a Session

By default, session lifetime is set for 7 days and after that time user's session will expire. But if you consider that a session should be extended you can call:

```Swift
try await Sign.instance.extend(topic: session.topic)
```

Above method will extend a user's session to a week.

#### Where to go from here

- Try our [Example dApp](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example) that is part of [WalletConnectSwiftV2 repository](https://github.com/WalletConnect/WalletConnectSwiftV2).
- Build API documentation in XCode: go to Product -> Build Documentation

</PlatformTabItem>

<PlatformTabItem value="android">

#### **Initialization**

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=$projectId"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val appMetaData = Core.Model.AppMetaData(
    name = "Dapp Name",
    description = "Dapp Description",
    url = "Dapp URL",
    icons = /*list of icon url strings*/,
    redirect = "kotlin-dapp-wc:/request" // Custom Redirect URI
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)

val init = Sign.Params.Init(core = CoreClient)

SignClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

The Dapp client is responsible for initiating the connection with wallets and defining the required namespaces (CAIP-2) from the Wallet and is also in charge of sending requests. To initialize the Sign client, create a `Sign.Params.Init` object in the Android Application class with the Core Client. The `Sign.Params.Init` object will then be passed to the `SignClient` initialize function.

#

# **Dapp**

#### **SignClient.DappDelegate**

```kotlin
val dappDelegate = object : SignClient.DappDelegate {
    override fun onSessionApproved(approvedSession: Sign.Model.ApprovedSession) {
        // Triggered when Dapp receives the session approval from wallet
    }

    override fun onSessionRejected(rejectedSession: Sign.Model.RejectedSession) {
        // Triggered when Dapp receives the session rejection from wallet
    }

    fun onSessionAuthenticateResponse(sessionAuthenticateResponse: Sign.Model.SessionAuthenticateResponse) {
        // Triggered when Dapp receives the session authenticate response from wallet
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

    override fun onProposalExpired(proposal: Modal.Model.ExpiredProposal) {
        // Triggered when a proposal becomes expired
    }

    override fun onRequestExpired(request: Modal.Model.ExpiredRequest) {
        // Triggered when a request becomes expired
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

#### **Connect**

```kotlin
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val chains: List<String> = /*List of chains that wallet will be requested for*/
val methods: List<String> = /*List of methods that wallet will be requested for*/
val events: List<String> = /*List of events that wallet will be requested for*/
val requiredNamespaces: Map<String, Sign.Model.Namespaces.Proposal> = mapOf(namespace, Sign.Model.Namespaces.Proposal(accounts, methods, events)) /*Required namespaces to setup a session*/
val optionalNamespaces: Map<String, Sign.Model.Namespaces.Proposal> = mapOf(namespace, Sign.Model.Namespaces.Proposal(accounts, methods, events)) /*Optional namespaces to setup a session*/
val pairing: Core.Model.Pairing = /*Either an active or inactive pairing*/
val connectParams = Sign.Params.Connect(requiredNamespaces, optionalNamespaces, pairing)

fun SignClient.connect(connectParams,
    { onSuccess ->
        /*callback that returns letting you know that you have successfully initiated connecting*/
    },
    { error ->
        /*callback for error while trying to initiate a connection with a peer*/
    }
)
```

More about optional and required namespaces can be found [here](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md)

#

#### **Authenticate**

The authenticate() method enhances the WalletConnect protocol, offering EVM dApps a sophisticated mechanism to request wallet authentication and simultaneously establish a session. This innovative approach not only authenticates the user but also facilitates a seamless session creation, integrating the capabilities defined by ERC-5573, also known as ReCaps.

Capabilities are specified through ReCap URIs in the resources field of the Sign.Params.Authenticate, which translate to human-readable consent in the SIWE message, detailing the actions a dApp is authorized to undertake.

To initiate an authentication and authorization request, a dApp invokes the authenticate() method, passing in parameters that include desired capabilities as outlined in EIP-5573. The method generates a pairing URI for user interaction, facilitating a streamlined authentication and consent process.

Example of initiating an authentication request with ReCaps:

```kotlin
 val authenticateParams = Sign.Params.Authenticate(
            domain = "your.domain",
            chains = listof("eip155:1", "eip155:137"),
            methods = listOf("personal_sign", "eth_signTypedData"),
            uri = "https://yourDappDomain.com/login",
            nonce = randomNonce,
            statement = "Sign in with wallet.",
            resources = null, // here your dapp may request authorization with recaps
        )

SignClient.authenticate(authenticateParams,
    onSuccess = { url ->
        //Handle authentication URI. Show as a QR code a send via deeplink
    },
    onError = { error ->
        //Handle error
    }
)
```

Once you have sent an authentication request, await for responses from wallets. Responses will indicate whether the authentication request was approved or rejected. Use the onSessionAuthenticateResponse callback to receive a response:

```kotlin
 fun onSessionAuthenticateResponse(sessionAuthenticateResponse: Sign.Model.SessionAuthenticateResponse) {
        // Triggered when Dapp receives the session authenticate response from wallet

        if (sessionAuthenticateResponse is Sign.Model.SessionAuthenticateResponse.Result) {
            if (sessionAuthenticateResponse.session != null) {
                // Authentication successful, session established
            } else {
                // Authentication successful, but no session created (SIWE-only flow)
            }
        } else {
            // Authentication request was rejected or failed
        }

}
```

#

#### **Get List of Settled Sessions**

```kotlin
SignClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `SignClient.getListOfSettledSessions()` which will return a list of type `Session`.

#

#### **Get list of pending session requests for a topic**

```kotlin
SignClient.getPendingRequests(topic: String)
```

To get a list of pending session requests for a topic, call `SignClient.getPendingRequests()` and pass a topic which will return
a `PendingRequest` object containing requestId, method, chainIs and params for pending request.

</PlatformTabItem>

<PlatformTabItem value="flutter">

#### Initialization

To create an instance of `SignClient`, you need to pass in the core and metadata parameters.

```dart
SignClient signClient = await SignClient.createInstance(
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

#### Connection

To connect with specific parameters and display the returned URI, use `connect` with the required namespaces.

```dart
ConnectResponse response = await signClient.connect(
    requiredNamespaces: {
        'eip155': RequiredNamespace(
            chains: ['eip155:1'], // Ethereum chain
            methods: ['eth_signTransaction'], // Requestable Methods
        ),
        'kadena': RequiredNamespace(
            chains: ['kadena:mainnet01'], // Kadena chain
            methods: ['kadena_quicksign_v1'], // Requestable Methods
        ),
    }
);

Uri? uri = response.uri;
```

You will use that URI to display a QR code or handle a deep link.

We recommend not handling deep linking yourself. If you want to deep link, then use the [walletconnect_modal_flutter](https://pub.dev/packages/walletconnect_modal_flutter) package.

#### Session Data

Once you've displayed the URI you can wait for the future and hide the QR code once you've received session data.

```dart
final SessionData session = await response.session.future;
```

#### Request Signatures

Once the session had been created, you can request signatures.

```dart
final signature = await signClient.request(
    topic: session.topic,
    chainId: 'eip155:1',
    request: SessionRequestParams(
        method: 'eth_signTransaction',
        params: 'json serializable parameters',
    ),
);
```

#### Respond to Events

You can also respond to events from the wallet, like chain changed, using `onSessionEvent` and `registerEventHandler`.

```dart
signClient.onSessionEvent.subscribe((SessionEvent? session) {
    // Do something with the event
});

signClient.registerEventHandler(
    namespace: 'kadena',
    event: 'kadena_transaction_updated',
);
```

# To Test

Run tests using `flutter test`.
Expected flutter version is: >`3.3.10`

# Useful Commands

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

First you must setup `SignClientOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var dappOptions = new SignClientOptions()
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

Then, you must setup the `ConnectOptions` which define what blockchain, RPC methods and events your dapp will use.

_C# Constructor_

```csharp
var dappConnectOptions = new ConnectOptions()
{
    RequiredNamespaces = new RequiredNamespaces()
    {
        {
            "eip155", new RequiredNamespace()
            {
                Methods = new[]
                {
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData",
                },
                Chains = new[]
                {
                    "eip155:1"
                },
                Events = new[]
                {
                    "chainChanged",
                    "accountsChanged",
                }
            }
        }
    }
};
```

_Builder Functions Style_

```csharp
var dappConnectOptions1 = new ConnectOptions()
    .RequireNamespace("eip155", new RequiredNamespace()
        .WithMethod("eth_sendTransaction")
        .WithMethod("eth_signTransaction")
        .WithMethod("eth_sign")
        .WithMethod("personal_sign")
        .WithMethod("eth_signTypedData")
        .WithChain("eip155:1")
        .WithEvent("chainChanged")
        .WithEvent("accountsChanged")
    );
```

With both options defined, you can initialize and connect the SDK.

```csharp
var dappClient = await WalletConnectSignClient.Init(dappOptions);
var connectData = await dappClient.Connect(dappConnectOptions);
```

You can grab the `Uri` for the connection request from `connectData`.

```csharp
ExampleShowQRCode(connectData.Uri);
```

Then await connection approval using the `Approval` Task object.

```csharp
Task<SessionStruct> sessionConnectTask = connectData.Approval;
SessionStruct sessionData = await sessionConnectTask;

// or
// SessionStruct sessionData = await connectData.Approval;
```

This `Task` will return the `SessionStruct` when the session was approved, or throw an exception when the session request has either

- Timed out
- Been Rejected

#### Connected Address

To get the currently connected address, use the following function

```csharp
public class Caip25Address
{
    public string Address;
    public string ChainId;
}

public Caip25Address GetCurrentAddress(string chain)
{
    if (string.IsNullOrWhiteSpace(chain))
        return null;

    var defaultNamespace = currentSession.Namespaces[chain];

    if (defaultNamespace.Accounts.Length == 0)
        return null;

    var fullAddress = defaultNamespace.Accounts[0];
    var addressParts = fullAddress.Split(":");

    var address = addressParts[2];
    var chainId = string.Join(':', addressParts.Take(2));

    return new Caip25Address()
    {
        Address = address,
        ChainId = chainId,
    };
}

public Caip25Address GetCurrentAddress()
{
    var currentSession = dappClient.Session.Get(dappClient.Session.Keys[0]);

    var defaultChain = currentSession.Namespaces.Keys.FirstOrDefault();

    if (string.IsNullOrWhiteSpace(defaultChain))
        return null;

    return GetCurrentAddress(defaultChain);
}
```

#### WalletConnect Methods

All sign methods require the `topic` of the session to be given. This can be found in the `SessionStruct` object given when a session has been given approval by the user.

```csharp
var sessionTopic = sessionData.Topic;
```

##### Update Session

Update a session, adding/removing additional namespaces in the given topic.

```csharp
var newNamespaces = new Namespaces(...);
var request = await dappClient.UpdateSession(sessionTopic, newNamespaces);
await request.Acknowledged();
```

##### Extend Session

Extend a session's expiry time so the session remains open

```csharp
var request = await dappClient.Extend(sessionTopic);
await request.Acknowledged();
```

##### Ping

Send a ping to the session

```csharp
var request = await dappClient.Ping(sessionTopic);
await request.Acknowledged();
```

#### Session Requests

Sending session requests as a dapp requires to build the request **and** response classes that the session request `params` will be structured. C# is a statically typed language, so these types must be given whenever you do a session request (or do any querying for session requests).

Currently, **WalletConnectSharp does not automatically assume the object type for `params` is an array**. This is very important, since most EVM RPC requests have `params` as an array type. **Use `List<T>` to workaround this**. For example, for `eth_sendTransaction`, use `List<Transaction>` instead of `Transaction`.

Newtonsoft.Json is used for JSON serialization/deserialization, therefore you can use Newtonsoft.Json attributes when defining fields in your request/response classes.

##### Building a Request type

Create a class for the request and populate it with the JSON properties the request object has. For this example, we will use `eth_sendTransaction`

The `params` field for `eth_sendTransaction` has the object type

```csharp
using Newtonsoft.Json;

public class Transaction
{
    public string from;

    // Newtonsoft.Json attributes can be used
    [JsonProperty("to")]
    public string To;

    [JsonProperty("gas", NullValueHandling = NullValueHandling.Ignore)]
    public string Gas;

    // Properties have limited support
    [JsonProperty("gasPrice", NullValueHandling = NullValueHandling.Ignore)]
    public string GasPrice { get; set; }

    [JsonProperty("value")]
    public string Value { get; set; }

    [JsonProperty("data", NullValueHandling = NullValueHandling.Ignore)]
    public string Data { get; set; } = "0x";
}
```

:::note

[**the `params` field is an array of this object**](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
:::

```json
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

Now, let's define the actual request class we'll use in `dappClient.Request`

```csharp
[RpcMethod("eth_sendTransaction"), RpcRequestOptions(Clock.ONE_MINUTE, 99997)]
public class EthSendTransaction : List<Transaction>
{
    public EthSendTransaction(params Transaction[] transactions) : base(transactions)
    {
    }
}
```

The `RpcMethod` class attributes defines the rpc method this request uses. The `RpcRequestOptions` class attributes define the expiry time and tag attached to the request. **Both of these attributes are required**

We use `List<Transaction>` since the `params` field for `eth_sendTransaction` is actually sent as an object array. If the `params` field was a normal object, then we could use `Transaction` or define the fields directly into this class.

##### Sending a request

The response type for `eth_sendTransaction` is a `string`, so no response type is required to be made. You only need to create a response type if the response type is a custom object.

```csharp
var wallet = GetCurrentAddress();
var result = new EthSendTransaction(new Transaction()
{
    From = wallet.Address,
    To = wallet.Address,
    Value = "0"
});

// Returns the transaction hash or throws an error
string result = await dappClient.Request<EthSendTransaction, string>(sessionTopic, request, wallet.ChainId);
```

#### Disconnecting

To disconnect a session, use the `Disconnect` function. You may optional provide a reason for the disconnect

```csharp
await dappClient.Disconnect(sessionTopic);

// or

await dappClient.Disconnect(sessionTopic, Error.FromErrorType(ErrorType.USER_DISCONNECTED));
```

#### Subscribe to session events

```csharp
dappClient.SubscribeToSessionEvent("chainChanged", OnChainChanged);
```

</PlatformTabItem>

<PlatformTabItem value="unity">

WalletConnectUnity is a wrapper for WalletConnectSharp. It simplifies managing a single active session, addressing a common challenge with the original library.

#### Features of WalletConnectUnity

1. **Simplified Session Management**: WalletConnectSharp is designed to support multiple sessions, requiring developers to manually track and restore the active session. WalletConnectUnity simplifies this process by focusing on a single session, making it easier to manage session restoration.

2. **Session Restoration**: WalletConnectUnity includes methods to easily access and restore the active session from storage.

3. **Deep Linking Support**: WalletConnectUnity automatically handles deep linking for mobile and desktop wallets.

4. **QR Code Generation**: WalletConnectUnity provides a utility for generating QR codes.

#### Usage

To use WalletConnectUnity in your project:

1. Fill in the Project ID and Metadata fields in the `Assets/WalletConnectUnity/Resources/WalletConnectProjectConfig` asset.
   - If you don’t have a Project ID, you can create one at [WalletConnect Cloud](https://cloud.walletconnect.com).
   - The `Redirect` fields are optional. They are used to redirect the user back to your app after they approve or reject the session.
2. Initialize `WalletConnect` and connect the wallet:

```csharp
// Initialize singleton
await WalletConnect.Instance.InitializeAsync();

// Or handle instancing manually
var walletConnectUnity = new WalletConnect();
await walletConnectUnity.InitializeAsync();

// Try to resume the last session
var sessionResumed = await WalletConnect.Instance.TryResumeSessionAsync();
if (!sessionResumed)
{
    var connectedData = await WalletConnect.Instance.ConnectAsync(connectOptions);

    // Create QR code texture
    var texture = WalletConnectUnity.Core.Utils.QRCode.EncodeTexture(connectedData.Uri);

    // ... Display QR code texture

    // Wait for wallet approval
    await connectedData.Approval;
}
```

All features of WalletConnectSharp are accessible in WalletConnectUnity.
For complex scenarios, the `SignClient` can be accessed directly through `WalletConnect.SignClient`.

Refer to the `C#` documentation for details on using the Sign API within WalletConnectUnity.
The usage of the WalletConnectSharp.Sign API remains consistent with `C#`.

</PlatformTabItem>

</PlatformTabs>
