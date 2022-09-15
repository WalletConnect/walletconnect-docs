# Installation
<!-- todo: Add Maven central data -->
Kotlin implementation of WalletConnect v2 Auth protocol for Android applications.

[![](https://jitpack.io/v/WalletConnect/WalletConnectKotlinV2.svg)](https://jitpack.io/#WalletConnect/WalletConnectKotlinV2)

## Requirements

* Android min SDK 23
* Java 11

## Installation

root/build.gradle.kts:

```gradle
allprojects {
 repositories {
    maven(url = "https://jitpack.io")
 }
}
```

app/build.gradle

```gradle
implementation("com.walletconnect:WalletConnectKotlinV2:release_version")
```
