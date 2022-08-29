---
description: Quick Start For Dapps using Auth Client
---

# Dapp Usage

:::caution
**The WalletConnect Auth SDK is currently in early Alpha and is not production-ready**.

Its public API and associated documentation may still see significant and breaking changes.
:::

This library is compatible with NodeJS, browsers and React-Native applications \(NodeJS modules require polyfills for React-Native\).

## Installation

```bash npm2yarn
npm install --save @walletconnect/auth-client @walletconnect/types@rc
```

## Request Authentication

**1. Initiate your WalletConnect AuthClient with the relay server, using [your Project ID](../../introduction/cloud.md#project-id).**

```javascript
import AuthClient from "@walletconnect/auth-client";

const authClient = await AuthClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  storageOptions: {
    database: ":memory:",
  },
});
```

**2. Add listeners for the `auth_response` event**

```javascript
authClient.once("auth_response", ({ params }) => {
  isSuccessfulResponse = Boolean(params.result?.signature);
  // Handle successful/unsuccessful response
});
```

**3. Request Authentication**

```javascript
const { uri } = await authClient.request({
  aud: "<FULL_URL_OF_LOGIN_PAGE>",
  domain: "<YOUR_DOMAIN>",
  chainId: "eip155:1",
  nonce: "<GENERATED_NONCE>",
});
```

**4. The URI generated can be generated into a QRCode and scanned**

```javascript
import QRCodeModal from "@walletconnect/qrcode-modal";

if (uri) {
  QRCodeModal.open(uri, () => {
    console.log("EVENT", "QR Code Modal closed");
  });
}
```
