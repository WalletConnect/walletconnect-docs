# FAQ

## How do I add a native wallet to Web3Modal?

Web3Modal will present a selection of native or desktop browsers that can be deep-linked or universally linked, depending on the user's device. Users can also scan a QR code to access the link regardless of their device.

To ensure that your wallet appears in the Web3Modal, you must register it on our [Cloud Dashboard](https://cloud.walletconnect.com/). Be sure to provide accurate information and pay close attention to the deeplink and universal link sections.

When users click on your wallet within Web3Modal, they will be redirected to your deeplink / universal link with appended `wc` URI query. You are responsible for handling this redirect and processing such query.

Example deep link (preferred for desktop wallets), uri comes from our sign sdk and is encoded.

```
mywallet://wc?uri=<URI_ENCODED_WC_PAIRING_URL>
```

Example universal link (preferred for mobile wallets)

```
https://mywallet.com/wc?uri=<URI_ENCODED_WC_PAIRING_URL>
```

## How do I add an injected / extension wallet to Web3Modal?

Coming soon to [Cloud Dashboard](https://cloud.walletconnect.com/).

## What is the difference between standalone and other packages?

Standalone is a very lightweight package that does not include wagmi as a dependency, and therefore, it also does not handle injected/extension wallets, wagmi connectors, or Ethereum providers. It is a pure WalletConnect experience that can be used if you already manage everything mentioned above.

## How can I use the ethers.js provider?

Use wagmi's `useProvider` or `getProvider` actions to use the ethers.js provider.

## How can I use the web3js provider?

You will first need to obtain an ethers.js provider from wagmi and then convert it to a web3.js compatible one. You may find a package such as [ethers-to-web3](https://www.npmjs.com/package/ethers-to-web3) to be useful.

## Do you offer support for installing the script via a CDN?

No, not at the present time. However, while we are working on one, you can easily compile the library using tools such as [Vite](https://vitejs.dev/) or [Webpack](https://webpack.js.org/).

## Why can't I connect to a wallet when testing locally on mobile?

When testing locally on a mobile device, you will need to ensure that your app uses `https` instead of `http` protocol, otherwise majority of wallets will decline the connection. You could use a tool like [localtunnel](https://www.npmjs.com/package/localtunnel) for this.
