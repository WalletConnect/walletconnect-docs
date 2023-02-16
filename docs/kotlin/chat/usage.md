# Chat SDK

Chat SDK allows E2EE direct messaging between users, using their wallet address.

## Chat Sample App

We recommend looking at example implementations of Chat Sample at our [Kotlin Github repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/chat/sample)

## ChatClient

`ChatClient` which implements [`ChatInterface`](#chatinterface) is a object to interact with Chat SDK. It contains asynchronous events informing occurance of an event i.e. received message and methods to use the Chat SDK i.e. sending messages. 

##### ChatInterface
```kotlin
interface ChatInterface {

    interface ChatDelegate {
        fun onInvite(onInvite: Chat.Model.Events.OnInvite)
        fun onJoined(onJoined: Chat.Model.Events.OnJoined)
        fun onReject(onReject: Chat.Model.Events.OnReject)
        fun onMessage(onMessage: Chat.Model.Events.OnMessage)
        fun onLeft(onLeft: Chat.Model.Events.OnLeft)
        fun onConnectionStateChange(state: Chat.Model.ConnectionState)
        fun onError(error: Chat.Model.Error)
    }

    fun setChatDelegate(delegate: ChatDelegate)

    fun initialize(init: Chat.Params.Init, onError: (Chat.Model.Error) -> Unit)
    fun register(register: Chat.Params.Register, listener: Chat.Listeners.Register)
    fun unregister(unregister: Chat.Params.Unregister, listener: Chat.Listeners.Unregister)
    fun resolve(resolve: Chat.Params.Resolve, listener: Chat.Listeners.Resolve)
    fun goPrivate(goPrivate: Chat.Params.GoPrivate, onSuccess: () -> Unit, onError: (Chat.Model.Error) -> Unit)
    fun goPublic(goPublic: Chat.Params.GoPublic, onSuccess: (String) -> Unit, onError: (Chat.Model.Error) -> Unit)
    fun invite(invite: Chat.Params.Invite, onSuccess: (Long) -> Unit, onError: (Chat.Model.Error) -> Unit)
    fun accept(accept: Chat.Params.Accept, onSuccess: (String) -> Unit, onError: (Chat.Model.Error) -> Unit)
    fun reject(reject: Chat.Params.Reject, onError: (Chat.Model.Error) -> Unit)
    fun message(message: Chat.Params.Message, onError: (Chat.Model.Error) -> Unit)
    fun ping(ping: Chat.Params.Ping, onSuccess: (String) -> Unit, onError: (Chat.Model.Error) -> Unit)
    fun leave(leave: Chat.Params.Leave, onError: (Chat.Model.Error) -> Unit)
    fun setContact(setContact: Chat.Params.SetContact, onError: (Chat.Model.Error) -> Unit)
    fun getReceivedInvites(getReceivedInvites: Chat.Params.GetReceivedInvites): Map<Long, Chat.Model.Invite.Received>
    fun getSentInvites(getSentInvites: Chat.Params.GetSentInvites): Map<Long, Chat.Model.Invite.Sent>
    fun getThreads(getThreads: Chat.Params.GetThreads): Map<String, Chat.Model.Thread>
    fun getMessages(getMessages: Chat.Params.GetMessages): List<Chat.Model.Message>
}
```

### Initialize Chat Client

```kotlin
val projectId = "" // Get Project ID at https://cloud.walletconnect.com/
val relayUrl = "relay.walletconnect.com"
val serverUrl = "wss://$relayUrl?projectId=$projectId"
val connectionType = ConnectionType.AUTOMATIC or ConnectionType.MANUAL
val appMetaData = Core.Model.AppMetaData(
    name = "Chat Sample",
    description = "Chat Sample description",
    url = "Chat Sample Url",
    icons = /*list of icon url strings*/,
    redirect = "kotlin-chat-wc:/request" // Custom Redirect URI
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)

val init = Chat.Params.Init(coreClient = CoreClient)

ChatClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

To initialize the Chat client, create a `Chat.Params.Init` object in the Android Application class in the `Application.onCreate` method with the Core Client. The `Chat.Params.Init` object will then be passed to the [`ChatClient`](#chatclient) initialize function.

### ChatClient.ChatDelegate

```kotlin
val chatDelegate = object : ChatClient.ChatDelegate {
    override fun onInvite(onInvite: Chat.Model.Events.OnInvite) {
        // Triggered when a new invite is received
    }

    override fun onJoined(onJoined: Chat.Model.Events.OnJoined) {
        // Triggered when a new chat thread joined
    }

    override fun onReject(onReject: Chat.Model.Events.OnReject) {
        // Triggered when an invite is rejected by the other peer
    }

    override fun onMessage(onMessage: Chat.Model.Events.OnMessage) {
        // Triggered when a new chat message is received
    }

    override fun onLeft(onLeft: Chat.Model.Events.OnLeft) {
        // Triggered when a chat thread is left by a peer
    }

    override fun onConnectionStateChange(state: Chat.Model.ConnectionState) {
        //Triggered whenever the connection state with Relay Server is changed
    }

    override fun onError(error: Chat.Model.Error) {
        // Triggered whenever there is an issue inside the SDK
        // I.e failure to subsribe to a topic
    }
}
ChatClient.setChatDelegate(chatDelegate)
```

The ChatClient needs a [`ChatClient.ChatDelegate`](#chatclientchatdelegate) passed to it for it to be able to expose asynchronous updates sent from the other peer.

### Chat.Model.Events

The contents of [`ChatClient.ChatDelegate`](#chatclientchatdelegate) callback functions are of type [`Chat.Model.Events`](#event-structures) for chat specific events and [`Chat.Model.ConnectionState`](#event-structures) or [`Chat.Model.Error`](#event-structures) for Relay Server specific events. 

#### Event structures
```kotlin
// error of onError(error)
data class Error(val throwable: Throwable) : Model()

// state of onConnectionStateChange(state)
data class ConnectionState(val isAvailable: Boolean) : Model()

sealed class Events : Model() {
    //onInvite of onInvite(onInvite)
    data class OnInvite(val invite: Invite.Received) : Events()
    
    //onJoined of onJoined(onJoined)
    data class OnJoined(val topic: String) : Events()
    
    //onReject of onReject(onReject)
    data class OnReject(val topic: String) : Events()
    
    //onMessage of onMessage(onMessage)
    data class OnMessage(val message: Message) : Events()
    
    //onLeft of onLeft(onLeft)
    data class OnLeft(val topic: String) : Events()
}
```
#### Invite.Received
```kotlin
// Invite.Received data class from OnInvite event
data class Received(
    override val id: Long,
    override val inviterAccount: Type.AccountId,
    override val inviteeAccount: Type.AccountId,
    override val message: Type.InviteMessage,
    override val inviterPublicKey: String,
    override val inviteePublicKey: String,
    override val status: Type.InviteStatus,
) : Invite
```
#### Message
```kotlin
// Mesage data class from OnMessage event
data class Message(
    val topic: String,
    val message: Type.ChatMessage,
    val authorAccount: Type.AccountId,
    val timestamp: Long,
    val media: Media?,
) : Model()

// Media data class from Message data class
data class Media(
    val type: String,
    val data: Type.MediaData,
) : Model()
```
### Methods

#### Register identity at a Keyserver

In order to use Chat SDK account must register identity in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/). To verify ownership over blockchain account when registering identities in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/) user's must sign message provided on `onSign(message: String)` callback. Currenlty only [`EIP191`](https://eips.ethereum.org/EIPS/eip-191) signatures are supported in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/)
<!-- TODO: Chat milestone 2 remove EIP191 signatures only comment -->

##### ChatClient.register
```kotlin
val params = Chat.Params.Register(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))
ChatClient.register(params, object : Chat.Listeners.Register {
    override fun onSign(message: String): Chat.Model.Cacao.Signature {
        //Message to be signed. CacaoSigner is a util for easy message signing.
        return CacaoSigner.sign(message, /*privateKey*/, SignatureType.EIP191)
    }
    
    override fun onError(error: Chat.Model.Error) {
        //Error while registering an address
    }

    override fun onSuccess(publicKey: String) {
        //Identity Key registered succesfully
    }
})
```

To not be discoverable to everyone set `private` in `Chat.Params.Register` to `true`. If this flag is `true` then only identity is restored in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/). Parameter `private` is set to `false` by default.

##### Chat.Params.Register with private = false
```kotlin
val params = Chat.Params.Register(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/), private = true)
```

#### Resolve invitee public invite key with blockchain address
In order to invite someone for a chat converstion, inviter must know invitee public invite key. To resolve a invitee public invite key that is required invite into a chat thread, call [`ChatClient.resolve`](#chatclientresolve) method.

##### `ChatClient.resolve`
```kotlin
val params = Chat.Params.Resolve(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))
ChatClient.resolve(params), object : Chat.Listeners.Resolve {
    override fun onError(error: Chat.Model.Error) {
        //Error occurred
    }

    override fun onSuccess(publicKey: String) {
        //Public key found for given account address
    }
})
```

#### Invite into chat thread

Once acquired invitee public key, sending an invite is possible. Invites can contain short messages to convince invitee to accept the invite. To invite call [`ChatClient.invite`](#chatclientinvite) method. Sent invites are stored and can be fetched with [`ChatClient.getSentInvites`](#chatclientgetsentinvites) described in [Getting sent invites section](#getting-sent-invites)

##### `ChatClient.invite`
```kotlin
val params = Chat.Params.Invite(inviterAccount = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/)), inviteeAccount = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/), message = Chat.Type.InviteMessage(/* Opening message string that's 200 char limited */), inviteePublicKey = /*Resolved public invite key from ChatClient.resolve() method*/)
ChatClient.invite(
    params,
    onSuccess = { inviteId -> /*Id of the invite*/ },
    onError = { error -> /* Error when inviting */) }
)
```

Invitee receives invites on [`ChatClient.ChatDelegate.onInvite`](#chatclientchatdelegate) callback with necessary data to respond to an invite. Received invites are stored and can be fetched with [`ChatClient.getReceivedInvites`](#chatclientgetreceivedinvites) described in [Getting received invites section](#getting-received-invites)

#### Accepting and rejecting an invite

Invitee has a option to accept or reject invitation. To accept an invite call [`ChatClient.accept`](#chatclientaccept) method. To reject an invite call [`ChatClient.reject`](#chatclientreject) method

##### `ChatClient.accept`
```kotlin
val acceptParams = Chat.Params.Accept(inviteId = /*Id of invite received onInvite() event in ChatDelegate*/)
ChatClient.accept(acceptParams,
    onSuccess = { threadTopic -> /* Thread topic */ },
    onError = { error -> /* Error when accepting */ })
```

##### `ChatClient.reject`
```kotlin
val params = Chat.Params.Reject(inviteId = /*Id of invite received onInvite() event in ChatDelegate*/)
ChatClient.reject(params, onError = { error -> /* Error when rejecting */ })
```

Inviter receives invite response on either [`ChatClient.ChatDelegate.onJoined`](#chatclientchatdelegate) when invitee accepted the invite or on [`ChatClient.ChatDelegate.onReject`](#chatclientchatdelegate) when invitee rejected the invite. 

#### Sending a chat message

After succesful invite inviter and invitee can E2EE direct messages with attached media. To send message call [`ChatClient.message`](#chatclientmessage) method. 

##### `ChatClient.message`
```kotlin
val threadTopic = /*thread topic*/
val message = Chat.Type.ChatMessage(message = /* Message string that's 1000 char limited */)
// Optional media parameter
val media = Chat.Type.Media(type = /* Type of media */, data = /* Media data string that's 500 chat limited */)
val params = Chat.Params.Message(threadTopic, message, media)

ChatClient.message(params) { error -> /* Error while sending a message */ }
```

#### Leaving a chat thread

Calling [`ChatClient.leave](#chatclientleave) with a chat thread topic means no longer receiving chat messages, removal of thread in storage and removal of chat messages on given thread in storage.

##### `ChatClient.leave`
```kotlin
val params = Chat.Params.Leave(topic = /* Thread topic*/))

ChatClient.leave(params) { error -> /* Error while leaving a thread */ }
```

#### Going private

To not be discoverable to everyone, account can decide to remove it's public invite key from Keyserver. Calling [`ChatClient.goPrivate`](#chatclientgoprivate) means no longer listening on incoming invites. 

##### `ChatClient.goPrivate`
```kotlin
val params = Chat.Params.GoPrivate(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

ChatClient.goPrivate(
    params,
    onSuccess = { /* Success callback */ },
    onError = { error -> /* Error while going private */ } 
)
```

#### Going public

To be discoverable to everyone, account can decide to add it's public invite key from Keyserver. Calling [`ChatClient.goPublic`](#chatclientgopublic) means start listening on incoming invites. 

##### `ChatClient.goPublic`
```kotlin
val params = Chat.Params.GoPublic(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

ChatClient.goPublic(
    params,
    onSuccess = { /* Success callback */ },
    onError = { error -> /* Error while going Public */ } 
)
```

#### Unregistering identity

To opt out of using Chat SDK on device account should call [`ChatClient.unregister`](#chatclientunregister). This removes identity key assigned to the device.

##### `ChatClient.unregister`
```kotlin
val params = Chat.Params.Unegister(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

ChatClient.unregister(params, object : Chat.Listeners.Unregister {
    override fun onSign(message: String): Chat.Model.Cacao.Signature {
        //Message to be signed. CacaoSigner is a util for easy message signing.
        return CacaoSigner.sign(message, /*privateKey*/, SignatureType.EIP191)
    }
    
    override fun onError(error: Chat.Model.Error) {
        //Error while unregistering an address
    }

    override fun onSuccess(publicKey: String) {
        //Identity key unregistered sucesfully
    }
})
```
<!-- Add once we implement it -->
<!-- ### Adding Contact -->


#### Getting received invites

Clients can fetch all received invites for given account by calling [`ChatClient.getReceivedInvites`](#chatclientgetreceivedinvites). [`Invite.Received`](#invitereceived) contain status of type [`Type.InviteStatus`](#typeinvitestatus) to describe whether it's still pending, was rejected or approved. 

##### Type.InviteStatus
```kotlin
enum class InviteStatus : Type { 
    PENDING, // Invite that was not yet responded to
    REJECTED, // Invite that was rejected by client
    APPROVED // Invite that was approved by client
}
```

##### `ChatClient.getReceivedInvites`
```kotlin
val params = Chat.Params.GetReceivedInvites(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

val receivedInvites: Map<Long, Chat.Model.Invite.Received> = ChatClient.getReceivedInvites(params)
```

#### Getting sent invites

Clients can fetch all sent invites for given account by calling [`ChatClient.getSentInvites`](#chatclientgetsentinvites). [`Invite.Sent`](#invitesent) contain status of type [`Type.InviteStatus`](#typeinvitestatus-1) to describe whether it's still pending, was rejected or approved. 

##### Type.InviteStatus
```kotlin
enum class InviteStatus : Type { 
    PENDING, // Invite that was not yet responded to
    REJECTED, // Invite that was rejected by client
    APPROVED // Invite that was approved by client
}
```

##### Invite.Sent
```kotlin
// Invite.Sent data class
data class Sent(
    override val id: Long,
    override val inviterAccount: Type.AccountId,
    override val inviteeAccount: Type.AccountId,
    override val message: Type.InviteMessage,
    override val inviterPublicKey: String,
    override val inviteePublicKey: String,
    override val status: Type.InviteStatus,
) : Invite
```

##### `ChatClient.getSentInvites`
```kotlin
val params = Chat.Params.GetSentInvites(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

val sentInvites: Map<Long, Chat.Model.Invite.Sent> = ChatClient.getSentInvites(params)
```

#### Getting threads

Clients can fetch all threads for given acconut by calling [`ChatClient.getThreads`](#chatclientgetthreads). [`Model.Thread`](#modelthread) contains data on what topic two account communicate

##### `Model.Thread`
```kotlin
data class Thread(
    val topic: String,
    val selfAccount: Type.AccountId,
    val peerAccount: Type.AccountId,
) : Model()
```

##### `ChatClient.getThreads`
```kotlin
val params = Chat.Params.GetThreads(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

val threads: Map<String, Chat.Model.Thread> = ChatClient.getThreads(params)
```

#### Getting messages


Clients can fetch all messages for given thread by calling [`ChatClient.getMessages`](#chatclientgetmessages). [`Model.Message`](#modelmessage) contains data neccessary to display a message. [`Model.Media`](#modelmedia) can be attached to message for versatility 

##### `Model.Message`
```kotlin
data class Message(
    val topic: String,
    val message: Type.ChatMessage,
    val authorAccount: Type.AccountId,
    val timestamp: Long,
    val media: Media?,
) : Model()
```

##### `Model.Media`
```kotlin
data class Media(
    val type: String,
    val data: Type.MediaData,
) : Model()
```

##### `ChatClient.getMessages`
```kotlin
val params = Chat.Params.GetMessages(topic = /*Thread topic*/))

val messages: List<Chat.Model.Message> = ChatClient.getMessages(params)
```