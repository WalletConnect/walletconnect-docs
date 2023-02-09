# Wallet Usage

A configured Echo SDK allows users to receive push notifications on their devices about important events, such as an auth request or a sign session request

### Initial Configurations

Make sure Networking is properly configured:
- [Networking](../core/networking-configuration.md)

### Configure Client

1. Get `clientId`:

```swift
let clientId = try! Networking.interactor.getClientId()
```

2. Call Configuration Method:

```swift
Echo.configure(clientId: clientId)
```

### Register Device Token

Communicate with Apple Push Notification service and receive unique device token. Register that token with following method:

```swift
try await Echo.instance.register(deviceToken: deviceToken)
```
