# Dapp Usage

:::caution
**The WalletConnect Push SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see breaking changes.
:::

## Prerequisites

The **`PushDappClient` requires an existing pairing** in order to send a push subscription request to the wallet.
This means that the `PushDappClient` should be used alongside the [Sign SDK](../sign/installation.md) or the
[Auth SDK](../auth/installation.md), via the [Shared Core](../guides/shared-core.md) setup.

## Usage

**1. Initialize your WalletConnect Core, using [your Project ID](../../cloud/relay.md), and pass it to the SDK clients**

```javascript
import { Core } from "@walletconnect/core";
import { DappClient as PushDappClient } from "@walletconnect/push-client";

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

const pushClient = await PushDappClient.init({
  core,
  metadata: {
    name: "my-push-dapp-client",
    description: "A dapp using WalletConnect PushClient",
    url: "my-push-dapp-client.com",
    icons: ["https://my-dapp.com/icons/logo.png"],
  },
});
```

**2. Add listener for the `push_response` event**

```javascript
pushClient.on("push_response", (event) => {
  if (event.params.error) {
    console.error("Error on `push_response`:", event.params.error);
  } else {
    console.log("Established PushSubscription:", event.params.subscription);
  }
});
```

**3. Propose a push subscription to the wallet**

```javascript
// Resolve known pairings from the Core's Pairing API.
const pairings = pushClient.core.pairing.getPairings();
// Use the latest pairing for this example.
const latestPairing = pairings[pairings.length - 1];

const id = await pushClient.request({
  account: "0x..." // Target account to request push notifications for.
  pairingTopic: latestPairing.topic,
});

// Next: The `push_response` event will be emitted once the wallet responds.
```

**4. Send a push message to a wallet on an active push subscription**

```javascript
// Resolve active push subscriptions.
const subscriptions = pushClient.subscriptions.getAll();
// Use the latest subscription for this example.
const latestSubscription = subscriptions[subscriptions.length - 1];

// Build the message and associated metadata.
const message = {
  title: "Profile Activity"
  body: "There's been activity on your profile!"
  icon: "https://my-dapp.com/icons/logo.png",
  url: "https://my-dapp.com/profile",
};

await pushClient.notify({ topic: latestSubscription.topic, message });
```
