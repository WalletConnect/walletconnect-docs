# Installation

Kotlin implementation of WalletConnect Push protocol for Android applications.

## Prerequisite
Setup [WalletConnect Cloud](https://cloud.walletconnect.com/) with Firebase. Instructions can be found [here](docs/api/push/prerequisites.md)

**Android BOM** ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-bom)

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
implementation(platform("com.walletconnect:android-bom::release_version"))
implementation("com.walletconnect:android-core")
implementation("com.walletconnect:push")
```