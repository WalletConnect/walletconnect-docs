# App Usage

### Relay client

### Configure Networking and Pair clients

Make sure what you properly configure Networking and Pair Clients first [Networking](../core/networking-configuration)
[Pairing](../core/pairing-usage)


### Subscribe for Auth publishers
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

### Connect Clients and Send Authentication Request

Your App should generate a pairing uri and share it with wallet. Uri can be presented as QR code or sent via universal link. Wallet after receiving uri begins subscribing for your app's authentication requests. In order to create pairing and send authentication request you need to call:

```swift
let uri = try await Pair.instance.create()
try await Auth.instance.request(<RequestParams>, topic: uri.topic)
```

### Handle Authentication Response

Subscribe for `authResponsePublisher` events.
Response will be either signed CAIP-74 `Cacao` object or `AuthError` in case signature is invalid or requested message has been compromised.

### Where to go from here
- Try our Example dApp that is part of WalletConnectSwiftV2 repository.
- Build API documentation in XCode: go to Product -> Build Documentation

