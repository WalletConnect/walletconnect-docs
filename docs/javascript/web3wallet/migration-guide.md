# Migration Guide

If you are a developer currently using Sign v2 and want to update to the Web3Wallet SDK, it's a straightforward process. Here are the updated functions along with their corresponding Sign v2 functions for reference.

## Initialization
```javascript
// metadata of your app
const metadata = {
    name: "Demo app",
    description: "Demo Client as Wallet/Peer",
    url: "www.walletconnect.com",
    icons: [],
};

/* old */
import { SignClient } from "@walletconnect/sign-client";

const signClient = await SignClient.init({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    metadata,
})

/* new */
import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";

const core = new Core({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
})

const web3wallet = await Web3Wallet.init({
    core, // <- pass the shared `core` instance
    metadata: `${metaData}`
})
```

## Session Approval

```javascript
/* old */
signClient.on("session_proposal", async (proposal) => {
    const { acknowledged } = await signClient.approve({
        id: proposal.id,
        namespaces,
    });
    const session = await acknowledged();
});
await signClient.pair({ uri });

/* new */
web3wallet.on("session_proposal", async (proposal) => {
    const session = await web3wallet.approveSession({
        id: proposal.id,
        namespaces,
    });
});
await web3wallet.core.pairing.pair({ uri })
```

## Session Rejection

```javascript
/* old */
signClient.on("session_proposal", async (proposal) => {
    const session = await signClient.reject({
        id: proposal.id,
        reason: getSdkError('USER_REJECTED_METHODS')
    });
});

/* new */
web3wallet.on("session_proposal", async (proposal) => {
    const session = await web3wallet.rejectSession({
        id: proposal.id,
        reason: getSdkError('USER_REJECTED_METHODS')
    });
});
```

## Session Disconnect

```javascript
/* old */
await signClient.disconnect({
    topic,
    reason: getSdkError("USER_DISCONNECTED"),
});

/* new */
await web3wallet.disconnectSession({
    topic,
    reason: getSdkError("USER_DISCONNECTED"),
});
```

## Responding to Session Requests

```javascript
/* old */
signClient.on("session_request", async (event) => {
    // process the request 
    const params = ...
    // respond
    await signClient.respond({ params })
});

/* new */
web3wallet.on("session_request", async (event) => {
    // process the request 
    const params = ...
    // respond
    await web3wallet.respondSessionRequest({ params })
});
```

## Updating a Session

```javascript
/* old */
await signClient.update({ topic, namespaces: newNs })

/* new */
await web3wallet.updateSession({ topic, namespaces: newNs })
```

## Extend a Session

```javascript
/* old */
await signClient.extend({ topic });

/* new */
await web3wallet.extendSession({ topic });
```

## Emit Session Events

```javascript
// emit events such as "chainChanged", "accountsChanged", etc.

/* old */
await signClient.emit({
    topic,
    event: { name: 'chainChanged', data: 'Hello World' },
    chainId: 'eip155:1'
})

/* new */
await web3wallet.emitSessionEvent({
    topic,
    event: { name: 'chainChanged', data: 'Hello World' },
    chainId: 'eip155:1'
})
```

## Events

```javascript
/* old */
signClient.on("session_proposal", handler)
signClient.on("session_request", handler)

/* new */
web3wallet.on("session_proposal", handler)
web3wallet.on("session_request", handler)
```