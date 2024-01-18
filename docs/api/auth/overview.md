import Container from '../../components/Container'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import PlatformTabs from '../../components/PlatformTabs'
import PlatformTabItem from '../../components/PlatformTabItem'
import CloudBanner from '../../components/CloudBanner'

# Introduction

:::caution
Auth API is in the process of being greatly simplified, and will involve breaking changes. Please stand by.
:::

WalletConnect Auth is an authentication protocol that can be used to log-in blockchain wallets into apps. With a simple and lean interface, this API verifies wallet address ownership through a single signature request, realizing login in one action. It enables apps to set up a decentralized and passwordless onboarding flow.

## Key Features

A lightweight SDK that is quick to integrate: WalletConnect Auth is designed to initiate a single signature request. It is therefore 5x smaller than WalletConnect Sign.

Sign-in with Ethereum in just one action: Instead of having to first connect and then sign the request, WalletConnect Auth bundles the SIWE flow into one action.

Compatible with other WalletConnect APIs: WalletConnect Auth can be used in conjunction with any existing and future WalletConnect API to weave together your desired UX. In this case, all core components such as the network layer, the storage layer, and crypto utils will be shared to ensure maximum performance.

Domain binding to prevent phishing (coming in beta!): WalletConnect Auth seeks to be fully compliant with EIP-4361 and is implementing domain binding to provide greater security to users. When processing a login request, the wallet will alert the user if the domain of the website or app does not match the domain registered in the whitelist.

<CloudBanner/>

## Installation

<PlatformTabs
groupId="api-auth"
activeOptions={["web","ios","android","flutter","csharp"]}>

<PlatformTabItem value="web">
Install the WalletConnect client package.

```bash npm2yarn
npm install @walletconnect/auth-client
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
Kotlin implementation of WalletConnect v2 Auth protocol for Android applications. This SDK is developed in Kotlin and usable in both Java and Kotlin files.

Android Core ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/android-core)
Auth ![Maven Central](https://img.shields.io/maven-central/v/com.walletconnect/auth)

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

app/build.gradle

```gradle
implementation("com.walletconnect:android-core:release_version")
implementation("com.walletconnect:auth:release_version")
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

#### Install vis Nuget

Install the WalletConnect Auth client package via Nuget.

install via Nuget

```shell
dotnet add package WalletConnect.Auth
```

</PlatformTabItem>

</PlatformTabs>
