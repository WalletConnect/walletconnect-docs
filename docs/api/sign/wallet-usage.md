import Container from '../../components/Container'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import PlatformTabs from '../../components/PlatformTabs'
import PlatformTabItem from '../../components/PlatformTabItem'
import CloudBanner from '../../components/CloudBanner'

# Wallet Usage

Sign API establishes a session between a wallet and a dapp in order to expose a set of blockchain accounts that can sign transactions or messages using a secure remote JSON-RPC transport with methods and events.

<CloudBanner/>

<PlatformTabs
groupId="api-sign"
activeOptions={["web","ios","android","csharp"]}>

<PlatformTabItem value="web">

:::info
This library is compatible with Node.js, browsers and React Native applications (Node.js modules require polyfills for React Native).
:::info

#### Migrating from v1.x

**We recommend you install v1 and v2 together for maximum compatibility.** If your wallet already uses `@walletconnect/client@1.x.x`,
you should be able to add `@walletconnect/sign-client@2.x.x` without any issues.

If you experience dependency clashes or you require both `@walletconnect/types@1.x.x` and `@walletconnect/types@2.x.x` in parallel
in your wallet's top-level dependencies, please refer to the [`legacy` packages](https://github.com/WalletConnect/walletconnect-legacy/tree/main/packages) which were published explicitly for this purpose.

In the above scenario, you would replace `@walletconnect/types@1.x.x` with `@walletconnect/legacy-types` and then install `@walletconnect/types@2.x.x`.

#### Integrating Auth

We strongly encourage wallets to also integrate the [Auth](../auth/overview.md) API so that dapps using only Auth can still participate in the same ecosystem.

#### Initializing the client

Initialize client as a controller using [your Project ID](../../cloud/relay.md).

```js
const signClient = await SignClient.init({
  projectId: '<YOUR PROJECT ID>',
  // optional parameters
  relayUrl: '<YOUR RELAY URL>',
  metadata: {
    name: 'Wallet name',
    description: 'A short description for your wallet',
    url: "<YOUR WALLET'S URL>",
    icons: ["<URL TO WALLET'S LOGO/ICON>"]
  }
})
```

#### Setting up event listeners

WalletConnect v2.0 emits events related to the current session. The listeners listed in the following code snippet represent typical
events in a session's lifecycle that you can listen for to synchronise your application accordingly.

Example: when a `session_delete` event is emitted, it makes sense to change the UI from an active session state to
an inactive/disconnected state.

**1. Add listeners for desired `SignClient` events.**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners.](../core/pairing.mdx)
:::

```ts
signClient.on('session_proposal', event => {
  // Show session proposal data to the user i.e. in a modal with options to approve / reject it

  interface Event {
    id: number
    params: {
      id: number
      expiry: number
      relays: Array<{
        protocol: string
        data?: string
      }>
      proposer: {
        publicKey: string
        metadata: {
          name: string
          description: string
          url: string
          icons: string[]
        }
      }
      requiredNamespaces: Record<
        string,
        {
          chains: string[]
          methods: string[]
          events: string[]
        }
      >
      pairingTopic?: string
    }
  }
})

signClient.on('session_event', event => {
  // Handle session events, such as "chainChanged", "accountsChanged", etc.

  interface Event {
    id: number
    topic: string
    params: {
      event: {
        name: string
        data: any
      }
      chainId: string
    }
  }
})

signClient.on('session_request', event => {
  // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.

  interface Event {
    id: number
    topic: string
    params: {
      request: {
        method: string
        params: any
      }
      chainId: string
    }
  }
})

signClient.on('session_ping', event => {
  // React to session ping event

  interface Event {
    id: number
    topic: string
  }
})

signClient.on('session_delete', event => {
  // React to session delete event

  interface Event {
    id: number
    topic: string
  }
})
```

# Pairing and session permissions

#### URI

The pairing proposal between a wallet and a dapp is made using an [URI](https://specs.walletconnect.com/2.0/specs/clients/core/pairing/). In WalletConnect v2.0 the session and pairing are decoupled from each other. This means that a URI is shared to construct a pairing proposal, and only after settling the pairing the dapp can propose a session using that pairing. In simpler words, the dapp generates an URI that can be used by the wallet for pairing.

#### Namespaces

The `namespaces` parameter is used to specify the namespaces and chains that are intended to be used in the session. The following is an example:

```js
namespaces: {
  eip155: {
    accounts: ["eip155:1:0x0000000000..., eip155:2:0x0000000000..."],
    methods: ["personal_sign", "eth_sendTransaction"],
    events: ["accountsChanged"]
  },
};
```

#### Pairing with `uri`

To create a pairing proposal, simply pass the `uri` received from the dapp into the `signClient.core.pairing.pair()` function.

:::caution
As of 2.0.0 (stable), calling pairing-specific methods (such as `signClient.pair()`) directly on `signClient` will continue to work, but is considered deprecated and will be removed in a future major version.

It is recommended to instead call these methods directly via the [Pairing API.](../core//pairing.mdx), e.g.: `signClient.core.pairing.pair()`.
:::

```js
// This will trigger the `session_proposal` event
await signClient.core.pairing.pair({ uri })

// Approve session proposal, use id from session proposal event and respond with namespace(s) that satisfy dapps request and contain approved accounts
const { topic, acknowledged } = await signClient.approve({
  id: 123,
  namespaces: {
    eip155: {
      accounts: ['eip155:1:0x0000000000...'],
      methods: ['personal_sign', 'eth_sendTransaction'],
      events: ['accountsChanged']
    }
  }
})

// Optionally await acknowledgement from dapp
const session = await acknowledged()

// Or reject session proposal
await signClient.reject({
  id: 123,
  reason: {
    code: 1,
    message: 'rejected'
  }
})
```

#### Pairing with QR Codes

To facilitate better user experience, it is possible to pair wallets with dapps by scanning QR codes. This can be implemented by using any QR code scanning library (example, [react-qr-reader](https://www.npmjs.com/package/react-qr-reader)). After scanning the QR code, pass the obtained `uri` into the `signClient.pair()` function. A useful reference for implementing QR codes for pairing is the [react wallet example](https://github.com/WalletConnect/web-examples/blob/main/advanced/wallets/react-wallet-v2/).

## Authenticated Session

This section outlines an innovative protocol method that facilitates the initiation of a Sign session and the authentication of a wallet through a Sign-In with Ethereum (SIWE) message, enhanced by ReCaps (ReCap Capabilities). This enhancement not only offers immediate authentication for dApps, paving the way for prompt user logins, but also integrates informed consent for authorization. Through this mechanism, dApps can request the delegation of specific capabilities to perform actions on behalf of the wallet user. These capabilities, encapsulated within SIWE messages as ReCap URIs, detail the scope of actions authorized by the user in an explicit and human-readable form.

By incorporating ReCaps, this method extends the utility of SIWE messages, allowing dApps to combine authentication with a nuanced authorization model. This model specifies the actions a dApp is authorized to execute on the user's behalf, enhancing security and user autonomy by providing clear consent for each delegated capability. As a result, dApps can utilize these consent-backed messages to perform predetermined actions, significantly enriching the interaction between dApps, wallets, and users within the Ethereum ecosystem.

#### Handling Authentication Requests

To handle incoming authentication requests, subscribe to the `session_authenticate` event. This will notify you of any authentication requests that need to be processed, allowing you to either approve or reject them based on your application logic.

```typescript
web3wallet.on('session_authenticate', async payload => {
  // Process the authentication request here.
  // Steps include:
  // 1. Populate the authentication payload with the supported chains and methods
  // 2. Format the authentication message using the payload and the user's account
  // 3. Present the authentication message to the user
  // 4. Sign the authentication message(s) to create a verifiable authentication object(s)
  // 5. Approve the authentication request with the authentication object(s)
})
```

#### Populate Authentication Payload

```typescript
import { populateAuthPayload } from "@walletconnect/utils";

// EVM chains that your wallet supports
const supportedChains = ["eip155:1", "eip155:2", 'eip155:137'];
// EVM methods that your wallet supports
const supportedMethods = ["personal_sign", "eth_sendTransaction", "eth_signTypedData"];
// Populate the authentication payload with the supported chains and methods
const authPayload = populateAuthPayload({
  authPayload: payload.params.authPayload,
  chains: supportedChains,
  methods: supportedMethods,
});
// Prepare the user's address in CAIP10(https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) format
const iss = `eip155:1:0x0Df6d2a56F90e8592B4FfEd587dB3D5F5ED9d6ef`;
// Now you can use the authPayload to format the authentication message
const message = web3wallet.formatAuthMessage({
  request: authPayload,
  iss
});

// Present the authentication message to the user
...
```

#### Approving Authentication Requests

:::info Note

1. The recommended approach for secure authentication across multiple chains involves signing a SIWE (Sign-In with Ethereum) message for each chain and account. However, at a minimum, one SIWE message must be signed to establish a session. It is possible to create a session for multiple chains with just one issued authentication object.
2. Sometimes a dapp may want to only authenticate the user without creating a session, not every approval will result with a new session.
   :::

```typescript
// Approach 1
// Sign the authentication message(s) to create a verifiable authentication object(s)
const signature = await cryptoWallet.signMessage(message, privateKey)
// Build the authentication object(s)
const auth = buildAuthObject(
  authPayload,
  {
    t: 'eip191',
    s: signature
  },
  iss
)

// Approve
await web3wallet.approveSessionAuthenticate({
  id: payload.id,
  auths: [auth]
})

// Approach 2
// Note that you can also sign multiple messages for every requested chain/address pair
const auths = []
authPayload.chains.forEach(async chain => {
  const message = web3wallet.formatAuthMessage({
    request: authPayload,
    iss: `${chain}:${cryptoWallet.address}`
  })
  const signature = await cryptoWallet.signMessage(message)
  const auth = buildAuthObject(
    authPayload,
    {
      t: 'eip191', // signature type
      s: signature
    },
    `${chain}:${cryptoWallet.address}`
  )
  auths.push(auth)
})

// Approve
await web3wallet.approveSessionAuthenticate({
  id: payload.id,
  auths
})
```

#### Rejecting Authentication Requests

If the authentication request cannot be approved or if the user chooses to reject it, use the rejectSession method.

```typescript
import { getSdkError } from '@walletconnect/utils'

await web3wallet.rejectSessionAuthenticate({
  id: payload.id,
  reason: getSdkError('USER_REJECTED') // or choose a different reason if applicable
})
```

</PlatformTabItem>

<PlatformTabItem value="ios">

#### Configure Networking and Pair Clients

Confirm you have configured the Network and Pair Client first

- [Networking](../core/relay.mdx)
- [Pairing](../core/pairing.mdx)

#### Configure Sign Client

In order to initialize a client, call a `configure` method on the Sign instance

```swift
Sign.configure(crypto: CryptoProvider)
```

#### Subscribe for Sign Publishers

The following publishers are available to subscribe:

```swift
public var sessionsPublisher: AnyPublisher<[Session], Never>
public var sessionProposalPublisher: AnyPublisher<(proposal: Session.Proposal, context: VerifyContext?), Never>
public var sessionRequestPublisher: AnyPublisher<(request: Request, context: VerifyContext?), Never>
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

Your Wallet should allow users to scan a QR code generated by dapps. You are responsible for implementing it on your own.
For testing, you can use our test dapp at: https://react-app.walletconnect.com/, which is v2 protocol compliant.
Once you derive a URI from the QR code call `pair` method:

```swift
try await Pair.instance.pair(uri: uri)
```

if everything goes well, you should handle following event:

```swift
Sign.instance.sessionProposalPublisher
    .receive(on: DispatchQueue.main)
    .sink { [weak self] session in
        self?.verifyDapp(session.context)
        self?.showSessionProposal(session.proposal)
    }.store(in: &publishers)
```

Session proposal is a handshake sent by a dapp and it's purpose is to define a session rules. Handshake procedure is defined by [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md).
`Session.Proposal` object conveys set of required `ProposalNamespaces` that contains required blockchains methods and events. Dapp requests with methods and wallet will emit events defined in namespaces.

`VerifyContext` provides a domain verification information about `Session.Proposal` and `Request`. It consists of origin of a Dapp from where the request has been sent, validation enum that says whether origin is **unknown**, **valid** or **invalid** and verify URL server.

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

The user will either approve the session proposal (with session namespaces) or reject it. Session namespaces must at least contain requested methods, events and accounts associated with proposed blockchains.

Accounts must be provided according to [CAIP10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) specification and be prefixed with a chain identifier. chain_id + : + account_address. You can find more on blockchain identifiers in [CAIP2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md). Our `Account` type meets the criteria.

```
let account = Account("eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb")!
```

Accounts sent in session approval must at least match all requested blockchains.

Example proposal namespaces request:

```json
{
  "eip155": {
    "chains": ["eip155:137", "eip155:1"],
    "methods": ["eth_sign"],
    "events": ["accountsChanged"]
  },
  "cosmos": {
    "chains": ["cosmos:cosmoshub-4"],
    "methods": ["cosmos_signDirect"],
    "events": ["someCosmosEvent"]
  }
}
```

Example session namespaces response:

```json
{
  "eip155": {
    "accounts": [
      "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
      "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
    ],
    "methods": ["eth_sign"],
    "events": ["accountsChanged"]
  },
  "cosmos": {
    "accounts": ["cosmos:cosmoshub-4:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0"],
    "methods": ["cosmos_signDirect", "personal_sign"],
    "events": ["someCosmosEvent", "proofFinalized"]
  }
}
```

#### 💡 AutoNamespaces Builder Utility

`AutoNamespaces` is a helper utility that greatly reduces the complexity of parsing the required and optional namespaces. It accepts as parameters a session proposal along with your user's chains/methods/events/accounts and returns ready-to-use `SessionNamespace` object.

```swift
public static func build(
    sessionProposal: Session.Proposal,
    chains: [Blockchain],
    methods: [String],
    events: [String],
    accounts: [Account]
) throws -> [String: SessionNamespace]
```

Example usage

```swift
do {
    let sessionNamespaces = try AutoNamespaces.build(
        sessionProposal: proposal,
        chains: [Blockchain("eip155:1")!, Blockchain("eip155:137")!],
        methods: ["eth_sendTransaction", "personal_sign"],
        events: ["accountsChanged", "chainChanged"],
        accounts: [
            Account(blockchain: Blockchain("eip155:1")!, address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb")!,
            Account(blockchain: Blockchain("eip155:137")!, address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb")!
        ]
    )
    try await Sign.instance.approve(proposalId: proposal.id, namespaces: sessionNamespaces)
} catch {
    print(error)
}
```

#### Approve Session

```swift
 Sign.instance.approve(
    proposalId: "proposal_id",
    namespaces: sessionNamespaces
)
```

#### Reject Session

```swift
Sign.instance.reject(
    proposalId: "proposal_id",
    reason: .userRejected
)
```

When session is successfully approved `sessionSettlePublisher` will publish a `Session`

```swift
Sign.instance.sessionSettlePublisher
    .receive(on: DispatchQueue.main)
    .sink { [weak self] _ in
        self?.reloadSessions()
    }.store(in: &publishers)
```

`Session` object represents an active session connection with a dapp. It contains dapp’s metadata (that you may want to use for displaying an active session to the user), namespaces, and expiry date. There is also a topic property that you will use for linking requests with related sessions.

You can always query settled sessions from the client later with:

```swift
Sign.instance.getSessions()
```

#### Track Sessions

When your `Sign` instance receives requests from a peer it will publish a related event. Set a subscription to handle them.

To track sessions subscribe to `sessionsPublisher` publisher

```swift
Sign.instance.sessionsPublisher
    .receive(on: DispatchQueue.main)
    .sink { [self self] (sessions: [Session]) in
        // Reload UI
    }.store(in: &publishers)
```

#### Handle Requests from Dapp

After the session is established, a dapp will request your wallet's users to sign a transaction or a message. Requests will be delivered by the following publisher.

```swift
Sign.instance.sessionRequestPublisher
    .receive(on: DispatchQueue.main)
    .sink { [weak self] session in
        self?.verifyDapp(session.context)
        self?.showSessionRequest(session.request)
    }.store(in: &publishers)
```

When a wallet receives a session request, you probably want to show it to the user. It’s method will be in scope of session namespaces. And it’s params are represented by `AnyCodable` type. An expected object can be derived as follows:

```swift
if sessionRequest.method == "personal_sign" {
    let params = try! sessionRequest.params.get([String].self)
} else if method == "eth_signTypedData" {
    let params = try! sessionRequest.params.get([String].self)
} else if method == "eth_sendTransaction" {
    let params = try! sessionRequest.params.get([EthereumTransaction].self)
}
```

Now, your wallet (as it owns your user’s private keys) is responsible for signing the transaction. After doing it, you can send a response to a dapp.

```swift
let response: AnyCodable = sign(request: sessionRequest) // Implement your signing method
try await Sign.instance.respond(topic: request.topic, requestId: request.id, response: .response(response))
```

#### Update Session

If you want to update user session's chains, accounts, methods or events you can use session update method.

```swift
try await Sign.instance.update(topic: session.topic, namespaces: newNamespaces)
```

#### Extend Session

By default, session lifetime is set for 7 days and after that time user's session will expire. But if you consider that a session should be extended you can call:

```swift
try await Sign.instance.extend(topic: session.topic)
```

above method will extend a user's session to a week.

#### Disconnect Session

For good user experience your wallet should allow users to disconnect unwanted sessions. In order to terminate a session use `disconnect` method.

```swift
try await Sign.instance.disconnect(topic: session.topic)
```

### Authenticated Session

An authenticated session represents a secure connection established between a wallet and a dApp after successful authentication.

#### Handling Authentication Requests

To handle incoming authentication requests, subscribe to the authenticateRequestPublisher. This will notify you of any authentication requests that need to be processed, allowing you to either approve or reject them based on your application logic.

```swift
Sign.instance.authenticateRequestPublisher
    .receive(on: DispatchQueue.main)
    .sink { result in
        // Process the authentication request here.
        // This involves displaying UI to the user.
    }
    .store(in: &subscriptions) // Assuming `subscriptions` is where you store your Combine subscriptions.
```

#### Building Authentication Objects

To interact with authentication requests, first build authentication objects (AuthObject). These objects are crucial for approving authentication requests. This involves:

**Creating an Authentication Payload** - Generate an authentication payload that matches your application's supported chains and methods.
**Formatting Authentication Messages** - Format the authentication message using the payload and the user's account.
**Signing the Authentication Message** - Sign the formatted message to create a verifiable authentication object.

Example Implementation:

```swift
func buildAuthObjects(request: AuthenticationRequest, account: Account, privateKey: String) throws -> [AuthObject] {
    let requestedChains = Set(request.payload.chains.compactMap { Blockchain($0) })
    let supportedChains: Set<Blockchain> = [Blockchain("eip155:1")!, Blockchain("eip155:137")!, Blockchain("eip155:69")!]
    let commonChains = requestedChains.intersection(supportedChains)
    let supportedMethods = ["personal_sign", "eth_sendTransaction"]

    var authObjects = [AuthObject]()
    for chain in commonChains {
        let accountForChain = Account(blockchain: chain, address: account.address)!
        let supportedAuthPayload = try Sign.instance.buildAuthPayload(
            payload: request.payload,
            supportedEVMChains: Array(commonChains),
            supportedMethods: supportedMethods
        )
        let formattedMessage = try Sign.instance.formatAuthMessage(payload: supportedAuthPayload, account: accountForChain)
        let signature = // Assume `signMessage` is a function you've implemented to sign messages.
            signMessage(message: formattedMessage, privateKey: privateKey)

        let authObject = try Sign.instance.buildSignedAuthObject(
            authPayload: supportedAuthPayload,
            signature: signature,
            account: accountForChain
        )
        authObjects.append(authObject)
    }
    return authObjects
}

```

#### Approving Authentication Requests

To approve an authentication request, construct AuthObject instances for each supported blockchain, sign the authentication messages, build AuthObjects and call approveSessionAuthenticate with the request ID and the authentication objects.

```swift
let session = try await Sign.instance.approveSessionAuthenticate(requestId: requestId, auths: authObjects)
```

:::info Note

1. The recommended approach for secure authentication across multiple chains involves signing a SIWE (Sign-In with Ethereum) message for each chain and account. However, at a minimum, one SIWE message must be signed to establish a session. It is possible to create a session for multiple chains with just one issued authentication object.
2. Sometimes a dapp may want to only authenticate the user without creating a session, not every approval will result with a new session.
   :::

#### Rejecting Authentication Requests

If the authentication request cannot be approved or if the user chooses to reject it, use the rejectSession method.

```swift
try await Sign.instance.rejectSession(requestId: requestId)
```

#### Where to go from here

- Try our example wallet implementation [here](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example/WalletApp).
<!-- - To dive deeper into protocol concepts check out our [documentation](https://docs.walletconnect.com/protocol/glossary) -->
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
    name = "Wallet Name",
    description = "Wallet Description",
    url = "Wallet URL",
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

# **Wallet**

#### **SignClient.WalletDelegate**

```kotlin
val walletDelegate = object : SignClient.WalletDelegate {
    override fun onSessionProposal(sessionProposal: Sign.Model.SessionProposal, verifyContext: Sign.Model.VerifyContext) {
        // Triggered when wallet receives the session proposal sent by a Dapp
    }

    val onSessionAuthenticate: ((Sign.Model.SessionAuthenticate, Sign.Model.VerifyContext) -> Unit)? get() = null
    // Triggered when wallet receives the session authenticate sent by a Dapp

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

#### **Session Approval**

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

#### **Session Rejection**

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

#### **Session Disconnect**

```kotlin
val disconnectionReason: String = /*The reason for disconnecting the Session*/
val disconnectionCode: String = /*The code for disconnecting the Session*/
val sessionTopic: String = /*Topic from the Session*/
For reference use CAIP-25: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md
val disconnectParams = Sign.Params.Disconnect(sessionTopic, disconnectionReason, disconnectionCode)

SignClient.disconnect(disconnectParams) { error -> /*callback for error while disconnecting a session*/ }
```

To disconnect from a settled session, pass a disconnection reason with code and the Session topic to the `SignClient.disconnect`
function.

#

#### **Respond Request**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val jsonRpcResponse: Sign.Model.JsonRpcResponse.JsonRpcResult = /*Settled Session Request ID along with request data*/
val result = Sign.Params.Response(sessionTopic = sessionTopic, jsonRpcResponse = jsonRpcResponse)

SignClient.respond(result) { error -> /*callback for error while responding session request*/ }
```

To respond to JSON-RPC method that were sent from Dapps for a session, submit a `Sign.Params.Response` with the session's topic and request
ID along with the respond data to the `SignClient.respond` function.

#### **Reject Request**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val jsonRpcResponseError: Sign.Model.JsonRpcResponse.JsonRpcError = /*Session Request ID along with error code and message*/
val result = Sign.Params.Response(sessionTopic = sessionTopic, jsonRpcResponse = jsonRpcResponseError)

SignClient.respond(result) { error -> /*callback for error while responding session request*/ }
```

To reject a JSON-RPC method that was sent from a Dapps for a session, submit a `Sign.Params.Response` with the settled session's topic and
request ID along with the rejection data to the `SignClient.respond` function.

#

#### **Session Update**

NOTE: addresses provided in `accounts` array should follow [CAIP10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md)
semantics and syntax.

```kotlin
val sessionTopic: String = /*Topic of Session*/
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val accounts: List<String> = /*List of accounts on authorized chains*/
val methods: List<String> = /*List of methods that wallet approves*/
val events: List<String> = /*List of events that wallet approves*/
val namespaces: Map<String, Sign.Model.Namespaces.Session> = mapOf(namespace, Sign.Model.Namespaces.Session(accounts, methods, events))
val updateParams = Sign.Params.Update(sessionTopic, namespaces)

SignClient.update(updateParams) { error -> /*callback for error while sending session update*/ }
```

To update a session with namespaces, use `SignClient.Update` to submit a `Sign.Params.Update` object with the session's topic and updated namespace objects (i.e. adding requesting new methods or events, new accounts on authorized chains, or authorizing new chainIds within a multi-chain namespace).

#

#### **Session Extend**

```kotlin
val sessionTopic: String = /*Topic of Session*/
val extendParams = Sign.Params.Extend(sessionTopic = sessionTopic)

SignClient.extend(extendParams) { error -> /*callback for error while extending a session*/ }
```

To extend a session, create a `Sign.Params.Extend` object with the session's topic to update the session with to `Sign.Extend`. Session is
extended by 7 days.

#### **Session Ping**

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

#

#### **Authenticated Session**

An authenticated session represents a secure connection established between a wallet and a dApp after successful authentication.

### Authentication Requests

To handle incoming authentication requests, set up SignClient.WalletDelegate. The onSessionAuthenticate callback will notify you of any authentication requests that need to be processed, allowing you to either approve or reject them based on your application logic.

```kotlin
override val onSessionAuthenticate: ((Wallet.Model.SessionAuthenticate, Wallet.Model.VerifyContext) -> Unit)
  get() = { sessionAuthenticate, verifyContext ->
      // Triggered when wallet receives the session authenticate sent by a Dapp
      // Process the authentication request here
      // This involves displaying UI to the user
}
```

### Responding Authentication Request

To interact with authentication requests, build authentication objects (Sign.Model.Cacao). It involves the following steps:

**Creating an Authentication Payload Params** - Generate an authentication payload params that matches your application's supported chains and methods.
**Formatting Authentication Messages** - Format the authentication message using the payload and the user's account.
**Signing the Authentication Message** - Sign the formatted message to create a verifiable authentication object.

Example:

```kotlin
override val onSessionAuthenticate: ((Wallet.Model.SessionAuthenticate, Wallet.Model.VerifyContext) -> Unit)
  get() = { sessionAuthenticate, verifyContext ->
  val auths = mutableListOf<Sign.Model.Cacao>()

  val authPayloadParams =
    generateAuthPayloadParams(
      sessionAuthenticate.payloadParams,
      supportedChains = listOf("eip155:1", "eip155:137", "eip155:56"), // Note: Only EVM chains are supported
      supportedMethods = listOf("personal_sign", "eth_signTypedData", "eth_sign")
  )

  authPayloadParams.chains.forEach { chain ->
    val issuer = "did:pkh:$chain:$address"
    val formattedMessage = formatAuthMessage(Sign.Params.FormatMessage(authPayloadParams, issuer))

    val signature = signMessage(message: formattedMessage, privateKey: privateKey) //Note: Assume `signMessage` is a function you've implemented to sign messages.
    val auth = generateAuthObject(authPayloadParams, issuer, signature)
    auths.add(auth)
  }
}
```

### Approving Authentication Requests

To approve an authentication request, construct Sign.Model.Cacao instances for each supported chain, sign the authentication messages, build AuthObjects and call approveAuthenticate with the request ID and the authentication objects.

```kotlin
 val approveAuthenticate = Sign.Params.ApproveAuthenticate(id = sessionAuthenticate.id, auths = auths)
SignClient.approveAuthenticate(approveProposal,
  onSuccess = {
    //Redirect back to the dapp if redirect is set: sessionAuthenticate.participant.metadata?.redirect
  },
  onError = { error ->
      //Handle error
  }
)
```

:::info Note

1. The recommended approach for secure authentication across multiple chains involves signing a SIWE (Sign-In with Ethereum) message for each chain and account. However, at a minimum, one SIWE message must be signed to establish a session. It is possible to create a session for multiple chains with just one issued authentication object.
2. Sometimes a dapp may want to only authenticate the user without creating a session, not every approval will result with a new session.
   :::

### Rejecting Authentication Requests

If the authentication request cannot be approved or if the user chooses to reject it, use the rejectAuthenticate method.

```kotlin
val rejectParams = Sign.Params.RejectAuthenticate(
    id = sessionAuthenticate.id,
    reason = "Reason"
)

SignClient.rejectAuthenticate(rejectParams,
  onSuccess = {
        //Success
  },
  onError = { error ->
      //Handle error
  }
)
```

</PlatformTabItem>

<PlatformTabItem value="csharp">

#### Setup

First you must setup `SignClientOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var walletOptions = new SignClientOptions()
{
    ProjectId = "39f3dc0a2c604ec9885799f9fc5feb7c",
    Metadata = new Metadata()
    {
        Description = "An example wallet to showcase WalletConnectSharpv2",
        Icons = new[] { "https://walletconnect.com/meta/favicon.ico" },
        Name = "WalletConnectSharpv2 Wallet Example",
        Url = "https://walletconnect.com"
    },
    // Uncomment to disable persistent storage
    // Storage = new InMemoryStorage()
};
```

Once you have the options defined, you can initialize the SDK.

```csharp
var walletClient = await WalletConnectSignClient.Init(walletOptions);
```

Wallets can pair an incoming session using the session's Uri. Pairing a session lets the Wallet obtain the connection proposal which can then be approved or denied.

```csharp
ProposalStruct proposal = await walletClient.Pair(connectData.Uri);
```

The wallet can then approve or reject the proposal using either of the following:

```csharp
string addressToConnect = ...;
var approveData = await walletClient.Approve(proposal, addressToConnect);
await approveData.Acknowledged();
```

```csharp
string[] addressesToConnect = ...;
var approveData = await walletClient.Approve(proposal, addressesToConnect);
await approveData.Acknowledged();
```

```csharp
await walletClient.Reject(proposal, "User rejected");
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
var request = await walletClient.UpdateSession(sessionTopic, newNamespaces);
await request.Acknowledged();
```

##### Extend Session

Extend a session's expiry time so the session remains open

```csharp
var request = await walletClient.Extend(sessionTopic);
await request.Acknowledged();
```

##### Ping

Send a ping to the session

```csharp
var request = await walletClient.Ping(sessionTopic);
await request.Acknowledged();
```

#### Responding to Session Requests

Responding to session requests is very similar to sending session requests. See dApp usage on how sending session requests works. All custom session requests requires a request class **and** response class to be created that matches the `params` field type in the custom session request. C# is a statically typed language, so these types must be given whenever you do a session request (or do any querying for session requests).

Currently, **WalletConnectSharp does not automatically assume the object type for `params` is an array**. This is very important, since most EVM RPC requests have `params` as an array type. **Use `List<T>` to workaround this**. For example, for `eth_sendTransaction`, use `List<Transaction>` instead of `Transaction`.

Newtonsoft.Json is used for JSON serialization/deserialization, therefore you can use Newtonsoft.Json attributes when defining fields in your request/response classes.

##### Building a Response type

Create a class for the response and populate it with the JSON properties the response object has. For this example, we will use `eth_getTransactionReceipt`

The `params` field for `eth_getTransactionReceipt` has the object type

```csharp
using Newtonsoft.Json;
using System.Numerics;

[RpcMethod("eth_getTransactionReceipt"), RpcRequestOptions(Clock.ONE_MINUTE, 99995)]
public class TransactionReceipt
{
    [JsonProperty("transactionHash")]
    public string TransactionHash;

    [JsonProperty("transactionIndex")]
    public BigInteger TransactionIndex;

    [JsonProperty("blockHash")]
    public string BlockHash;

    [JsonProperty("blockNumber")]
    public BigInteger BlockNumber;

    [JsonProperty("from")]
    public string From;

    [JsonProperty("to")]
    public string To;

    [JsonProperty("cumulativeGasUsed")]
    public BigInteger CumulativeGasUsed;

    [JsonProperty("effectiveGasPrice ")]
    public BigInteger EffectiveGasPrice ;

    [JsonProperty("gasUsed")]
    public BigInteger GasUsed;

    [JsonProperty("contractAddress")]
    public string ContractAddress;

    [JsonProperty("logs")]
    public object[] Logs;

    [JsonProperty("logsBloom")]
    public string LogBloom;

    [JsonProperty("type")]
    public BigInteger Type;

    [JsonProperty("status")]
    public BigInteger Status;
}
```

The `RpcMethod` class attributes defines the rpc method this response uses, this is optional. The `RpcResponseOptions` class attributes define the expiry time and tag attached to the response, **this is required**.

##### Sending a response

To respond to requests from a dApp, you must define the class representing the request object type. The request type for `eth_getTransactionReceipt` is the following:

```csharp
[RpcMethod("eth_getTransactionReceipt"), RpcRequestOptions(Clock.ONE_MINUTE, 99994)]
public class EthGetTransactionReceipt : List<string>
{
    public EthGetTransactionReceipt(params string[] hashes) : base(hashes)
    {
    }
}
```

We can handle the `eth_getTransactionReceipt` session request by doing the following:

```csharp
walletClient.Engine.SessionRequestEvents<EthGetTransactionReceipt, TransactionReceipt>().OnRequest += OnEthTransactionReceiptRequest;

private Task OnEthTransactionReceiptRequest(RequestEventArgs<EthGetTransactionReceipt, TransactionReceipt> e)
{
    // logic for request goes here
    // set e.Response to return a response
}
```

The callback function gets invoked whenever the wallet receives the `eth_getTransactionReceipt` request from a connected dApp. You may optionally filter further which requests are handled using the `FilterRequests` function

```csharp
walletClient.Engine.SessionRequestEvents<EthGetTransactionReceipt, TransactionReceipt>()
    .FilterRequests(r => r.Topic == sessionTopic)
    .OnRequest += OnEthTransactionReceiptRequest;
```

The callback returns a `Task`, so the callback can be made async. To return a response, **you must** set the `Response` field in `RequestEventArgs<T, TR>` with the desired response.

```csharp
private async Task OnEthTransactionReceiptRequest(RequestEventArgs<EthGetTransactionReceipt, TransactionReceipt> e)
{
    var txHash = e.Request.Params[0];
    var receipt = await EthGetTransactionReceipt(txHash);
    e.Response = receipt;
}
```

#### Disconnecting

To disconnect a session, use the `Disconnect` function. You may optional provide a reason for the disconnect

```csharp
await walletClient.Disconnect(sessionTopic);

// or

await walletClient.Disconnect(sessionTopic, Error.FromErrorType(ErrorType.USER_DISCONNECTED));
```

</PlatformTabItem>

</PlatformTabs>
