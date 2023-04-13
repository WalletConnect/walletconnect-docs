# Mobile Linking

When used on mobile, Web3Modal uses and takes care of native mobile linking to connect wallets and perform actions. This guide outlines best practices for setting up these links as a wallet and ensuring everything works as expected as a dapp. Wallets can create or update their project details at [cloud.walletconnect.com](https://cloud.walletconnect.com/).

## For iOS wallets

Web3Modal will first attempt to use native deeplinks, which usually look like rainbow:// or metamask://. These are the most reliable way of linking a user to their mobile wallet from your dapp. The user will be shown a native prompt to confirm pairing or other actions before being directed to the wallet.

If deeplink is not available, Web3Modal will use backup of [universal link](https://developer.apple.com/ios/universal-links). You should follow official [apple documentation](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?language=objc) in order to set everything up, but here are some additional suggestions from WalletConnect team:

- Ensure your universal link doesn't use redirects.
- If you are using a subdomain, it needs to be explicitly set up in XCode.
- Host your universal link on a fast cdn like [Cloudflare](https://cloudflare.com).
- Use established linking solutions like [Firebase dynamic links](https://firebase.google.com/docs/dynamic-links).
- Don't change your universal link often, it appears iOS caches it for a while.

## For Android wallets

Fortunately, compared to iOS, Android has much better support for mobile linking. Web3Modal will show a special view with a single button that redirects user to `wc://` link, this triggers native android view that will show all installed apps that can handle this link.

## For Dapps

- Every task that relies on user to be redirected to a wallet needs to be triggered by explicit user action like clicking on a button or a link. If you perform a sign / rpc etc. request without prior user action, redirect to wallet will likely fail.
- Make sure you don't don't do any extra work besides your original action as there seems to be a limit of 300ms between user click and redirect to the wallet. If there is other network request in between, redirect will likely fail.
- Use libraries like [wagmi](https://wagmi.sh) or [viem](https://viem.sh) as they provide prepare/simulate tools that automatically handle many edge cases mentioned above.
