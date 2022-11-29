# About

Your on-ramp to web3 multichain. Web3Modal is a versatile library that makes it super easy to connect users with your Dapp and start interacting with the blockchain.
Built to be framework and chain agnostic, Web3Modal currently supports HTML and react on the UI side, as well as all evm compatible chains.

While we add support for other chains and frameworks a unique "standalone" mode is also available that unlocks you to use Web3Modal anywhere, with any framework or chain using our sign sdk.
For our supported flows, both react and HTML have great integration with [wagmi](https://wagmi.sh/).

Check out [web3modal.com](https://web3modal.com) for more information and previews.

## Github

The Web3Modal Github can be found at [https://github.com/WalletConnect/web3modal](https://github.com/WalletConnect/web3modal).

## Get Started

To get started, click [here](./react/installation.md) to learn how to implement Web3Modal to your project.

## Customization

Web3Modal automatically adapts to display desktop or mobile wallets depending on the user's device. Furthermore, we will only show wallets that support your configured chains.

You can further customize the modal by specifying it's theme and accent color (see options below). More customization options will be added soon.

### Options

| Property    | Values                                                                          |
| ----------- | ------------------------------------------------------------------------------- |
| theme       | "dark", "light"                                                                 |
| accentColor | "default", "blackWhite", "blue", "green", "magenta", "orange", "purple", "teal" |

### Preview

![web3modal customisation](/assets/modal_preview.png)
