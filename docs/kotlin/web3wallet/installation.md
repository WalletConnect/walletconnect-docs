# Installation

Kotlin implementation of Web3Wallet for Android applications.


Android Core ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)
Web3Wallet ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/web3wallet)

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

app/build.gradle.kts

```gradle
implementation("com.walletconnect:android-core:release_version")
implementation("com.walletconnect:web3wallet:release_version")
```
