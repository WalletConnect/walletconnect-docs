# Installation

Special and lightweight standalone mode that allows you to use Web3Modal anywhere, with any chain and any development tool. This comes in useful if you are not using wagmi or already manage other connections for say injected wallets yourself. You are responsible for managing [Sign SDK](../../introduction/sign.md) and obtaining a pairing uri that can be passed to Web3Modal's open method to display relevant wallets and qr code.

## Obtain Project ID

Unlike previously, `projectId` is required here as it is also used by Sign SDK. Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Add Packages

```bash npm2yarn
npm install @walletconnect/sign-client @web3modal/standalone
```

## Import

```ts
import SignClient from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";
```

## Configure

If you do not know your `standaloneChains` in advance, they can be passed later to `web3modal.openModal` method.

```ts
const web3Modal = new Web3Modal({
  projectId: "<YOUR_PROJECT_ID>",
  standaloneChains: ["eip155:1"],
});
const signClient = await SignClient.init({ projectId: "<YOUR_PROJECT_ID>" });
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
  web3Modal.openModal({ uri, standaloneChains: ["eip155:1"] });
  await approval();
  web3Modal.closeModal();
}
```

## Examples

React [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/react-standalone)
