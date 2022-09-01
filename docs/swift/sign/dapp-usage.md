# Dapp Usage

### Relay client

Make sure what you properly configure Relay Client first [Relay Configuration](https://docs.walletconnect.com/2.0/swift/relay/usage#relay-client-configuration)

### Instantiate a client

Create an AppMetadata object. It will describe your application and define its appearance in a web browser.
Then configure `Sign` instance with a metadata object you have instantiated.

Note that you want to have only one instance of a client in your app, and you don’t want to deinitialize that instance.

```swift
let metadata = AppMetadata(name: <String>,
                           description: <String>,
                           url: <String>,
                           icons: <[String]>)

Sign.configure(metadata: <AppMetadata>)
```

### Subscribe for Sign publishers
When your `Sign` instance receives requests from a peer it will publish related event. So you should set subscription to handle them.

```swift
Sign.instance.sessionDeletePublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] _ in
        //handle event
    }.store(in: &publishers)
```

Following publishers are available to subscribe:

```swift
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

### Connect Clients

1. Prepare namespaces that constraints minimal requirements for your dApp:
```Swift
let methods: Set<String> = ["eth_sendTransaction", "personal_sign", "eth_signTypedData"]
let blockchains: Set<Blockchain> = [Blockchain("eip155:1")!, Blockchain("eip155:137")!]
let namespaces: [String: ProposalNamespace] = ["eip155": ProposalNamespace(chains: blockchains, methods: methods, events: [], extensions: nil)]
``` 
to learn more on namespaces, check out our [specs](https://github.com/WalletConnect/walletconnect-specs/blob/main/sign/session-namespaces.md)

2. Your App should generate a pairing uri and share it with a wallet. Uri can be presented as QR code or sent via universal link. Wallet after receiving uri begins subscribing for session proposals. In order to create pairing and send session proposal you need to call only one method:

```Swift
let uri = try await Sign.instance.connect(requiredNamespaces: namespaces)
```
or if the pairing already exists to just send a session proposal call:

```Swift
let _ = try await Sign.instance.connect(requiredNamespaces: namespaces, topic: existingPairingTopic)
```

### Send Request to the Wallet

Once the session has been established `sessionSettlePublisher` will publish an event. Your dApp can start requesting wallet now.

```Swift
let method = "personal_sign"
let requestParams = AnyCodable(["0x4d7920656d61696c206973206a6f686e40646f652e636f6d202d2031363533333933373535313531", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"])
let request = Request(topic: session.topic, method: method, params: requestParams, chainId: Blockchain(chainId)!)
try await Sign.instance.request(params: request)
```

When wallet respond `sessionResponsePublisher` will publish an event so you can verify the response.

### Where to go from here
- Try our Example dApp that is part of WalletConnectSwiftV2 repository.
- Build API documentation in XCode: go to Product -> Build Documentation
