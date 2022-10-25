# Usage

### Configure Networking client

Make sure what you properly configure Networking Client first 
- [Networking](../core/networking-configuration.md)

### Use client instance

Chat client instance is a singleton and you can access it by calling

```swift
Chat.instance
```

### Register address at a key server

To make a user's account publicly discoverable, one must register his account on a public key server. 
Keyserver will create a record of an account and client-generated public key that will be used for peer key exchange during thread creation.
 
```swift
let Caip2Account = Account(chainIdentifier: "eip155:1", address: "0x36275231673672234423f")!
let pubKey = try! await Chat.instance.register(account: Caip2Account)
```

### Resolve peer associated public key with it's address

To resolve a peer's public key that you will need to invite him into a chat thread, call `resolve` method.
 ```swift
let resolvedPubKey = try! await Chat.instance.resolve(account: Caip2Account)
```

### Invite peers into a chat

```swift
try! await Chat.instance.invite(publicKey: resolvedPubKey, peerAccount: peerAccount, openingMessage: "hello", account: myAccount)
```

### Accepting an invite

When your client gets invited, you can accept the invitation or reject it.

```swift
try! await Chat.instance.accept(inviteId: invite.id)
```

```swift
try! await Chat.instance.reject(inviteId: invite.id)
```

### Sending chat message

```swift
try! await Chat.instance.message(topic: thread.topic, message: "Hello!")
``` 

### Leaving a thread

You can leave a thread by calling:

```swift
try! await Chat.instance.leave(topic: thread.topic)
``` 

### Client events

Integration of chat client will require you to handle following events:

`newThreadPublisher` will publish when a new thread with a peer client has been established.
```swift
public var newThreadPublisher: AnyPublisher<Thread, Never> 
```

`invitePublisher` tells that a peer that has resolved your public key with an address is inviting you to establish a chat thread.
```swift
public var invitePublisher: AnyPublisher<Invite, Never> 
```

`messagePublisher` tells that your client just received a message from a peer client
```swift
public var messagePublisher: AnyPublisher<Message, Never> 
```
