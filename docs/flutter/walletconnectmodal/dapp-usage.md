## Setup

To get the modal to work properly you need to create two objects.

The first is the `WalletConnectModalTheme` which is used to style the modal.

```dart
// Example of WalletConnectModalTheme
return WalletConnectModalTheme(
  data: WalletConnectModalThemeData.darkMode,
  child: MaterialApp(
    title: 'Flutter Demo',
    theme: ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      useMaterial3: true,
    ),
    home: const MyHomePage(title: 'WalletConnectModal Sign Example'),
  ),
);
```

The second is the WalletConnectModalService which is your primary class for opening, closing, disconnecting, etc.

```dart
WalletConnectModalService service = WalletConnectModalService(
  projectId: projectId, 
  metadata: const PairingMetadata(
    name: 'Flutter WalletConnect',
    description: 'Flutter WalletConnectModal Sign Example',
    url: 'https://walletconnect.com/',
    icons: ['https://walletconnect.com/walletconnect-logo.png'],
    redirect: Redirect(
      native: 'flutterdapp://',
      universal: 'https://www.walletconnect.com',
    ),
  ),
);
await service.init();
```

The service must be initialized before it can be used.

Now that those two things are setup in your application, you can call `_service.open()` to open the modal.

To make things easy, you can use the WalletConnectModalConnect widget to open the modal.
This is a button that chanages its state based on the modal and connection.
This widget requires the WalletConnectModalService to be passed in.

```dart
WalletConnectModalConnect(
  walletConnectModalService: _service,
),
```

## iOS Setup

For each app you would like to be able to deep link to, you must add that app's link into the `ios/Runner/Info.plist` file like so:

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>metamask</string>
  <string>rainbow</string>
  <string>trust</string>
</array>
```

To handle deep linking to your app, you will also need to add the following to the plist file:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>flutterdapp</string> <!-- Change "flutterdapp" to be your deep link -->
        </array>
        <key>CFBundleURLName</key>
        <string>com.walletconnect.flutterdapp</string> <!-- Change this package name to be your package -->
    </dict>
</array>
```

## Android Setup

On android 11+ you must specify that use can use the internet, along with the different schemes you would like to be able to deep link to in the `android/app/src/main/AndroidManifest.xml` file like so:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Intent so you can deep link to wallets -->
    <queries>
        <intent>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="https" />
        </intent>
        <intent>
            <action android:name="android.intent.action.VIEW" />
            <data android:scheme="metamask" />
        </intent>
    </queries>
    <!-- Permission to access the internet -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <!-- Update your activity to handle the deep linking from other apps -->
    <activity
            ...>
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <!-- Accepts URIs that begin with "flutterdapp://”, change this to be your deep link -->
                <data android:scheme="flutterdapp" />
            </intent-filter>
        </activity>
    ...
</manifest>
```

For some reason, multiple wallets have the `metamask` intent, and will launch metamask as a result.  
This is a bug in the wallets, not this package.  

## Detailed Usage

You can launch the currently connected wallet by calling `service.launchCurrentWallet()`.