import Container from './components/Container';
import Table from './components/Table';

# About

## What is WalletConnect?

WalletConnect is the decentralized Web3 messaging layer and a standard to connect blockchain wallets to dapps. Our mission continues to expand the interoperability of the Web3 space by providing the best tooling and infrastructure for Wallets to deliver an outstanding user experience. WalletConnect v2 is chain agnostic and built to work with any blockchain of your choice. To read more in detail about the WalletConnect protocol, check out our [Technical specifications](./specs/readme.md).

If you'd like to make a PR or create an issue for our docs, you can do so by going to the [WalletConnect Docs repo](https://github.com/WalletConnect/walletconnect-docs).

## Getting Started

WalletConnect consists of two SDKs: Web3Modal and Web3Wallet.

<Container
items={[
{
name: "Web3Modal",
description: "Web3Modal is a library that makes it easy to connect users to your dApp and interact with the blockchain.",
url: `/2.0/web3modal/about`
},
{
name: "Web3Wallet",
description: "Web3Wallet simplifies the process of integrating wallets into dApps by combining the Sign and Auth APIs into a single module.",
url: `/2.0/web3wallet/about`
},
]}
/>

## Compare the Differences

<Table 
headers={[ "SDKs", "Web3Modal", "Web3Wallet" ]}
data={[
{
feature: "Target Builders",
web3Modal: "dApps",
web3Wallet: "Wallets",
},
{
feature: "APIs",
web3Modal: "Sign v1.0, Sign v2.0",
web3Wallet: "Sign v2.0, Auth",
}
]}
/>

## Why use WalletConnect?

WalletConnect improves wallet-to-dApp interoperability in the web3 ecosystem. For dApps, WalletConnect can seamlessly integrate support for more than 150+ crypto wallets without much hassle. Wallets can easily integrate WalletConnect with our JavaScript, Swift or Kotlin SDK's.

## Join our community

Share your experience, contribute or ask questions with the WalletConnect community :

- [Discord](https://discord.walletconnect.org)
- [Twitter](https://twitter.com/walletconnect)
- [GitHub](https://github.com/walletconnect)
