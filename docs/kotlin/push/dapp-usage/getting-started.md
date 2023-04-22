# Getting Started

This page will walk you through how to get your wallet ready to start using the Push API. For simplicity, we're going to say there are two types of push notification a wallet may want to receive.

1. Custom Push Nofications: These notifications can be rendered within your wallet and are always encrypted. Examples include receiving a notification when you have a new follower or when someone wants to buy your NFT.

2. User Action Push Notifications: Your wallet will receive these notifications when you need to sign or send a transaction. Examples include authorizing your wallet or minting an NFT. These actions must be completed before anything happens. **Push API is not requried** to receive these notifications. To read more about User Action Push Notifications, go [here](../../echo/usage.md).

**Android BOM** ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-bom)

### Requirements

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

app/build.gradle.kts

```gradle
implementation(platform("com.walletconnect:android-bom::release_version"))
implementation("com.walletconnect:android-core")
implementation("com.walletconnect:push")
```
