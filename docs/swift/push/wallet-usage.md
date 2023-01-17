
# Wallet Usage

### Initial configurations

Make sure what you properly configure Networking and Pair Clients first
- [Networking](../core/networking-configuration.md)
- [Pairing](../core/pairing-usage.md)

### Configure a client

Configure the `Push` instance with:

```swift
try Push.configure()
```

### Register for Push Notifications

Communicate with Apple Push Notification service and receive unique device token. Register that token with following method:

```swift
try await Push.wallet.register(deviceToken: deviceToken)
```

### Subscribe for Push publishers

When your `Push` instance receives push request or push message from a peer client, it will publish a related event. Subscribe to publishers to reveive the requests.

```swift
Push.wallet.requestPublisher
    .receive(on: DispatchQueue.main)
    .sink { [unowned self] id, metadata in
        //handle event
    }.store(in: &publishers)
```
Following publishers are available to subscribe:

```swift
public var requestPublisher: AnyPublisher<(id: RPCID, metadata: AppMetadata), Never> 
public var pushMessagePublisher: AnyPublisher<PushMessage, Never> 
public var deleteSubscriptionPublisher: AnyPublisher<String, Never> 

```

### Establish Push Subscription:

Once you have an active pairing with a dapp and Push wallet client configured, a dapp is able to send a push request to a wallet. The `requestPublisher` will publish an event.
After user accepts dapp's request, you can call following method:

```swift
try await Push.wallet.approve(id: id)
```

### Subscribe for push messages from a dapp

After push subscription is established, dapp and it's services can send push messages to a wallet. If user approved the wallet iOS application to display Push Notifications, all the push messages will be displayed in a form of PN on the user's screen. Additionally you can subscribe for push messages with it's publisher `pushMessagePublisher` but messages with this channel will be delivered only when the app is in foreground and a web socket connection is opened.

### Decrypt Push Notifications

All the PNs that are send APNs are decrypted. They have following payload:

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

In order to decrypt a PN you need to instantiate [UNNotificationServiceExtension](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension)
Learn how to [modify content in newly delivered notifications](https://developer.apple.com/documentation/usernotifications/modifying_content_in_newly_delivered_notifications)
Create a [keychain group](https://developer.apple.com/documentation/security/keychain_services/keychain_items/sharing_access_to_keychain_items_among_a_collection_of_apps) that is shared between your wallet application and the notification service. It must be called `group.com.walletconnect.sdk`.
Import WalletConnectPush inside your notification service extension file, intialise PushDecryptionService() and decrypt the message:

```swift
    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        if let bestAttemptContent = bestAttemptContent {
            let topic = bestAttemptContent.userInfo["topic"] as! String
            let ciphertext = bestAttemptContent.userInfo["ciphertext"] as! String
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

### Get active subscriptions

```swift 
Push.wallet.getActiveSubscriptions()
```


### Where to go from here
- Try our Wallet app that is part of WalletConnectSwiftV2 repository.
- Build API documentation in XCode: go to Product -> Build Documentation

