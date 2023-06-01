# Mobile Linking

Communication between a mobile wallet and a mobile application is possible by design. Using the URI displayed by the QR-code it is possible to establish connection by sharing this URI via deep-link on Android.

:::info

Deeplinking flow works in the same way in all our products (Sign, Auth, Push, Chat)

:::

The common pattern of establishing a connection between a mobile wallet and a mobile application is the following:

1. Dapp shows user a connection button
2. User presses the button and Android system shows an app chooser
3. User is redirected to the wallet of choice
4. Wallet prompts user to approve or reject a session
5. User returns to Dapp manually
6. After returning to a Dapp a connection between Dapp and wallet is established

Similar pattern happens when Dapp wants to send a signing request to wallet:

1. User presses a button to send a signing request to wallet
2. User is redirected automatically to already connected wallet
3. Wallet prompts user to approve or reject request
4. User presses approve or reject request and is redirected automatically to the already connected Dapp


## Wallet Support

**Disclaimer:** The below solution is designed for the communication between native Android dapps and native Android wallets. In the case of mobile browser dapps and native Android wallets communication, we recommend moving wallets into the background after both approving and rejecting sessions or approving and rejecting requests to persist smooth deep-link UX.

In order to add support for mobile linking within your wallet and receive session proposals, register following deep link in your mobile wallet using intent filters in your Activity/Fragment or deepLink tag in your navigation graph.

Deep link example: `wc://{topic}@2`

To receive signing request in your Wallet, you'll need to initialize Kotlin SDK with the `Redirect` object where you pass a deep link that redirects to your wallet when it comes to receiving signing request from Dapp.

```kotlin
val redirect = "kotlin-wallet-wc://request" //should be unique for your wallet

val appMetaData = Core.Model.AppMetaData(
    name = "Wallet Name",
    description = "Wallet Description",
    url = "Wallet Url",
    icons = listOfIconUrlStrings,
    redirect = redirect
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = application, metaData = appMetaData)

val init = Wallet.Params.Init(coreClient = CoreClient)
Web3Wallet.initialize(init)
```

**Heads-up:** To make this flow working well, Wallet must register one of its Android components with the same deep link that it initialized with.

To check the flow implementation described above have a look on our sample wallet:
https://github.com/WalletConnect/WalletConnectKotlinV2/tree/master/samples/wallet

## Dapp Support

To send session proposals to mobile wallet user the pairing URI as deep link that triggers a wallet to open and consume pairing URI

```kotlin
requireActivity().startActivity(Intent(Intent.ACTION_VIEW, deeplinkPairingUri.toUri()))
```

In order to add support for mobile linking within your Dapp and receive signing request responses from wallet, you'll need to initialize Kotlin SDK with the `Redirect` object where you pass a deep link that redirects to your Dapp when it comes to receiving signing request responses from wallet.

```kotlin
val redirect = "kotlin-dapp-wc://request" //should be unique for your Dapp

val appMetaData = Core.Model.AppMetaData(
    name = "Wallet Name",
    description = "Wallet Description",
    url = "Wallet Url",
    icons = listOfIconUrlStrings,
    redirect = redirect
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = application, metaData = appMetaData)

val init = Sign.Params.Init(core = CoreClient)
SignClient.initialize(init)
```

**Heads-up:** To make this flow working well, Dapp must register one of its Android components with the same deep link that it initialized with.

To check the flow implementation described above have a look on our sample Dapp:
https://github.com/WalletConnect/WalletConnectKotlinV2/tree/master/samples/dapp

## References
* https://developer.android.com/guide/navigation/navigation-deep-link#implicit
* https://developer.android.com/training/app-links#deep-links
