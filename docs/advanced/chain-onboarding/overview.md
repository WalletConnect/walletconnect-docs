import List from '../../components/List.js'

# New Chain Onboarding

The WalletConnect protocol is multi-chain by design. By using the [CAIP-25 standard](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md), WalletConnect aims to provide a standardized process for onboarding new chains into our ecosystem.

## Adding a Chain into the Explorer

<List />

If you don't see your chain listed in this list, then you will need to create an issue in GitHub to to get the process started.
You can do so by clicking [here](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=). Once your chain is added to this list, wallets & dapps will be able to indicate support for your chain via WalletConnect's [Cloud](https://cloud.walletconnect.com).

## Web3Modal

### [Standalone](../../web3modal/standalone/about.md): Multi-chain

Works with any chain and WalletConnect wallets. Doesn't have RPC or Account Modal. Is used just to connect to the dapp, usually alongside Sign SDK. Sign SDK takes over other tasks. You will need to create your own wallet selection UI. Does not natively support injected providers.

