# Installation

Kotlin implementation of Web3Inbox for Android applications. This SDK is developed in Kotlin and usable in both Java and Kotlin files.


Android Core ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)
Web3Inbox ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/web3inbox)

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
implementation("com.walletconnect:web3inbox:release_version")
```
