# Configuration

## General Options

### projectId (optional)

Your project’s unique identifier that can be obtained at [cloud.walletconnect.com](https://cloud.walletconnect.com). Providing this enables the following functionalities within Web3Modal: wallet and chain logos, optional walletconnect rpc, support for all wallets from [explorer.walletconnect.com](https://explorer.walletconnect.com). Defaults to `undefined`.

```ts
projectId: string;
```

### mobileWallets (optional)

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

### desktopWallets (optional)

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

### walletImages (optional)

Array of wallet id's and their logo mappings. If `projectId` is provided, this will override default logos. Id's in this case can be: [explorer.walletconnect.com](https://explorer.walletconnect.com) id's, wallet id's you provided in `mobileWallets` or `desktopWallets` and [Wagmi](https://wagmi.sh) connector id's. Defaults to `undefined`.

```ts
walletImages: [
  {
    rainbow: "/images/rainbow.webp",
    metaMask: "/images/metamask.webp",
  },
];
```

### chainImages (optional)

Array of chain id's and their logo mappings. If `projectId` is provided, this will override default logos. You can find detailed chain data at [chainlist.org](https://chainlist.org) Defaults to `undefined`.

```ts
chainImages: [
  {
    1: "/images/ethereum.webp",
    137: "/images/polygon.webp",
  },
];
```

### tokenImages (optional)

Array of token symbols and their logo mappings. Defaults to `undefined`.

```ts
tokenImages: [
  {
    ETH: "/images/eth.webp",
    AVAX: "/images/avax.webp",
  },
];
```

### enableNetworkView (optional)

If more than 1 chain was provided in modal or wagmi configuration users will be show network selection view before selecting a wallet, this option can enable or disable this behavior. Defaults to `true`

```ts
enableNetworkView: true;
```

## Theming Options

### themeMode (optional)

Puts Web3Modal into dark or light mode. Defaults to user's system preference.

```ts
themeMode: "dark" | "light";
```

### themeColor (optional)

Changes Web3Modal's accent color. Defaults to WalletConnect brand color.

```ts
themeColor: "default" |
  "blackWhite" |
  "blue" |
  "green" |
  "magenta" |
  "orange" |
  "purple" |
  "teal";
```

### themeBackground (optional)

Changes Web3Modal's background to animated gradient or solid color. Defaults to `gradient` on desktop and `themeColor` on mobile.

```ts
themeBackground: "gradient" | "themeColor";
```

## Standalone Mode Options

### standaloneChains (optional)

When using Web3Modal in standalone mode (without wagmi) you can define array of custom chains via this option. Requires `enableStandaloneMode` to be set to `true`. Defaults to `undefined`.

```ts
standaloneChains: [
  "eip155:1",
  "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ",
  "cosmos:cosmoshub-4",
  "polkadot:91b171bb158e2d3848fa23a9f1c25182",
];
```

## Wagmi Options

If you are also using wagmi, all standard wagmi configuration properties for chains, connectors and providers are also supported. We do however require `WalletConnectConnector` to always be present. Make sure to check out their [documentation](https://wagmi.sh/) for more info.
