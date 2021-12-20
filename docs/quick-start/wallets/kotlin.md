---
description: Quick Start For Wallets Using Kotlin Client (Android)
---

# Kotlin Client (Android)

Kotlin implementation of WalletConnect v2 protocol for native Android applications.

:::caution
Note: The Kotlin client is in Beta and should only be used for testing.
:::

## Requirements
* Android min SDK 21
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
implementation("com.walletconnect:walletconnectv2:1.0.0-beta01")
```

## **Usage**

### **Initialize WalletConnect Client**
```kotlin
val appMetaData = AppMetaData(name = "Wallet Name", description = "Wallet Description", url = "Wallet Url", icons = listOfIconUrlStrings)
val initializeParams = ClientTypes.InitialParams(application = application, projectId = "project id", appMetaData = appMetaData)
WalletConnectClient.initalize(initalizeParams)
```
The controller client will always be the wallet which is exposing blockchain accounts to a Dapp and therefore is also in charge of signing.
To initialize the WalletConnect client, create a `ClientTypes.InitialParams` object in the Android Application class. The InitialParams object will need at least the application class, the ProjectID and the wallet's AppMetaData. The InitialParams object will then be passed to the `WalletConnectClient` initialize function. IntitalParams also allows for custom URLs by passing URL string into the `hostName` property.

### **WalletConnectClientListeners.Session Listeners**
```kotlin
val listener = object: WalletConnectClientListener {
   override fun onSessionProposal(sessionProposal: WalletConnectClientData.SessionProposal) {
      // Session Proposal object sent by Dapp after pairing was successful
   }

   override fun onSessionRequest(sessionRequest: WalletConnectClientData.SessionRequest) {
      // JSON-RPC methods wrapped by SessionRequest object sent by Dapp
   }

   override fun onSessionDelete(deletedSession: WalletConnectClientData.DeletedSession) {
      // Triggered when the session is deleted by the peer
   }

   override fun onSessionNotification(sessionNotification: WalletConnectClientData.SessionNotification) {
      // Triggered when the peer emits events as notifications that match the list of types agreed upon session settlement
   }
}
WalletConnectClient.setWalletConnectListener(listener)
```

The WalletConnectClient needs a `WalletConnectClientListener` passed to it for it to be able to expose asynchronously updates sent from the Dapp.

### **Pair Clients**
```kotlin
val pairParams = ClientTypes.PairParams("wc:...")
val pairListener = object: WalletConnectClientListeners.Pairing {
   override fun onSuccess(settledPairing: WalletConnectClientData.SettledPairing) {
      // Settled pairing
   }

   override fun onError(error: Throwable) {
      // Pairing approval error
   }
}
WalletConnectClient.pair(pairParams, pairListener)
```

To pair the wallet with the Dapp, call the WalletConnectClient.pair function which needs a `ClientTypes.PairParams` and `WalletConnectClientListeners.Pairing`. 
ClientTypes.Params is where the Dapp Uri will be passed. 
WalletConnectClientListeners.Pairing is the callback that will be asynchronously called once there a pairing has been made with the Dapp.

### **Session Approval**
NOTE: addresses provided in `accounts` array should follow [CAPI10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) semantics.
```kotlin
val accounts: List<String> = /*list of accounts on chains*/
val sessionProposal: WalletConnectClientData = /*Session Proposal object*/
val approveParams: ClientTypes.ApproveParams = ClientTypes.ApproveParams(sessionProposal, accounts)
val listener: WalletConnectClientListeners.SessionApprove {
   override fun onSuccess(settledSession: WalletConnectClientData.SettledSession) {
      // Approve session success
   }

   override fun onError(error: Throwable) {
      // Approve session error
   }
}
WalletConnectClient.approve(approveParams, listener)
```
To send a approval, pass a Session Proposal object along with the list of accounts to the `WalletConnectClient.approve` function. Listener will asynchronously expose the settled session if the operation is successful.

### **Session Rejection**
```kotlin
val rejectionReason: String = /*The reason for rejecting the Session Proposal*/
val proposalTopic: String = /*Topic from the Session Proposal*/
val rejectParams: ClientTypes.RejectParams = ClientTypes.RejectParams(rejectionReason, proposalTopic)
val listener: WalletConnectClientListneners.SessionReject {
   override fun onSuccess(rejectedSession: WalletConnectClientData.RejectedSession) {
      // Rejection proposal
   }

   override fun onError(error: Throwable) {
      //Rejected proposal error
   }
}
WalletConnectClient.reject(rejectParams, listener)
```
To send a rejection for the Session Proposal, pass a rejection reason and the Session Proposal topic to the `WalletConnectClient.reject` function. Listener will asynchronously expose a `RejectedSession` object that will mirror the data sent for rejection.

### **Session Disconnect**
```kotlin
val disconnectionReason: String = /*The reason for disconnecting the Settled Session*/
val sessionTopic: String = /*Topic from the Settled Session*/
val disconnectParams = ClientTypes.DisconnectParams(sessionTopic, disconnectionReason)
val listener = object : WalletConnectClientListeners.SessionDelete {
   override fun onSuccess(deletedSession: WalletConnectClientData.DeletedSession) {
      // DeleteSession object with topic and reason
   }

   override fun onError(error: Throwable) {
      // Session disconnect error
   }
}

WalletConnectClient.disconnect(disconnectParams, listener)
```
To disconnect from a settle session, pass a disconnection reason and the Settled Session topic to the `WalletConnectClient.disconnect` function. Listener will asynchronously expose a DeleteSession object that will mirror the data sent for rejection.

### **Respond Request**
```kotlin
val sessionRequestTopic: String = /*Topic of Settled Session*/
val jsonRpcResponse: WalletConnectClientData.JsonRpcResponse.JsonRpcResult = /*Settled Session Request ID along with request data*/
val result = ClientTypes.ResponseParams(sessionTopic = sessionRequestTopic, jsonRpcResponse = jsonRpcResponse)
val listener = object : WalletConnectClientListeners.SessionPayload {
   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.respond(result, listener)
```
To respond to JSON-RPC methods that were sent from Dapps for a settle session, submit a `ClientTypes.ResponseParams` with the settled session's topic and request ID along with the respond data to the `WalletConnectClient.respond` function. Any errors would exposed through the `WalletConnectClientListeners.SessionPayload` listener.

### **Reject Request**
```kotlin
val sessionRequestTopic: String = /*Topic of Settled Session*/
val jsonRpcResponseError: WalletConnectClientData.JsonRpcResponse.JsonRpcError = /*Settled Session Request ID along with error code and message*/
val result = ClientTypes.ResponseParams(sessionTopic = sessionRequestTopic, jsonRpcResponse = jsonRpcResponseError)
val listener = object : WalletConnectClientListeners.SessionPayload {
   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.respond(result, listener)
```
To reject a JSON-RPC method that was sent from a Dapps for a settle session, submit a `ClientTypes.ResponseParams` with the settled session's topic and request ID along with the rejection data to the `WalletConnectClient.respond` function. Any errors would exposed through the `WalletConnectClientListeners.SessionPayload` listener.

### **Session Update**
```kotlin
val sessionTopic: String = /*Topic of Settled Session*/
val sessionState: WalletConnectClientData.SessionState = /*object with list of accounts to update*/
val updateParams = ClientTypes.UpdateParams(sessionTopic = sessionTopic, sessionState = sessionState)
val listener = object : WalletConnectClientListeners.SessionUpdate {
   override fun onSuccess(updatedSession: WalletConnectClientData.UpdatedSession) {
      // Callback for when Dapps successfully updates settled session
   }

   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.update(updateParams, listener)
```
To update a settled session, create a `ClientTypes.UpdateParams` object with the settled session's topic and accounts to update session with to `WalletConnectClient.update`. Listener will echo the accounts updated on the Dapp if action is successful. 

### **Session Upgrade**
```kotlin
val sessionTopic: String = /*Topic of Settled Session*/
val permissions: WalletConnectClientData.SessionPermissions = /*list of blockchains and JSON-RPC methods to upgrade with*/
val upgradeParams = ClientTypes.UpgradeParams(sessionTopic = sessionTopic, permissions = permissions)
val listener = object : WalletConnectClientListeners.SessionUpgrade {
   override fun onSuccess(upgradedSession: WalletConnectClientData.UpgradedSession) {
      // Callback for when Dapps successfully upgrades settled session
   }

   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.upgrade(upgradeParams, listener)
```
To upgrade a settled session, create a `ClientTypes.UpgradeParams` object with the settled session's topic and blockchains and JSON-RPC methods to upgrade the session with to `WalletConnectClient.upgrade`. Listener will echo the blockchains and JSON-RPC methods upgraded on the Dapp if action is successful. 

### **Session Ping**
```kotlin
val sessionTopic: String = /*Topic of Settled Session*/
val pingParams = ClientTypes.PingParams(sessionTopic)
val listener = object : WalletConnectClientListeners.SessionPing {
   override fun onSuccess(topic: String) {
      // Topic being pinged
   }

   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.ping(pingParams, listener)
```
To ping a Dapp with a settled session, call `WalletConnectClient.ping` with the `ClientTypes.PingParams` with a settle session's topic. If ping is successful, topic is echo'd in listener.

### **Get List of Settled Sessions**
```kotlin
WalletConnectClient.getListOfSettledSessions()
```
To get a list of the most current setteld sessions, call `WalletConnectClient.getListOfSettledSessions()` which will return a list of type `WalletConnectClientData.SettledSession`.

### **Get List of Pending Sessions**
```kotlin
WalletConnectClient.getListOfPendingSession()
```
To get a list of the most current pending sessions, call `WalletConnectClient.getListOfPendingSession()` which will return a list of type `WalletConnectClientData.SessionProposal`.

### **Shutdown SDK**
```kotlin
WalletConnectClient.shutdown()
```
To make sure that the internal coroutines are handled correctly when leaving the application, call `WalletConnectClient.shutdown()` before exiting from the application.

## Project ID

For the Project ID look at [Project ID](../../api/project-id.md).
