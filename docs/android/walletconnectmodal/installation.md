# Installation

:::caution
**The WalletConnectModal SDK is currently in Alpha and is not production-ready**.

It's public API and associated documentation may still see significant and breaking changes.
:::

Kotlin implementation of WalletConnectModal for Android applications.

Android Core ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)

WalletConnectModal ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/walletconnect-modal)

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
implementation(platform("com.walletconnect:android-bom:$BOM_VERSION"))
implementation("com.walletconnect:android-core")
implementation("com.walletconnect:walletconnect-modal")
```
