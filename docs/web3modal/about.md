import Container from './../components/Container';

# About

Your on-ramp to web3 multichain. Web3Modal is a versatile library that makes it super easy to connect users with your Dapp and start interacting with the blockchain.
Built to be framework and chain agnostic, Web3Modal currently supports HTML and react on the UI side, as well as all evm compatible chains.

While we add support for other chains and frameworks a unique "standalone" mode is also available that unlocks you to use Web3Modal anywhere, with any framework or chain using our sign sdk.
For our supported flows, both react and HTML have great integration with [wagmi](https://wagmi.sh/).

Check out [web3modal.com](https://web3modal.com) for more information and previews.


## Getting Started
### CLI

Get started with [wagmi-cli](https://wagmi.sh/cli/create-wagmi).

```
npm init wagmi@web3modal
```

### Platforms
See our installation docs for each platform.

<Container
  items={[
    {
      name: "React",
      description: "Web3Modal offers out of the box support for React and integrates very well with wagmi.",
      url: `/2.0/web3modal/react/installation`
    },
    {
      name: "HTML",
      description: "Your vanilla JS solution. Use it on any front-end environment.",
      url: `/2.0/web3modal/html-js/installation`
    },
    {
      name: "Standalone",
      description: "If you don't use wagmi or already manage other connections for injected wallets yourself.",
      url: `/2.0/web3modal/standalone/installation`
    },
    {
      name: "Wallets",
      description: "How to list your wallet in the dashboard.",
      url: `/2.0/web3modal/for-wallets`
    }
  ]}
/>

## Github

The Web3Modal Github can be found at [https://github.com/WalletConnect/web3modal](https://github.com/WalletConnect/web3modal).

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
