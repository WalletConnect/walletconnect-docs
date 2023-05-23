import IframeComponent from '../../../../components/IframeComponent';

import Container from '../../../../components/Container';

# About

Standalone mode comes as a leaner version of Web3Modal that does not use [wagmi](https://wagmi.sh). It is intended for advanced use cases alongside our [Auth SDK](../../../../api/auth.md) and enables complex flows like using web3modal for non-evm chains, mixing multiple chains in one modal etc. Standalone modal comes pre-bundled in packages like [@walletconnect/ethereum-provider](https://www.npmjs.com/package/@walletconnect/ethereum-provider).

## Examples

<Container
items={[
{
name: "Html & Standalone Auth",
description: "Example of Web3Modal in Vite using @web3modal/standalone and @walletconnect/auth-client.",
url: `https://github.com/WalletConnect/web3modal-examples/tree/main/html-standalone-auth`
}
]}
/>

<IframeComponent />
