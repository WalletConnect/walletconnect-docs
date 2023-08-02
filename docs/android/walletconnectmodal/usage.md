# Usage

## WalletConnectModal Client

`WalletConnectModal` is a singleton that interacts with the WalletConnectModal SDK.

### Initialize

```kotlin
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val appMetaData = Core.Model.AppMetaData(
    name = "Kotlin.WalletConnectModal",
    description = "Kotlin WalletConnectModal Implementation",
    url = "kotlin.walletconnect.com",
    icons = listOf("https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Gradient/Icon.png"),
    redirect = "kotlin-modal://request"
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)

WalletConnectModal.initialize(
    init = Modal.Params.Init(CoreClient),
    onSuccess = {
        // Callback will be called if initialization is successful
     },
    onError = { error -> 
        // Error will be thrown if there's an issue during initialization
    }
)
```

### SessionParams

This example will default to using following namespaces

```kotlin
val methods: List<String> = listOf("eth_sendTransaction", "personal_sign", "eth_sign", "eth_signTypedData")
val events: List<String> = listOf("chainChanged", "accountsChanged")
val chains: List<String> = listOf("eip155:1")
val namespaces = mapOf(
    "eip155" to Modal.Model.Namespace.Proposal(
        chains = chains,
        methods = methods,
        events = events
    )
)

val sessionParams = Modal.Params.SessionParams(
    requiredNamespaces = namespaces,
    optionalNamespaces = null,
    properties = null
)
```

If you want to change that you can call configure and define your own session parameters like this.

```kotlin
val sessionParams = Modal.Params.SessionParams(...)

val initParams = Modal.Params.Init(core = CoreClient, sessionParams = sessionParams)
        
WalletConnectModal.initialize(
    init = initParams,
    onSuccess = {
        // Callback will be called if initialization is successful
    },
    onError = { error ->
        // Error will be thrown if there's an issue during initialization
    }
)
```

## WalletConnectModal Usage

### Android Compose

````kotlin
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetState
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.google.accompanist.navigation.material.BottomSheetNavigator
import com.google.accompanist.navigation.material.ExperimentalMaterialNavigationApi
import com.google.accompanist.navigation.material.ModalBottomSheetLayout
import com.google.accompanist.navigation.material.bottomSheet
import com.walletconnect.wcmodal.ui.walletConnectModalGraph

setContent {
    val modalSheetState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden, skipHalfExpanded = true)
    val bottomSheetNavigator = BottomSheetNavigator(modalSheetState)
    val navController = rememberNavController(bottomSheetNavigator)

    ModalBottomSheetLayout(bottomSheetNavigator = bottomSheetNavigator) {
        NavHost(
            navController = navController,
            startDestination = "home"
        ) {
            composable("home") {
                HomeScreen()
            }
            walletConnectModalGraph(navController)
        }
    }
}
````

**IMPORTANT**: WalletConnectModal uses accompanist navigation material inside. `ModalBottomSheetLayout` should be imported from [Accompanist Navigation Material](https://google.github.io/accompanist/navigation-material/)

````kotlin
import com.walletconnect.wcmodal.ui.openWalletConnectModal

navController.openWalletConnectModal()
````

### Android View

#### Navigation Component

````xml
<navigation >
    <fragment
        android:id="@+id/HomeFragment"
        android:name="com.walletconnect.sample.HomeFragment">
            
        <action 
            android:id="@+id/action_to_bottomSheet"
            app:destination="@id/bottomSheet" />
    </fragment>

    <dialog 
        android:id="@+id/bottomSheet" 
        android:name="com.walletconnect.wcmodal.ui.WalletConnectModalSheet" />
</navigation>
````

````kotlin
import androidx.navigation.fragment.findNavController
import com.walletconnect.wcmodal.ui.openWalletConnectModal

findNavController().openWalletConnectModal(id = R.id.action_to_bottomSheet)
````

#### Kotlin DSL

````kotlin
import androidx.navigation.createGraph
import androidx.navigation.fragment.fragment
import com.walletconnect.wcmodal.ui.walletConnectModal

navController.graph = navController.createGraph("Home") {
    fragment<HomeFragment>("Home")
    walletConnectModal()
}
````

````kotlin
import androidx.navigation.fragment.findNavController
import com.walletconnect.wcmodal.ui.openWalletConnectModal

findNavController().openWalletConnectModal()
````

#

## WalletConnectModal.ModalDelegate

````kotlin
val walletConnectModalDelegate = object : WalletConnectModal.ModalDelegate {
    override fun onSessionApproved(approvedSession: Modal.Model.ApprovedSession) {
        // Triggered when receives the session approval from wallet
    }

    override fun onSessionRejected(rejectedSession: Modal.Model.RejectedSession) {
        // Triggered when receives the session rejection from wallet
    }

    override fun onSessionUpdate(updatedSession: Modal.Model.UpdatedSession) {
        // Triggered when receives the session update from wallet
    }

    override fun onSessionExtend(session: Modal.Model.Session) {
        // Triggered when receives the session extend from wallet
    }

    override fun onSessionEvent(sessionEvent: Modal.Model.SessionEvent) {
        // Triggered when the peer emits events that match the list of events agreed upon session settlement
    }

    override fun onSessionDelete(deletedSession: Modal.Model.DeletedSession) {
        // Triggered when receives the session delete from wallet
    }

    override fun onSessionRequestResponse(response: Modal.Model.SessionRequestResponse) {
        // Triggered when receives the session request response from wallet
    }

    override fun onConnectionStateChange(state: Modal.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }

    override fun onError(error: Modal.Model.Error) {
        // Triggered whenever there is an issue inside the SDK
    }
}
````

The WalletConnectModal needs a `WalletConnectModal.ModalDelegate` passed to it for it to be able to expose asynchronously updates sent from the Wallet. It can only be called after successful `WalletConnectModal` initialization


#

## Connect

````kotlin
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val chains: List<String> = /*List of chains that wallet will be requested for*/
val methods: List<String> = /*List of methods that wallet will be requested for*/
val events: List<String> = /*List of events that wallet will be requested for*/
val requiredNamespaces: Map<String, Modal.Model.Namespaces.Proposal> = mapOf(namespace, Modal.Model.Namespaces.Proposal(accounts, methods, events)) /*Required namespaces to setup a session*/
val optionalNamespaces: Map<String, Modal.Model.Namespaces.Proposal> = mapOf(namespace, Modal.Model.Namespaces.Proposal(accounts, methods, events)) /*Optional namespaces to setup a session*/
val pairing: Core.Model.Pairing = /*Either an active or inactive pairing*/
val connectParams = Modal.Params.Connect(requiredNamespaces, optionalNamespaces, pairing)

WalletConnectModal.connect(
    connect = connectParams,
    onSuccess = { 
        /* callback that letting you know that you have successfully initiated connecting */ 
    }, 
    onError = { error -> 
        /* callback for error while trying to initiate a connection with a peer */ 
    }
)
````

More about optional and required namespaces can be found [here](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md)

#
## Disconnect

````kotlin
val disconnectParams = WalletConnectModal.Params.Disconnect(topic)

WalletConnectModal.disconnect(
    disconnect = disconnectParams,
    onSuccess = { 
    /* callback that letting you know that you have successfully disconnected */ 
    },
    onError = { error ->
    /* callback for error while trying to disconnection with a peer */ 
    }
)
````

#
## Request
````kotlin
val requestParams = Modal.Params.Request(
    sessionTopic = sessionTopic,
    method = /* Selected method */,
    params = /* Method params  */,
    chainId = /* Chain id */
)

WalletConnectModal.request(
    request = requestParams,
    onSuccess = {
    /* callback that letting you know that you have successful request */
    },
    onError = { error ->
    /* callback for error */
    }
)
````

#
## Get List of Active Sessions

```kotlin
WalletConnectModal.getListOfActiveSessions()
```

To get a list of active sessions, call `WalletConnectModal.getListOfActiveSessions()` which will return a list of type `Modal.Model.Session`.

#
## Get list of pending session requests for a topic

````kotlin
WalletConnectModal.getActiveSessionByTopic(topic)
````

To get a active session for a topic, call `WalletConnectModal.getActiveSessionByTopic()` and pass a topic which will return
a `Modal.Model.Session` object containing requestId, method, chainIs and params for pending request.


#
## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID.
