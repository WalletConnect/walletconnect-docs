# Migration Guide

## Migrate from `sign-client` to `Web3Wallet`

1. Initialization
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
2. Pair with a dapp

```javascript
    /* old */
    signClient.on("session_proposal", async (proposal) => {
        const { acknowledged } = await B.approve({
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
3. Responding to session requests

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
4. Emit session events

```javascript
    // emit events such as "chainChanged", "accountsChanged", etc.

    /* old */
    await signClient.emit({ params })

    /* new */
    await web3wallet.emitSessionEvent({ params })
```

5. Extend a session

```javascript
    /* old */
    await signClient.extend({ topic });

    /* new */
    await web3wallet.extendSession({ topic });
```

6. Disconnect from a session

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

7. Events

```javascript
    /* old */
    signClient.on("session_proposal", handler)
    signClient.on("session_request", handler)

    /* new */
    web3wallet.on("session_proposal", handler)
    web3wallet.on("session_request", handler)
```