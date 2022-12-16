# Wallet Usage

:::info
For an example implementation, please refer to our [`react-wallet-auth` example](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-wallet-auth).
:::

**1. Initialize your WalletConnect AuthClient, using [your Project ID](../../cloud/relay.md).**

```javascript
import AuthClient from "@walletconnect/auth-client";

const authClient = await AuthClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  metadata: {
    name: "my-auth-wallet",
    description: "A wallet using WalletConnect AuthClient",
    url: "my-auth-wallet.com",
    icons: ["https://my-auth-wallet.com/icons/logo.png"],
  },
});
```

**2. Listen to authentication requests**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners](../core/pairing-api.md).
:::

```javascript
authClient.on("auth_request", async ({ id, args }) => {

  // the user’s address
  const iss = `did:pkh:eip155:1:${WALLET_ADDRESS}`;

  // format the cacao payload with the user’s address
  const message = authClient.formatMessage(args.params.cacaoPayload, iss);
  
  // This is a good point to trigger a UI event to provide the user
  // with a button to accept or reject the authentication request,
  // instead of automatically responding.
  const signature = await wallet.signMessage(params.message);

  await authClient.respond({
    id: id,
    signature: {
      s: signature,
      t: "eip191",
    },
    iss,
  });
});
```

**3. Scan QR Code (or paste URI directly)**

Once a QR code is scanned, a pairing must be established using the embedded URI.
This is what allows the `auth_request` events to be received.

```javascript
await authClient.core.pairing.pair({ uri });
```
