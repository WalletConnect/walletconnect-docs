import Container from './components/Container';

# About

## What is WalletConnect?
WalletConnect is the decentralized Web3 messaging layer and a standard to connect blockchain wallets to dapps. Our mission continues to expand the interoperability of the Web3 space by providing the best tooling and infrastructure for Wallets to deliver an outstanding user experience. WalletConnect v2 is chain agnostic and built to work with any blockchain of your choice. To read more in detail about the WalletConnect protocol, check out our [Technical specifications](./specs/readme.md).

If you'd like to make a PR or create an issue for our docs, you can do so by going to the [WalletConnect Docs repo](https://github.com/WalletConnect/walletconnect-docs).

## Getting Started

WalletConnect consists of three SDKs: Web3Modal, Web3Wallet, and Web3Inbox.


|                 | Web3Modal | Web3Wallet    | Web3Inbox         |
|-----------------|-----------|---------------|-------------------|
| Target Audience | dApps     | Wallets       | DApps and Wallets |
| APIs            | Sign v2   | Sign v2, Auth | Chat, Push        |

<Container
  items={[
    {
      name: "Web3Modal",
      description: "Web3Modal is a library that makes it easy to connect users to your DApp and interact with the blockchain.",
      url: `/2.0/web3modal/about`
    },
    {
      name: "Web3Wallet",
      description: "Web3Wallet simplifies the process of integrating wallets into DApps by combining the Sign and Auth APIs into a single module.",
      url: `/2.0/web3wallet/about`
    },
    {
      name: "Web3Inbox",
      description: "Web3Inbox is a DApp integrated with the Chat and Push APIs, allowing users to connect their wallets, receive and send chat messages, and receive push notifications",
      url: `/2.0/web3inbox/about`
    }
  ]}
/>
## Why use WalletConnect?

WalletConnect improves wallet-to-dapp interoperability in the web3 ecosystem. For dapps, WalletConnect can seamlessly integrate support for more than 150+ crypto wallets without much hassle. Wallets can easily integrate WalletConnect with our JavaScript, Swift or Kotlin SDK's.

## Join our community

Share your experience, contribute or ask questions with the WalletConnect community :

- [Discord](https://discord.walletconnect.org)
- [Twitter](https://twitter.com/walletconnect)
- [GitHub](https://github.com/walletconnect)
