# Options

## projectId (required)

Your project’s unique identifier that can be obtained at [cloud.walletconnect.com](https://cloud.walletconnect.com). Enables following functionalities within Web3Modal: wallet and chain logos, optional walletconnect rpc, support for all wallets from [explorer.walletconnect.com](https://explorer.walletconnect.com) and WalletConnect v2 support. Defaults to `undefined`.

```ts
projectId: string
```

## mobileWallets (optional)

When `projectId` is not provided, you can define an array of custom mobile wallets. Note: you will also need to add appropriate wallet images in `walletImages`. Native link represents deeplinking url like `rainbow://` and Universal link represent webpage link that can redirect to the app or fallback page. Defaults to `undefined`.

```ts
mobileWallets: [
  {
    id: string,
    name: string,
    links: {
      native: string
      universal: string,
    },
  },
];
```

## desktopWallets (optional)

When `projectId` is not provided, you can define an array of custom desktop or web based wallets. Note: you will also need to add appropriate wallet images in `walletImages`. Native link represents deeplinking url like `ledgerlive://` and Universal link represents webpage link that can redirect to the app or fallback page. Defaults to `undefined`.

```ts
desktopWallets: [
  {
    id: string,
    name: string,
    links: {
      native: string
      universal: string,
    },
  },
];
```

## walletImages (optional)

Array of wallet id's and their logo mappings. If `projectId` is provided, this will override default logos. Id's in this case can be: [explorer.walletconnect.com](https://explorer.walletconnect.com) id's, wallet id's you provided in `mobileWallets` or `desktopWallets` and [Wagmi](https://wagmi.sh) connector id's. Defaults to `undefined`.

```ts
walletImages: {
  rainbow: "/images/rainbow.webp",
  metaMask: "/images/metamask.webp",
};
```

## chainImages (optional)

Array of chain id's and their logo mappings. If `projectId` is provided, this will override default logos. You can find detailed chain data at [chainlist.org](https://chainlist.org) Defaults to `undefined`.

```ts
chainImages: {
  1: "/images/ethereum.webp",
  137: "/images/polygon.webp",
};
```

## tokenImages (optional)

Array of token symbols and their logo mappings. Defaults to `undefined`.

```ts
tokenImages: {
  ETH: "/images/eth.webp",
  AVAX: "/images/avax.webp",
};
```

## defaultChain (optional)

Before the user establishes a connection, the default wagmi chain can be set. This defaults to the `mainnet` if configured, or the first chain in the array of all available wagmi chains. Once the user is connected, utilize the network actions provided by wagmi.

```ts
defaultChain: polygon
```

## explorerAllowList (optional)

Some wallet data in Web3Modal is fetched from our explorer api [explorer.walletconnect.com](https://explorer.walletconnect.com/?type=wallet). You can define an allow list only for the wallets that you want to be shown. Allow list is an array of wallet id's. You can get / copy these id's from the explorer link mentioned before. Defaults to `undefined`.

```ts
explorerAllowList: [
  // rainbow
  '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
  // trust
  '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
]
```

## explorerDenyList (optional)

Some wallet data in Web3Modal is fetched from our explorer api [explorer.walletconnect.com](https://explorer.walletconnect.com/?type=wallet). You can define a deny list for the wallets that you want to be excluded. Deny list is an array of wallet id's. You can get / copy these id's from the explorer link mentioned before. Defaults to undefined.

```ts
explorerDenyList: [
  // rainbow
  '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
  // trust
  '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
]
```

## termsOfServiceUrl (optional)

String url to your terms of service page, if specified will append special "legal info" footer to the modal. Defaults to `undefined`

```ts
termsOfServiceUrl: 'https://example.com/terms-and-conditions'
```

## privacyPolicyUrl (optional)

String url to your privacy policy page, if specified will append special "legal info" footer to the modal. Defaults to `undefined`

```ts
privacyPolicyUrl: 'https://example.com/privacy-policy'
```

## enableNetworkView (optional)

If more than 1 chain was provided in modal or wagmi configuration users will be show network selection view before selecting a wallet, this option can enable or disable this behavior. Defaults to `false`

```ts
enableNetworkView: true
```

## enableAccountView (optional)

Option to enable or disable the modal's account view. The default setting is set to `true`.

```ts
enableAccountView: false
```

## enableExplorer (optional)

Option to enable or disable wallet fetching from [explorer.walletconnect.com](https://explorer.walletconnect.com/?type=wallet). Defaults to `true`.

```ts
enableExplorer: false
```

## themeMode (optional)

Puts Web3Modal into dark or light mode. Defaults to user's system preference.

```ts
themeMode: 'dark' | 'light'
```

## themeVariables (optional)

Allows to override Web3Modal's css styles. See [theming](./theming) for all available options.

```ts
themeVariables: {
  "--w3m-font-family": "Roboto, sans-serif",
  "--w3m-accent-color": "#F5841F",
  // ...
};
```

## standaloneChains (optional)

When using Web3Modal in standalone mode (without wagmi) you can define array of custom chains via this option. Defaults to `undefined`.

```ts
standaloneChains: [
  'eip155:1',
  'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
  'cosmos:cosmoshub-4',
  'polkadot:91b171bb158e2d3848fa23a9f1c25182'
]
```
