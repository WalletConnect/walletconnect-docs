import IframeComponent from '../../components/IframeComponent';

# Installation

Swift implementation of Web3Inbox messaging SDK for native iOS applications.

## Getting started with wallet integration

### Set up a project

In order to connect to WalletConnect Cloud, you need to create a new project first:

1. Go to https://cloud.walletconnect.com/app
2. Tap New Project
3. Give it a name and tap Create button
4. Your new project should appear on the projects list
5. You should see a project ID string if you tap on your project

## Add SDK for your project

### SwiftPackageManager

You can add a WalletConnect SDK to your project with Swift Package Manager. In order to do that:

1. Open XCode
2. Go to File -> Add Packages
3. Paste the repo GitHub url: https://github.com/WalletConnect/WalletConnectSwiftV2
4. Tap Add Package
5. Select Web3Inbox check mark

### Cocoapods

1. Update Cocoapods spec repos. Type in terminal `pod repo update`
2. Initialize Podfile if needed with `pod init`
3. Add pod to your Podfile:
```Ruby
pod 'WalletConnectSwiftV2/Web3Inbox'
```
4. Install pods with `pod install`

If you encounter any problems during package installation, you can specify the exact path to the repository
```Ruby
pod 'WalletConnectSwiftV2/Web3Inbox', :git => 'https://github.com/WalletConnect/WalletConnectSwiftV2.git', :tag => '1.5.0'
```

<IframeComponent />
