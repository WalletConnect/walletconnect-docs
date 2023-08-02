# Options

## projectId (required)

Your project’s unique identifier that can be obtained at [cloud.walletconnect.com](https://cloud.walletconnect.com). Enables following functionalities within WalletConnectModal: wallet and chain logos, optional WalletConnect RPC, support for all v2 wallets from [WalletConnect Explorer](https://walletconnect.com/explorer?type=wallet&version=2). Defaults to `undefined`.

```ts
projectId: string
```

## providerMetadata (required)

Object that contains metadata of your app

```ts
providerMetadata: {
  name: string;
  description: string;
  url: string;
  icons: string[];
  redirect: {
    native: string;
    universal?: string;
  }
};
```

## sessionParams (optional)

Defaults to:
```ts
sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'personal_sign'
      ],
      chains: ['eip155:1'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
};
```

## relayUrl (optional)

Define a custom Relay Server URL. Defaults to `"wss://relay.walletconnect.com"`

## onCopyClipboard (optional)

This function is intended to be called when the user wants to copy something to the clipboard, and allows you to add the necessary actions to copy the value to the Clipboard.

Now used in:
* Copy button in QR Code view

```ts
onCopyClipboard: (value: string) => void;

//example
const onCopyClipboard = (value: string) => {
  Clipboard.setString(value);
};
```

## themeMode (optional)

Puts WalletConnectModal into dark or light mode. Defaults to user's system preference.

```ts
themeMode: 'dark' | 'light'
```

## explorerRecommendedWalletIds (optional)

Allows to override default recommended wallets that are fetched from [WalletConnect Explorer](https://walletconnect.com/explorer?type=wallet). You can define an array of wallet ids you'd like to prioritise (order is respected). You can get these ids from the explorer link mentioned before by clicking on a copy icon of desired wallet card. If you want to completely disable recommended wallets, you can set this option to `NONE`. Defaults to `undefined`.

```ts
explorerRecommendedWalletIds: string[] | 'NONE'

//example
explorerRecommendedWalletIds={[
  '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
  '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
]}
```

## explorerExcludedWalletIds (optional)

Allows to exclude wallets that are fetched from [WalletConnect Explorer](https://walletconnect.com/explorer?type=wallet). You can define an array of wallet ids you'd like to exclude. You can get these ids from the explorer link mentioned before by clicking on a copy icon of desired wallet card. If you want to exclude all wallets, you can set this option to `ALL`, however if `explorerRecommendedWalletIds` were defined, they will still be fetched. Defaults to `undefined`.

```ts
explorerExcludedWalletIds: string[] | 'ALL'

//example
explorerExcludedWalletIds={[
  '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
  '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
]}
```

## accentColor (optional)

Allows to override Modal's accent color. Defaults to `undefined`.

```ts
<WalletConnectModal
  ...
  accentColor="#9090FF"
/>
```