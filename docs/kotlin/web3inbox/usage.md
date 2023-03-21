# Usage

## Web3Inbox SDK

Web3Inbox SDK enables easy intergation of [Web3Inbox](https://web3inbox.com/). To use Web3Inbox SDK simply initalize the client and place composeable into your app. 

**Note:** Currently Web3Inbox SDK contains Chat SDK features. Push SDK features coming soon.

## Web3Inbox Sample App

We recommend looking at the example implementations of the Web3Inbox Sample in our Kotlin GitHub [repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/master/samples/web3inbox).

## Web3Inbox Client

`Web3Inbox` is an object that interacts with the Web3Inbox SDK

### Initialize

To initialize the Web3Inbox client, create a `Inbox.Params.Init` object in the Android Application class with the Core Client. The `Inbox.Params.Init` object will then be passed to the `Web3Inbox` initialize function.


```kotlin
val accountsPrivateKey: ByteArray = /* address' private key. */
val caip10Account: String = /*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/
val projectId = PROJECT_ID
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=${projectId}"
val appMetaData = Core.Model.AppMetaData(
    name = "Kotlin.Web3Inbox",
    description = "Kotlin Web3Inbox Implementation",
    url = "kotlin.web3inbox.walletconnect.com",
    icons = listOf("https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Gradient/Icon.png"),
    redirect = null
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = ConnectionType.AUTOMATIC, application = this, metaData = appMetaData)

Web3Inbox.initialize(Inbox.Params.Init(core = CoreClient, account = Inbox.Type.AccountId(caip10Account), onSign = { message -> 
    // Message to be signed by the user. 
    //    If user decides to sign the message, use the CacaoSigner util class to sign the message. 
    //    If user decides to not sign the message, return null
    return CacaoSigner.sign(message, accountsPrivateKey, SignatureType.EIP191) OR null
    }
)) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

## Create Web3Inbox.View
Once the Web3Inbox client is [initialized](#intialize), all that's left to do is to place the `Web3Inbox.View` in your app. We support both [Compose](https://developer.android.com/jetpack/compose), which sample sample implementation can be found in our [sample app](https://github.com/WalletConnect/WalletConnectKotlinV2/blob/develop/samples/web3inbox/src/main/kotlin/com/walletconnect/web3/inbox/ui/Web3InboxComposeActivity.kt)

<!-- TODO: Change :pointup: once we move Web3Inbox sample into Web3Wallet sample -->

### Prevent reloading of Web3Inbox

**IMPORTANT:** If Web3Inbox's inner WebView is reloaded it will lose state and be displayed as blank page. To prevent reloading of Web3Inbox the activity that contains the `Web3Inbox.View` add `android:configChanges="orientation|screenSize"` to `<activity>` element `Manifest.xml` that houses Web3Inbox.

### Android Compose

#### Composable Web3Inbox.View()

To display Web3Inbox with Compose call `Web3Inbox.View()` somewhere in your app.

```kotlin
   setContent {
      Web3Inbox.View(modifier: Modifier = Modifier)
   }
```

### Android XML

Adding Web3Inbox to legacy Views should be achieved according to Google's guidelines: https://developer.android.com/jetpack/compose/migrate/interoperability-apis/compose-in-views.

For sample implementation take a look at our [sample app](https://github.com/WalletConnect/WalletConnectKotlinV2/blob/develop/samples/web3inbox/src/main/kotlin/com/walletconnect/web3/inbox/ui/Web3InboxXMLActivity.kt)
