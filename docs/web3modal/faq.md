import IframeComponent from '../components/IframeComponent';

# FAQ

## How can I add a native or extension wallet to Web3Modal?

Web3Modal fetches wallet information from our [Explorer](https://walletconnect.com/explorer). In order to add your wallet to it, please submit your project at [cloud.walletconnect.com](https://cloud.walletconnect.com).

## What is the difference between standalone and other packages?

Standalone works with any chain using our [Sign SDK](../web/sign/dapp-usage.md). It is meant for more advanced users and does not come with features like extension wallets, account view etc.

## How can I use the ethers provider with wagmi?

For wagmi, use [`useProvider`](https://wagmi.sh/react/hooks/useProvider) and [`useSigner`](https://wagmi.sh/react/hooks/useSigner) hooks. Alternatively, for @wagmi/core, use [`getProvider`](https://wagmi.sh/core/actions/getProvider) and [`getSigner`](https://wagmi.sh/core/actions/fetchSigner) actions.

## How can I use the web3js provider?

You will first need to obtain an ethers.js provider from wagmi and then convert it to a web3.js compatible one. You may find a package such as [ethers-to-web3](https://www.npmjs.com/package/ethers-to-web3) to be useful.

## Do you offer support for installing the script via a CDN?

No, not at the present time. However, while we are working on one, you can easily compile the library using tools such as [Vite](https://vitejs.dev/) or [Webpack](https://webpack.js.org/) and expose everything you need on `window` object.

## Why can't I connect to a wallet when testing locally on mobile?

When testing locally on a mobile device, you will need to ensure that your app uses `https` instead of `http` protocol, otherwise majority of wallets will decline the connection. You could use a tool like [localtunnel](https://www.npmjs.com/package/localtunnel) for this.

## How to Test Mobile Wallet Compatibility 

1. Visit https://lab.web3modal.com/v2Standalone.
2. Open your browser's developer tools and navigate to the Console tab.
3. Paste the following code snippet into the console and press Enter:

```javascript
localStorage.setItem(
  'W3M_RECENT_WALLET',
  JSON.stringify({
    2: {
      image: "",
      name: "",
      links: {
        native: "rainbow://",
        universal: "https://..."
      }
    }
  })
);
```

Replace the `https://...` placeholder in the universal link with the appropriate URL.

This will make your mobile wallet, such as Rainbow Wallet, appear as a recent wallet in Web3Modal, allowing you to test its compatibility.

<IframeComponent />
