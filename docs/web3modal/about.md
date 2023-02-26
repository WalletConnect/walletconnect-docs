import Container from './../components/Container';

# About

Web3Modal is a versatile library that makes it super easy to connect users with your Dapp and start interacting with the blockchain.

## Features

### Simplified Connection

Web3Modal makes it easy to connect users to your decentralized application and start interacting with the blockchain, without requiring them to manually manage multiple wallets or key pairs.

### Framework and Chain Agnostic

Web3Modal is built to be framework and chain agnostic, which means it can be used with any frontend framework or library and any blockchain.

### Customizable

Web3Modal can be customized to fit your application's specific needs, giving you the ability to tailor the user experience to your users' preferences.

![web3modal-customisation](/assets/web3modal_preview.jpeg)

**Check out [web3modal.com](https://web3modal.com) for more information and previews.**

## Getting Started

### Beginner Users

Are you building your first dapp with React? This package provides an out-of-the-box solution, making it easy to get started.

<Container
items={[
{
name: "React",
description: "Web3Modal offers out of the box support for React and integrates very well with wagmi.",
url: `/2.0/web3modal/react/installation`
},
{
name: "HTML",
description: "Your vanilla JS solution. Use it on any front-end environment.",
url: `/2.0/web3modal/html-js/installation`
},
]}
/>

### Advanced Users

If you need a more customized solution, check out our other package below.

<Container
items={[
{
name: "Standalone",
description: "If you don't use wagmi or already manage other connections for injected wallets yourself.",
url: `/2.0/web3modal/standalone/installation`
}
]}
/>

## Versioning

We are currently in the midst of a migration, and we anticipate that dapps will have completed the migration to Sign v2 by the end of June. To view the list of wallets that are compatible with Sign v2, please visit our [explorer page](https://explorer.walletconnect.com/?type=wallet&version=2). 

If you are using the `React` or `HTML` package, the following information applies to you. If the wallet you intend to use still utilizes v1, we recommend including `version: 1` in your configuration to ensure that your users can continue to connect to their preferred wallet. It's crucial to stay up to date on any changes made to wallets, so we encourage you to check back regularly for any updates.

## Resources

Explore our community-curated collection of WalletConnect-enabled wallets, libraries, and tools at the Awesome WalletConnect repository: https://github.com/WalletConnect/awesome-walletconnect. 

<Container
items={[
{
name: "FAQ",
description: "Frequently asked questions.",
url: `/2.0/web3modal/faq`
}
]}
/>
