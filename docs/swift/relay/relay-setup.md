# Relay Configuration

### Setup Relay client

Before Sign SDK usage necessary to configure shared Relay instance. Set a project ID generated when starting a project on WalletConnect Cloud and SocketFactory instance.

WalletConnect Swift SDK no more depends on 3rd party websocket library. SocketFactory parameter allows you to pass your own implementation of websocket connection.

Here's an example of WebSocketFactory implementation using Starscream v3

```swift
import Starscream

extension WebSocket: WebSocketConnecting { }

struct SocketFactory: WebSocketFactory {
    func create(with url: URL) -> WebSocketConnecting {
        return WebSocket(url: url)
    }
}
```

Relay client configuration 

```swift
Relay.configure(projectId: <String>, socketFactory: SocketFactory())
```
