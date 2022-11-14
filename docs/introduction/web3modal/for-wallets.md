# For Wallets

It is very easy to add support for your wallet within web3modal by following steps below.

## Mobile / Desktop Wallets

Depending on user device, web3modal will show sellection of native mobile or desktop browsers that can be deep / universally linked into. Users can also scan qr code no matter which device they are on.

In order for your wallet to show up in web3modal, you need to register it at our [Cloud Dashboard](https://cloud.walletconnect.com/). Make sure to specify correct data and pay extra attention to deeplink and universal link section.

When users click on your wallet within web3modal, they will be redirected to your deeplink / universal link with appended `wc` uri query. You are responsible for handling this redirect and processing such query.

Example deep link (prefared for desktop wallets)

```
mywallet://wc?uri=<URI_ENCODED_WC_PAIRING_URL>
```

Example universal link (prefared for mobile wallets)

```
https://mywallet.com/wc?uri=<URI_ENCODED_WC_PAIRING_URL>
```

## Browser extensions

Web3Modal supports all [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md) compliant browser extensions. We automatically show installed wallets on the home page of the modal. In order to customise your wallets display from default "Injected", please create an issue in [web3modal repository](https://github.com/WalletConnect/web3modal) and provide following information:

1. Extension name
2. Extension image / icon
3. Uniquely identifiable flag on `window.ethereum`
