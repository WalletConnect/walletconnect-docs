---
description: Quick Start For Wallets Using Kotlin Client (Android)
---

# Kotlin Client (Android)

Kotlin implementation of WalletConnect v2 protocol for native Android applications.

:::caution
Note: The Kotlin client is in Alpha and should only be used for testing.
:::

## Installation

To get started, add the WalletConnect library as a module to your project

#### Project build.gradle.kts
```gradle
implementation(project(":walletconnectV2"))
```

## Requirements
* Java 11

## Usage
### Using WalletConnect

#### Initialize WalletConnect Client
```kotlin
val initializeParams = ClientTypes.InitialParams(useTls = true, hostName = "relay.walletconnect.org", apiKey = "sample key", isController = true)
WalletConnectClient.initalize(initalizeParams)
```
The controller client will always be the "wallet" which is exposing blockchain accounts to a "dapp" and therefore is also in charge of signing.

#### Pair Clients
```kotlin
val pairParams = ClientTypes.PairParams("wc:...")
val pairListener = ClientListeners.Pairing { topic -> /* handle topic */ }
WalletConnectClient.pair(pairParams, pairListener)
```

## API Keys

For api keys look at [API Keys](../../api/api-keys.md).
