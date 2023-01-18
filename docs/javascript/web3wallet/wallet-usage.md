# Wallet Usage

## Initialization

Create a new instance from `Core` and initialize it with a `projectId` created from [installation](./installation.md). Next, create web3Wallet instance by calling `init` on `Web3Wallet`. Passing in the options object containing metadata about the app and an optional relay URL.

```javascript
import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";

const core = new Core({
  projectId: process.env.PROJECT_ID,
});

const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: "Demo app",
    description: "Demo Client as Wallet/Peer",
    url: "www.walletconnect.com",
    icons: [],
  },
});
```

## Session Approval

The `session_proposal` event is emitted when a dapp initiates a new session with a user's wallet. The event will include a `proposal` object with information about the dapp and requested permissions. The wallet should display a prompt for the user to approve or reject the session. If approved, call `approveSession` and pass in the `proposal.id` and requested `namespaces`.

The `pair` method initiates a WalletConnect pairing process with a dapp using the given `uri` (QR code from the dapps). To learn more about pairing, checkout out the [docs](../core/pairing-api.md).

```javascript
web3wallet.on("session_proposal", async (proposal) => {
  const session = await web3wallet.approveSession({
    id: proposal.id,
    namespaces,
  });
});
await web3wallet.core.pairing.pair({ uri });
```

## Session Rejection

In the event you want to reject the session proposal, call the `rejectSession` method. The `getSDKError` function comes from the `@walletconnect-utils` [library](https://github.com/WalletConnect/walletconnect-monorepo/tree/v2.0/packages/utils).

```javascript
web3wallet.on("session_proposal", async (proposal) => {
  const session = await web3wallet.rejectSession({
    id: proposal.id,
    reason: getSdkError("USER_REJECTED_METHODS"),
  });
});
```

## Session Disconnect

If either the dapp or the wallet decides to disconnect the session, the `session_delete` event will be emitted. The wallet should listen for this event in order to update the UI.

To disconnect a session from the wallet, call the `disconnectSession` function and pass in the `topic` and `reason`. You can use the `getSDKError` function, which is available in the `@walletconnect-utils` [library](https://github.com/WalletConnect/walletconnect-monorepo/tree/v2.0/packages/utils).

```javascript
await web3wallet.disconnectSession({
  topic,
  reason: getSdkError("USER_DISCONNECTED"),
});
```

## Responding to Session Requests

The `session_request` event is triggered when a dapp sends a request to the wallet for a specific action, such as signing a transaction. This event is emitted by the dapp and received by the wallet. To respond to the request, wallets should call the respondSessionRequest function and pass in details from the request. You can then approve or reject the request based on the response.

```javascript
web3wallet.on("session_request", (event) => {
  const { id, method, params } = event.request;

  await web3wallet.respondSessionRequest({ id, result: response });
});
```

## Updating a Session

The `session_update` event is emitted from the wallet when the session is updated by calling `updateSession`. To update a session, pass in the `topic` and the new namespace.

```javascript
await web3wallet.updateSession({ topic, namespaces: newNs });
```

## Extend a Session

To extend the session, call the `extendSession` method and pass in the new `topic`. The `session_update` event will be emitted from the wallet.

```javascript
await web3wallet.extendSession({ topic });
```

## Emit Session Events

To emit sesssion events, call the `emitSessionEvent` and pass in the params. In the example, the wallet will emit `sesssion_event` when the wallet switches chains while on the Ethereum Mainnet.

```javascript
await web3wallet.emitSessionEvent({
  topic,
  event: {
    name: "accountsChanged",
    data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
  },
  chainId: "eip155:1",
});
```
