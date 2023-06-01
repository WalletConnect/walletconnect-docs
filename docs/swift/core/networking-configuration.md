# Networking Configuration

The networking client provides a transport layer for Sign, Auth, and Chat SDKs. You can configure it once, and every SDK will transport protocol messages via the same instance of a networking client with only one opened WebSocket connection.

### Setup Networking Client

Before using Sign or Auth SDK, it is necessary to configure a shared Networking Client instance. Set a project ID generated when starting a project on WalletConnect Cloud and SocketFactory instance.

WalletConnect Swift SDK does not depend on any websocket library. SocketFactory parameter allows you to pass your own implementation of websocket connection.

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

Please note that if you have made changes to the list of **Allowed Domains** in the **WalletConnect Cloud Dashboard**, then you may encounter an error with the connection if you use **Starscream** or any other socket client. For example, the native implementation of **Starscream** will use the `relay.walletconnect.com` as an `Origin` parameter if not provided, which will be missing from the list of **Allowed Domains**. The solution to this could be the inclusion of the `relay.walletconnect.com` in the **Allowed Domains**, corresponding changes in the socket client implementation, or following changes in the `WebSocketFactory`.

```swift
import Starscream

extension WebSocket: WebSocketConnecting { }

struct DefaultSocketFactory: WebSocketFactory {
    func create(with url: URL) -> WebSocketConnecting {
        var urlRequest = URLRequest(url: url)
        urlRequest.addValue("allowed.domain.com", forHTTPHeaderField: "Origin")
        return WebSocket(request: urlRequest)
    }
}
```

### Networking client configuration 

```swift
Networking.configure(projectId: <String>, socketFactory: SocketFactory())
```

### Web Socket Connection

By default web socket connection is handled internally by the SDK. That means that Web socket will be safely disconnected when apps go to background and it will connect back when app reaches foreground. But if it is not expected for your app and you want to handle socket connection manually you can do it as follows:

1. set socketConnectionType for manual  
```swift
Networking.configure(projectId: <String>, socketFactory: SocketFactory(), socketConnectionType: .manual)
```  
2. control socket connection:  
```swift
try Networking.instance.connect()
```
```swift
try Networking.instance.disconnect()
```
