import Container from '../../../../components/Container';

# About

Standalone mode comes as a leaner version of Web3Modal that does not use [wagmi](https://wagmi.sh). It is intended for advanced use cases alongside our [Sign SDK](../../../../api/sign.md) and enables complex flows like using web3modal for non-evm chains, mixing multiple chains in one modal etc. Standalone modal comes pre-bundled in packages like [@walletconnect/ethereum-provider](https://www.npmjs.com/package/@walletconnect/ethereum-provider).

## Examples

<Container
items={[
{
name: "NextJS Standalone App",
description: "Example of Standalone Web3Modal in NextJS.",
url: `https://github.com/WalletConnect/web3modal/tree/V2/examples/nextjs-standalone`
},
{
name: "Vite Standalone App",
description: "Example of Standalone Web3Modal in Vite / Html.",
url: `https://github.com/WalletConnect/web3modal/tree/V2/examples/html-standalone`
},
]}
/>
