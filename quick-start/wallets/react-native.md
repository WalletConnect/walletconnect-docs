---
description: Quick Start For Wallets Using React-Native Client
---

# React-Native Client

This library is compatible with NodeJS, Browser and React-Native applications \(NodeJS modules required to be polyfilled for React-Native\)

## Install

```bash
yarn add @walletconnect/client@experimental
# OR

npm install --save @walletconnect/client@experimental
```

## Create Session

1. Initiate your WalletConnect client with the relay server

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletConnectClient from "@walletconnect/client";

const client = await WalletConnectClient.init({
  controller: true,
  relayProvider: "wss://relay.walletconnect.org",
  metadata: {
    name: "Test Wallet",
    description: "Test Wallet",
    url: "#",
    icons: ["https://walletconnect.org/walletconnect-logo.png"],
  },
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
```

1. Subscribe to session proposal event for user approval and session created when successful

```javascript
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

1. Pair with shared URI from dapp

```javascript
client.pair({ uri });
```

1. Handle user approval for proposed session

```javascript
function handleSessionUserApproval(
  approved: boolean,
  proposal: SessionTypes.Proposal
) {
  if (userApproved) {
    // if user approved then include response with accounts matching the chains and wallet metadata
    const response: SessionTypes.Response = {
      state: {
        accounts: ["0x1d85568eEAbad713fBB5293B45ea066e552A90De@eip155:1"],
      },
    };
    await client.approve({ proposal, response });
  } else {
    // if user didn't approve then reject with no response
    await client.reject({ proposal });
  }
}
```

## JSON-RPC Payloads

Given that session has settled succesfully since user approved the session on the wallet side, then the Wallet should subscribe to session payload events on the client

```javascript
import { CLIENT_EVENTS } from "@walletconnect/client";
import { SessionTypes } from "@walletconnect/types";
import { JsonRpcResponse } from "@json-rpc-tools/utils";

client.on(
  CLIENT_EVENTS.session.request,
  async (requestEvent: SessionTypes.RequestEvent) => {
    // WalletConnect client can track multiple sessions
    // assert the topic from which application requested
    const { topic, request } = requestEvent;
    const session = await client.session.get(requestEvent.topic);
    // now you can display to the user for approval using the stored metadata
    const { metadata } = session.peer;
    // after user has either approved or not the request it should be formatted
    // as response with either the result or the error message
    let result: any;
    const response = approved
      ? {
          topic,
          response: {
            id: request.id,
            jsonrpc: "2.0",
            result,
          },
        }
      : {
          topic,
          response: {
            id: request.id,
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

## Api Keys

For api keys look at [Api Keys](api-keys.md).
