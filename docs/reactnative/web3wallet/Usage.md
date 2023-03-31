import Container from '../../components/Container';

# Usage

The followings steps describe the process of creating a React Native wallet with the Web3Wallet SDK.

1. [Obtain Project ID](#obtain-project-id)
2. [Installation](#installation)
3. [Initialization](#initialization)
4. [Pairing, Session Approval & Rejection](#pairing-session-approval--rejection)
5. [Session Disconnect](#session-disconnect)
6. [Session Requests](#session-requests)
7. [Updating a Session](#updating-a-session)
8. [Extend a Session](#extend-a-session)
9. [Emit Session Events](#emit-session-events)

---

## Obtain Project ID

Every project using WalletConnect SDKs needs to obtain projectId from [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in). This is absolutely free and only takes a few minutes.

## Installation

Install the Web3Wallet SDK package.

```bash npm2yarn
npm install @walletconnect/web3wallet @walletconnect/react-native-compat
```

Additionally add these extra packages to help with async storage, polyfills and the instance of ethers.

```bash npm2yarn
npm install @react-native-async-storage/async-storage react-native-get-random-values fast-text-encoding @ethersproject/shims ethers@5.4
```

For those using Typescript, we recommend adding these dev dependencies:

```bash npm2yarn
npm install npm install --save @walletconnect/jsonrpc-types
```

## Initialization

Create a new instance from `Core` and initialize it with your `projectId`. Next, create a Web3Wallet instance by calling `init` on `Web3Wallet`. Passing in the options object containing metadata about the app.

In this code example, we wrapped it in a `createWeb3Wallet` function as this will be easier to call from your `App.tsx` or an initialization function as seen [here.](https://github.com/WalletConnect/react-native-examples/blob/main/wallets/rn_cli_wallet_068_5/src/utils/Web3WalletClient.ts)

The `pair` function will help us pair between the dapp and wallet and will be used shortly.

```javascript
import { Core } from '@walletconnect/core'
// import { ICore } from '@walletconnect/types' <- Add if using TS
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet'

// export let web3wallet: IWeb3Wallet <- Add if using TS
// export let core: ICore <- Add if using TS

const core = new Core({
  projectId: process.env.PROJECT_ID
})

export async function createWeb3Wallet() {
  const web3wallet = await Web3Wallet.init({
    core, // <- pass the shared `core` instance
    metadata: {
      name: 'Demo React Native Wallet',
      description: 'Demo RN Wallet to interface with Dapps',
      url: 'www.walletconnect.com',
      icons: []
    }
  })
}

export async function pair(params: { uri: string }) {
  return await core.pairing.pair({ uri: params.uri })
}
```

## Pairing, Session Approval & Rejection

In order to connect with a dapp, you will need to receive a WalletConnect URI (WCURI) and this will talk to our protocol to facilitate a pairing session. Therefore, you will need a test dApp in order to communicate with the wallet. We recommend testing with our [React V2 Dapp](https://react-app.walletconnect.com/) as this is the most up-to-date development site.

In order to capture the WCURI, recommend having some sort of state management you will pass through a `TextInput` or QRcode instance.

The `session_proposal` event is emitted when a dapp initiates a new session with a user's wallet. The event will include a `proposal` object with information about the dapp and requested permissions. The wallet should display a prompt for the user to approve or reject the session. If approved, call `approveSession` and pass in the `proposal.id` and requested `namespaces`.

The `pair` method initiates a WalletConnect pairing process with a dapp using the given `uri` (QR code from the dapps). To learn more about pairing, checkout out the [docs](../../javascript/core/pairing-api).

You can also use the `getSDKError` function, which is available in the `@walletconnect/utils` for the rejection function [library](https://github.com/WalletConnect/walletconnect-monorepo/tree/v2.0/packages/utils).

```javascript
import {getSdkError} from '@walletconnect/utils';
...

const [wcuri, setWCUri] = useState<string>();

// Approval: Using this listener for sessionProposal, you can accept the session
web3wallet.on("session_proposal", async (proposal) => {
  const session = await web3wallet.approveSession({
    id: proposal.id,
    namespaces,
  });
});

// Reject: Using this listener for sessionProposal, you can reject the session
web3wallet.on("session_proposal", async (proposal) => {
  const session = await web3wallet.rejectSession({
    id: proposal.id,
    reason: getSdkError("USER_REJECTED_METHODS"),
  });
});

// Call this after WCURI is received
await web3wallet.core.pairing.pair({ wcuri });

```

## Session Disconnect

If either the dapp or the wallet decides to disconnect the session, the `session_delete` event will be emitted. The wallet should listen for this event in order to update the UI.

To disconnect a session from the wallet, call the `disconnectSession` function and pass in the `topic` and `reason`. You can use the `getSDKError` function, which is available in the `@walletconnect/utils` [library](https://github.com/WalletConnect/walletconnect-monorepo/tree/v2.0/packages/utils).

```javascript
await web3wallet.disconnectSession({
  topic,
  reason: getSdkError('USER_DISCONNECTED')
})
```

## Session Requests

![session-request-example](/assets/SessionRequestExample.png)

The `session_request` event is triggered by a dapp when it needs the wallet to perform a specific action, such as signing a transaction. The event contains a `topic` and a `request` object, which will vary depending on the action requested.

To respond to the request, the wallet can access the `topic` and `request` object by destructuring them from the event payload. To see a list of possible `request` and `response` objects, refer to the relevant JSON-RPC Methods for [Ethereum](../../advanced/rpc-reference/ethereum-rpc.md), [Solana](../../advanced/rpc-reference/solana-rpc.md), [Cosmos](../../advanced/rpc-reference/cosmos-rpc.md), or [Stellar](../../advanced/rpc-reference/stellar-rpc.md).

As an example, if the dapp requests a `personal_sign` method, the wallet can extract the `params` array from the `request` object. The first item in the array is the hex version of the message to be signed, which can be converted to UTF-8 and assigned to a `message` variable. The second item in `params` is the user's wallet address.

To sign the message, the wallet can use the `wallet.signMessage` method and pass in the message. The signed message, along with the `id` from the event payload, can then be used to create a `response` object, which can be passed into `respondSessionRequest`.

The wallet then signs the message. `signedMessage`, along with the `id` from the event payload, can then be used to create a `response` object, which can be passed into `respondSessionRequest`.

```javascript
web3wallet.on('session_request', async event => {
  const { topic, params, id } = event
  const { request } = params
  const requestParamsMessage = request.params[0]

  // convert `requestParamsMessage` by using a method like hexToUtf8
  const message = hexToUtf8(requestParamsMessage)

  // sign the message
  const signedMessage = await wallet.signMessage(message)

  const response = { id, result: signedMessage, jsonrpc: '2.0' }

  await web3wallet.respondSessionRequest({ topic, response })
})
```

To reject a session request, the response should be similar to this.

```javascript
const response = {
  id,
  jsonrpc: '2.0',
  error: {
    code: 5000,
    message: 'User rejected.'
  }
}
```

## Updating a Session

The `session_update` event is emitted from the wallet when the session is updated by calling `updateSession`. To update a session, pass in the [topic](https://docs.walletconnect.com/2.0/advanced/glossary#topics) and the new namespace.

```javascript
await web3wallet.updateSession({ topic, namespaces: newNs })
```

## Extend a Session

To extend the session, call the `extendSession` method and pass in the new `topic`. The `session_update` event will be emitted from the wallet.

```javascript
await web3wallet.extendSession({ topic })
```

## Emit Session Events

To emit session events, call the `emitSessionEvent` and pass in the params. If you wish to switch to chain/account that is not approved (missing from `session.namespaces`) you will have to update the session first. In the following example, the wallet will emit `session_event` that will instruct the dapp to switch the active accounts.

```javascript
await web3wallet.emitSessionEvent({
  topic,
  event: {
    name: 'accountsChanged',
    data: ['0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb']
  },
  chainId: 'eip155:1'
})
```

In the following example, the wallet will emit `session_event` when the wallet switches chains.

```javascript
await web3wallet.emitSessionEvent({
  topic,
  event: {
    name: 'chainChanged',
    data: ['0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb']
  },
  chainId: 'eip155:1'
})
```
