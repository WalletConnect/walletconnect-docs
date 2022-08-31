# Relay Usage
Relay client provides transport layer for Sign, Auth and Chat SDKs. You can configure it once and every SDK will transport protocol messages via same instance of a relay client with only one opened websocket connection.

### Setup Relay client

Before Sign SDK usage necessary to configure shared Relay instance. Set a project ID generated when starting a project on WalletConnect Cloud and SocketFactory instance.
touch 
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

### Web Socket Connection
By default web socket connection is handled internally by the SDK. That means that Web socket will be safely disconnected when apps go to background and it will connect back when app reaches foreground. But if it is not expeted for your app and you want to handle socket connection manually you can do it as follows:

1. set socketConnectionType for manual  
```swift
Relay.configure(projectId: <String>, socketFactory: SocketFactory(), socketConnectionType: .manual)
```  
2. control socket connection:  
```swift
try Relay.instance.connect()
```
