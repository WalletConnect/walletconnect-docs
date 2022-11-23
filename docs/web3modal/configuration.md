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

When `projectId` is not provided, you can define an array of custom mobile wallets. Note: you will also need to add appropriate wallet images in `walletImages`. Defaults to `undefined`

```ts
mobileWallets: [
  {
    id: string,
    name: string,
    links: {
      deeplink: string, // rainbow://
      universal: string, // https://rainbow.me
    },
  },
];
```

### desktopWallets

When `projectId` is not provided, you can define an array of custom desktop or web based wallets. Note: you will also need to add appropriate wallet images in `walletImages`. Defaults to `undefined`

### walletImages

### chainImages

### enableNetworkView

## Wagmi Options
