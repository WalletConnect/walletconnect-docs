# Overview

The WalletConnect protocol is multi-chain by design. By using the [CAIP-25 standard](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md), WalletConnect aims to provide a standardized process for onboarding new chains into our ecosystem.

## Adding a Chain into the Explorer

If you don't see your chain listed in this [list](./chain-list.md), then you will need to create an issue in GitHub to to get the process started.
You can do so by clicking [here](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=). Once your chain is added to this list, wallets & dapps will be able to indicate support for your chain via WalletConnect's [Cloud](https://cloud.walletconnect.com).

## Web3Modal

### [Standalone](../../web3modal/standalone/about.md): Multi-Chain

Once your chain has been added to the Explorer, you'll then be able to use Web3Modal Standalone to provide an easy experience for your users to connect to their wallet.

:::note
Using the standlone version means you will need to be handling injected providers and creating your own wallet selection UI.
:::
