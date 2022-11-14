# For Wallets

It is very easy to add support for your wallet within Web3Modal by following steps below.

## Mobile / Desktop Wallets

Depending on user's device, Web3Modal will show a selection of native or desktop browsers that can be deep / universally linked into. Users can also scan qr code no matter which device they are on.

In order for your wallet to show up in Web3Modal, you need to register it at our [Cloud Dashboard](https://cloud.walletconnect.com/). Make sure to specify correct data and pay extra attention to deeplink and universal link section.

When users click on your wallet within Web3Modal, they will be redirected to your deeplink / universal link with appended `wc` URI query. You are responsible for handling this redirect and processing such query.

Example deep link (preferred for desktop wallets)

```
mywallet://wc?uri=<URI_ENCODED_WC_PAIRING_URL>
```

Example universal link (preferred for mobile wallets)

```
https://mywallet.com/wc?uri=<URI_ENCODED_WC_PAIRING_URL>
```

## Browser extensions

Web3Modal supports all [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md) compliant browser extensions. We automatically show installed wallets on the home page of the modal. In order to customise your wallets display from default "Injected", please create an issue in [web3modal repository](https://github.com/WalletConnect/web3modal) and provide following information:

1. Extension name
2. Extension image / icon
3. Uniquely identifiable flag on `window.ethereum`
