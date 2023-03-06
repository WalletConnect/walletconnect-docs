# Usage

### Configure Networking client

Make sure what you properly configure Networking Client first 
- [Networking](../core/networking-configuration.md)

### Configure Web3Inox Client

```swift
import Web3Inbox

Web3Inbox.configure(account: Account("eip155:56:0xe5EeF1368781911d265fDB6946613dA61915a501")!, onSign: onSign)

func onSing(_ message: String) -> SigningResult {
    let signer = MessageSignerFactory(signerFactory: DefaultSignerFactory()).create()
    let signature = try! signer.sign(message: message, privateKey: privateKey, type: .eip191)
    return .signed(signature)
}
```

### Use client instance

Chat client instance is a singleton and you can access it by calling

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