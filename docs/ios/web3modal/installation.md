# Installation

:::caution
**The Web3Modal SDK is currently in Alpha and is not production-ready**.

It's public API and associated documentation may still see significant and breaking changes.
:::

Swift implementation of Web3Modal for iOS applications.

## Add SDK to your project

### SwiftPackageManager

You can add a WalletConnect SDK to your project with Swift Package Manager. In order to do that:

1. Open XCode
2. Go to File -> Add Packages
3. Paste the repo GitHub url: https://github.com/WalletConnect/WalletConnectSwiftV2
4. Tap Add Package
5. Choose the WalletConnectV2 products that you want installed in your app.

### Alternatively, add Web3Modal to a `Package.swift` manifest

To integrate via a `Package.swift` manifest instead of Xcode, you can add
Web3Modal to the dependencies array of your package:

```swift
dependencies: [
  .package(
    name: "WalletConnectV2",
    url: "https://github.com/WalletConnectV2/WalletConnectSwiftV2.git",
    .upToNextMajor(from: "1.6.4")
  ),

  // Any other dependencies you have...
],
```

Then, in any target that depends on a WalletConnectV2 product, add it to the `dependencies`
array of that target:

```swift
.target(
  name: "MyTargetName",
  dependencies: [
    // The product(s) you want (e.g. Web3Modal).
    .product(name: "Web3Modal", package: "WalletConnectV2"),
  ]
),
```