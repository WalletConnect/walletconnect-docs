# Web3Wallet Integration Checklist

As a part of the integration process, we perform internal testing of WalletConnect experience. 

Please fix the following issues for the WalletConnect v2 integration as soon as possible. 

More information about WalletConnect v2 experience can be found here → [https://docs.walletconnect.com/2.0/web3wallet/about](https://docs.walletconnect.com/2.0/web3wallet/about)

# WalletConnect v2 🪄

**Please use the latest Web3Wallet SDK version which can be found here ⬇️**

🌐 [Web](https://www.npmjs.com/package/@walletconnect/web3wallet?activeTab=versions)

🤖 [Android](https://github.com/WalletConnect/WalletConnectKotlinV2#sdk-chart) 

🍏 [iOS](https://github.com/WalletConnect/WalletConnectSwiftV2/releases)

**Sample wallets:**

🌐 [Web GitHub Repo](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-web3wallet)

🤖 [Android GitHub Repo](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/samples/wallet/src)

🍏 [iOS GitHub Repo](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example/WalletApp)

## 🔗 **Chain Switching**

- **Test Dapp:** [https://lab.web3modal.com/ManagedReact](https://lab.web3modal.com/ManagedReact)
- **JS docs:** [https://docs.walletconnect.com/2.0/web/web3wallet/wallet-usage#-namespaces-builder-util](https://docs.walletconnect.com/2.0/web/web3wallet/wallet-usage#-namespaces-builder-util)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#namespace-utils](https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#namespace-utils)

📱**Example app** → [Link](https://www.notion.so/Cape-Verde-April-23-135abe735e1243599eab02c0011d3a48)

<video controls width="448" height="336">
  <source src="/assets/chain-switching-android.mp4" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs →** [https://docs.walletconnect.com/2.0/ios/web3wallet/wallet-usage#-autonamespaces-builder-util](https://docs.walletconnect.com/2.0/ios/web3wallet/wallet-usage#-autonamespaces-builder-util)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/SessionProposal/SessionProposalInteractor.swift#L6)

<video controls width="448" height="336">
  <source src="/assets/chain-switching-ios.mov" type="video/mp4" />
</video>

## ✍🏻 **Auth API**

- **Docs:** [https://docs.walletconnect.com/2.0/api/auth](https://docs.walletconnect.com/2.0/api/auth)
- **Test Dapp:** [https://react-auth-dapp.vercel.app/](https://react-auth-dapp.vercel.app/)
- **JS docs:** [https://docs.walletconnect.com/2.0/web/web3wallet/upgrade-guide#2-authenticate-with-a-dapp](https://docs.walletconnect.com/2.0/web/web3wallet/upgrade-guide#2-authenticate-with-a-dapp)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#authorization-request-approval](https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#authorization-request-approval)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectKotlinV2/blob/develop/samples/wallet/src/main/kotlin/com/walletconnect/sample/wallet/ui/routes/dialog_routes/auth_request/AuthRequestViewModel.kt#LL20C1-L20C1)

<video controls width="448" height="336">
  <source src="/assets/auth-android.mov" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs →** [https://docs.walletconnect.com/2.0/ios/web3wallet/wallet-usage#authorization-request-approval](https://docs.walletconnect.com/2.0/ios/web3wallet/wallet-usage#authorization-request-approval) 

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/SessionProposal/SessionProposalInteractor.swift#L6)

<video controls width="448" height="336">
  <source src="/assets/auth-ios.mov" type="video/mp4" />
</video>

## 🔄 **Automatic Redirect**

- **Test Dapp:** [https://lab.web3modal.com/ManagedReact](https://lab.web3modal.com/ManagedReact)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/2.0/android/guides/mobile-linking](https://docs.walletconnect.com/2.0/android/guides/mobile-linking)

<video controls width="448" height="336">
  <source src="/assets/auto-redirect-android.mp4" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs** → [https://docs.walletconnect.com/2.0/ios/guides/mobile-linking](https://docs.walletconnect.com/2.0/ios/guides/mobile-linking)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/SessionProposal/SessionProposalInteractor.swift#L6)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/Main/MainPresenter.swift#L34)

<video controls width="448" height="336">
  <source src="/assets/auto-redirect-ios.mov" type="video/mp4" />
</video>

## 📢 **Sign Notifications**

- **Test Dapp:** [https://react-app.walletconnect.com/](https://react-app.walletconnect.com/)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#register-device-token](https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#register-device-token)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectKotlinV2/blob/develop/samples/wallet/src/main/kotlin/com/walletconnect/sample/wallet/WalletFirebaseMessagingService.kt#L21)

<video controls width="448" height="336">
  <source src="/assets/sign-notifications-android.mov" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs** → [https://docs.walletconnect.com/2.0/ios/push/wallet-usage/getting-started#register-for-push-notifications](https://docs.walletconnect.com/2.0/ios/push/wallet-usage/getting-started#register-for-push-notifications)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/Main/MainPresenter.swift#L34)

<video controls width="448" height="336">
  <source src="/assets/sign-notifications-ios.mov" type="video/mp4" />
</video>

## **Account switching:**

📕 JS docs: [https://docs.walletconnect.com/2.0/web/web3wallet/wallet-usage#updating-a-session](https://docs.walletconnect.com/2.0/web/web3wallet/wallet-usage#updating-a-session)

📕 Kotlin docs: [https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#session-update](https://docs.walletconnect.com/2.0/android/web3wallet/wallet-usage#session-update)

📕 Swift docs: [https://docs.walletconnect.com/2.0/ios/web3wallet/wallet-usage#update-session](https://docs.walletconnect.com/2.0/ios/web3wallet/wallet-usage#update-session)

<video controls width="448" height="336">
  <source src="/assets/account_switching.mov" type="video/mp4" />
</video>