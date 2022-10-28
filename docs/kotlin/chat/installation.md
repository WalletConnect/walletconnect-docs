# Installation

Kotlin implementation of WalletConnect v2 Chat protocol for Android applications.

![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/chat)

## Requirements

* Android min SDK 23
* Java 11

## Installation

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
implementation("com.walletconnect:chat:release_version")
```
