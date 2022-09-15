---
description: Quick Start For Dapps using Auth Client
---

# Dapp Usage

:::caution
**The WalletConnect Auth SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see significant and breaking changes.
:::

:::info
For an example implementation, please refer to our [`react-dapp-auth` example](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-auth).
:::

**1. Initialize your WalletConnect AuthClient, using [your Project ID](../../introduction/cloud.md#project-id).**

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

**4. The provided URI can be generated into a QRCode and scanned**

```javascript
import QRCodeModal from "@walletconnect/qrcode-modal";

if (uri) {
  QRCodeModal.open(uri, () => {
    console.log("EVENT", "QR Code Modal closed");
  });
}
```
