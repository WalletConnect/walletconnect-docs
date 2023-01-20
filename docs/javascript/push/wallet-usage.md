# Wallet Usage

:::caution
**The WalletConnect Push SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see breaking changes.
:::

## Prerequisites

The PushClient should be used alongside the [Sign SDK](../sign/installation.md) or the
[Auth SDK](../auth/installation.md), via the [Shared Core](../guides/shared-core.md) setup.

## Usage

**1. Initialize your WalletConnect Core, using [your Project ID](../../cloud/relay.md), and pass it to the SDK clients**

```javascript
import { Core } from "@walletconnect/core";
import { WalletClient as PushWalletClient } from "@walletconnect/push-client";

const core = new Core({
  projectId: "<YOUR_PROJECT_ID>",
});

// e.g. for SignClient. See the "Shared Core" guide linked above for details.
const signClient = await SignClient.init({
  core,
  metadata: {
    /* ... */
  },
});

const pushClient = await PushWalletClient.init({
  core,
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
  // e.g. show a notification to the user, asking them to accept the push subscription request.
});

pushClient.on("push_message", async (event) => {
  const {
    params: { message },
  } = event;
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
