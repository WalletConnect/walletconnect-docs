# Upgrade Guide

If you are a developer currently using Sign v2 or Auth and wish to update to the Web3Wallet SDK, the process is straightforward. Below are the updated functions, along with their corresponding Sign v2 and Auth functions for reference.

## Migrate from `sign-client` to `Web3Wallet`

### 1. Initialization

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
});

/* new */
import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";

const core = new Core({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
});

const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: `${metaData}`,
});
```

### 2. Session Approval

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
await web3wallet.core.pairing.pair({ uri });
```

### 3. Session Rejection

```javascript
/* old */
signClient.on("session_proposal", async (proposal) => {
  const session = await signClient.reject({
    id: proposal.id,
    reason: getSdkError("USER_REJECTED_METHODS"),
  });
});

/* new */
web3wallet.on("session_proposal", async (proposal) => {
  const session = await web3wallet.rejectSession({
    id: proposal.id,
    reason: getSdkError("USER_REJECTED_METHODS"),
  });
});
```

### 4. Session Disconnect

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

### 5. Responding to Session Requests

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

### 6. Updating a Session

```javascript
/* old */
await signClient.update({ topic, namespaces: newNs });

/* new */
await web3wallet.updateSession({ topic, namespaces: newNs });
```

### Extend a Session

```javascript
/* old */
await signClient.extend({ topic });

/* new */
await web3wallet.extendSession({ topic });
```

### 7. Emit Session Events

```javascript
// emit events such as "chainChanged", "accountsChanged", etc.

/* old */
await signClient.emit({
    topic,
      event: {
    name: "accountsChanged",
    data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
  },,
    chainId: 'eip155:1'
})

/* new */
await web3wallet.emitSessionEvent({
    topic,
      event: {
    name: "accountsChanged",
    data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
  },,
    chainId: 'eip155:1'
})
```

### 8. Events

```javascript
/* old */
signClient.on("session_proposal", handler);
signClient.on("session_request", handler);

/* new */
web3wallet.on("session_proposal", handler);
web3wallet.on("session_request", handler);
```

---

## Migrate from `auth-client` to `Web3Wallet`

### 1. Initialization

```javascript
// metadata of your app
const metadata = {
  name: "Demo app",
  description: "Demo Client as Wallet/Peer",
  url: "www.walletconnect.com",
  icons: [],
};

/* old */
import { AuthClient } from "@walletconnect/auth-client";

const authClient = await AuthClient.init({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  metadata,
});

/* new */
import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";

const core = new Core({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
});

const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata,
});
```

### 2. Authenticate with a dapp

```javascript
/* old */
const iss = `did:pkh:eip155:1:${address}`;
authClient.on("auth_request", async (event) => {
  // format the payload
  const message = authClient.formatMessage(event.params.cacaoPayload, iss);
  // prompt the user to sign the message
  const signature = await wallet.signMessage(message);
  // respond
  await authClient.respond(
    {
      id: args.id,
      signature: {
        s: signature,
        t: "eip191",
      },
    },
    iss
  );
});

await authClient.core.pairing.pair({ uri, activatePairing: true });

/* new */
const iss = `did:pkh:eip155:1:${address}`;
web3wallet.on("auth_request", async (event) => {
  // format the payload
  const message = web3wallet.formatMessage(event.params.cacaoPayload, iss);
  // prompt the user to sign the message
  const signature = await wallet.signMessage(message);
  // respond
  await web3wallet.respondAuthRequest(
    {
      id: args.id,
      signature: {
        s: signature,
        t: "eip191",
      },
    },
    iss
  );
});

await web3wallet.core.pairing.pair({ uri: request.uri, activatePairing: true });
```

### 3. Events

```javascript
/* old */
authClient.on("auth_request", handler);
/* new */
web3wallet.on("auth_request", handler);
```
