# Chain Onboarding

The WalletConnect protocol is multi-chain by design. By using the [CAIP-25 standard](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md), WalletConnect aims to provide a standardized process for onboarding new chains into our ecosystem. To get started, follow the following steps.

## Register Chain with the Explorer

:::info
**Registering a chain with the Explorer does not impact or improve the ability for wallets and dapps to support your chain.** It is simply a way for users to discover wallets and dapps that support your chain by:

- Browsing the [Chains List](./chain-list.mdx)
- Filtering results programmatically via the [Explorer API](../../cloud/explorer.md)

**It is still up to wallets and dapps to provide concrete support for your chain once it is listed as part of the Explorer.**
:::

If you don't see your chain listed in this [list](./chain-list.mdx), then you will need to create an issue in GitHub to to get the process started.
You can do so by clicking [here](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=). Once your chain is added to this list, wallets & dapps will be able to indicate support for your chain via WalletConnect's [Cloud](https://cloud.walletconnect.com).

## CASA

To register a chain, you must know both its native representation (the chainID used with that kind of blockchain) _and_ its Chain Agnostic Standards Alliance representation, which can be found reading the relevant CAIP-2 profiles on the [CASA Namespaces Project Docs](https://namespaces.chainagnostic.org/). If no such profile yet exists, you can collaborate with an expert in the respective chain's tooling and submit a [namespaces PR](https://github.com/ChainAgnostic/namespaces/?tab=readme-ov-file#namespaces) to add one.

## Add RPC Methods

Integrate RPC method support into the example wallets and dapp.

**Example Wallet**

- [Demo](https://react-web3wallet.vercel.app/)
- [GitHub](https://github.com/WalletConnect/web-examples/tree/main/advanced/wallets/react-web3wallet)

**Example Dapp**

- [Demo](https://react-app.walletconnect.com/)
- [GitHub](https://github.com/WalletConnect/web-examples/tree/main/advanced/dapps/react-dapp-v2)

## Promote

For a chain to benefit users, its prominent wallets and dApps must be registered in the Explorer. Encourage them to join the API, allowing users to view the wallets as options when connecting to a dApp.

## Wagmi & Viem

If the chain you are registering is EVM compliant, we highly recommend you to integrate it with [Viem](https://viem.sh/docs/clients/chains.html), an ethereum library used by Wagmi and Web3Modal. To accomplish this you will need to open a GitHub Pull Request in the Viem repository.

- [Viem GitHub Repository](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions)
