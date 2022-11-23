# Standalone Usage

Web3Modal can be put into special and lightweight standalone mode that allows you to use it anywhere, with any chain and any development tooling. This comes in usefull if you are not using wagmi and already manage other connections for say injected wallets. It also means that you are responsible for managing [sign sdk](../introduction/sign.md) and obtaining pairing uri that can then be passed to Web3Modal's open method, thus triggering it into this special mode.

## Obtain Project ID

Unlike previously, `projectId` is required here as it is also used by sign sdk. Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Add Packages

```bash npm2yarn
npm install @walletconnect/sign-client @web3modal/core @web3modal/ui
```

## Import

```ts
import SignClient from "@walletconnect/sign-client";
import { ConfigCtrl, ModalCtrl } from "@web3modal/core";
```

## Configure

If you don't know your `standaloneChains` in advance, they can be passed in later to `ModalCtrl.open` method.

```ts
const signClient = await SignClient.init({ projectId: "<YOUR_PROJECT_ID>" });

ConfigCtrl.setConfig({
  projectId: "<YOUR_PROJECT_ID>",
  enableStandaloneMode: true,
  standaloneChains: ["eip155:1"],
});

import("@web3modal/ui");
```

## Create pairing and open the modal

```ts
const { uri, approval } = await signClient.connect({
  requiredNamespaces: {
    eip155: {
      methods: ["eth_sign"],
      chains: ["eip155:1"],
      events: ["accountsChanged"],
    },
  },
});

if (uri) {
  ModalCtrl.open({ uri, standaloneChains: ["eip155:1"] });
  await approval();
  ModalCtrl.close();
}
```

## Add Modal Web Component in your app

:::caution

Only `<w3m-modal>` web component is supported in standalone mode, as you need to manage opening and closing the modal manually.

:::

```html
<body>
  <w3m-modal></w3m-modal>
</body>
```

## Examples

React [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/react-standalone)
