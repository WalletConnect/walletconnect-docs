# New Chain Onboarding

The WalletConnect protocol is multi-chain by design. By using the [CAIP-25 standard](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md), WalletConnect aims to provide a standardized process for onboarding new chains into our ecosystem.

Our Sign and Auth APIs are multi-chain out of the box, along with `@web3modal/standalone`. For those chains wishing to add chain support to `@web3modal/react` or `@web3modal/html`, please see the instructions below.

## Adding a Chain into the Explorer

If you don't see your chain listed in this list, then you will need to create an issue in GitHub to to get the process started.
You can do so by clicking [here](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=). Once your chain is added to this list, wallets will be able to register via [Cloud](https://cloud.walletconnect.com) so that users can select your wallet from the options.

## Web3Modal

There are two different package versions for Web3Modal. Standalone, and Non-Standalone (React, HTML). 

### [Standalone](../../web3modal/standalone/about.md): Multi-chain

Works with any chain and WalletConnect wallets. Doesn't have RPC or Account Modal. Is used just to connect to the dapp, usually alongside Sign SDK. Sign SDK takes over other tasks. You will need to create your own wallet selection UI. Does not natively support injected providers.

<!-- Is the following encouraged? Does this mean once they have the library and providers, they technically aren't using Standalone? -->

**Create a State Management Library**

In order to be able to have an Account Modal UI, you will need to provide a state management library like [wagmi](https://wagmi.sh/) or [solib](https://solib.dev/).

### Non-Standalone ([React](../../web3modal/react/installation.md), [HTML](../../web3modal/html-js/installation.md)): EVM Chains

Expands on the above, by introducing support for more wallet options i.e. extensions. as well as provides an Account Modal. These features are enabled via RPC and integration with wagmi, thus is only available on EVM chains for now.
