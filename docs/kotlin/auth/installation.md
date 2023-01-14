# Installation

Kotlin implementation of WalletConnect v2 Auth protocol for Android applications.

Android Core ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)
Auth ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/auth)

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
implementation("com.walletconnect:auth:release_version")
```
