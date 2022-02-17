# Mobile Linking

For a long time WalletConnect served only as secure remote communication between a mobile wallet and a desktop application.

However connecting a mobile wallet and a mobile application was always possible by design.

Using the URI commonly displayed in the QRCode it is possible to establish a connection by sharing this URI through a deep link or universal link on both Android and iOS.

Despite the multiple UX caveats that mobile linking encountered, we've been able to simplify this pattern with our own QR Code Modal package.

![mobile linking](/assets-1.0/mobile-linking-preview.png)

The pattern we chose to adhere for a consistent UX across platforms for connection establishment is the following:

1. Dapp prompts user to connect with:

   a\) single button for Android

   b\) wallet list for iOS

2. User presses button to connect and is redirected to wallet of choice
3. Wallet prompts user to approve or reject session
4. Wallet prompts user to return to Dapp manually
5. User presses back/return button to return to Dapp

Similar pattern happens when signing requests are required from the user:

1. Dapp redirects user automatically to previously chosen wallet
2. Wallet prompts user to approve or reject request
3. Wallet prompts user to return to Dapp manually
4. User presses back/return button to return to Dapp

In the next sections, we describe how both Wallets and Dapps can support the mobile linking pattern for their WalletConnect integrations.

## Wallet Support

In order to add support for mobile linking within your wallet, you will just need to register the following deep link or universal link subscriptions in your mobile app.

### For Android

Android has the easiest integration as its operating system is designed to handle multiple applications subscribing to the same deep linking schema. Hence you will only need to register to the `wc:` schema that is defined per the WalletConnect URI standard.

```bash
# Example
wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=91303dedf64285cbbaf9120f6e9d160a5c8aa3deb67017a3874cd272323f48ae
```

Additionally when there is a signing request triggered by the dapp it will hit the deep link with an incomplete URI, this should be ignored and not considered valid as it's only used for automatically redirecting the users to approve or reject a signing request.

```bash
# Example
wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1
```

### For iOS

iOS has some more caveats to the integration but we ensure to make it as straightforward as possible. Since its operating system is not designed to handle multiple applications subscribing to the same deep linking schema, we've designed the QRCode Modal to list supporting wallets on our [registry](https://walletconnect.com/registry) and target specific deep links or universal links for each wallet.

To add your own wallet to the registry, login to your [WalletConnect Cloud](https://walletconnect.com) account.

We recommend that universal links are used instead of deep links for iOS since they provide smoother UX with less prompts. When a dapp triggers a mobile connection on iOS, you should expect the following links

```bash
# For deep links
examplewallet://wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=91303dedf64285cbbaf9120f6e9d160a5c8aa3deb67017a3874cd272323f48ae

# For universal links
https://example.wallet/wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=91303dedf64285cbbaf9120f6e9d160a5c8aa3deb67017a3874cd272323f48ae
```

Additionally when there is a signing request triggered by the dapp it will hit the deep link with an incomplete URI, this should be ignored and not considered invalid as it's only used for automatically redirecting the users to approve or reject a signing request.

```bash
# For deep links
examplewallet://wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1

# For universal links
https://example.wallet/wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1
```

## Dapp Support

If you are building a Dapp you will be able to support this pattern by simply installing the provided qrcode-modal package we have distributed. This package is already provided through web3-provider package which is what we would recommend you use.

```bash npm2yarn
npm install --save @walletconnect/qrcode-modal
```

If you would like to build your own UI for mobile linking, you can use our registry API to get app entries and logos however we highly recommend that you use our provided qrcode-modal package to maintain a consistent UX across WalletConnect integrations however we modularized our packages to give the option on the ethos of decentralization.

