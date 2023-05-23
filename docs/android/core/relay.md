import IframeComponent from '../../components/IframeComponent';

# Relay Client
Relay client provides transport layer for Sign, Auth and Chat SDKs. You can configure it once and every SDK will transport protocol messages via same instance of a relay client with only one opened websocket connection. The Relay api can be accessed through the Core Client

#
## Web Socket connection control

There are two connection types, Automatic and Manual.

Automatic connection type enables SDK to control web socket connection internally. Meaning, web socket connection is closed when app goes to the background and is opened when app goes to the foreground.

Manual connection type enables developers to control web socket connection.
```kotlin
CoreClient.initialize(relayServerUrl = serverUrl, connectionType = ConnectionType.MANUAL, application = application)

CoreClient.Relay.connect() { error -> /*Error when wrong connection type is in use*/}

CoreClient.Relay.disconnect() { error -> /*Error when wrong connection type is in use*/}
```

<IframeComponent />
