# Wallet Usage

:::caution
**The WalletConnect Auth SDK is currently in early Alpha and is not production-ready**.

Its public API and associated documentation may still see significant and breaking changes.
:::

Auth API establishes a session between a wallet and a dapp in order to
authenticate a user based on their wallet using JSON-RPC.

## Install

```bash npm2yarn
npm install --save @walletconnect/auth-client@rc @walletconnect/types@rc
```

## Initialize the client

```javascript
const authClient = await AuthClient.init({
  projectId: "<YOUR_PROJECT_ID>",
  // storageOptions is an optional property, not a must to specify.
  storageOptions: {
    database: ":memory:",
  },
  iss: `did:pkh:eip155:1:<WALLET_ADDRESS>`,
});
```

## Listen to authentication requests

```javascript
authClient.once("auth_request", async (args) => {
  // Naturally this is a good point to trigger a UI event to give the user
  // like a button to accept or reject the authentication request
  // instead of automatically responding
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

## Scan QR Code

Once a QR code is scanned, pairing must be established using the URI embedded.
This is what allows the `auth_request` events to be received.

```javascript
await authClient.pair({ uri });
```
