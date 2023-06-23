# Usage

### Configure Networking client

Make sure what you properly configure Networking Client first 
- [Networking](../core/networking-configuration.md)

### Configure iOS permissions

To use "Scan QR Code" feature you should include `NSCameraUsageDescription` into your `info.plist` file.

```
<key>NSCameraUsageDescription</key>
<string>Allow the app to scan for QR codes</string>
```

### Configure Web3Inbox Client

```swift
import Web3Inbox

        Web3Inbox.configure(
            account: account,
            bip44: DefaultBIP44Provider(),
            config: [.chatEnabled: false, .settingsEnabled: false],
            environment: BuildConfiguration.shared.apnsEnvironment,
            onSign: onSing()
        )
`account` - wallet account
`bip44` - provide your implementation of BIP44Provider, it's necessary for Sync store key derivation.
`config` - By default Web3Inbox client will be configured enabling Chat and Push SDKs but you can also configure it to disable selected functionalities.
`environment` - Use debug environment for debug builds and release for release and TestFlight builds
`onSign` - Web3Inbox client will request user to sign messages with it's account private key. The message may be a Sync Storage derivation key or Identity key registration.

```

### Use client instance

Web3Inbox client instance is a singleton and you can access it by calling

```swift
Web3Inbox.instance
```

### Web3Inbox Client interface

```swift
protocol Web3InboxClient {
	/// Returns WKWebView instance with Web3Inbox web app
	func getWebView() -> WKWebView

	/// Reconfigure Web3Inbox SDK with another account. Useful for account changing
	func setAccount( _ account: Account, onSign: @escaping SigningCallback) async throws
}
```


### Web3Inbox usage

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
Import Web3Inbox inside your notification service extension file, initialize `PushDecryptionService()` and decrypt the message:

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
