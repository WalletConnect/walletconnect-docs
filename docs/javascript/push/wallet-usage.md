# Wallet Usage

:::caution
**The WalletConnect Push SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see breaking changes.
:::

## Prerequisites

The **PushWalletClient requires an existing pairing** in order to receive a push subscription request from a dapp.
This means that the PushClient should be used alongside the [Web3Wallet SDK](../web3wallet/installation.md), via the [Shared Core](../guides/shared-core.md) setup.

## Usage

**1. Initialize your WalletConnect Core, using [your Project ID](../../cloud/relay.md), and pass it to the SDK clients**

```javascript
import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";
import { WalletClient as PushWalletClient } from "@walletconnect/push-client";

const core = new Core({
  projectId: "<YOUR_PROJECT_ID>",
});

// e.g. for Web3Wallet. See the "Shared Core" guide linked above for details.
const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: {
    /* ... */
  },
});

const pushClient = await PushWalletClient.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: "my-push-wallet-client",
    description: "A wallet using WalletConnect PushClient",
    url: "my-push-wallet-client.com",
    icons: ["https://my-wallet.com/icons/logo.png"],
  },
});
```

**2. Add listeners for relevant push events**

```javascript
pushClient.on("push_request", async ({ id, topic, params }) => {
  const { metadata, account } = params;
  // e.g. show a notification to the user, asking them to accept the push subscription request.
});

pushClient.on("push_message", async ({ params }) => {
  const { message } = params;
  // e.g. build a notification using the metadata from `message` and show to the user.
});
```

**3. Accept or reject incoming push subscription requests**

```javascript
pushClient.on("push_request", async ({ id, topic, params }) => {
  // Show a notification to the user with the requesting dapp's metadata, asking them to accept the push subscription request.
  const userAccepted = await showNotificationToUser(params.metadata);
  if (userAccepted) {
    await pushClient.approve({ id });
  } else {
    await pushClient.reject({ id, reason: "User rejected push subscription request" });
  }
```
