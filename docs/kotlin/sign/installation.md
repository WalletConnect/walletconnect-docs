# Installation

Kotlin implementation of WalletConnect v2 Sign protocol for Android applications.

[![](https://jitpack.io/v/WalletConnect/WalletConnectKotlinV2.svg)](https://jitpack.io/#WalletConnect/WalletConnectKotlinV2)

## Requirements

* Android min SDK 24
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
implementation("com.github.WalletConnect:WalletConnectKotlinV2:release_version")
```
