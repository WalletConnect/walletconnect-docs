# Installation

Kotlin implementation of WalletConnect v2 Sign protocol for Android applications.

![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/sign)

## Requirements

* Android min SDK 23
* Java 11

## Installation
root/build.gradle.kts:
```gradle
allprojects {
 repositories {
    maven { url "https://repo1.maven.org/maven2/" }
    maven { url "https://jitpack.io" }
 }
}
```

app/build.gradle.kts

```gradle
implementation("com.walletconnect:sign:release_version")
```