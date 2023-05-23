import IframeComponent from '../../components/IframeComponent';

# Options

## projectId (required)

Your project’s unique identifier that can be obtained at [cloud.walletconnect.com](https://cloud.walletconnect.com). Enables following functionalities within Web3Modal: wallet and chain logos, optional WalletConnect RPC, support for all v2 wallets from [Explorer](https://walletconnect.com/explorer?type=wallet&version=2). Defaults to `undefined`.

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
```

Example:
```ts
import Clipboard from '@react-native-clipboard/clipboard';

const onCopyClipboard = (value: string) => {
  Clipboard.setString(value);
};
```
<IframeComponent />
