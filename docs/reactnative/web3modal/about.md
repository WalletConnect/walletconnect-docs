import Container from '../../components/Container';


# Introduction

:::caution
**`@web3modal/react-native` is currently in Alpha and is not production-ready**.

It's public API and associated documentation may still see significant and breaking changes.
:::

`@web3modal/react-native` simplifies the modal integration process for dapp developers. It is designed to make complex tasks like connecting wallets, performing transactions and managing accounts easy. Please note that only V2 [WCURIs](../../specs/clients/core/pairing/pairing-uri) will work with this SDK, as V1 is being deprecated by June 28th, 2023.

If you need assistance at any point during development, please feel free to reach out to us via [Github Discussions](https://github.com/orgs/WalletConnect/discussions).

## Current features
- Connect with a wallet through deep linking
- Connect with a wallet using a QR Code
- Automatic session recovery/restore
- Use our provider to interact with chains
- Expo support

## Upcoming
- Account View with balance
- Chain selection
- Use own storage manager
- [explorerRecommendedWalletIds](https://docs.walletconnect.com/2.0/web3modal/options#explorerrecommendedwalletids-optional)
- [explorerExcludedWalletIds](https://docs.walletconnect.com/2.0/web3modal/options#explorerexcludedwalletids-optional)
- UI improvements
- Error handling improvements


## Sample App
To check more in details go and visit our Web3Modal implementation app [here](https://github.com/WalletConnect/react-native-examples/tree/main/dapps/v2Explorer).

<video controls width="448" height="448">
  <source src="/assets/web3modal_reactnative_preview.mp4" type="video/mp4" />
</video>
