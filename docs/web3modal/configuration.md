# Configuration

## Modal Options

### projectId (optional)

Your project’s unique identifier that can be obtained at [cloud.walletconnect.com](https://cloud.walletconnect.com). Providing this enables following functionality within Web3Modal: wallet and chain logos, optional walletconnect rpc, support for all wallets from [explorer.walletconnect.com](https://explorer.walletconnect.com). Defaults to `undefined`.

```ts
projectId: string;
```

### theme (optional)

Puts Web3Modal into dark or light mode. Defaults to user's system preference.

```ts
theme: "dark" | "light";
```

### accentColor (optional)

Changes Web3Modal's accent color. Defaults to WalletConnect brand color.

```ts
accentColor: "default" |
  "blackWhite" |
  "blue" |
  "green" |
  "magenta" |
  "orange" |
  "purple" |
  "teal";
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
walletImages: [
  {
    1: "/images/ethereum.webp",
    137: "/images/polygon.webp",
  },
];
```

### enableNetworkView (optional)

If more than 1 chain was provided in modal or wagmi configuration users will be show network selection view before selecting a wallet, this option can enable or disable this behavior. Defaults to `true`

```ts
enableNetworkView: true;
```

## Standalone Modal Options

### enableStandaloneMode (optional)

Flag that is required to set modal into standalone mode. Defaults to `false`

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

In addition to modal configuration options above, all standard wagmi configuration properties for chains, connectors and providers are also supported. We do however require `WalletConnectConnector` to always be present. Make sure to check out their [documentation](https://wagmi.sh/) for more info.
