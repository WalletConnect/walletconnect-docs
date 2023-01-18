

# Dapp Usage

### Initial Configuration

Make sure Networking and Pairing are properly configured.
- [Networking](../core/networking-configuration.md)
- [Pairing](../core/pairing-usage.md)


### Subscribe for Push publishers
When your `Push` dapp instance receives a push request or push message from a peer client, it will publish a related event. Subscribe to publishers to receive the requests.

```swift
Push.wallet.responsePublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] id, result in
        //handle event
    }.store(in: &publishers)
```
Following publishers are available to subscribe:

```swift
public var responsePublisher: AnyPublisher<(id: RPCID, result: Result<PushSubscription, PushError>), Never> 
public var deleteSubscriptionPublisher: AnyPublisher<String, Never> 
```

### Send Push Subscription:

Once you have an active pairing with a wallet, you are able to send a push subscription requests on a pairing topic.

```swift
try await Push.dapp.request(account: Account, topic: String)
```

### Send a push message to a wallet

After push subscription is established, you are able to send a PN to a wallet on a push subscription topic.

```swift
try await Push.dapp.notify(topic: String, message: PushMessage)
```

### Get active subscriptions

```swift 
Push.wallet.getActiveSubscriptions()
```


### Where to go from here
- Try our Wallet app that is part of WalletConnectSwiftV2 repository.
- Build API documentation in XCode: go to Product -> Build Documentation

