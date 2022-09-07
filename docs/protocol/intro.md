# Introduction


## Relay Server Protocol and DApp-Wallet Protocol Overview

Communication between DApp and Wallets occur through a relay server (known as bridge in v1) (see [architecture](./tech-spec.md#architecture)).
To communicate through the server in a secure way,
DApps and wallet share an out-of-band URI which contains information:
- used to identify the communication channel/topic to subscribe to.
- which helps to setup the secure tunnel over the channel. Once the secure channel is setup, management and configuration information can be sent and received between DApps and wallets.


In V2, the Wallet Connect relay socket address is `wss://relay.walletconnect.com/?projectId=<PROJECT_ID>`.
To test the endpoint using HTTP, add `/hello` to the url path - `https://relay.walletconnect.com/hello?projectId=<PROJECT_ID>`

There are two types of Json Messages - The Relay Messages and the DApp-Wallet Protocol Messages.

### [DApp-Wallet (DW) Protocol Messages](../protocol/client-communication.md)
These are JSON objects that hold information (e.g session and pairing info - SessionPropose, PairingPropose) transmitted between DApps and Wallets.
The DW protocols are used to establish and manage device pairing and app sessions.
[The Technical Specification](./tech-spec.md) contains a detailed overview of the proceedures used in establishing pairing and session.


#### Example of a DW Protocol Message ([WCPairingUpdateRequest](./client-communication#wc_pairingupdate)):
```json
{
  "id": 1644814984137609,
  "jsonrpc": "2.0",
  "method": "wc_pairingUpdate",
  "params": {
    "topic": "e81572b6d8f358b08ae88edb16aa446635911bb1760f53a90f9e715f1a5623f1",
    "state": {
      "metadata": {
        "description": "React Wallet for WalletConnect",
        "url": "https://react-wallet.walletconnect.com",
        "icons": ["https://react-wallet.walletconnect.com/favicon.ico"],
        "name": "React Wallet"
      }
    }
  }
}
```

### [Relay Protocol Messages](../api/relay-server.md) 
These are JSON objects that are used to communicate with the Relay server. The relay server acts as a tunnel for tunneling/passing messages between DApps and wallets.

#### Example of a Relay Message  ( [WakuSubscriptionRequest](../api/relay-server.md#subscription)):
```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "waku_subscription",
  "params": {
    "id": "string",
    "data": {
      "topic": "string",
      "message": "string",
    }
  }
}
```

Since DApp-Wallet(DW) protocol messages are tunneled through Relay servers, this means Relay messages wraps DW messages before being tunneled over a relay server to the other party. Using the examples above, a complete message sent from one party to the other - Wallet to DApp - in this example, will look like:

```json
{ // --- WakuSubscriptionRequest
  "id": 1,
  "jsonrpc": "2.0",
  "method": "waku_subscription",
  "params": {
    "id": "2087",
    "data": {
      "topic": "b08ae88edb16aa446635911be81572b6d8f358b1760f53a90f9e715f1a5623f1",
      // --- begin of DW Message
      "message": { // --- WCPairingUpdateRequest
        "id": 1644814984137609,
        "jsonrpc": "2.0",
        "method": "wc_pairingUpdate",
        "params": {
          "topic": "e81572b6d8f358b08ae88edb16aa446635911bb1760f53a90f9e715f1a5623f1",
          "state": {
            "metadata": {
              "description": "React Wallet for WalletConnect",
              "url": "https://react-wallet.walletconnect.com",
              "icons": ["https://react-wallet.walletconnect.com/favicon.ico"],
              "name": "React Wallet"
            }
          }
        }
      }
    }
    // --- end of DW Message
  }
}

```

## Types of Relay Protocol Messages:
- The Subscribe Protocol: When a DApp/Wallet initiates a websocket connection to the relay server, it needs to inform the relay server about a topic in which it wants to listen to and receive messages from other partner. The server is informed of this topic using the subscribe protocol message. For Wallet Connect Relay server, this information is shared with the relay server using [WakuSubscribeRequest](../api/relay-server.md#subscribe).

- The Unsubscribe Protocol: Used to inform the relay server when to release resources and stop active listening on a subscribed topic. For Wallet Connect Relay server, this server is informed to unsubscribe using the [WakuUnsubscribeRequest](../api/relay-server.md#unsubscribe).
  
- The Subscription Protocol: After subscribing to a topic using the WakuSubscribeRequest, Incoming messages are routed using the Subscription protocol. For Wallet Connect Relay Server, this means the DW messages are wrapped in [WakuSubscriptionRequest's](../api/relay-server.md#subscription) `message` field as the message payload.
  
- The Publish Protocol: When sending messages to the other party (DApp or Wallet). Use the publish protocol message. In Wallet Connect Relay Server, the [WakuPublishRequest](../api/relay-server.md#publish) is used. The DW Message serves as the `message` content/payload in the WakuPublishRequest protocol.


## V2 Out-of-band URI Format
V2 out-of-band URI format is 
`wc:topic@version?<UriParameters>` where the [UriParameters](./tech-spec.md#pairing-signal) are url encoded similar to query URL parameters. For example, a Wallet Connect out-of-band URI with expanded URL results to 
```
wc:<256_BIT_TOPIC>@2?publicKey=<X25519_PUBLIC_KEY>&relay={"protocol":"waku"}&controller=<BOOLEAN>
```

**Note**: With the UriParameters encoded, a typical WC URI looks like 
```shell
wc:f49107703833dd352e3a8253a3108a7868f60aaf43134557d10df3ca6b780026@2?controller=false&publicKey=b71698c026788b09632627c708b8202e18de606fd098a898efc0f45805ada07b&relay=%7B%22protocol%22%3A%22waku%22%7D
```

The relay server URL is ommitted from the out-of-band WC URI because the relay server URL is expected to be preset for both parties before pairing. When using the Waku relay protocol, the server URL defaults to the Wallet Connect URL - `https://relay.walletconnect.com/`.

When deploying the relay server in a private environment, it is expected that the URL of the private environment is updated within the mobile SDK's initialisation function by the developer.  


## More on protocols
- [Glossary](./glossary.md) -  Terminologies and meaning
- [Client Communication](./client-communication.md) - Types and formats of DW Message protocol.
- [Technical Specification](./tech-spec.md) - Architecture and protocol.
- [Relay Server API](./../api/relay-server.md) - Relay server message format