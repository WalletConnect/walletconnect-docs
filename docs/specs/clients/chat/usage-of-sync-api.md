# Usage of Sync API

In order to provide state synchronization between user's devices we must add [Sync API](../core/sync/readme.md) support. As per Sync API requierments user [must sign additional message](../core/sync/sync-protocol.md#generating-a-message-to-sign) to enable state synchronization. 

## Stores 

State synchronization is achieved by sharing the same key value stores among every client that user registered in Chat API. For Chat API there are following stores:

### Sent Invites Store

Store that handles synchronized state of invites that are sent by multiple clients. Whenever any client sends an invite it needs to update the store with name `com.walletconnect.chat.sentInvites` with [`SentInvite`](#sentinvite) data structure. 

#### Store Key
Key of [Sent Invite Store](#sent-invites-store) must be equal to `responseTopic` from [`SentInvite`](#sentinvite) data structure. 

#### SentInvite 

`SentInvite` structure contains minimal data required to complete [Invite Protocol](./chat-invite.md#invite-protocol). 

```jsonc
{
  "id": number,
  "message": string, 
  "inviterAccount": string,
  "inviteeAccount": string,
  "inviterPubKeyY": string,
  "inviterPrivKeyY": string,
  "status": 'pending' | 'rejected' | 'approved',
  "responseTopic": string,
  "symKey": string,
  "timestamp": number
}
```

Example `SentInvite` payload:

```jsonc
{
    "id": 1684319157629569,
    "message": "Hey there! Wanna chat?",
    "inviterAccount": "eip155:1:0x45B84Bc460Ab29691858A28d782e2fdd575A4dBb",
    "inviteeAccount": "eip155:1:0xc2256117Ed8bA25AE30061f6b001DeDCbd1BBBee",
    "inviterPubKeyY": "a579e7742c5e3efb3fa2dc092bfdeef0c877323e498423b1eabae7fb5bda9253",
    "inviterPrivKeyY": "b82c2781ba532ecd069ec89e4e7cda05c7b5dee27b6e08cdf412d22ff3d2517c",
    "status": "pending",
    "responseTopic": "0b88a80bbcd9cc4169d9d9f8cf784108d41ef7be89ef5152348941d2dbecfb89",
    "symKey": "e1e01461243ee392d847e8c7df293e88cbc4199550c0a21feec3b7651809eb13",
    "timestamp": 1684319157629569
}
```

### Threads Store

Store that handles synchronized state of chat threads that blockchain account is having. Whenever any client accepts an invite or receives response to sent invite it needs to update the store with name `com.walletconnect.chat.threads` with [`Thread`](#thread) data structure.


#### Store Key
Key of [Threads Store](#threads-store) must be equal to `topic` from [`Thread`](#thread) data structure. 

#### Thread 

`Thread` structure contains minimal data required to receive messages in chat thread

```jsonc
{
    "topic": string,
    "selfAccount": string,
    "peerAccount": string,
    "symKey": string
}
```

Example `Thread` payload:

```jsonc
{
    "topic": "1ded8a18c7e702b6eb4439ae9c3528c2d56df25a85ab5f8f289696400d2ec180",
    "selfAccount": "eip155:1:0x45B84Bc460Ab29691858A28d782e2fdd575A4dBb",
    "peerAccount": "eip155:1:0xc2256117Ed8bA25AE30061f6b001DeDCbd1BBBee",
    "symKey": "7ebf752fd66bbcc95d7f2d70b23bc470a0990f31ea3b5aca909dd63eb96535df"
}
```

### Invite Keys Store

Store that handles synchronized state of current invite key, which allows other clients to invite the blockchain account. Whenever any client registers invite key in [Keys Server](../../servers/keys/readme.md) it needs to update the store with name `com.walletconnect.chat.inviteKeys` with [`InviteKeys`](#InviteKeys) data structure.


#### Store Key
Key of [Invite Keys Store](#invite-keys-store) must be equal to `account` from [`InviteKeys`](#invitekeys) data structure. 

#### InviteKeys

`InviteKeys` structure contains minimal data required to share received invites across clients


```jsonc
{
    "publicKey": string,
    "privateKey": string,
    "account": string
}
```

Example `InviteKeys` payload:

```jsonc
{
    "publicKey": "09fea56ae6259ae51b6b5a3a080cc382453284e5f1bafe0ce48849401d25d03e",
    "privateKey": "80327450269353e1d2d13752805bd8922ef2893ff6041fe5e833ee432d1b1a4d",
    "account": "eip155:1:0x1AAe9864337E821f2F86b5D27468C59AA333C877"
}
```


### Received Invites Status Store

Store that handles synchronized state of received invites status, which allows other clients to acknowledge that some other responded already responded to invite. Whenever a client rejects received invite `com.walletconnect.chat.receivedInviteStatuses` with [`ReceivedInviteStatus`](#ReceivedInviteStatus) data structure.


#### Store Key
Key of [Received Invites Status Store](#received-invites-status-store) must be equal to `id` from [`ReceivedInviteStatus`](#receivedinvitestatus) data structure. 

#### ReceivedInviteStatus

`ReceivedInviteStatus` structure contains minimal data required to share received invites updates across clients

```jsonc
{
    "id": number,
    "status": string,
}
```

Example `ReceivedInviteStatus` payload:

```jsonc
{
    "id": 12325311235235,
    "status": "approved",
}
```

## Handling multiclient Chat Requests and Responses

In a multiclient environment there are clients that didn't send a `JsonRpcRequest` but must be able to handle `JsonRpcResponse`. For instance, when user A wants to invite user B to chat thread. User A uses his mobile device A1 and sends an `JsonRpcRequest` for all user B devices, in meantime his desktop client A2 gets an update about the invite that was sent. Since A1 send a `JsonRpcRequest` it has a protection against duplicate/multiple `JsonRpcResponse` coming from B clients. A2 which didn't send the request must firstly ensure that protection and also have all necessary data required to act on the response.


### Invite Protocol in multiclient environment


A1,A2 - clients that have access A blockchain account keys.
Ax - all clients that have access B blockchain account keys. 
B1,B2 - clients that have access B blockchain account keys. 
Bx - all clients that have access B blockchain account keys. 

A1 retrieves the public key associated with B's blockchain account, publicKey X.
A1 generates a keyPair Y to encrypt the invite with derived DH symKey I.
A1 sends invite encrypted with type 1 envelope to the invite topic including publicKey Y.
A2 get updated with sent invite that contains response topic and symKey I and privKeyY

Invite topic is derived as the hash of the publicKey X.

B1 decrypts type 1 envelope with the privateKey X and publicKey Y and deriving DH symKey I.
B1 accepts the invite and generates a keyPair Z for chat thread.
B1 sends response with publicKey Z on response topic encrypted with type 0 envelope.

Response topic is derived as the hash of the symKey I.

B1 derives symKey T using publicKey Y and privKey Z.
B1 updates thread storage
B2 get updated with thread that contains topic, selfAccount, peerAccount and symKey T
B2 needs to update status (or remove) of received invite with peerAccount

Thread topic is derived as the hash of the symKey T.

Ax receives response which includes publicKey Z.
Ax derives symKey T using privKey Y and publicKey Z.
Ax tries to update thread storage if not yet updated

Ax and Bx both subscribe to thread topic and encrypt messages with symKey T.

### Receiving Messages in multiclient environment

A1,A2 - clients that have access A blockchain account keys.
Ax - all clients that have access A blockchain account keys. 
B1,B2 - clients that have access B blockchain account keys. 
Bx - all clients that have access B blockchain account keys.

Whenever A1 sends a message to blockchain account B, all Bx clients receive it as [`wc_chatMessage request`](./rpc-methods.md#wc_chatmessage), and then responds with [`wc_chatMessage response`](./rpc-methods.md#wc_chatmessage) to blockchain account Ax clients that it received the message. In multiclient environment any Ax client, that didn't send the message also receives [`wc_chatMessage request`](./rpc-methods.md#wc_chatmessage) however they shouldn't respond with [`wc_chatMessage response`](./rpc-methods.md#wc_chatmessage) unless the device also has account B registered within the Chat Client.
