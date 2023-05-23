import IframeComponent from '../../../../components/IframeComponent';

import Container from '../../../../components/Container';

# About

Standalone mode comes as a leaner version of Web3Modal that does not use [wagmi](https://wagmi.sh). It is intended for advanced use cases alongside our [Sign SDK](../../../../api/sign.md) and enables complex flows like using web3modal for non-evm chains, mixing multiple chains in one modal etc. Standalone modal comes pre-bundled in packages like [@walletconnect/ethereum-provider](https://www.npmjs.com/package/@walletconnect/ethereum-provider).

## Examples

<Container
items={[
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
]}
/>

<IframeComponent />
