# Chat Sample App

We recommend looking at example implementations of CHat Sample at our [Kotlin Github repository](https://github.com/WalletConnect/WalletConnectKotlinV2/tree/develop/chat/sample)

### **Initialize Chat Client**

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

To initialize the Chat client, create a `Chat.Params.Init` object in the Android Application class in the `onCreate` method with the Core Client. The `Chat.Params.Init` object will then be passed to the `ChatClient`initialize function.

### **ChatClient.ChatDelegate**

```kotlin
val chatDelegate = object : ChatClient.ChatDelegate {
    override fun onInvite(onInvite: Chat.Model.Events.OnInvite) {
        // Triggered when a new invite is received
    }

    override fun onJoined(onJoined: Chat.Model.Events.OnJoined) {
        // Triggered when a new chat thread joined
    }

    override fun onReject(onReject: Chat.Model.Events.OnReject) {
        // Triggered when a invite is rejected by the other peer
    }

    override fun onMessage(onMessage: Chat.Model.Events.OnMessage) {
        // Triggered when a new chat message is received
    }

    override fun onLeft(onLeft: Chat.Model.Events.OnLeft) {
        // Triggered when a chat thread is left by a peer
    }

    override fun onConnectionStateChange(state: Sign.Model.ConnectionState) {
        //Triggered whenever the connection state is changed
    }

    override fun onError(error: Sign.Model.Error) {
        // Triggered whenever there is an issue inside the SDK
    }
}
ChatClient.setChatDelegate(chatDelegate)
```

The ChatClient needs a `ChatClient.ChatDelegate` passed to it for it to be able to expose asynchronous updates sent from the other peer.

#
## **Methods**

### **Register address at a key server**

To make a user's account publicly discoverable, one must register his account on a public key server. Keyserver will create a record of an account and client-generated public key that will be used for peer key exchange during thread creation.

```kotlin
val register = Chat.Params.Register(Chat.Model.AccountId(account = /*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/))
ChatClient.register(register, object : Chat.Listeners.Register {
    override fun onError(error: Chat.Model.Error) {
        //Error while registering an address
    }

    override fun onSuccess(publicKey: String) {
        //Address registered successfully
    }
})
```

### **Register peer's public key with it's address**

To resolve a peer's public key that you will need to invite him into a chat thread, call resolve method.

```kotlin
val resolve = Chat.Params.Resolve(Chat.Model.AccountId(account = /*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/)
ChatClient.resolve(resolve), object : Chat.Listeners.Resolve {
    override fun onError(error: Chat.Model.Error) {
        //Error occurred
    }

    override fun onSuccess(publicKey: String) {
        //Public key found for given account address
    }
})
```

### **Invite peers into chat**

```kotlin
val seflAccountId = Chat.Model.AccountId(account = registered /*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/)
val inviteModel = Chat.Model.Invite(seflAccountId, openingMessage, resolvedPublicKey)
val invite = Chat.Params.Invite(Chat.Model.AccountId(peerAccountId), inviteModel)

ChatClient.invite(invite) { error -> Log.e(tag(this), error.throwable.stackTraceToString()) }
```

### **Accepting and rejecting an invite**

```kotlin
val acceptParams = Chat.Params.Accept(inviteId)
ChatClient.accept(acceptParams,
    onSuccess = { threadTopic -> /* Thread topic */ },
    onError = { error -> /* Error when accepting */ })
```

```kotlin
val rejectParams = Chat.Params.Reject(inviteId)
ChatClient.accept(rejectParams, onError = { error -> /* Error when rejecting */ })
```

### **Sending a chat message**

```kotlin
val threadTopic = /*thread topic*/
val author = Chat.Model.AccountId(/*[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) compatible accountId*/)
val messageParams = Chat.Params.Message(threadTopic, author, message)

ChatClient.message(messageParams) { error -> /* Error while sending a message */ }
```

### **Leaving a chat thread**

```kotlin
val threadTopic = /*thread topic*/

ChatClient.leave(threadTopic) { error -> /* Error while leaving a thread */ }
```