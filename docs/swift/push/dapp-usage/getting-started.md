# Getting Started

This doc will walk you through how to get your dapp ready to start using the Push API. For simplicity, we're going to say there are two types of push notification a dapp may want to send.

1. Custom Push Nofications: These notifications can be sent from your dapp and are always encrypted. Examples include sending a notification when a user gains a new follower or when someone expresses interest in purchasing their NFT. In this example, we will cover **this** scenario.

2. User Action Push Notifications: Your dapp will send these notifications when you need the user to sign or send a transaction from their wallet. Examples include authorizing your dapp or minting an NFT. These actions must be completed before anything happens. **Push API is not requried** to send these notifications. To read more about User Action Push Notifications, go [here](../../echo/usage.md).

### Prerequisite

:::tip
Create a new [WalletConnect Project ID](../../../cloud/explorer.md#setting-up-a-new-project).
:::

## Add SDK for Your Project.

You can add a WalletConnect SDK to your project with the Swift Package Manager. In order to do that:

1. Open XCode
2. Go to File -> Add Packages
3. Paste the repo GitHub url: https://github.com/WalletConnect/WalletConnectSwiftV2
4. Tap Add Package
5. Select WalletConnectPush check mark

## Implementation

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
let message = PushMessage(
    title = /*title*/,
    body = /*body*/,
    icon = /*icon url*/,
    url = /*url*/
)

try await Push.dapp.notify(topic: String, message: message)
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
