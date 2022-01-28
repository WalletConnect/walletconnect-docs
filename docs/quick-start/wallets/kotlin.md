---
description: Quick Start For Wallets Using Kotlin Client (Android)
---

# Kotlin Client (Android)

Kotlin implementation of WalletConnect v2 protocol for native Android applications.

:::caution
Note: The Kotlin client is in Beta and should only be used for testing.
:::

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
implementation("com.github.WalletConnect:WalletConnectKotlinV2:1.0.0-beta02")
```

&nbsp;

## **Usage**

### **Initialize WalletConnect Client**

```kotlin
val appMetaData =
    WalletConnect.Model.AppMetaData(name = "Wallet Name", description = "Wallet Description", url = "Wallet Url", icons = listOfIconUrlStrings)
val init =
    WalletConnect.Params.Init(application = application, isController = true / false, projectId = "project id", appMetaData = appMetaData)
WalletConnectClient.initalize(init)
```

The controller client will always be the wallet which is exposing blockchain accounts to a Dapp and therefore is also in charge of signing. To
initialize the WalletConnect client, create a `WalletConnect.Params.Init` object in the Android Application class. The Init object will need the
application class, the ProjectID, isController flag, and the wallet's AppMetaData. The `WalletConnect.Params.Init` object will then be passed to
the `WalletConnectClient` initialize function. `WalletConnect.Params.Init` also allows for custom URLs by passing URL string into the `hostName`
property.

Remember to setup the isController flag to declare if your peer should act as controller or non-controller. For reference check out out
docs: https://docs.walletconnect.com/2.0/protocol/glossary#controller

&nbsp;

## **Wallet**

### **WalletConnectClient.WalletDelegate**

```kotlin
val walletDelegate = object : WalletConnectClient.WalletDelegate {
    override fun onSessionProposal(sessionProposal: WalletConnect.Model.SessionProposal) {
        // Session Proposal object sent by Dapp after pairing was successful
    }

    override fun onSessionRequest(sessionRequest: WalletConnect.Model.SessionRequest) {
        // JSON-RPC methods wrapped by SessionRequest object sent by Dapp
    }

    override fun onSessionDelete(deletedSession: DWalletConnect.Model.DeletedSession) {
        // Triggered when the session is deleted by the peer
   }

   override fun onSessionNotification(sessionNotification: WalletConnect.Model.SessionNotification) {
      // Triggered when the peer emits events as notifications that match the list of types agreed upon session settlement
   }
}
WalletConnectClient.setWalletDelegate(walletDelegate)
```

The WalletConnectClient needs a `WalletConnectClient.WalletDelegate` passed to it for it to be able to expose asynchronously updates sent from
the Dapp.

&nbsp;

### **Pair Clients**
```kotlin
val pair = WalletConnect.Params.Pair("wc:...")
val pairListener = object: WalletConnect.Listeners.Pairing {
   override fun onSuccess(settledPairing: WalletConnect.Model.SettledPairing) {
      // Settled pairing
   }

   override fun onError(error: Throwable) {
      // Pairing approval error
   }
}
WalletConnectClient.pair(pair, pairListener)
```

To pair the wallet with the Dapp, call the WalletConnectClient.pair function which needs a ` WalletConnect.Params.Pair` and ` WalletConnect.Listeners.Pairing`. 
ClientTypes.Params is where the Dapp Uri will be passed. 
WalletConnectClientListeners.Pairing is the callback that will be asynchronously called once there a pairing has been made with the Dapp.

&nbsp;

### **Session Approval**
NOTE: addresses provided in `accounts` array should follow [CAPI10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) semantics.
```kotlin
val accounts: List<String> = /*list of accounts on chains*/
val sessionProposal:  WalletConnect.Model.SessionProposal = /*Session Proposal object*/
val approve: WalletConnect.Params.Approve = WalletConnect.Params.Approve(sessionProposal, accounts)
val listener:  WalletConnect.Listeners.SessionApprove {
   override fun onSuccess(settledSession:  WalletConnect.Model.SettledSession) {
      // Approve session success
   }

   override fun onError(error: Throwable) {
      // Approve session error
   }
}
WalletConnectClient.approve(approveParams, listener)
```

To send an approval, pass a Session Proposal object along with the list of accounts to the `WalletConnectClient.approve` function. Listener will asynchronously expose the settled session if the operation is successful.

&nbsp;

### **Session Rejection**
```kotlin
val rejectionReason: String = /*The reason for rejecting the Session Proposal*/
val proposalTopic: String = /*Topic from the Session Proposal*/
val rejectParams:  WalletConnect.Params.Reject = Reject(rejectionReason, proposalTopic)
val listener:  WalletConnect.Listeners.SessionReject {
   override fun onSuccess(rejectedSession:  WalletConnect.Model.RejectedSession) {
      // Rejection proposal
   }

   override fun onError(error: Throwable) {
      //Rejected proposal error
   }
}
WalletConnectClient.reject(rejectParams, listener)
```
To send a rejection for the Session Proposal, pass a rejection reason and the Session Proposal topic to the `WalletConnectClient.reject` function. Listener will asynchronously expose a `WalletConnect.Model.RejectedSession` object that will mirror the data sent for rejection.

&nbsp;

### **Session Disconnect**
```kotlin
val disconnectionReason: String = /*The reason for disconnecting the Settled Session*/
val sessionTopic: String = /*Topic from the Settled Session*/
val disconnectParams = WalletConnect.Params.Disconnect(sessionTopic, disconnectionReason)
val listener = object : WalletConnect.Listeners.SessionDelete {
   override fun onSuccess(deletedSession: WalletConnect.Model.DeletedSession) {
      // DeleteSession object with topic and reason
   }

   override fun onError(error: Throwable) {
      // Session disconnect error
   }
}

WalletConnectClient.disconnect(disconnectParams, listener)
```
To disconnect from a settle session, pass a disconnection reason and the Settled Session topic to the `WalletConnectClient.disconnect` function. Listener will asynchronously expose a DeleteSession object that will mirror the data sent for rejection.

&nbsp;

### **Respond Request**
```kotlin
val sessionRequestTopic: String = /*Topic of Settled Session*/
val jsonRpcResponse: WalletConnect.Model.JsonRpcResponse.JsonRpcResult = /*Settled Session Request ID along with request data*/
val result = WalletConnect.Params.Response(sessionTopic = sessionRequestTopic, jsonRpcResponse = jsonRpcResponse)
val listener = object : WalletConnect.Listeners.SessionPayload {
   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.respond(result, listener)
```
To respond to JSON-RPC methods that were sent from Dapps for a settle session, submit a `WalletConnect.Params.Response` with the settled session's topic and request ID along with the respond data to the `WalletConnectClient.respond` function. Any errors would exposed through the `WalletConnect.Listeners.SessionPayload` listener.

### **Reject Request**
```kotlin
val sessionRequestTopic: String = /*Topic of Settled Session*/
val jsonRpcResponseError: WalletConnect.Model.JsonRpcResponse.JsonRpcError = /*Settled Session Request ID along with error code and message*/
val result = WalletConnect.Params.Response(sessionTopic = sessionRequestTopic, jsonRpcResponse = jsonRpcResponseError)
val listener = object : WalletConnect.Listeners.SessionPayload {
   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.respond(result, listener)
```
To reject a JSON-RPC method that was sent from a Dapps for a settle session, submit a `WalletConnect.Params.Response` with the settled session's topic and request ID along with the rejection data to the `WalletConnectClient.respond` function. Any errors would exposed through the `WalletConnect.Listeners.SessionPayload` listener.

&nbsp;

### **Session Update**
```kotlin
val sessionTopic: String = /*Topic of Settled Session*/
val sessionState: WalletConnect.Model.SessionState = /*object with list of accounts to update*/
val updateParams = WalletConnect.Params.Update(sessionTopic = sessionTopic, sessionState = sessionState)
val listener = object : WalletConnect.Listeners.SessionUpdate {
   override fun onSuccess(updatedSession: WalletConnect.Model.UpdatedSession) {
      // Callback for when Dapps successfully updates settled session
   }

   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.update(updateParams, listener)
```
To update a settled session, create a `WalletConnect.Params.Update` object with the settled session's topic and accounts to update session with to `WalletConnectClient.update`. Listener will echo the accounts updated on the Dapp if action is successful. 

&nbsp;

### **Session Upgrade**
```kotlin
val sessionTopic: String = /*Topic of Settled Session*/
val permissions: WalletConnect.Model.SessionPermissions = /*list of blockchains and JSON-RPC methods to upgrade with*/
val upgradeParams = WalletConnect.Params.Upgrade(sessionTopic = sessionTopic, permissions = permissions)
val listener = object : WalletConnect.Listeners.SessionUpgrade {
   override fun onSuccess(upgradedSession: WalletConnect.Model.UpgradedSession) {
      // Callback for when Dapps successfully upgrades settled session
   }

   override fun onError(error: Throwable) {
      // Error
   }
}

WalletConnectClient.upgrade(upgradeParams, listener)
```
To upgrade a settled session, create a `WalletConnect.Params.Upgrade` object with the settled session's topic and blockchains and JSON-RPC methods to upgrade the session with to `WalletConnectClient.upgrade`. Listener will echo the blockchains and JSON-RPC methods upgraded on the Dapp if action is successful. 

&nbsp;

### **Session Ping**
```kotlin
val sessionTopic: String = /*Topic of Settled Session*/
val pingParams = WalletConnect.Params.Ping(sessionTopic)
val listener = object : WalletConnect.Listeners.SessionPing {
   override fun onSuccess(topic: String) {
      // Topic being pinged
   }

    override fun onError(error: Throwable) {
        // Error
    }
}

WalletConnectClient.ping(pingParams, listener)
```

To ping a Dapp with a settled session, call `WalletConnectClient.ping` with the `WalletConnect.Params.Ping` with a settle session's topic. If
ping is successful, topic is echo'd in listener.

&nbsp;

&nbsp;


## **Dapp**

### **WalletConnectClient.DappDelegate**

```kotlin
val dappDelegate = object : WalletConnectClient.DappDelegate {
    override fun onPairingSettled(settledPairing: WalletConnect.Model.SettledPairing) {
        // Triggered when Dapp receives the pairing approval from wallet
    }

    override fun onSessionApproved(approvedSession: WalletConnect.Model.ApprovedSession) {
        // Triggered when Dapp receives the session approval from wallet
    }

    override fun onSessionRejected(rejectedSession: WalletConnect.Model.RejectedSession) {
        // Triggered when Dapp receives the session rejection from wallet
    }
}
WalletConnectClient.setWalletDelegate(dappDelegate)
```

The WalletConnectClient needs a `WalletConnectClient.DappDelegate` passed to it for it to be able to expose asynchronously updates sent from the
Wallet.

&nbsp;

### **Connect**

```kotlin
val sessionPermissions: WalletConnect.Model.SessionPermissions = /* List of permissions that wallet will be requested for */
val pairingTopic: String? =  /* Optional parameter, use it when the pairing between peers is already established*/
fun WalletConnectClient.connect(sessionPermissions, pairingTopic): String?
```

The `WalletConnect.connect` method returns the pairing URI that is shared with wallet out of bound, as qr code or mobile linking. The pairing
URI is null when there is already an established pairing between peers. To establish a session, pass the existing pairing's topic to the connect
method. The SDK will send the SessionProposal for the given topic.

&nbsp;

### **Get List of Settled Sessions**

```kotlin
WalletConnectClient.getListOfSettledSessions()
```

To get a list of the most current settled sessions, call `WalletConnectClient.getListOfSettledSessions()` which will return a list of
type `SettledSession`.

&nbsp;

### **Get List of Pending Sessions**

```kotlin
WalletConnectClient.getListOfPendingSession()
```
To get a list of the most current pending sessions, call `WalletConnectClient.getListOfPendingSession()` which will return a list of type `SessionProposal`.

&nbsp;

### **Shutdown SDK**
```kotlin
WalletConnectClient.shutdown()
```
To make sure that the internal coroutines are handled correctly when leaving the application, call `WalletConnectClient.shutdown()` before exiting from the application.

&nbsp;

## Project ID

For the Project ID look at [Project ID](../../api/project-id.md).
