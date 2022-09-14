# Wallet Usage

:::caution
**The WalletConnect Auth SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see significant and breaking changes.
:::

**1. Initialize your WalletConnect AuthClient, using [your Project ID](../../introduction/cloud.md#project-id).**

```javascript
import AuthClient from "@walletconnect/auth-client";

const authClient = await AuthClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  iss: `did:pkh:eip155:1:<WALLET_ADDRESS>`,
  metadata: {
    name: "my-auth-wallet",
    description: "A wallet using WalletConnect AuthClient",
    url: "my-auth-wallet.com",
    icons: ["https://my-auth-wallet.com/icons/logo.png"],
  },
});
```

**2. Listen to authentication requests**

```javascript
authClient.once("auth_request", async (args) => {
  // This is a good point to trigger a UI event to provide the user
  // with a button to accept or reject the authentication request,
  // instead of automatically responding.
  const signature = await wallet.signMessage(args.params.message);
  await authClient.respond({
    id: args.id,
    signature: {
      s: signature,
      t: "eip191",
    },
  });
});
```

**3. Scan QR Code (or paste URI directly)**

Once a QR code is scanned, a pairing must be established using the embedded URI.
This is what allows the `auth_request` events to be received.

```javascript
await authClient.pair({ uri });
```
