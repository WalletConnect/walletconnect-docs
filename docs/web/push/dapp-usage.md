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
import { Core } from '@walletconnect/core'
import SignClient from '@walletconnect/sign-client'
import { DappClient as PushDappClient } from '@walletconnect/push-client'

const core = new Core({
  projectId: '<YOUR_PROJECT_ID>'
})

// e.g. for SignClient. See the "Shared Core" guide linked above for details.
const signClient = await SignClient.init({
  core,
  metadata: {
    /* ... */
  }
})

const pushDappClient = await PushDappClient.init({
  core,
  metadata: {
    name: 'My Push-Enabled Dapp',
    description: 'A dapp using WalletConnect PushClient',
    url: 'https://my-dapp.com',
    icons: ['https://my-dapp.com/icons/logo.png']
  }
})
```

**2. Add listener for the `push_response` event**

```javascript
pushDappClient.on('push_response', event => {
  if (event.params.error) {
    console.error('Error on `push_response`:', event.params.error)
  } else {
    console.log('Established PushSubscription:', event.params.subscription)
  }
})
```

**3. Propose a push subscription to the wallet**

```javascript
// Resolve known pairings from the Core's Pairing API.
const pairings = pushDappClient.core.pairing.getPairings()
// Use the latest pairing for this example.
const latestPairing = pairings[pairings.length - 1]

const id = await pushDappClient.propose({
  account: 'eip155:1:0xafeb...', // Target account to request push notifications for.
  pairingTopic: latestPairing.topic
})

// Next: The `push_response` event will be emitted once the wallet responds.
```

:::info

- Once `PushDappClient` receives an accepted push subscription from the wallet, it will automatically attempt to register the push subscription with the Cast server at `https://cast.walletconnect.com`.
- The **Cast server's purpose is to allow the dapp to send push messages** to the wallet, **even when there is no active websocket connection**.

:::

### Sending Push Messages via Notify Server (REST)

In order to send a push notification via the WalletConnect Notify server, we can send a `POST` request to the `/notify` endpoint, with the following payload (here via `fetch`):

```javascript
const notificationPayload = {
  // Target `accounts` that should receive the push notification.
  accounts: ['eip155:1:0xafeb...'],
  // The `type` of notification. Based on the notification types defined in your `/.well-known/wc-push-config.json`.
  type: 'alerts',
  // The notification body itself.
  notification: {
    title: 'Profile Activity',
    body: "There's been activity on your profile!",
    icon: 'https://my-dapp.com/icons/logo.png',
    url: 'https://my-dapp.com/profile'
  }
}

// We can construct the URL to the Notify Server using the `castUrl` property
// of the `PushDappClient` (which will be `https://cast.walletconnect.com` by default),
// together with our Project ID.
const result = await fetch(`${pushDappClient.castUrl}/${YOUR_PROJECT_ID}/notify`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(notificationPayload)
})

await result.json() // { "sent": ["eip155:1:0xafeb..."], "failed": [], "not_found": [] }
```
