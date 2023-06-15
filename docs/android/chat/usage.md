# Chat SDK

Chat SDK allows E2EE direct messaging between users, using their wallet address.

## Chat Sample App

We recommend looking at example implementations of Chat Sample at our [Kotlin GitHub repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/master/chat/sample)

## ChatClient

`ChatClient` is an object that interacts with the Chat SDK and implements the [ChatInterface](#chatinterface). It contains asynchronous events that notify you of occurrences, such as receiving a message, and methods that you can use with the Chat SDK, such as sending messages.


### ChatInterface

```kotlin
interface ChatInterface {

    interface ChatDelegate {
        fun onInvite(onInvite: Chat.Model.Events.OnInvite)
        fun onInviteAccepted(onInviteAccepted: Chat.Model.Events.OnInviteAccepted)
        fun onInviteRejected(onInviteRejected: Chat.Model.Events.OnInviteRejected)
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
    url = "Chat Sample URL",
    icons = /*list of icon URL strings*/,
    redirect = "kotlin-chat-wc:/request" // Custom Redirect URI
)

CoreClient.initialize(relayServerUrl = serverUrl, connectionType = connectionType, application = this, metaData = appMetaData)

val init = Chat.Params.Init(coreClient = CoreClient)

ChatClient.initialize(init) { error ->
    // Error will be thrown if there's an issue during initialization
}
```

To initialize the Chat client, create a `Chat.Params.Init` object in the `Application.onCreate` method of the Android Application class with the Core Client. Then, pass the `Chat.Params.Init` object to the [ChatClient](#chatclient) initialization function.

### ChatClient.ChatDelegate

```kotlin
val chatDelegate = object : ChatClient.ChatDelegate {
    override fun onInvite(onInvite: Chat.Model.Events.OnInvite) {
        // Triggered when a new invite is received
    }

    override fun onInviteAccepted(onInviteAccepted: Chat.Model.Events.OnInviteAccepted) {
        // Triggered when a new chat thread joined
    }

    override fun onInviteRejected(onInviteRejected: Chat.Model.Events.OnInviteRejected) {
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

#### Event Structures
```kotlin
// error of onError(error)
data class Error(val throwable: Throwable) : Model()

// state of onConnectionStateChange(state)
data class ConnectionState(val isAvailable: Boolean) : Model()

sealed class Events : Model() {
    //onInvite corresponds to ChatDelegate.onInvite() parameter
    data class OnInvite(val invite: Invite.Received) : Events()
    
    //onInviteAccepted corresponds to ChatDelegate.onInviteAccepted() parameter
    data class OnInviteAccepted(val topic: String, val invite: Chat.Model.Invite.Sent) : Events()
    
    //onInviteRejected corresponds to ChatDelegate.onInviteRejected() parameter
    data class OnInviteRejected(val invite: Chat.Model.Invite.Sent) : Events()
    
    //onMessage corresponds to ChatDelegate.onMessage() parameter
    data class OnMessage(val message: Message) : Events()
    
    //onLeft corresponds to ChatDelegate.onLeft() parameter
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

#### Invite.Sent

```kotlin
// Invite.Sent data class from OnInviteAccepted or OnInviteRejected event
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


#### Register Identity at a Keyserver

In order to use Chat SDK account must register identity in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/). To verify ownership over blockchain account when registering identities in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/) user's must sign message provided on `onSign(message: String)` callback. Currenlty only [`EIP191`](https://eips.ethereum.org/EIPS/eip-191) signatures are supported in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/)
<!-- TODO: Chat milestone 2 remove EIP191 signatures only comment -->

##### ChatClient.register
```kotlin
val params = Chat.Params.Register(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))
ChatClient.register(params, object : Chat.Listeners.Register {
    override fun onSign(message: String): Chat.Model.Cacao.Signature? {
        // Message to be signed. When user decides to sign message use CacaoSigner to sign message.
        // CacaoSigner is a util for easy message signing.
        return CacaoSigner.sign(message, /*privateKey*/, SignatureType.EIP191)
        // When users decides to not sign message return null
        return null
    }
    
    override fun onError(error: Chat.Model.Error) {
        // Error while registering an address
    }

    override fun onSuccess(publicKey: String) {
        // Identity key registered successfully
    }
})
```

To not be discoverable to everyone, set `private` in `Chat.Params.Register` to `true`. If this flag is `true` then only identity is restored in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/). Parameter `private` is set to `false` by default.

##### Chat.Params.Register with private = false
```kotlin
val params = Chat.Params.Register(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/), private = true)
```

#### Resolve invitee public invite key with blockchain address
In order to invite someone for a chat converstion, inviter must know invitee public invite key. To resolve a invitee's public invite key that is required to invite into a chat thread, call [`ChatClient.resolve`](#chatclientresolve) method.

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

#### Invite into Chat Thread

After acquiring the invitee's public key, you can send an invitation. Invitations can include short messages to encourage the invitee to accept. To send an invitation, use the [ChatClient.invite](#chatclientinvite) method. Sent invitations are stored and can be retrieved using the [ChatClient.getSentInvites](#chatclientgetsentinvites) method, which is described in the [Getting Sent Invitations](#getting-sent-invites) section.

##### `ChatClient.invite`
```kotlin
val params = Chat.Params.Invite(inviterAccount = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/)), inviteeAccount = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/), message = Chat.Type.InviteMessage(/* Opening message string that's 200 char limited */), inviteePublicKey = /*Resolved public invite key from ChatClient.resolve() method*/)
ChatClient.invite(
    params,
    onSuccess = { inviteId -> /*Id of the invite*/ },
    onError = { error -> /* Error when inviting */) }
)
```

The invitee receives invitations via the [ChatClient.ChatDelegate.onInvite](#chatclientchatdelegate) callback, which provides the necessary data to respond to the invitation. Received invitations are stored and can be retrieved using the [ChatClient.getReceivedInvites](#chatclientgetreceivedinvites) method, which is described in the [Getting Received Invitations](#getting-received-invites) section.

#### Accepting and Rejecting an Invite

The invitee has the option to accept or reject the invitation. To accept an invitation, call the [ChatClient.accept](#chatclientaccept) method. To reject an invitation, call the [ChatClient.reject](#chatclientreject) method.

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

Inviter receives invite response on either [`ChatClient.ChatDelegate.onInviteAccepted`](#chatclientchatdelegate) when invitee accepted the invite or on [`ChatClient.ChatDelegate.onInviteRejected`](#chatclientchatdelegate) when invitee rejected the invite. 

#### Sending a Chat Message

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

#### Leaving a Chat Thread

Calling [`ChatClient.leave](#chatclientleave) with a chat thread topic causes the caller to stop receiving chat messages, removal of thread in storage and removal of chat messages on given thread in storage.

##### `ChatClient.leave`

```kotlin
val params = Chat.Params.Leave(topic = /* Thread topic*/))

ChatClient.leave(params) { error -> /* Error while leaving a thread */ }
```

#### Going Private

If you don't want your account to be discoverable to everyone, you can remove its public invite key from the Keyserver. Calling the [ChatClient.goPrivate](#chatclientgoprivate) method means that your account will no longer listen for incoming invitations.

##### `ChatClient.goPrivate`

```kotlin
val params = Chat.Params.GoPrivate(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

ChatClient.goPrivate(
    params,
    onSuccess = { /* Success callback */ },
    onError = { error -> /* Error while going private */ } 
)
```

#### Going Public

If you want your account to be discoverable to everyone, you can add its public invite key to the Keyserver. Calling the [ChatClient.goPublic](#chatclientgopublic) method means that your account will start listening for incoming invitations.

##### `ChatClient.goPublic`

```kotlin
val params = Chat.Params.GoPublic(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

ChatClient.goPublic(
    params,
    onSuccess = { /* Success callback */ },
    onError = { error -> /* Error while going Public */ } 
)
```

#### Unregistering Identity

To stop using the Chat SDK on a device, the account should call the [ChatClient.unregister](#chatclientunregister) method. This removes the identity key that was assigned to the device.

##### `ChatClient.unregister`

```kotlin
val params = Chat.Params.Unegister(account = Chat.Type.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))

ChatClient.unregister(params, object : Chat.Listeners.Unregister {
    override fun onSign(message: String): Chat.Model.Cacao.Signature? {
        // Message to be signed. When user decides to sign message use CacaoSigner to sign message.
        // CacaoSigner is a util for easy message signing.
        return CacaoSigner.sign(message, /*privateKey*/, SignatureType.EIP191)
        // When users decides to not sign message return null
        return null
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

#### Getting Received Invitations

Clients can retrieve all received invitations for a given account by calling [ChatClient.getReceivedInvites](#chatclientgetreceivedinvites). [Invite.Received](#invitereceived) contains a status of type [Type.InviteStatus](#typeinvitestatus) to describe whether the invitation is still pending, was rejected, or has been approved.

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

#### Getting Sent Invites

Clients can retrieve all sent invitations for a given account by calling [`ChatClient.getSentInvites`](#chatclientgetsentinvites). [`Invite.Sent`](#invitesent) contains a status of type [`Type.InviteStatus`](#typeinvitestatus-1) to describe whether the invitation is still pending, was rejected, or has been approved.

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

#### Getting Threads

Clients can retrieve all threads for a given account by calling the [ChatClient.getThreads](#chatclientgetthreads) method. The [Model.Thread](#modelthread) object contains data on the topic that two accounts are communicating about.

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

#### Getting Messages

Clients can fetch all messages for given thread by calling [`ChatClient.getMessages`](#chatclientgetmessages). [`Model.Message`](#modelmessage) contains data neccessary to display a message. [`Model.Media`](#modelmedia) can be attached to message for versatility.

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