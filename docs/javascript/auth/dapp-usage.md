---
description: Quick Start For Dapps using Auth Client
---

# Dapp Usage

:::info
For an example implementation, please refer to our [`react-dapp-auth` example](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-auth).
:::

## Install Packages

Install the WalletConnect Web3Modal package.

```bash npm2yarn
npm install @web3modal/standalone
```

:::note
There are different Web3Modal packages depending on your use case.

- `@web3modal/standalone`
- `@web3modal/react`
- `@web3modal/html`

To learn about the differences, click [here](https://docs.walletconnect.com/2.0/web3modal/about).
:::

**1. Initialize your WalletConnect AuthClient, using [your Project ID](../../cloud/relay.md).**

```javascript
import AuthClient from "@walletconnect/auth-client";

const authClient = await AuthClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  metadata: {
    name: "my-auth-dapp",
    description: "A dapp using WalletConnect AuthClient",
    url: "my-auth-dapp.com",
    icons: ["https://my-auth-dapp.com/icons/logo.png"],
  },
});
```

**2. Add listeners for the `auth_response` event**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners](../core/pairing-api.md).
:::

```javascript
authClient.on("auth_response", ({ params }) => {
  if (Boolean(params.result?.s)) {
    // Response contained a valid signature -> user is authenticated.
  } else {
    // Handle error or invalid signature case
    console.error(params.message);
  }
});
```

**3. Request Authentication**

```javascript
import AuthClient, { generateNonce } from "@walletconnect/auth-client";

// ...

const { uri } = await authClient.request({
  aud: "<FULL_URL_OF_LOGIN_PAGE>",
  domain: "<YOUR_DOMAIN>",
  chainId: "eip155:1",
  nonce: generateNonce(),
});
```

**4. Create a new Web3Modal instance.**

```javascript
import Web3Modal from "@web3modal/standalone";

const web3Modal = new Web3Modal({
  projectId: "<YOUR_PROJECT_ID>",
  // `standaloneChains` can also be specified when calling `web3Modal.openModal(...)` later on.
  standaloneChains: ["eip155:1"],
});
```

**5. Open the Web3Modal by passing in `uri`.**

```javascript
if (uri) {
  web3Modal.openModal({ uri });
  console.log("Web3Modal opened")
}
```
