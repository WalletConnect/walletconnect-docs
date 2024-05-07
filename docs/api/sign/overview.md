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
activeOptions={["web","ios","android","flutter","csharp","unity"]}>

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

```ruby
pod 'WalletConnectSwiftV2'
```

4. Install pods with `pod install`

If you encounter any problems during package installation, you can specify the exact path to the repository

```ruby
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

<PlatformTabItem value="csharp">

#### Install via Packages

Install the WalletConnect Sign Client package via Nuget.

```shell
dotnet add package WalletConnect.Sign
```

</PlatformTabItem>

<PlatformTabItem value="unity">

WalletConnectUnity.Core is a Unity package that provides a client implementation of the WalletConnect v2 protocol. It is built on top of the [WalletConnectSharp.Sign](https://github.com/WalletConnect/WalletConnectSharp) library, which provides the core functionality for the WalletConnect protocol.

#### Prerequisites

- Unity 2021.3 or above
- IL2CPP code stripping level: Minimal (or lower)

#### Package Installation

<Tabs>

<TabItem value="openupm-cli" label="OpenUPM CLI">

To install packages via OpenUPM, you need to have [Node.js](https://nodejs.org/en/) and [openupm-cli](https://openupm.com/docs/getting-started.html#installing-openupm-cli) installed. Once you have them installed, you can run the following commands:

```bash
openupm add com.walletconnect.core
```

</TabItem>

<TabItem value="pm-openupm" label="Package Manager with OpenUPM">

1. Open `Advanced Project Settings` from the gear ⚙ menu located at the top right of the Package Manager’s toolbar
2. Add a new scoped registry with the following details:
   - Name: `OpenUPM`
   - URL: `https://package.openupm.com`
   - Scope(s): `com.walletconnect`
3. Press plus ➕ and then `Save` buttons
4. In the Package Manager windows open the add ➕ menu from the toolbar
5. Select `Add package by name...`
6. Enter the package name:
   - `com.walletconnect.core`
7. Press `Add` button

</TabItem>

<TabItem value="pm-git-utl" label="Package Manager with Git URL">

1. Open the add ➕ menu in the Package Manager’s toolbar
2. Select `Add package from git URL...`
3. Enter the package URL:

**WalletConnectUnity Core**

```
https://github.com/WalletConnect/WalletConnectUnity.git?path=Packages/com.walletconnect.core
```

4. Press `Add` button

It's possible to lock the version of the package by adding `#{version}` at the end of the git URL, where `#{version}` is the git tag of the version you want to use.
For example, to install version `1.0.1` of WalletConnectUnity Modal, use the following URL:

```
https://github.com/WalletConnect/WalletConnectUnity.git?path=Packages/com.walletconnect.core#core/1.0.1
```

</TabItem>
</Tabs>

#### WebGL

Due to WebGL's single-threaded nature, certain asynchronous operations like `Task.Run`, `Task.ContinueWith`, `Task.Delay`, and `ConfigureAwait(false)` are not natively supported.

To enable these operations in WebGL builds, an additional third-party package, [WebGLThreadingPatcher](https://github.com/VolodymyrBS/WebGLThreadingPatcher), is required. This package modifies the Unity WebGL build to delegate work to the `SynchronizationContext`, allowing these operations to be executed on the same thread without blocking the main application. Please note that all tasks are still executed on a single thread, and any blocking calls will freeze the entire application.

The [WebGLThreadingPatcher](https://github.com/VolodymyrBS/WebGLThreadingPatcher) package can be added via git URL:

```
https://github.com/VolodymyrBS/WebGLThreadingPatcher.git
```

</PlatformTabItem>

</PlatformTabs>
