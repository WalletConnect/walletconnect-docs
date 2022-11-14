# WalletConnectRouter

### Overview

WalletConnectRouter framework can make working with WalletConnect on a mobile device even more convenient. 
For example you are interacting with a DApp from your mobile browser and redirect to your wallet through a deeplink to confirm the transaction. After confirmation, you need to return to the browser by yourself. WalletConnectRouter eliminates this unnecessary step.

By calling `goBack()` you can return to DApp automatically 

### Installation example

```swift
import WalletConnectRouter

Task { @MainActor in
  try await Sign.instance.approve(proposalId: <proposalId>, namespaces: <namespaces>)

  Router.goBack()
}
```
