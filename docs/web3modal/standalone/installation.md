# Installation

:::info
Standalone package is for advanced users, you might be looking for [HTML](../html-js/installation.md) or [React](../react/installation.md) packages.
:::

Special and lightweight standalone mode that allows you to use Web3Modal anywhere, with any chain and any development tool. This comes in useful if you are not using wagmi or already manage other connections for say injected wallets yourself. You are responsible for managing [Sign SDK](../../api/sign.md) and obtaining a pairing uri that can be passed to Web3Modal's open method to display relevant wallets and qr code.

### Obtain Project ID

Unlike previously, `projectId` is required here as it is also used by Sign SDK. Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Add Packages

```bash npm2yarn
npm install @walletconnect/sign-client @web3modal/standalone
```

## Quick Start

### Import

```ts
import SignClient from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";
```

### Configure

See [configuration](../configuration.md) docs for full Web3Modal options list.

If you do not know your `standaloneChains` in advance, they can be passed later to `web3modal.openModal` method.

For more information on versioning, see the [docs](../about.md/#versioning).

```ts
const web3Modal = new Web3Modal({
  // 
  walletConnectVersion: 1, // or 2
  projectId: "<YOUR_PROJECT_ID>",
  standaloneChains: ["eip155:1"],
});
const signClient = await SignClient.init({ projectId: "<YOUR_PROJECT_ID>" });
```

## Create Pairing

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
```

### Open Modal

```ts
if (uri) {
  web3Modal.openModal({ uri, standaloneChains: ["eip155:1"] });
  await approval();
  web3Modal.closeModal();
}
```

### Add Connect Wallet Button using React

```ts
async function onOpenModal() {
  if (signClient) {
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
      await web3Modal.openModal({
        uri,
        standaloneChains: namespaces.eip155.chains,
      });
      await approval();
      web3Modal.closeModal();
    }
  }
}

return <button onClick={onOpenModal}>Connect Wallet</button>;
```

### Add Connect Wallet Button using HTML

```html
<button id="connect-button">Initializing...</button>
```

```js
const connectButton = document.getElementById("connect-button");

async function initialize() {
  try {
    connectButton.disabled = true;
    signClient = await SignClient.init({ projectId });
    connectButton.disabled = false;
    connectButton.innerText = "Connect Wallet";
  } catch (err) {
    console.error(err);
  }
}

initialize();

connectButton.addEventListener("click", async () => {
  try {
    if (signClient) {
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
        await web3Modal.openModal({ uri });
        await approval();
        web3Modal.closeModal();
      }
    }
  } catch (err) {
    console.error(err);
  }
});
```

## Examples

- React [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/nextjs-standalone)
- HTML [example](https://github.com/WalletConnect/web3modal/tree/V2/examples/html-standalone)
