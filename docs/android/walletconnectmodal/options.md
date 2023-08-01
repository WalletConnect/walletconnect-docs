# Options

## Explorer recommended wallets

Allows to set default recommended wallets tah are fetched from [WalletConnect Explorer](https://walletconnect.com/explorer?type=wallet). You can define a list of wallets ids you'd like to prioritise (order is respected). You can get these ids from the explorer link mentioned before by clicking on a copy icon of desired wallet card.

```kotlin
val recommendedWalletsIds = listOf<String>(
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0"
)

val initParams = Modal.Params.Init(core = CoreClient, recommendedWalletsIds = recommendedWalletsIds)

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

## Explorer excluded wallets

Allows to exclude wallets that are fetched from [WalletConnect Explorer](https://walletconnect.com/explorer?type=wallet). You can define an array of wallet ids you'd like to exclude. You can get these ids from the explorer link mentioned before by clicking on a copy icon of desired wallet card.

```kotlin
val excludedWalletIds = listOf<String>(
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0"
)

val initParams = Modal.Params.Init(core = CoreClient, excludedWalletIds = excludedWalletIds)

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

## Show installed wallets

Allows you to show the `INSTALLED` label under the wallet icon in the list. To use this feature, you need to add selected wallets that you want to handle to `AndroidManifest.xml` as a query. Specs: [Android Specs]("https://developer.android.com/guide/topics/manifest/queries-element")

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <queries>
        <package android:name="..."/>
    </queries>
    
    <application>
        ...
    </application>
</manifest>
```

## WalletConnectModal Theme

Theme customizable parameters:
| Parameter name | Default value |
| -------------- | ------------- |
| accentColor    | ![#FF3496ff](https://placehold.co/15x15/1589F0/3496ff.png) `#3496FF` |
| onAccentColor  | ![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#FFFFFF` |

### Compose

```kotlin
WalletConnectModalTheme(
    accentColor = ...,
    onAccentColor = ...
) {
    ModalBottomSheetLayout(...) { ... }
}
```

### Android View

```xml
<style name="WalletConnectModalTheme">
    <item name="accentColor">...</item>
    <item name="onAccentColor">...</item>
</style>
```
