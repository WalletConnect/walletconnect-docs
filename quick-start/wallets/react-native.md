---
description: Quick Start For Wallets Using React-Native Client
---

# React-Native Client

This library is compatible with NodeJS, Browser and React-Native applications (NodeJS modules required to be polyfilled for React-Native)

## Install

```bash
yarn add @walletconnect/client@experimental
# OR

npm install --save @walletconnect/client@experimental
```

## Create Session

1. Initiate your WalletConnect client with the relay server

```js
import WalletConnectClient from "@walletconnect/client";

const client = await WalletConnectClient.init({
  relayProvider: "wss://staging.walletconnect.org",
});
```

2. Subscribe to session proposal event for user approval and session created when successful

```js
import { CLIENT_EVENTS } from "@walletconnect/client";
import { SessionTypes } from "@walletconnect/types";

client.on(
  CLIENT_EVENTS.session.proposal,
  async (proposal: SessionTypes.Proposal) => {
    // user should be prompted to approve the proposed session permissions displaying also dapp metadata
    const { proposer, permissions } = proposal;
    const { metadata } = proposer;
    let approved: boolean;
    handleSessionUserApproval(approved, proposal); // described in the step 4
  }
);

client.on(
  CLIENT_EVENTS.session.created,
  async (session: SessionTypes.Created) => {
    // session created succesfully
  }
);
```

3. Pair with shared URI from dapp

```js
client.pair({ uri });
```

4. Handle user approval for proposed session

```js
function handleSessionUserApproval(approved: boolean, proposal: SessionTypes.Proposal) {
  if (userApproved) {
    // if user approved then include response with accountIds matching the chainIds and wallet metadata
    const response: SessionTypes.Response = {
      metadata: {
        name: "Test Wallet",
        description: "Test Wallet",
        url: "#",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
      },
      state: {
        accountIds: ["0x1d85568eEAbad713fBB5293B45ea066e552A90De@eip155:1"],
      },
    }
    await client.approve({ proposal, response });
  } else {
    // if user didn't approve then reject with no response
    await client.reject({ proposal });
  }
}
```

## JSON-RPC Payloads

Given that session has settled succesfully since user approved the session on the wallet side, then the Wallet should subscribe to session payload events on the client

```js
import { CLIENT_EVENTS } from "@walletconnect/client";
import { SessionTypes } from "@walletconnect/types";
import { JsonRpcResponse } from "@json-rpc-tools/utils";

client.on(
  CLIENT_EVENTS.session.payload,
  async (payloadEvent: SessionTypes.PayloadEvent) => {
    // WalletConnect client can track multiple sessions
    // assert the topic from which application requested
    const { topic, payload } = payloadEvent;
    const session = await client.session.get(payloadEvent.topic);
    // now you can display to the user for approval using the stored metadata
    const { metadata } = session.peer;
    // after user has either approved or not the request it should be formatted
    // as response with either the result or the error message
    let result: any;
    const response = approved
      ? {
          topic,
          response: {
            id: payload.id,
            jsonrpc: "2.0",
            result,
          },
        }
      : {
          topic,
          response: {
            id: payload.id,
            jsonrpc: "2.0",
            error: {
              code: -32000,
              message: "User rejected JSON-RPC request",
            },
          },
        };
    await client.respond(response);
  }
);
```
