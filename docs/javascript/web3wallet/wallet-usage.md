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

The `session_request` event is triggered by a dapp when it needs the wallet to perform a specific action, such as signing a transaction. The event contains a `topic` and a `request` object, which will vary depending on the action requested.

To respond to the request, the wallet can access the `topic` and `request` object by destructuring them from the event payload. To see a list of possible `request` and `response` objects, refer to the relevant JSON-RPC Methods for [Ethereum](../../advanced/rpc-reference/ethereum-rpc.md), [Solana](../../advanced/rpc-reference/solana-rpc.md), [Cosmos](../../advanced/rpc-reference/cosmos-rpc.md), or [Stellar](../../advanced/rpc-reference/stellar-rpc.md).

As an example, if the dapp requests a `personal_sign` method, the wallet can extract the `params` array from the `request` object. The first item in the array is the hex version of the message to be signed, which can be converted to UTF-8 and assigned to a `message` variable. The second item in `params` is the user's wallet address.

To sign the message, the wallet can use the `wallet.signMessage` method and pass in the message. The signed message, along with the `id` from the event payload, can then be used to create a `response` object, which can be passed into `respondSessionRequest`.

The wallet then signs the message. `signedMessage`, along with the `id` from the event payload, can then be used to create a `response` object, which can be passed into `respondSessionRequest`.

```javascript
web3wallet.on("session_request", async (event) => {
  const { topic, params, id } = event;
  const { request } = params;
  const requestParamsMessage = request.params[0];

  // convert `requestParamsMessage` by using a method like hexToUtf8
  const message = hexToUtf8(requestParamsMessage);

  // sign the message
  const signedMessage = await wallet.signMessage(message);

  const response = { id, result: signedMessage, jsonrpc: "2.0" };

  await web3wallet.respondSessionRequest({ topic, response });
});
```

To reject a session request, the response should be similar to this.

```javascript
const response = {
  id,
  jsonrpc: "2.0",
  error: {
    code: 5000,
    message: "User rejected.",
  },
};
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

To emit session events, call the `emitSessionEvent` and pass in the params. In the example, the wallet will emit `session_event` when the wallet switches chains while on the Ethereum Mainnet.

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
