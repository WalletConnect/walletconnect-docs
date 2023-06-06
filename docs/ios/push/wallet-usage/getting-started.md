# Installation

Swift implementation of WalletConnect Push protocol for native iOS applications.

### Prerequisite

:::tip
Setup [WalletConnect Cloud](https://cloud.walletconnect.com/) with APNS. Instructions on setting up the Echo Server can be found [here](../../../advanced/echo-server.md#hosted-platform-recommended).
:::

### Add SDK for Your Project.

You can add a WalletConnect SDK to your project with the Swift Package Manager. In order to do that:

1. Open XCode
2. Go to File -> Add Packages
3. Paste the repo GitHub url: https://github.com/WalletConnect/WalletConnectSwiftV2
4. Tap Add Package
5. Select WalletConnectPush check mark


# Implementation

## Initialization

Make sure Networking and Pairing are properly configured.
- [Networking](../../core/networking-configuration.md)
- [Pairing](../../core/pairing-usage.md)

### Configure a Client

Configure the `Push` instance with:

```swift
try Push.configure(environment: APNSEnvironment)
```
Use `debug` environment for debug builds and `release` for release and TestFlight builds

### Register for Push Notifications

Communicate with Apple Push Notification service and receive unique device token. Register that token with following method:

```swift
try await Push.wallet.register(deviceToken: deviceToken)
```

### Subscribe Events


#### Subscribe Proposal

When your `Push` instance receives a push proposal request or push message from a peer client, it will publish a related event. Subscribe to publishers to receive the requests.

```swift
Push.wallet.requestPublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] id, metadata in
        //handle event
    }.store(in: &publishers)
```

#### Subscribe Push Message

Emits new push message from a dapp.

```swift
public var pushMessagePublisher: AnyPublisher<PushMessage, Never> 
```

#### Subscribe Subscription Deletion

Emits  a topic of a deleted subscription.

```swift
public var deleteSubscriptionPublisher: AnyPublisher<String, Never> 
```

#### Subscribe Subscription Update

Emits a result of a subscription update, containing updated subscription if successful. 

```swift
public var updateSubscriptionPublisher: AnyPublisher<Result<PushSubscription, Error>, Never> {
```

#### Subscribe Active Subscriptions

Emits a list of active subscriptions.

```swift
public var subscriptionsPublisher: AnyPublisher<[PushSubscription], Never> 
```


### Create Push Subscription

To enable seamless communication between a Dapp and a wallet, the wallet must first establish a Push Subscription. This crucial step allows the Dapp and its associated services to transmit push messages directly to the wallet. Upon granting permission for the wallet's iOS application to display Push Notifications, users will experience real-time updates in the form of push notifications on their devices. For an enhanced user experience, consider subscribing to the `pushMessagePublisher` channel. This option ensures that push messages are delivered promptly when the app is active and a web socket connection is established, keeping users informed and engaged.


#### Approve Request

Once you have an active pairing with a dapp and the Push wallet client configured, a dapp is able to send a push request to a wallet. The `requestPublisher` will publish an event.
After the user accepts the dapp's request, you can call following method:

```swift
try await Push.wallet.approve(id: id)
```
`id` - RPCID of a request

#### Subscribe from a wallet

Another way of subscribing to dapp's push messages is to fetch publicly discoverable dapps with WalletConnet explorer and request a subscription directly from the wallet:
```swift
public func subscribe(metadata: AppMetadata, account: Account, onSign: @escaping SigningCallback) async throws {
```
`metadata` - metadata object of publicly discoverable dapp fetched from WalletConnect explorer

`account` - an account you want to associate a sebscription with

`onSign` - callback that requres a signature from a user
 
 
### Get Active Subscriptions

```swift 
Push.wallet.getActiveSubscriptions()
```

### Delete Subscription

To delete a subscription.

```swift
try await Push.wallet.delete(topic: String)
```

### Get Push Messages

To get messages by topic call:

```swift
Push.wallet.getMessageHistory(topic: subscription.topic) 
```

### Decrypt Push Notifications

All push notifications that are sent via APNs are decrypted. They have following payload:

```
{
  "aps":{
    "content-available":1,
    "mutable-content":1
  },
    "ciphertext":"encrypted-payload",
    "topic":"subscription_topic",
}
```

In order to decrypt a PN you need to instantiate [UNNotificationServiceExtension](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension).
Learn how to [modify the content in newly delivered notifications](https://developer.apple.com/documentation/usernotifications/modifying_content_in_newly_delivered_notifications).
Create a [keychain group](https://developer.apple.com/documentation/security/keychain_services/keychain_items/sharing_access_to_keychain_items_among_a_collection_of_apps) that is shared between your wallet application and the notification service. It must be called `group.com.walletconnect.sdk`.
Import WalletConnectPush inside your notification service extension file, initialize `PushDecryptionService()` and decrypt the message:

```swift
    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        if let bestAttemptContent = bestAttemptContent {
            let topic = bestAttemptContent.userInfo["topic"] as! String
            let ciphertext = bestAttemptContent.userInfo["blob"] as! String
            do {
                let service = PushDecryptionService()
                let pushMessage = try service.decryptMessage(topic: topic, ciphertext: ciphertext)
                bestAttemptContent.title = pushMessage.title
                bestAttemptContent.body = pushMessage.body
                contentHandler(bestAttemptContent)
                return
            }
        ...
    }
```

### Where to Go from Here
- Try our [Wallet App](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example/WalletApp) and to test notifications.
- Build API documentation in XCode: go to Product -> Build Documentation
