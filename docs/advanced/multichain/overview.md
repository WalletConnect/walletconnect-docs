# Chain Onboarding

The WalletConnect protocol is multi-chain by design. By using the [CAIP-25 standard](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md), WalletConnect aims to provide a standardized process for onboarding new chains into our ecosystem. To get started, follow the following steps.

## Register Chain with the Explorer

If you don't see your chain listed in this [list](./chain-list.md), then you will need to create an issue in GitHub to to get the process started.
You can do so by clicking [here](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=). Once your chain is added to this list, wallets & dapps will be able to indicate support for your chain via WalletConnect's [Cloud](https://cloud.walletconnect.com).

## Add RPC Methods

Integrate RPC method support into the example wallets and dapp.

**Example Wallet**

- [Demo](https://react-web3wallet.vercel.app/)
- [GitHub](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-web3wallet)

**Example Dapp**

- [Demo](https://react-app.walletconnect.com/)
- [GitHub](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2)

## Promote

For a chain to benefit users, its prominent wallets and dApps must be registered in the Explorer. Encourage them to join the API, allowing users to view the wallets as options when connecting to a dApp.

## [Web3Modal Standalone](../../web3modal/advanced/standalone/sign/about.md)

After adding the chain to the Explorer, Web3Modal Standalone can be utilized to offer users a seamless experience when connecting to their wallet.
