import Table from '../../../components/Table';

# Session Events

## Events

You can set up event listeners to perform an action if these events are emitted.

<Table 
headers={[ "Event", "Description" ]}
data={[
{
    event: "session_proposal",
    description: "Emitted by the dApp when a new session with a user's wallet is initiated. The method the dapp uses is `connect`"
  },
  {
    event: "session_request",
    description: "Triggered by the dApp when it requires the wallet to perform an action, such as signing a transaction by calling the `request` method"
  },
  {
    event: "session_update",
    description: "Emitted by the wallet when a session is updated via the 'update' method"
  },
  {
    event: "session_delete",
    description: "Emitted by either the wallet or the dApp when a session is disconnected."
  },
  {
    event: "session_event",
    description: "Emitted by the dApp or wallet by calling the 'emit' or 'emitSessionEvent' method."
  },
  {
    event: "session_ping",
    description: "Emitted by the dApp to keep a session active."
  },
  {
    event: "session_expire",
    description: "Emitted by the wallet when a session has expired."
  },
  {
    event: "session_extend",
    description: "Emitted by the wallet to extend a session by calling the 'extendSession' method."
  },
  {
    event: "proposal_expire",
    description: "Emitted by the wallet when the session proposal has expired."
  }
]}
/>

### session_proposal

An event is triggered when the dapp establishes a connection with the wallet by calling the connect method. The following is the payload that the wallet can listen for. Here's an example payload when the dApp is initiating a session proposal on the Goerli Network.

```jsonc
{
    "id": 1675734656244887,
    "params": {
        "id": 1675734656244887,
        "pairingTopic": "3c74583111ab5e006b03cbb0f252c667686e9fc01e675dff90aa8b18ec435feb",
        "expiry": 1675734962,
        "requiredNamespaces": {s
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

A dApp triggers an event when it requires the wallet to carry out a specific action, such as signing a transaction. The event includes a `topic` and a `request` object, which will differ based on the requested action. 

As the request can vary, here's an example of the payload when the request is for personal_sign. The hex value of the message is stored in `request.params[0]` and the user's wallet address is stored in `request.params[1]`.

```jsonc
{
    "id": 1675736040649044,
    "topic": "15873cc9ea27883bd56bf35e7ff28067393cace9ebd8d9888f007aecca6d92f5",
    "params": {
        "request": {
            "method": "personal_sign",
            "params": [
                "0x4d7920656d61696c206973206a6f686e40646f652e636f6d202d2031363735373336303430363430",
                "0x1456225dE90927193F7A171E64a600416f96f2C8"
            ]
        },
        "chainId": "eip155:5"
    }
}
```

### session_update

Updating the session is possible by adding a new chain, method, or event.

Here's an example. The user has a session that appears as follows. From this object, we can deduce that the user is connected to the Goerli Network, as indicated by `currentRequiredNamespace.eip155.chains` value.

```typescript
const currentRequiredNamespace = {
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
}
```

If you want to add another chain to the session you can do so by calling `update` and passing in the `topic` and new namespace. Note, the new namespace can only **append** new items, it cannot remove. 


```typescript
const newNamespace = {
        "eip155": {
        "accounts": [
            // this already exsited from the initial namespace
            // chain:id:walletNumber
            "eip155:5:0x1456225dE90927193F7A171E64a600416f96f2C8",
            // this is how we update the session to add a new chain
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

await signClient.update({ topic, namespaces: newNamespace })
```

Once `update` is called, `session_update` is triggered. An example payload request is as follows.

```jsonc
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