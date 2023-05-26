# Usage

## Web3Modal SDK

The Web3Modal Swift SDK allows for easy integration of [Web3Modal](https://web3modal.com/) in a native iOS application.

## Web3Modal Usage

### UIKit

#### Web3ModalSheetController

````swift
import UIKit

let viewController: UIViewController = Web3ModalSheetController(
    projectId: $PROJECT_ID,
    metadata: AppMetadata(
        name: "Web3Modal DApp",
        description: "Dapp with Web3Modal",
        url: "swift.web3modal.example.dapp",
        icons: ["https://avatars.githubusercontent.com/u/37784886"]
    ),
    webSocketFactory: SocketFactory()
)
````

#### SwiftUI

````swift
import Web3Modal

struct ContentView: View {

    var body: some View {
        YourContent()
            .sheet {
                Web3ModalContainerView(
                    projectId: $PROJECT_ID,
                    metadata: AppMetadata(
                        name: "Web3Modal DApp",
                        description: "Dapp with Web3Modal",
                        url: "swift.web3modal.example.dapp",
                        icons: ["https://avatars.githubusercontent.com/u/37784886"]
                    ),
                    webSocketFactory: SocketFactory()
                )
            }
    }
}

````

#### SocketFactory

WalletConnect Swift SDK does not depend on any websocket library. `webSocketFactory` parameter allows you to pass your own implementation of websocket connection.

Here's an example of WebSocketFactory implementation using Starscream v3. 

````swift
import Starscream

extension WebSocket: WebSocketConnecting { }

struct SocketFactory: WebSocketFactory {
    func create(with url: URL) -> WebSocketConnecting {
        return WebSocket(url: url)
    }
}
````

For more details visit  - [Networking](../core/networking-configuration.md)

## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID.