# App Usage

### Initial configurations

Make sure what you properly configure Networking, Pair Clients and SignerFactory first 
- [Networking](../core/networking-configuration.md)
- [Pairing](../core/pairing-usage.md)
- [SignerFactory](./signer-configuration.md)

### Instantiate a client

Configure the `Auth` instance with your own [SignerFactory](./signer-configuration.md) implementation.

```swift
Auth.configure(signerFactory: <SignerFactory>)
```

### Completed Auth SDK configuration: 

``` swift
Networking.configure(projectId: <Project ID>, socketFactory: <SocketFactory>)
Pair.configure(metadata: <AppMetadata>)
Auth.configure(signerFactory: <SignerFactory>)
```

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

Your App should generate a pairing URI and share it with the wallet. URI can be presented as a QR code or sent via a universal link. Wallet begins subscribing to your App's authentication requests after scanning URI. To create a pairing and send an authentication request, you need to call:	

```swift
let uri = try await Pair.instance.create()
try await Auth.instance.request(<RequestParams>, topic: uri.topic)
```

### Handle Authentication Response

Subscribe for `authResponsePublisher` events.
A response will be either signed CAIP-74 `Cacao` object or `AuthError` in case the signature is invalid, or the requested message has been compromised.

### Where to go from here
- Try our [Example dApp](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example) that is part of [WalletConnectSwiftV2 repository](https://github.com/WalletConnect/WalletConnectSwiftV2).
- Build API documentation in XCode: go to Product -> Build Documentation

