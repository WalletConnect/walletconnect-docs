# Usage

## Web3Modal SDK

The Web3Modal Android SDK allows for easy integration of [Web3Modal](https://web3modal.com/) in a native Android application.

## Web3Modal Client

`Web3Modal` is a singleton that interacts with the Web3Modal SDK.

### Initialize

```kotlin
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val appMetaData = Core.Model.AppMetaData(
    name = "Kotlin.Web3Modal",
    description = "Kotlin Web3Modal Implementation",
    url = "kotlin.web3Modal.walletconnect.com",
    icons = listOf("https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Gradient/Icon.png"),
    redirect = "kotlin-web3Modal://request"
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)

Web3Modal.initialize(
    init = Modal.Params.Init(CoreClient),
    onSuccess = {
        // Callback will be called if initialization is successful
     },
    onError = { error -> 
        // Error will be thrown if there's an issue during initialization
    }
)
```

## Web3Modal Usage

### Android Compose

````kotlin
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
                web3ModalGraph(navController, modalSheetState)
            }
        }
    }
````
**IMPORTANT**: Web3modal uses accompanist navigation material inside. `ModalBottomSheetLayout` should be imported from [Accompanist Navigation Material](https://google.github.io/accompanist/navigation-material/)

````kotlin
    val config = Config.Connect(uri = "wc:7f6e504bfad60b485450578e05678ed3e8e8c4751d3c6160be17160d63ec90f9@2")
    navController.navigateToWeb3Modal(config)
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
            android:name="com.walletconnect.web3.modal.ui.Web3ModalBottomSheet" />
    </navigation>
````

````kotlin
    val config = Config.Connect(uri = "wc:7f6e504bfad60b485450578e05678ed3e8e8c4751d3c6160be17160d63ec90f9@2")
    findNavController().navigateToWeb3modal(R.id.action_to_bottomSheet, config)
````

#### Kotlin DSL

````kollin
    navController.graph = navController.createGraph("Home") {
        fragment<HomeFragment>("Home")
        web3Modal()
    }
````

````kotlin
    val config = Config.Connect(uri = uri = "wc:7f6e504bfad60b485450578e05678ed3e8e8c4751d3c6160be17160d63ec90f9@2")
    findNavController().navigateToWeb3Modal(config)
````

#

## Web3Modal.ModalDelegate

````kotlin
val web3ModalDelegate = object : Web3Modal.ModalDelegate {
    override fun onSessionApproved(approvedSession: Web3Modal.Model.ApprovedSession) {
        // Triggered when receives the session approval from wallet
    }

    override fun onSessionRejected(rejectedSession: Web3Modal.Model.RejectedSession) {
        // Triggered when receives the session rejection from wallet
    }

    override fun onSessionUpdate(updatedSession: Web3Modal.Model.UpdatedSession) {
        // Triggered when receives the session update from wallet
    }

    override fun onSessionExtend(session: Web3Modal.Model.Session) {
        // Triggered when receives the session extend from wallet
    }

    override fun onSessionEvent(sessionEvent: Web3Modal.Model.SessionEvent) {
        // Triggered when the peer emits events that match the list of events agreed upon session settlement
    }

    override fun onSessionDelete(deletedSession: Web3Modal.Model.DeletedSession) {
        // Triggered when receives the session delete from wallet
    }

    override fun onSessionRequestResponse(response: Web3Modal.Model.SessionRequestResponse) {
        // Triggered when receives the session request response from wallet
    }

    override fun onConnectionStateChange(state: Web3Modal.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }

    override fun onError(error: Web3Modal.Model.Error) {
        // Triggered whenever there is an issue inside the SDK
    }
}
````

The Web3Modal needs a `Web3Modal.ModalDelegate` passed to it for it to be able to expose asynchronously updates sent from the Wallet.

#

## Connect

````kotlin
val namespace: String = /*Namespace identifier, see for reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md#syntax*/
val chains: List<String> = /*List of chains that wallet will be requested for*/
val methods: List<String> = /*List of methods that wallet will be requested for*/
val events: List<String> = /*List of events that wallet will be requested for*/
val requiredNamespaces: Map<String, Web3Modal.Model.Namespaces.Proposal> = mapOf(namespace, Web3Modal.Model.Namespaces.Proposal(accounts, methods, events)) /*Required namespaces to setup a session*/
val optionalNamespaces: Map<String, Web3Modal.Model.Namespaces.Proposal> = mapOf(namespace, Web3Modal.Model.Namespaces.Proposal(accounts, methods, events)) /*Optional namespaces to setup a session*/
val pairing: Core.Model.Pairing = /*Either an active or inactive pairing*/
val connectParams = Web3Modal.Params.Connect(requiredNamespaces, optionalNamespaces, pairing)

Web3Modal.connect(
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
val disconnectParams = Web3Modal.Params.Disconnect(topic)

Web3Modal.disconnect(
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

Web3Modal.request(
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
Web3Modal.getListOfActiveSessions()
```

To get a list of active sessions, call `Web3Modal.getListOfActiveSessions()` which will return a list of type `Modal.Model.Session`.

#
## Get list of pending session requests for a topic

````kotlin
Web3Modal.getActiveSessionByTopic(topic)
````

To get a active session for a topic, call `Web3Modal.getActiveSessionByTopic()` and pass a topic which will return
a `Modal.Model.Session` object containing requestId, method, chainIs and params for pending request.


#
## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID.
