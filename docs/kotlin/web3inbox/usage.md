# Usage

## Web3Inbox SDK

Web3Inbox SDK enables easy intergation of [Web3Inbox](https://web3inbox.com/). To use Web3Inbox SDK simply initalize the client and place either compose or xml view into your app. 

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
Once the Web3Inbox client is [initialized](#intialize), all that's left to do is to place the `Web3Inbox.View` in your app. We support both [Compose](https://developer.android.com/jetpack/compose)  and Android XML.

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

#### Web3Inbox.View()

To display Web3Inbox with Android XML add view programatically by calling `addView(Web3Inbox.View(/*Context/*))`.

```kotlin
fun View(context: Context): WebView
```
#### Adding Web3Inbox into fragment's layout

In order to display Web3Inbox in fragment's layout it needs to added programatically inside `onViewCreated(view: View, savedInstanceState: Bundle?)`

Code below shows how to append Web3Inbox as a `ConstraintLayout` child.

##### fragment_web3inbox.xml
```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/root"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
</androidx.constraintlayout.widget.ConstraintLayout>
```

##### Fragment
```kotlin
class Web3InboxXMLFragment : Fragment(R.layout.fragment_web3inbox) {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        findViewById<ConstraintLayout>(R.id.root).apply {
            addView(Web3Inbox.View(applicationContext))
        }
    }
}
```
