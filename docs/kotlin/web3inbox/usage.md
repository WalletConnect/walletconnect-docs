# Usage

## Web3Inbox SDK

Web3Inbox SDK enables easy intergation of [Web3Inbox](https://web3inbox.com/). To use Web3Inbox SDK simply initalize the client and place either compose or xml view into your app. 

**Note:** Currently Web3Inbox SDK contains Chat SDK features. Push SDK features coming soon.

## Web3Inbox Sample App

We recommend looking at example implementations of Web3Inbox Sample at our [Kotlin Github repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/master/samples/web3inbox)

## Web3Inbox Client

`Web3Inbox` is an object that interacts with the Web3Inbox SDK

### Initialize Web3Inbox Client

```kotlin
val accountsPrivateKey: ByteArray = /* address' private key.
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
    // Message to be signed. When user decides to sign message use CacaoSigner to sign message.
    // CacaoSigner is a util for easy message signing.
    return CacaoSigner.sign(message, accountsPrivateKey, SignatureType.EIP191)
    // When users decides to not sign message return null
    return null
    }
)) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

To initialize the Web3Inbox client, create a `Inbox.Params.Init` object in the Android Application class with the Core Client. The `Inbox.Params.Init` object will then be passed to the `Web3Inbox` initialize function.


## Create Web3Inbox.View
Once [Web3Inbox client is initalized](#initialize-web3inbox-client) all the's left to do is to place Web3Inbox.View in your app. We support both [Compose](https://developer.android.com/jetpack/compose) and Android XML. We advise to allow `Web3Inbox.View` to use the whole screen.

### Prevent reloading of Web3Inbox

**IMPORTANT:** To prevent reloading of Web3Inbox the activity that contains the `Web3Inbox.View` add `android:configChanges="orientation|screenSize"` to `<activity>` element `Manifest.xml`.

### Android Compose

#### Composable Web3Inbox.View()

```kotlin
fun View(modifier: Modifier = Modifier)
```

To display Web3Inbox with Compose call `Web3Inbox.View()` somewhere in your app.

### Android XML

#### Web3Inbox.View()

```kotlin
fun View(context: Context): WebView
```

To display Web3Inbox with Android XML add view programatically by calling `addView(Web3Inbox.View(/*Context/*))`. It can be placed in designated activity or in a fragment.

#### Designated activity

##### activity_web3inbox.xml
```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/root"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
</androidx.constraintlayout.widget.ConstraintLayout>
```

##### Activity
```kotlin
class Web3InboxXMLActivity : AppCompatActivity(R.layout.activity_web3inbox) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        findViewById<ConstraintLayout>(R.id.root).apply {
            addView(Web3Inbox.View(applicationContext))
        }
    }
}
```

#### Designated fragment

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
