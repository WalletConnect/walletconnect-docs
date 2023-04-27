# Mobile Linking

When used on mobile, Web3Modal uses and takes care of native mobile linking to connect wallets and perform actions. This guide outlines best practices for setting up these links as a wallet and ensuring everything works as expected as a dapp. Wallets can create or update their project details at [cloud.walletconnect.com](https://cloud.walletconnect.com/).

## For iOS Wallets

Web3Modal will first attempt to use native deeplinks, which usually look like rainbow:// or metamask://. These are the most reliable way of linking a user to their mobile wallet from your dapp. The user will be shown a native prompt to confirm pairing or other actions before being directed to the wallet.

If a deeplink is not available, Web3Modal will use a backup of a [universal link](https://developer.apple.com/ios/universal-links). You should follow the official [Apple documentation](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?language=objc) in order to set everything up, but here are some additional suggestions from the WalletConnect team:

- Ensure your universal link doesn't use redirects.
- If you are using a subdomain, it needs to be explicitly set up in XCode.
- Host your universal link on a fast cdn like [Cloudflare](https://cloudflare.com).
- Use established linking solutions like [Firebase dynamic links](https://firebase.google.com/docs/dynamic-links).
- Don't change your universal link often, it appears iOS caches it for a while.

## For Android Wallets

Fortunately, compared to iOS, Android has much better support for mobile linking. Web3Modal will show a special view with a single button that redirects user to `wc://` link, this triggers native android view that will show all installed apps that can handle this link.

## For all wallets

No matter which of the above methods is used, Web3Modal will attach following data to mobile wallet link:

1. For pairings, `uri` pairing data will be added and encoded - `/wc?uri=wc...`
2. For requests, `requestId` and `sessionTopic` will be added - `/wc?requestId=...&sessionTopic=...`

## For Dapps

- Every task that relies on user to be redirected to a wallet needs to be triggered by explicit user action like clicking on a button or a link. If you perform a sign / rpc etc. request without prior user action, redirect to wallet will likely fail.
- Make sure you don't don't do any extra work besides your original action as there seems to be a limit of 300ms between user click and redirect to the wallet. If there is other network request in between, redirect will likely fail.
- Use libraries like [wagmi](https://wagmi.sh) or [viem](https://viem.sh) as they provide prepare/simulate tools that automatically handle many edge cases mentioned above.

## Universal and Deeplinking

### Universal  Links

Universal Links are URLs that are used to tie native mobile applications to a website. These links typically start with `https://`, and they host special configuration files that enable users to click on a link and open a native mobile application. For example, if a user clicks on a universal link that leads to a specific wallet, the wallet app will open automatically.

However, universal links can be unstable and unreliable, as they rely on several perfect conditions to be met. For example, if the network is stale, or there are programmatic redirects or some webviews don't implement them, then the link may not work as expected. In such cases, instead of directing the user to the native mobile application, users may end up on a fallback webpage.

We recommend using universal over deeplinks.

### Deeplinks

Deep links are a more "native" way of linking that uses a specific format like `myWallet://` or `wc://`. On Android, it is additionally possible to use `wc://` as Android will show all wallets that can handle such a link. These links are used to direct users to a specific location within a mobile application, rather than directing them to a website or a fallback page.
