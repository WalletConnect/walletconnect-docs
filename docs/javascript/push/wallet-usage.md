# Wallet Usage

:::caution
**The WalletConnect Push SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see breaking changes.
:::

## Prerequisites

The **`PushWalletClient` requires an existing pairing** in order to receive a push subscription request from a dapp.
This means that the `PushWalletClient` should be used alongside the [Web3Wallet SDK](../web3wallet/installation.md), via the [Shared Core](../guides/shared-core.md) setup.

## Usage

**1. Initialize your WalletConnect Core, using [your Project ID](../../cloud/relay.md), and pass it to the SDK clients**

```javascript
import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'
import { WalletClient as PushWalletClient } from '@walletconnect/push-client'

const core = new Core({
  projectId: '<YOUR_PROJECT_ID>'
})

// e.g. for Web3Wallet. See the "Shared Core" guide linked above for details.
const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: {
    /* ... */
  }
})

const pushWalletClient = await PushWalletClient.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: 'My Push-Enabled Wallet',
    description: 'A wallet using WalletConnect PushClient',
    url: 'https://my-wallet.com',
    icons: ['https://my-wallet.com/icons/logo.png']
  }
})
```

**2. Add listeners for relevant push events**

```javascript
pushWalletClient.on('push_request', async ({ id, topic, params }) => {
  const { metadata, account } = params
  // e.g. show a notification to the user, asking them to accept the push subscription request.
})

pushWalletClient.on('push_message', async ({ params }) => {
  const { message } = params
  // e.g. build a notification using the metadata from `message` and show to the user.
})
```

**3. Accept or reject incoming push subscription requests**

To accept a push subscription request, you must provide a callback to the `onSign: (message: string) => string` parameter of the `approve` method.
In order to authorize the push subscription, the SDK will call this callback with a message to sign, expecting the signature for that message to be returned.

Some suggested ways to implement the `onSign` callback are via:

- Ethers.js [`Wallet.signMessage` method](https://docs.ethers.org/v5/api/signer/#Signer-signMessage)
- The [`signMessage` method](https://wagmi.sh/core/actions/signMessage) in `@wagmi/core`

```javascript
pushWalletClient.on("push_request", async ({ id, topic, params }) => {
  // Show a notification to the user with the requesting dapp's metadata, asking them to accept the push subscription request.
  const userAccepted = await showNotificationToUser(params.metadata); // <- your own handler
  if (userAccepted) {
    // The `onSign` callback you provide will be called by the SDK to authorize the push subscription.
    const onSign = async (message: string) => {
      const signature = await wallet.signMessage(message);
      return signature
    }
    await pushWalletClient.approve({ id, onSign });
  } else {
    await pushWalletClient.reject({ id, reason: "User rejected push subscription request" });
  }
```
