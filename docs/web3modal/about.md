import Container from './../components/Container';

# Introduction

Web3Modal is a versatile ui library built on top of [WalletConnect](https://walletconnect.com) and [wagmi](https://wagmi.sh). It is designed to make complex tasks like connecting wallets, performing transactions and managing accounts easy. Built on top of latest web standards, Web3Modal can be used in any front-end environment. Check out [web3modal.com](https://web3modal.com) for a live demo and in-depth feature list.

## Quick Start

<Container
items={[
{
name: "React",
description: "Use Web3Modal with react hooks and components.",
url: `/2.0/web3modal/react/installation`
},
{
name: "HTML",
description: "Use Web3Modal with any front-end environment.",
url: `/2.0/web3modal/html-js/installation`
},
{
name: "Standalone",
description: "Advanced Web3Modal usage without wagmi.",
url: `/2.0/web3modal/standalone/installation`
},
]}
/>

## Examples

<Container
items={[
{
name: "NextJS App",
description: "Example of Web3Modal in NextJS.",
url: `https://github.com/WalletConnect/web3modal/tree/V2/examples/nextjs`
},
{
name: "Create React App",
description: "Example of Web3Modal in Create React App.",
url: `https://github.com/WalletConnect/web3modal/tree/V2/examples/create-react-app`
},
{
name: "Vite App",
description: "Example of Web3Modal in Vite.",
url: `https://github.com/WalletConnect/web3modal/tree/V2/examples/html`
},
]}
/>

## Versioning

We are currently in the midst of a migration, and we anticipate that dapps will have completed the migration to Sign v2 by the end of June. To view the list of wallets that are compatible with Sign v2, please visit our [explorer page](https://explorer.walletconnect.com/?type=wallet&version=2).

If the wallet you intend to use still utilizes v1, we recommend including `version: 1` in your configuration to ensure that your users can continue to connect to their preferred wallet. It's crucial to stay up to date on any changes made to wallets, so we encourage you to check back regularly for any updates.

## Testing Wallet Support with Web3Modal (Temporary Workaround)

As we work on a staging flow for Web3Modal v2, you can use the following temporary workaround to test wallet support, such as Rainbow Wallet, without needing to have an updated version published.

To make Rainbow Wallet appear as a "recent" wallet, you can set a localStorage item with the required information. Use the following code snippet:

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

After setting the `localStorage` item, you can test the wallet integration on https://lab.web3modal.com/v2Standalone. This will make Rainbow Wallet appear as a recent wallet, allowing you to test its compatibility with Web3Modal v2.

Please note that this is a temporary solution, and we are actively working on implementing a proper staging flow for testing wallet support with Web3Modal v2. We will update the documentation once the staging flow is available.

## Resources

- [Awesome WalletConnect](https://github.com/WalletConnect/awesome-walletconnect) - community-curated collection of WalletConnect-enabled wallets, libraries, and tools.
- [Web3Modal Laboratory](https://lab.web3modal.com) - A place to test your wallet integrations against various setups of Web3Modal.
- [Web3Modal GitHub](https://github.com/WalletConnect/web3modal) - Web3Modal GitHub repository.
- [Web3Modal Discord Forum](https://discord.com/channels/492410046307631105/1040016448157925467) - Get help from community and WalletConnect team members on Discord.
