# Dapp Usage

### Instantiate a client

Create an AppMetadata object first. It will describe your application and define its appearance in a web browser.
Then configure `Sign` instance with a metadata object you have instantiated and set a project ID generated when starting a project on WalletConnect Cloud.

Note that you want to have only one instance of a client in your app, and you don’t want to deinitialize that instance.

```swift
let metadata = AppMetadata(name: <String>,
                           description: <String>,
                           url: <String>,
                           icons: <[String]>)

Sign.configure(Sign.Config(metadata: <AppMetadata>, projectId: <String>))
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