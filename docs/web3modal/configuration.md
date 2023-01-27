# Configuration

Web3Modal is configurable via combination of options below and [wagmi.sh](https://wagmi.sh).

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

### defaultChain (optional)

Set default wagmi chain BEFORE user is connected. Defaults to `mainnet` if it was configured, or first chain in array of all wagmi chains. Use network actions from wagmi after user is connected.

```ts
defaultChain: polygon;
```

### explorerAllowList (optional)

Some wallet data in Web3Modal is fetched from our explorer api [explorer.walletconnect.com](https://explorer.walletconnect.com/?type=wallet). You can define an allow list only for the wallets that you want to be shown. Allow list is an array of wallet id's. You can get / copy these id's from the explorer link mentioned before. Defaults to `undefined`.

```ts
explorerAllowList: [
  // rainbow
  "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
  // trust
  "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
];
```

### explorerDenyList (optional)

Some wallet data in Web3Modal is fetched from our explorer api [explorer.walletconnect.com](https://explorer.walletconnect.com/?type=wallet). You can define a deny list for the wallets that you want to be excluded. Deny list is an array of wallet id's. You can get / copy these id's from the explorer link mentioned before. Defaults to `undefined`.

```ts
explorerDenyList: [
  // rainbow
  "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
  // trust
  "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
];
```

### enableNetworkView (optional)

If more than 1 chain was provided in modal or wagmi configuration users will be show network selection view before selecting a wallet, this option can enable or disable this behavior. Defaults to `false`

```ts
enableNetworkView: true;
```

### enableAccountView (optional)

Enable or disable modal's account view once user is connected. Defaults to `true`

```ts
enableAccountView: false;
```

### termsOfServiceUrl (optional)

String url to your terms of service page, if specified will append special "legal info" footer to the modal. Defaults to `undefined`

```ts
termsOfServiceUrl: "https://example.com/terms-and-conditions";
```

### privacyPolicyUrl (optional)

String url to your privacy policy page, if specified will append special "legal info" footer to the modal. Defaults to `undefined`

```ts
privacyPolicyUrl: "https://example.com/privacy-policy";
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

### themeZIndex (optional)

Changes Web3Modal's z-index. Defaults to `89`.

```ts
themeZIndex: 9999;
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

All standard wagmi configuration properties for chains, connectors and providers are also supported. We do however require `WalletConnectConnector` to always be present. Make sure to check out their [documentation](https://wagmi.sh/) for more info.
