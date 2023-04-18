import Container from './../components/Container';

# Introduction

Web3Modal is a versatile UI library built on top of [WalletConnect](https://walletconnect.com) and [wagmi](https://wagmi.sh). It is designed to make complex tasks like connecting wallets, performing transactions and managing accounts easy. Built on top of latest web standards, Web3Modal can be used in any front-end environment. Check out [web3modal.com](https://web3modal.com) for a live demo and in-depth feature list.

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
name: "Standalone Sign",
description: "Advanced Web3Modal usage without wagmi.",
url: `/2.0/web3modal/advanced/standalone/sign/installation`
},
{
name: "Standalone Auth",
description: "Advanced Web3Modal usage without wagmi.",
url: `/2.0/web3modal/advanced/standalone/auth/installation`
},
]}
/>

## Examples

<Container
items={[
{
name: "React & Wagmi",
description: "Example of Web3Modal in NextJS using @web3modal/react.",
url: `https://github.com/WalletConnect/web3modal-examples/tree/main/nextjs`
},
{
name: "Html & Wagmi",
description: "Example of Web3Modal in Vite using @web3modal/html.",
url: `https://github.com/WalletConnect/web3modal-examples/blob/main/html`
},
{
name: "React & Standalone Sign",
description: "Example of Web3Modal in NextJS using @web3modal/standalone and @walletconnect/sign-client.",
url: `https://github.com/WalletConnect/web3modal-examples/blob/main/nextjs-standalone`
},
{
name: "Html & Standalone Sign",
description: "Example of Web3Modal in Vite using @web3modal/standalone and @walletconnect/sign-client.",
url: `https://github.com/WalletConnect/web3modal-examples/blob/main/html-standalone`
},
{
name: "Html & Standalone Auth",
description: "Example of Web3Modal in Vite using @web3modal/standalone and @walletconnect/auth-client.",
url: `https://github.com/WalletConnect/web3modal-examples/tree/main/html-standalone-auth`
},
]}
/>

## Versioning

We are currently in the midst of a migration, and we anticipate that dapps will have completed the migration to Sign v2 by the end of June. To view the list of wallets that are compatible with Sign v2, please visit our [explorer page](https://explorer.walletconnect.com/?type=wallet&version=2).

If the wallet you intend to use still utilizes v1, we recommend including `version: 1` in your configuration to ensure that your users can continue to connect to their preferred wallet. It's crucial to stay up to date on any changes made to wallets, so we encourage you to check back regularly for any updates.

## Upcoming Web3Modal SDKs

We're continually working to improve and expand the Web3Modal ecosystem to support a wider range of platforms and technologies. We're excited to announce that we are currently developing Web3Modal SDKs for the following platforms:

- React Native
- Flutter
- Kotlin
- Swift

Please stay tuned for future updates and announcements regarding the release of these SDKs.

## Resources

- [Awesome WalletConnect](https://github.com/WalletConnect/awesome-walletconnect) - community-curated collection of WalletConnect-enabled wallets, libraries, and tools.
- [Web3Modal Laboratory](https://lab.web3modal.com) - A place to test your wallet integrations against various setups of Web3Modal.
- [Web3Modal GitHub](https://github.com/WalletConnect/web3modal) - Web3Modal GitHub repository.
- [Web3Modal Discord Forum](https://discord.com/channels/492410046307631105/1040016448157925467) - Get help from community and WalletConnect team members on Discord.
