# Implementation

### Initialization

Make sure Networking and Pairing are properly configured.
- [Networking](../../core/networking-configuration.md)
- [Pairing](../../core/pairing-usage.md)

### Register for Subscriptions

When your `Push` dapp instance receives a push request or push message from a peer client, it will publish a related event. Subscribe to publishers to receive the requests.

```swift
Push.dapp.responsePublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] id, result in
        //handle event
    }.store(in: &publishers)
```
The following publishers are available for subscription:

```swift
public var responsePublisher: AnyPublisher<(id: RPCID, result: Result<PushSubscription, PushError>), Never> 
public var deleteSubscriptionPublisher: AnyPublisher<String, Never> 
```

### Request to Send Push Notifications

Once you have an active pairing with a wallet, you are able to send a push subscription request on a pairing topic.

```swift
try await Push.dapp.request(account: Account, topic: String)
```

### Send a Push Notification

Once a push subscription is established, you can then send a push notification to a wallet on the designated push subscription topic.

```swift
try await Push.dapp.notify(topic: String, message: PushMessage)
```

### Get Active Subscriptions

Get a list of all the active subscriptions.

```swift 
Push.wallet.getActiveSubscriptions()
```

### Delete a Subscription

To delete a subscription.

```swift
try await Push.dapp.delete(topic: String)
```

### Where to Go from Here
- Try our [Wallet App](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example/WalletApp) and to test notifications.
- Build API documentation in XCode: go to Product -> Build Documentation
