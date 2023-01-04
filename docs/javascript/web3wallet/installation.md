# Getting Started

## Obtain Project ID

Head over to [WalletConnect Cloud](https://cloud.walletconnect.com/) to sign in or sign up. Create (or use an existing) project and copy its associated Project ID. We will need this in a later step.

## Install Packages

Install the Web3Wallet SDK package.

```bash npm2yarn
npm install @walletconnect/web3wallet
```

## Initialization

Create a new instance from `Core` and initialize it with a `projectId` created in the first step. Next, create a wagmi Client instance using createClient, and pass the result from configureChains to it.

```javascript
import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";

const core = new Core({
    projectId: process.env.PROJECT_ID,
})

const web3wallet = await Web3Wallet.init({
    core, // <- pass the shared `core` instance
    metadata: {
        name: "Demo app",
        description: "Demo Client as Wallet/Peer",
        url: "www.walletconnect.com",
        icons: [],
    }
})
```

## Pairing

The `session_proposal` event is triggered when a dApp initiates a new WalletConnect session with a user's wallet, and includes a `proposal` object with information about the dApp and requested permissions. This event is emitted by the dApp and received by the wallet. The wallet should display a prompt for the user to approve or reject the session, and if approved, should call the `approveSession` method with the `proposal.id` and requested `namespaces`.

The `pair` method initiates a WalletConnect pairing process with a dApp using the given `uri` (QR code from the dApps).

```javascript
web3wallet.on("session_proposal", async (proposal) => {
    // should display a prompt for the user to approve or reject the session 

    const session = await web3wallet.approveSession({
        id: proposal.id,
        namespaces,
    });
});
await web3wallet.core.pairing.pair({ uri })
```

## Responding to Session Requests

The `session_request` event is triggered when a dApp sends a request to the wallet for a specific action, such as signing a transaction. This event is emitted by the dApp and received by the wallet.

```javascript
web3wallet.on("session_request", (event) => {
  // process the request
  const { id, method, params } = event.request;

  await web3wallet.respondSessionRequest({ id, result: response });
});
```