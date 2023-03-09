# Wallets

Web3Modal will display wallets from [WalletConnect's explorer](https://explorer.walletconnect.com), as well as any manually added wallets. If [wagmi](https://wagmi.sh) is used, it will also display connector wallets like [InjectedConnector](https://wagmi.sh/react/connectors/injected) and any other user defined connectors. Depending on the user's platform (desktop or mobile) different wallet lists will be displayed.

## Explorer wallets

Wallets are fetched from [WalletConnect explorer](https://explorer.walletconnect.com) based on configured chains and WalletConnect version. You can manage which wallets are displayed by using [explorerAllowList](../options.md#explorerallowlist-optional) or [explorerDenyList](../options.md#explorerdenylist-optional) options. To completely disable explorer wallets use [enableExplorer](../options.md#enableexplorer-optional) option. You can submit your own wallet to explorer at [cloud.walletconnect.com](https://cloud.walletconnect.com).

## Wagmi connectors

By default Web3Modal exposes `w3mConnectors` utility that returns pre-configured wagmi connectors for [WalletConnectConnector](https://wagmi.sh/react/connectors/walletConnect) and [InjectedConnector](https://wagmi.sh/react/connectors/injected). You can easily override these (however `WalletConnectConnector` is required) or extend connectors. Please see [wagmi](https://wagmi.sh/react/connectors/injected) or [@wagmi/core](https://wagmi.sh/core/connectors/injected) documentation for more details. As an example:

```ts
const wagmiClient = createClient({
  // ...
  connectors: [...w3mConnectors({}), new CoinbaseWalletConnector({}), new SafeConnector({})]
})
```

## Manual wallets

You can add additional native mobile wallets via [mobileWallets](../options.md#mobilewallets-optional) or desktop ones via [desktopWallets](../options.md#desktopwallets-optional).

## Change or add wallet images

You can change existing wallet images or add new ones for manual wallets by using [walletImages](../options.md#walletimages-optional) option.
