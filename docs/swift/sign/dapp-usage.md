# Dapp Usage

### Configure Networking and Pair clients

Make sure that you properly configure Networking and Pair Clients first.
- [Networking](../core/networking-configuration.md)
- [Pairing](../core/pairing-usage.md)

### Subscribe for Sign publishers
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

### Connect Clients

1. Prepare namespaces that constraints minimal requirements for your dApp:
```Swift
let methods: Set<String> = ["eth_sendTransaction", "personal_sign", "eth_signTypedData"]
let blockchains: Set<Blockchain> = [Blockchain("eip155:1")!, Blockchain("eip155:137")!]
let namespaces: [String: ProposalNamespace] = ["eip155": ProposalNamespace(chains: blockchains, methods: methods, events: []]
``` 
To learn more on namespaces, check out our [specs](../../specs/clients/sign/session-namespaces).

2. Your App should generate a pairing URI and share it with a wallet. Uri can be presented as a QR code or sent via a universal link. Wallet begins subscribing for session proposals after receiving URI. In order to create a pairing and send a session proposal, you need to call the following:

```Swift
let uri = try await Pair.instance.create()
try await Sign.instance.connect(requiredNamespaces: namespaces, topic: uri.topic)
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
- Try our [Example dApp](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example) that is part of [WalletConnectSwiftV2 repository](https://github.com/WalletConnect/WalletConnectSwiftV2).
- Build API documentation in XCode: go to Product -> Build Documentation
