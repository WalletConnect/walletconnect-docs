# Relay Client
Relay client provides transport layer for Sign, Auth and Chat SDKs. You can configure it once and every SDK will transport protocol messages via same instance of a relay client with only one opened websocket connection.

## Requirements

* Android min SDK 23
* Java 11

## Installation

<!-- Add MavenCentral badge and artifact path -->

app/build.gradle

```gradle
implementation("com.walletconnect:WalletConnectKotlinV2:android_core:version")
```

## Project set up

To use initialize RelayClient properly you will need a projectId. Go to https://cloud.walletconnect.com/app, register your project and get projectId.

## RelayClient initialization

Before using any WalletConnect Kotlin SDK it is necessary to initialize shared instance of RelayClient. The initialization of RelayClient must always happen in the Android Application class. Provide the projectId generated in the WalletConnec Cloud, construct the server url and choose the connection type.

```kotlin
val projectId = "" //Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val application = //Android Application level class

RelayClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = application)
```

## Web Socket connection control

There are two connection types, Automatic and Manual.

Automatic connection type enables SDK to controll web socket connection internally. Meaning, web socket connection is closed when app goes to the background and is opened when app goes to the foreground.

Manual connnection type enables developers to controll web socket connection.
```kotlin
RelayClient.initialize(relayServerUrl = serverUrl, connectionType = ConnectionType.MANUAL, application = application)

RelayClient.connect() { error -> /*Error when wrong connection type is in use*/}

RelayClient.disconnect() { error -> /*Error when wrong connection type is in use*/}
```