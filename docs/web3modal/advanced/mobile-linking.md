# Mobile Linking

When used on mobile, Web3Modal uses and takes care of native mobile linking to connect wallets and perform actions. This guide outlines best practices for setting up these links as a wallet and ensuring eberything works as expected as a dapp. Wallets can create or update their project details at [cloud.walletconnect.com](https://cloud.walletconnect.com/).

## For iOS wallets

Web3Modal favours [universal links](https://developer.apple.com/ios/universal-links), but will fall back to deeplinks when prior are not available. You should follow official [apple documentation](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?language=objc) in order to set everything up, but here are some additional suggestions from WalletConnect team:

- Ensure your universal link doesn't use redirects.
- If you are using a subdomain, it needs to be explicitly set up in XCode.
- Host your universal link on a fast cdn like [Cloudflare](https://cloudflare.com).
- Use established linking sollutions like [Firebase dynamic links](https://firebase.google.com/docs/dynamic-links).

## For Android wallets

Fortunately, compared to iOS, Android has much better support for mobile linking. Web3Modal will show a special view with a single button that redirects user to `wc://` link, this triggers native android view that will show all instaleld apps that can handle this link.

## For dapps

- Every action that needs user to be redirected to a wallet needs to be triggered by explicit user action like clicking on a button or a link. If you perform a sign / rpc etc. request without prior user action, redirect to wallet will likely fail.
- Make sure you don't don't do any extra work besides your original action as there seems to be a limit of 300ms between user click and redirect to the wallet. If there is other network request in between, redirect will likely fail.
- Use libraries like [wagmi](https://wagmi.sh) or [viem](https://viem.sh) as they provide prepare/simulate tools that automatically handle many edge cases mentioned above.
