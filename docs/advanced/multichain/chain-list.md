import List from '../../components/List.js'

# Chain List

**Registering a chain with the Explorer does not impact or improve the ability for wallets and dapps to support your chain.**

It is simply a way for users to discover wallets and dapps that support your chain by filtering results programmatically via the [Explorer API](../../cloud/explorer.md). It is still up to wallets and dapps to provide concrete support for your chain once it is listed as part of the Explorer.

If you want to add a particular chain, you can do so by creating a [GitHub issue](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=).

:::info Note
To register a chain, you must know both its native representation (the chainID used with that kind of blockchain) _and_ its Chain Agnostic Standards Alliance representation, which can be found reading the relevant CAIP-2 profiles on the [CASA Namespaces Project Docs](https://namespaces.chainagnostic.org/).
:::

<List />
