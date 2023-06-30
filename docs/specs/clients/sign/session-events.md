import Table from '../../../components/Table';

# Session Events

## Events

You can set up event listeners to perform an action when these events are emitted.

<Table 
headers={[ "Event", "Description", "Who Should Listen" ]}
data={[
{
    event: "session_proposal",
    description: "Emitted when there is a new session proposal to be responded to",
    whoShouldListen: "Wallets"
  },
  {
    event: "session_request",
    description: "Emitted when the wallet is required to take action, such as signing a transaction.",
    whoShouldListen: "Wallets"
  },
  {
    event: "session_update",
    description: "Emitted when a session is updated.",
    whoShouldListen: "Dapps & Wallets"
  },
  {
    event: "session_delete",
    description: "Emitted when a session has been disconnected.",
    whoShouldListen: "Dapps & Wallets"
  },
  {
    event: "session_event",
    description: "Emitted when an event like accountsChanged happens.",
    whoShouldListen: "Dapps & Wallets"
  },
  {
    event: "session_ping",
    description: "Emitted when the session's peer is checking if the receiving client is online.",
    whoShouldListen: "Dapps & Wallets"
  },
  {
    event: "session_expire",
    description: "Emitted when a session has expired.",
    whoShouldListen: "Dapps & Wallets"
  },
  {
    event: "session_extend",
    description: "Emitted when extending a session.",
    whoShouldListen: "Dapps & Wallets"
  },
  {
    event: "proposal_expire",
    description: "Emitted when a session proposal has expired.",
    whoShouldListen: "Dapps & Wallets"
  }
]}
/>

### session_proposal

An event is triggered when the dapp establishes a connection with the wallet by calling the `connect` method.

```ts
await client.connect({
  pairingTopic: pairing?.topic, // optional, only provided when connecting via existing pairing.
  requiredNamespaces,
});
```

Here's an example payload when the dapp is initiating a session proposal on the Goerli Network.

:::tip
For a properly formatted namespace, refer to the documentation [here](../../../specs/clients/sign/namespaces.md#example-proposal-namespaces-request).
:::

```ts
{
    "id": 1675734656244887,
    "params": {
        "id": 1675734656244887,
        "pairingTopic": "3c74583111ab5e006b03cbb0f252c667686e9fc01e675dff90aa8b18ec435feb",
        "expiry": 1675734962,
        "requiredNamespaces": {
            "eip155": {
                "methods": [
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData"
                ],
                "chains": [
                    "eip155:5"
                ],
                "events": [
                    "chainChanged",
                    "accountsChanged"
                ]
            }
        },
        "relays": [
            {
                "protocol": "irn"
            }
        ],
        "proposer": {
            "publicKey": "a3ad5e26070ddb2809200c6f56e739333512015bceeadbb8ea1731c4c7ddb207",
            "metadata": {
                "description": "React App for WalletConnect",
                "url": "http://localhost:3000",
                "icons": [
                    "https://avatars.githubusercontent.com/u/37784886"
                ],
                "name": "React App"
            }
        }
    }
}
```

### session_request

A dapp triggers an event when it requires the wallet to carry out a specific action, such as signing a transaction. The event includes a `topic` and a `request` object, which will differ based on the requested action.

```ts
await client.request({
          topic: session.topic,
          chainId: "eip155:5"
          request: {
            method: "eth_signTransaction",
            params: [
                {
                    from: "0x1456225dE90927193F7A171E64a600416f96f2C8",
                    to: "0x1456225dE90927193F7A171E64a600416f96f2C8",
                    data: "0x",
                    nonce: "0x00",
                    gasPrice: "0xbb5e",
                    gas: "0x5208",
                    value: "0x00"
            }],
        },
    })
```

Here's an example of a payload from a `session_request` when the request is for `eth_signTransaction`. Keep in mind, the request will vary depending on the method.

```ts
{
    "id": 1675761658561934,
    "topic": "95d6aca451b8e3c6d9d176761bf786f1cc0a6d38dffd31ed896306bb37f6ae8d",
    "params": {
        "request": {
            "method": "eth_signTransaction",
            "params": [
                {
                    "from": "0x1456225dE90927193F7A171E64a600416f96f2C8",
                    "to": "0x1456225dE90927193F7A171E64a600416f96f2C8",
                    "data": "0x",
                    "nonce": "0x00",
                    "gasPrice": "0xa72c",
                    "gasLimit": "0x5208",
                    "value": "0x00"
                }
            ]
        },
        "chainId": "eip155:5"
    }
}
```

### session_update

Updating the session is possible by adding a new chain, method, or event.

Here's an example. The user has a session that appears as follows. From this object, we can deduce that the user is connected to the Goerli Network, as indicated by `currentRequiredNamespace.eip155.chains` value.

```ts
const currentRequiredNamespace = {
  eip155: {
    methods: [
      "eth_sendTransaction",
      "eth_signTransaction",
      "eth_sign",
      "personal_sign",
      "eth_signTypedData",
    ],
    chains: ["eip155:5"],
    events: ["chainChanged", "accountsChanged"],
  },
};
```

If you want to add another chain to the session you can do so by calling `update` and passing in the session's `topic` and new namespace. Note, the new namespace can only **append** new items, it cannot remove.

```ts
const newNamespace = {
  eip155: {
    accounts: [
      // this already existed from the initial namespace
      // chain:id:walletNumber
      "eip155:5:0x1456225dE90927193F7A171E64a600416f96f2C8",
      // this is how we update the session to add a new chain
      "eip155:137:0x1456225dE90927193F7A171E64a600416f96f2C8",
    ],
    methods: [
      "eth_sendTransaction",
      "eth_signTransaction",
      "eth_sign",
      "personal_sign",
      "eth_signTypedData",
    ],
    events: ["chainChanged", "accountsChanged"],
  },
};

await signClient.update({ topic, namespaces: newNamespace });
```

Once `update` is called, `session_update` is triggered. An example payload request is as follows.

```ts
{
    "topic": "a03a89f703bf3fc12db4bd4ef1e367caabad48fbdb9351059716bf3e57319193",
    "params": {
        "namespaces": {
            "eip155": {
                "accounts": [
                    "eip155:5:0x1456225dE90927193F7A171E64a600416f96f2C8",
                    "eip155:137:0x1456225dE90927193F7A171E64a600416f96f2C8"
                ],
                "methods": [
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData"
                ],
                "events": [
                    "chainChanged",
                    "accountsChanged"
                ]
            }
        }
    }
}
```

### session_delete

This event can be triggered by either the wallet or dapp, indicating the termination of a session. Emitted only after the session has been successfully deleted, this event enables you to respond to the change and adjust your UI accordingly, such as resetting to a non-connected state. The event is activated when the disconnect method is invoked by the wallet or dapp.

```ts
await client.disconnect({
  topic: session.topic,
  reason: {
    code: 6000,
    message: "User disconnected.",
  },
});
```

An example of a payload from `session_delete`:

```ts
{
    "id": 1675757972688031,
    "topic": "4eb584221f799cdf416a6b9167e341c5cd713718125dc82ef70923ce6b0e95b5"
}
```

### session_event

This event can be triggered by either the wallet or dapp by calling the `emit` method.

```ts
await signClient.emit({
  topic,
  event: {
    name: "accountsChanged",
    data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
  },
  chainId: "eip155:5",
});
```

A payload example from `session_event`:

```ts
{
    "id": 1675759795769537,
    "topic": "95d6aca451b8e3c6d9d176761bf786f1cc0a6d38dffd31ed896306bb37f6ae8d",
    "params": {
        "event": {
            "name": "accountsChanged",
            "data": ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"]
        },
        "chainId": "eip155:5"
    }
}
```

### session_ping

This event can be emitted be either the wallet or dapp. It is emitted by calling `ping`.

```ts
await client.ping({ topic: session.topic });
```

A payload example from `session_ping`

```ts
{
    "id": 1675760005514901,
    "topic": "95d6aca451b8e3c6d9d176761bf786f1cc0a6d38dffd31ed896306bb37f6ae8d"
}
```

### session_expire

An event can be triggered by either a wallet or a dapp with the topic of a session that has expired.

A payload example from `session_expire`

```ts
{
    "topic": "95d6aca451b8e3c6d9d176761bf786f1cc0a6d38dffd31ed896306bb37f6ae8d"
}
```

### session_extend

This event can be emitted by either wallet or dapp by calling the `extend` method.

```ts
await signClient.extend({ topic });
```

A payload example from `session_extend`:

```ts
{
    "topic": "95d6aca451b8e3c6d9d176761bf786f1cc0a6d38dffd31ed896306bb37f6ae8d"
}
```

### proposal_expire

An event can be triggered by either a wallet or a dapp with the topic of a pairing that has expired.

A payload example from `proposal_expire`:

```ts
{
    "topic": "95d6aca451b8e3c6d9d176761bf786f1cc0a6d38dffd31ed896306bb37f6ae8d"
}
```
