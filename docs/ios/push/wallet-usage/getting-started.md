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
try Push.configure()
```

### Register for Push Notifications

Communicate with Apple Push Notification service and receive unique device token. Register that token with following method:

```swift
try await Push.wallet.register(deviceToken: deviceToken)
```

### Register for Subscriptions

When your `Push` instance receives push request or push message from a peer client, it will publish a related event. Subscribe to publishers to receive the requests.

```swift
Push.wallet.requestPublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] id, metadata in
        //handle event
    }.store(in: &publishers)
```
The following publishers are available for subscription:

```swift
public var requestPublisher: AnyPublisher<(id: RPCID, metadata: AppMetadata), Never> 
public var pushMessagePublisher: AnyPublisher<PushMessage, Never> 
public var deleteSubscriptionPublisher: AnyPublisher<String, Never> 

```

### Approve Request

Once you have an active pairing with a dapp and the Push wallet client configured, a dapp is able to send a push request to a wallet. The `requestPublisher` will publish an event.
After the user accepts the dapp's request, you can call following method:

```swift
try await Push.wallet.approve(id: id)
```

### Subscribe to Push Messages from a Dapp

After push subscription is established, the dapp and it's services can send push messages to a wallet. If user approves the wallet iOS application to display Push Notifications, all the push messages will be displayed in a form of push notifications on the user's screen. Additionally you can subscribe for push messages with it's publisher `pushMessagePublisher` but messages with this channel will be delivered only when the app is in foreground and a web socket connection is opened.

### Get Active Subscriptions

```swift 
Push.wallet.getActiveSubscriptions()
```

### Delete Subscription

To delete a subscription.

```swift
try await Push.wallet.delete(topic: String)
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
