# Web3Inbox SDK Documentation

This documentation outlines the steps for configuring and using the Web3Inbox SDK within your iOS application.

## Table of Contents

1. [Networking Client Configuration](#networking-client-configuration)
2. [iOS Permissions Configuration](#ios-permissions-configuration)
3. [Web3Inbox Client Configuration](#web3inbox-client-configuration)
4. [SDK Usage](#sdk-usage)
5. [Decrypting Push Notifications](#decrypting-push-notifications)

## Networking Client Configuration

Before starting, ensure that you have correctly configured the Networking Client.

- [Networking Configuration Documentation](../core/networking-configuration.md)

## iOS Permissions Configuration

For utilizing the "Scan QR Code" feature, you need to add `NSCameraUsageDescription` to your `info.plist` file.

```xml
<key>NSCameraUsageDescription</key>
<string>Allow the app to scan for QR codes</string>

### Web3Inbox Client Configuration
The following Swift code snippet demonstrates how to configure the Web3Inbox Client.

```swift
import Web3Inbox

Web3Inbox.configure(
    account: account,
    bip44: DefaultBIP44Provider(),
    config: [.chatEnabled: false, .settingsEnabled: false],
    environment: BuildConfiguration.shared.apnsEnvironment,
    onSign: onSign()
)
```
Parameters:

`account`: Wallet account
`bip44`: Provide your implementation of BIP44Provider, necessary for Sync store key derivation.
`config`: The Web3Inbox client will be configured to enable Chat and Push SDKs by default. However, you can disable selected functionalities.
`environment`: Use debug environment for debug builds and release for release and TestFlight builds.
`onSign`: Web3Inbox client will request user to sign messages with its account private key. The message may be a Sync Storage derivation key or Identity key registration.

### SDK Usage
Singleton Access
Access the Web3Inbox client instance, which is a singleton, by calling:

```swift
Web3Inbox.instance
```

### Assign Web3Inbox WebView to a ViewController
Web3Inbox provides a user interface within a webView. Assign the provided webView to a ViewController's view as shown:
```swift
import UIKit
import Web3Inbox

final class Web3InboxViewController: UIViewController {

    override func loadView() {
        super.loadView()

        // Web3Inbox configuration
        Web3Inbox.configure(account: importAccount.account, onSign: onSing)

        // Setting Web3Inbox webView as main view
        view = Web3Inbox.instance.getWebView()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Other UIViewController customizations
        edgesForExtendedLayout = []
        navigationItem.title = "Web3Inbox SDK"
        navigationItem.largeTitleDisplayMode = .never
    }
}

```

### Decrypting Push Notifications

Push notifications sent via APNs are encrypted and carry the following payload:

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

To decrypt a Push Notification (PN), you need to instantiate a [UNNotificationServiceExtension](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension). 

For details on how to modify the content in newly delivered notifications, refer to the official Apple Developer Documentation [here](https://developer.apple.com/documentation/usernotifications/modifying_content_in_newly_delivered_notifications).

Additionally, you will need to create a [keychain group](https://developer.apple.com/documentation/security/keychain_services/keychain_items/sharing_access_to_keychain_items_among_a_collection_of_apps) that is shared between your wallet application and the notification service. The keychain group should be named `group.com.walletconnect.sdk`.

Inside your notification service extension file, import Web3Inbox, initialize `PushDecryptionService()`, and decrypt the message with the following Swift code:

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

