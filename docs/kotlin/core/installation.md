# Core Client

## Requirements

* Android min SDK 23
* Java 11

## Installation

![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)

root/build.gradle.kts:

```gradle
allprojects {
 repositories {
    mavenCentral()
 }
}
```

app/build.gradle

```gradle
implementation("com.walletconnect:android-core:release_version")
```

## Project set up

To use initialize RelayClient properly you will need a projectId. Go to https://cloud.walletconnect.com/app, register your project and get projectId.

#
## CoreClient initialization

Before using any of the WalletConnect Kotlin SDKs, it is necessary to initialize the CoreClient. The initialization of CoreClient must always happen in the Android Application class. Provide the projectId generated in the WalletConnec Cloud, the WebSocket url, choose the connection type, and pass the application class.

```kotlin
val projectId = "" //Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val application = //Android Application level class

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = application)
```