# Installation

Kotlin implementation of Android CoreClient for all WalletConnect SDKs.

![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)

## Requirements

* Android min SDK 23
* Java 11

## Installation

root/build.gradle.kts:

```gradle
allprojects {
 repositories {
    mavenCentral()
    maven { url "https://jitpack.io" }
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

Before using any of the WalletConnect Kotlin SDKs, it is necessary to initialize the CoreClient. The initialization of CoreClient must always happen in the Android Application class. Provide the projectId generated in the WalletConnect Cloud, the WebSocket URL, choose the connection type, and pass the application class. You can also pass your own Relay instance using the `RelayConnectionInterface`.

```kotlin
val projectId = "" //Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val application = //Android Application level class
[Optional] val optionalRelay: RelayConnectionInterface? = /*implement interface*/

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = application, relay = optionalRelay)
```

## Using your own Relay instance
The CoreClient offers the ability to use a custom Relay client. Just creating an instance of `RelayConnectionInterface` and passing it to `CoreClient.initialize`. 

```kotlin
...
val optionalRelay: RelayConnectionInterface = /*implement interface*/

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = application, relay = optionalRelay)
```