---
description: Quick Start For Wallets Using Kotlin Client (Android)
---

# Kotlin Client (Android)

Kotlin implementation of WalletConnect v2 protocol for native Android applications.

:::caution
Note: The Kotlin client is in Alpha and should only be used for testing.
:::

## Requirements
* Android min SDK 21
* Java 11

## Installation
root/build.gradle:

```kotlin
allprojects {
 repositories {
    maven { url "https://jitpack.io" }
 }
}
```
app/build.gradle(.kts)

```kotlin
groovy - implementation 'com.walletconnect:walletconnectv2:1.0.0-alpha01'

kotlin - implementation("com.walletconnect:walletconnectv2:1.0.0-alpha01")

```

## **Usage**

### **Initialize WalletConnect Client**
```kotlin
val initializeParams = ClientTypes.InitialParams(useTls = true, hostName = "relay.walletconnect.com", projectId = "sample project id", isController = true)
WalletConnectClient.initalize(initalizeParams)
```
The controller client will always be the "wallet" which is exposing blockchain accounts to a "Dapp" and therefore is also in charge of signing.
To initialize the WalletConnect client, create a ClientTypes.InitialParams object in the Android Application class. The InitialParams object will need at least the Project ID and the Application. The InitialParams object will then be passed to the WalletConnect.initialize function. 

### **Pair Clients**
```kotlin
val pairParams = ClientTypes.PairParams("wc:...")
val pairListener = WalletConnectClientListeners.Pairing { sessionProposal -> /* handle session proposal */ }
WalletConnectClient.pair(pairParams, pairListener)
```

To pair the wallet with the Dapp, call the WalletConnectClient.pair function which needs a ClientTypes.PairParams and WalletConnectClientListeners.Pairing. 
ClientTypes.Params is where the Dapp Uri will be passed. 
WalletConnectClientListeners.Pairing is the callback that will be asynchronously called once there a pairing has been made with the Dapp. A SessionProposal object is returned once a pairing is made.

### **Session Approval**
NOTE: addresses provided in `accounts` array should follow [CAPI10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) semantics.
```kotlin
val accounts: List<String> = /*list of accounts on chains*/
val proposerPublicKey: String = /*proposerPublicKey from the Session Proposal*/
val proposalTtl: Long = /*Ttl from the Session Proposal*/
val proposalTopic: String = /*Topic from the Session Proposal*/
val approveParams: ClientTypes.ApproveParams = ClientTypes.ApproveParams(accounts, proposerPublicKey, proposalTtl, proposalTopic)

WalletConnectClient.approve(approveParams)
```
To send a approval for the Session Proposal, pass the Session Proposal public key, ttl, and topic along with the list of accounts to the  WalletConnectClient.approve function.

### **Session Rejection**
```kotlin
val rejectionReason: String = /*The reason for rejecting the Session Proposal*/
val proposalTopic: String = /*Topic from the Session Proposal*/
val rejectParams: ClientTypes.RejectParams = ClientTypes.RejectParams(rejectionReason, proposalTopic)

WalletConnectClient.reject(rejectParams)
```
To send a rejection for the Session Proposal, pass a rejection reason and the Session Proposal topic to the WalletConnectClient.reject function.

## Project ID

For the Project ID look at [Project ID](../../api/project-id.md).
