import Container from '../../components/Container'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import PlatformTabs from '../../components/PlatformTabs'
import PlatformTabItem from '../../components/PlatformTabItem'
import CloudBanner from '../../components/CloudBanner'

# Introduction

WalletConnect Sign is a remote signer protocol to communicate securely between web3 wallets and dapps. The protocol establishes a remote pairing between two apps and/or devices using a Relay server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers. The pairing is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this pairing request.

<CloudBanner />

## Installation

<PlatformTabs
groupId="api-sign"
activeOptions={["web","ios","android","flutter"]}>

<PlatformTabItem value="web">

```bash npm2yarn
npm install @walletconnect/sign-client
```

:::info

For Node.js, the WalletConnect SignClient additionally requires `lokijs` to manage storage internally.

:::

```bash npm2yarn
npm install --save @walletconnect/sign-client lokijs@1.x
```

</PlatformTabItem>

<PlatformTabItem value="ios">
  <Tabs
queryString="ios-method"
	values={[
		{ label: 'SwiftPackageManager', value: 'spm', },
		{ label: 'Cocoapods', value: 'cocoa', },
	]}
>
<TabItem value="spm">

You can add a WalletConnect SDK to your project with Swift Package Manager. In order to do that:

1. Open XCode
2. Go to File -> Add Packages
3. Paste the repo GitHub URL: https://github.com/WalletConnect/WalletConnectSwiftV2
4. Tap Add Package
5. Select WalletConnect check mark

</TabItem>
<TabItem value="cocoa">

1. Update Cocoapods spec repos. Type in terminal `pod repo update`
2. Initialize Podfile if needed with `pod init`
3. Add pod to your Podfile:

```Ruby
pod 'WalletConnectSwiftV2'
```

4. Install pods with `pod install`

If you encounter any problems during package installation, you can specify the exact path to the repository

```Ruby
pod 'WalletConnectSwiftV2', :git => 'https://github.com/WalletConnect/WalletConnectSwiftV2.git', :tag => '1.0.5'
```

</TabItem>
</Tabs>
</PlatformTabItem>

<PlatformTabItem value="android">
Kotlin implementation of WalletConnect v2 Sign protocol for Android applications. This SDK is developed in Kotlin and usable in both Java and Kotlin files.

- Android Core ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)
- Sign ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/sign)

#### Requirements

- Android min SDK 23
- Java 11

#### Installation

root/build.gradle.kts:

```gradle
allprojects {
 repositories {
    mavenCentral()
    maven { url "https://jitpack.io" }
 }
}
```

app/build.gradle.kts

```gradle
implementation("com.walletconnect:android-core:release_version")
implementation("com.walletconnect:sign:release_version")
```

</PlatformTabItem>

<PlatformTabItem value="flutter">
Install the WalletConnect client package.

```dart
flutter pub add walletconnect_flutter_v2
```

#### Platform Specific Setup

Depending on your platform, you will have to add different permissions to get the package to work.

#### MacOS

Add the following to your `DebugProfile.entitlements` and `Release.entitlements` files so that it can connect to the WebSocket server.

```xml
<key>com.apple.security.network.client</key>
<true/>
```

</PlatformTabItem>

</PlatformTabs>
