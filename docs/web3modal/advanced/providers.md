import IframeComponent from '../../components/IframeComponent';

# Providers

Web3Modal providers concept only applies to [`@web3modal/react`](../react/installation.md) and [`@web3modal/html`](../html-js/installation.md) packages that use [wagmi](https://wagmi.sh). Providers add http (or websocket) rpc support to fetch data like ens and balance, as well as, perform contract and other requests.

## WalletConnect provider

By default Web3Modal exposes `w3mProvider` which uses WalletConnect's rpc proxy `https://rpc.walletconnect.com`. This rpc is free to use and will only rate limit specific users who abuse it. You can check chain id information at [Chainlist](https://chainlist.org). As of now this proxy supports following chains id's:

```
1, 3, 4, 5, 10, 42, 56, 69, 97, 100, 137, 280, 324, 420, 42161, 42220, 43114, 80001, 421611, 421613, 1313161554, 1313161555
```

## Wagmi Providers

You can change or add other wagmi provider easily when creating it's client. Please see [wagmi](https://wagmi.sh/react/providers/configuring-chains) or [@wagmi/core](https://wagmi.sh/core/providers/configuring-chains) documentation for more details. As an example:

```ts
const { provider } = configureChains(chains, [w3mProvider({}), infuraProvider({})])
```

<IframeComponent />
