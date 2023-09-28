# Web3Wallet Integration Checklist

To ensure a smooth integration process, we perform internal testing of the WalletConnect experience. You can find more information about the WalletConnect v2 experience [here](../../../web3wallet/about).

Below, you'll find different tests that wallets want to perform to ensure a consistent experience across all platforms. For testing in-production dapps, we have included staging links [here](#production-dapps).

Please note that the links to SDK versions and sample wallets can be found in the respective sections below.

# WalletConnect v2 🪄

**Please use the latest Web3Wallet SDK version which can be found here ⬇️**

🌐 [Web](https://www.npmjs.com/package/@walletconnect/web3wallet?activeTab=versions)

🤖 [Android](https://github.com/WalletConnect/WalletConnectKotlinV2#sdk-chart)

🍏 [iOS](https://github.com/WalletConnect/WalletConnectSwiftV2/releases)

**Sample wallets:**

🌐 [Web GitHub Repo](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-web3wallet)

🤖 [Android GitHub Repo](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/sample/wallet)

🍏 [iOS GitHub Repo](https://github.com/WalletConnect/WalletConnectSwiftV2/tree/main/Example/WalletApp)

## 🔗 **Chain Switching**

Chain Switching enables users to experience a seamless chain agnostic UX. In WalletConnect's v2 functionality, the wallet can switch the active chain by triggering a `chainChanged` event.

- **Test Dapp:** [https://lab.web3modal.com](https://lab.web3modal.com)
- **JS docs:** [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=web#namespace-builder](../../../web3wallet/wallet-usage?platform=web#namespace-builder)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=android#namespace-builder](../../../web3wallet/wallet-usage?platform=android#namespace-builder)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/sample/wallet)

<video controls width="448" height="336">
  <source src="/assets/chain-switching-android.mp4" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs →** [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=ios#namespace-builder](../../../web3wallet/wallet-usage?platform=ios#namespace-builder)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/SessionProposal/SessionProposalInteractor.swift#L6)

<video controls width="448" height="336">
  <source src="/assets/chain-switching-ios.mov" type="video/mp4" />
</video>

## ✍🏻 **Auth API**

Auth API plays a critical role when dapps offer off-chain signatures. Wallets should authenticate dapps via this API, which can be tested [here](https://react-auth-dapp.vercel.app/).

- **Docs:** [https://docs.walletconnect.com/api/auth/overview](../../../api/auth/overview)
- **Test Dapp:** [https://react-auth-dapp.vercel.app/](https://react-auth-dapp.vercel.app/)
- **JS docs:** [https://docs.walletconnect.com/api/auth/overview?platform=web](../../../api/auth/overview?platform=web)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=android#auth-requests](../../../web3wallet/wallet-usage?platform=android#auth-requests)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/sample/wallet)

<video controls width="448" height="336">
  <source src="/assets/auth-android.mov" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs →** [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=ios#auth-requests](../../../web3wallet/wallet-usage?platform=ios#auth-requests)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/SessionProposal/SessionProposalInteractor.swift#L6)

<video controls width="448" height="336">
  <source src="/assets/auth-ios.mov" type="video/mp4" />
</video>

## 🔄 **Automatic Redirect**

Automatic Redirect assesses the user flow after the wallet signs and authorizes an account. The test involves verifying the wallet's ability to redirect to the dapp after a user signs or sends a transaction. Use this [Test Dapp](https://lab.web3modal.com) to evaluate.

- **Test Dapp:** [Web3Modal Laboratory](https://lab.web3modal.com)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/web3wallet/mobileLinking?platform=android](../../../web3wallet/mobileLinking?platform=android)

<video controls width="448" height="336">
  <source src="/assets/auto-redirect-android.mp4" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs** → [https://docs.walletconnect.com/web3wallet/mobileLinking?platform=ios](../../../web3wallet/mobileLinking?platform=ios)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/SessionProposal/SessionProposalInteractor.swift#L6)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/Main/MainPresenter.swift#L34)

<video controls width="448" height="336">
  <source src="/assets/auto-redirect-ios.mov" type="video/mp4" />
</video>

## 📢 **Sign Notifications**

Sign Notifications ensure users receive a push notification for any pending dapp request, even when their wallet isn't open. To test this functionality, follow this [link](https://react-app.walletconnect.com/).

- **Test Dapp:** [https://react-app.walletconnect.com/](https://react-app.walletconnect.com/)

### Android 🤖

📕 **Kotlin docs →** [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=android#extra-platform-specificn](../../../web3wallet/wallet-usage?platform=android#extra-platform-specific)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectKotlinV2/blob/develop/samples/wallet/src/main/kotlin/com/walletconnect/sample/wallet/WalletFirebaseMessagingService.kt#L21)

<video controls width="448" height="336">
  <source src="/assets/sign-notifications-android.mov" type="video/mp4" />
</video>

### iOS 🍏

📕 **Swift docs** → [https://docs.walletconnect.com/api/notify/usage?platform=ios](../../../api/notify/usage?platform=ios)

📱**Example app** → [Link](https://github.com/WalletConnect/WalletConnectSwiftV2/blob/cd55d281ae7cb3c5d14524d0147b9d557cdd1af5/Example/WalletApp/PresentationLayer/Wallet/Main/MainPresenter.swift#L34)

<video controls width="448" height="336">
  <source src="/assets/sign-notifications-ios.mov" type="video/mp4" />
</video>

## **Account Switching:**

Account Switching is about the user's ability to change accounts and sign a message from a different account than the one proposed initially in the session. The wallet can switch the active account by triggering a `accountsChanged` event.

📕 JS docs: [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=web#updating-a-session](../../../web3wallet/wallet-usage?platform=web#updating-a-session)

📕 Kotlin docs: [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=android#updating-a-session](../../../web3wallet/wallet-usage?platform=android#updating-a-session)

📕 Swift docs: [https://docs.walletconnect.com/web3wallet/wallet-usage?platform=ios#updating-a-session](../../../web3wallet/wallet-usage?platform=ios#updating-a-session)

<video controls width="448" height="336">
  <source src="/assets/account_switching.mov" type="video/mp4" />
</video>

## Production Dapps

These dapps have provided us staging links so that wallets can test functionality.

- [Aave](https://bafybeib3eavuc54ldbpziaql2koo4k7dc5l3gddn5y6zvi4rbrfnnm2sb4.ipfs.cf-ipfs.com/) | [GitHub PR](https://github.com/aave/interface/pull/1470)
- [PancakeSwap](https://web-git-pan-1047-walletconnect-v2.pancake.run/?_vercel_share=bYy2q8qBAQA6c2CQGIANbgXAcepL9ZT4&chain=eth) | [GitHub](https://github.com/pancakeswap/pancake-frontend/pull/5963)
- [Uniswap](https://interface-git-add-wc-v2-uniswap.vercel.app/#/swap)
- [Polygon Bridge](https://wallet.polygon.technology/)
- [Hop Exchange](https://goerli.hop.exchange/#/send?token=ETH)
- [Etherscan](https://arbiscan.io/address/0xe592427a0aece92de3edee1f18e0157c05861564#writeProxyContract)
- [RocketPool](https://stake.rocketpool.net/)
- [MakerDAO](https://governance-portal-v2-git-walletconnect-v2-dux-core-unit.vercel.app/)
- [Remix](https://deploy-preview-3752--remixproject.netlify.app/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js)
- [Quickswap](https://beta.quickswap.exchange/#/)
- [ParaSwap](https://thistle-hose.surge.sh/#/?network=ethereum)
