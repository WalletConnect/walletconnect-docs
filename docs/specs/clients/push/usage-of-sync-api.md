# Usage of Sync API

In order to provide state synchronization between a user's devices we must add [Sync API](../core/sync/readme.md) support. As per Sync API requirements, the user [must sign an additional message](../core/sync/sync-protocol.md#generating-a-message-to-sign) to enable state synchronization. 

## Stores 

State synchronization is achieved by sharing the same key value stores among every client that the user
registered in Push API. For Push API there are the following stores:


### Push Subscription Store

#### Store Name
`com.walletconnect.notify.pushSubscription`

#### Store Key

Key of [Push Subscription Store](#push-subscription-store) must be equal to `topic` from
[`PushSubscription`](#pushsubscription) data structure. 

#### PushSubscription

```typescript
interface PushSubscription {
    topic: string;
    account: string;
    relay: RelayerTypes.ProtocolOptions;
    metadata: Metadata;
    scope: ScopeMap;
    expiry: number;
    selfPublicKey: string;
    selfPrivateKey: string;
    dappPublicKey: string;
}
```

### Push Proposal Store

#### Store Name
`com.walletconnect.notify.pushProposal`

#### Store Key

Key of [Push Proposal Store](#push-proposal-store) must be equal to `responseTopic` from
[`PushProposal`](#pushproposal) data structure. 

#### PushProposal

```typescript
interface PushProposal {
    publicKey: string;
    privateKey: string;
    responseTopic: stirng;
    metadata: PushClientTypes.Metadata;
    account: string;
    scope: string[];
 }
 ```

### Push Subscription Protocol in multiclient environment

#### Definitions
- W1 - clients that have access to W (Wallet) blockchain account keys.
- Wx - peer clients that have access to W (Wallet) blockchain account keys. 

#### Pre-requisities
The Push subscribe flow will require a dapp to host a static json file which will contain a DID document compliant with `did:web` method as specified [here](https://w3c-ccg.github.io/did-method-web/). In this DID document we will specify a X25519 public key that will be used by the Push API protocol to derive a symmetric key for the Push topic.

#### Protocol
Subscribe protocol will be established as follows:

1. W1 fetches public key X from the did:web document
2. Subscribe topic is derived from the sha256 hash of public key X
3. W1 generates key pair Y
4. W1 derives symmetric key S with keys X and Y
5. W1 sends push subscribe request (type 1 envelope) on subscribe topic with subscriptionAuth
7. Response topic is derived from the sha256 hash of symmetric key S
8. W1 subscribes to response topic
10. Cast Server receives push subscribe request on subscribe topic
11. Cast Server derives symmetric key S and decrypts subscriptionAuth
12. Cast Server triggers webhook to notify Dapp of new registered address
13. Cast Server generates key pair Z
14. Cast Server derives symmetric key P with keys Y and Z
15. Cast Server responds to push subscribe request on response topic
16. W1, Wx receives push subscribe response on the response topic
17. W1 derives symmetric key P
18. Push topic is derived from the sha256 hash of the symmetric key P
19. W1 subscribes to push topic for future push messages
20. W1 syncs the push subscription with Wx
21. Wx stores the push subscription
22. Wx subscribe to push topic coming from the sync request.

### Push Proposal Protocol in multiclient environment

**WIP**: It is unclear whether or not we want to sync push proposals

Although syncing proposals may seem redundant, due to the fact that wallets already listen to push
proposals on a pairing topic, this topic is generated at random and not derived from the blockchain
account. Therefore, not all peers sharing the same blockchain account will receive the proposal.

#### Definitions
- W1 - *Client performing approve* that have access W (Wallet) blockchain account keys.
- Wx - peer clients that have access W (Wallet) blockchain account keys. 

#### Pre-requisities
W1 and Dapp are required to establish pairing topic before proceeding to Push protocol execution.

Additionally Wallet must meet the pre-requisites for [Push Subscribe](./push-subscribe.md) to complete this flow.

#### Protocol
Proposal protocol will be established as follows:

1. Dapp generates keypair X
2. Dapp sends push proposal on pairing topic with public key X, relay, metadata and scope
3. W1 receives push proposal with public key X on pairing topic
4. W1 generates key pair Y
5. W1 derives symmetric key with keys X and Y
6. W1 syncs proposal with Wx
7. Push topic is derived from sha256 hash of symmetric key 
8. W1 sends push subscribe request to Push Server with subscriptionAuth
9. W1 generates key pair Z
10. Response topic is derived from hash of public key X
11. W1 responds with type 1 envelope on response topic to Dapp with subscriptionAuth and subscription symmetric key
12. Dapp receives the response and derives a subscription topic from sha256 hash of subscription symmetric key
13. Dapp subscribes for subscription topic to receive subscription updates published by the wallet


