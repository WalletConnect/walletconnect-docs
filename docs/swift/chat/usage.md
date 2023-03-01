# Usage

### Configure Networking client

Make sure what you properly configure Networking Client first 
- [Networking](../core/networking-configuration.md)

### Configure Chat Client

```swift
Chat.configure(account: Account("eip155:56:0xe5EeF1368781911d265fDB6946613dA61915a501")!)
```

### Use client instance

Chat client instance is a singleton and you can access it by calling

```swift
Chat.instance
```

### Chat Client interface

```swift
public protocol ChatClient {
    /// Socket connection status publisher
    var socketConnectionStatusPublisher: AnyPublisher<SocketConnectionStatus, Never> { get }

    /// Storage updates publishers
    var messagesPublisher: AnyPublisher<[Message], Never> { get }
    var receivedInvitesPublisher: AnyPublisher<[ReceivedInvite], Never> { get }
    var sentInvitesPublisher: AnyPublisher<[SentInvite], Never> { get }
    var threadsPublisher: AnyPublisher<[Thread], Never> { get }

    /// Events publishers
    var newMessagePublisher: AnyPublisher<Message, Never> { get }
    var newReceivedInvitePublisher: AnyPublisher<ReceivedInvite, Never> { get }
    var newSentInvitePublisher: AnyPublisher<SentInvite, Never> { get }
    var newThreadPublisher: AnyPublisher<Thread, Never> { get }

    /// Invitation handling publishers
    var acceptPublisher: AnyPublisher<(String, SentInvite), Never> { get }
    var rejectPublisher: AnyPublisher<SentInvite, Never> { get }

    /// Registers a blockchain account with an identity key if not yet registered on this client
    /// Registers invite key if not yet registered on this client and starts listening on invites if private is false
    /// - Parameter onSign: Callback for signing CAIP-122 message to verify blockchain account ownership
    /// - Returns: Returns the public identity key
    @discardableResult
    func register(account: Account,
        isPrivate: Bool = false,
        onSign: @escaping SigningCallback
    ) async throws -> String

    /// Unregisters a blockchain account with previously registered identity key
    /// Must not unregister invite key but must stop listening for invites
    /// - Parameter onSign: Callback for signing CAIP-122 message to verify blockchain account ownership
    func unregister(account: Account, onSign: @escaping SigningCallback) async throws

    /// Queries the keyserver with a blockchain account
    /// - Parameter account: CAIP10 blockachain account
    /// - Returns: Returns the invite key
    func resolve(account: Account) async throws -> String

    /// Sends a chat invite
    /// Creates and stores SentInvite with `pending` state
    /// - Parameter invite: An Invite object
    /// - Returns: Returns an invite id
    @discardableResult
    func invite(invite: Invite) async throws -> Int64

    /// Unregisters an invite key from keyserver
    /// Stops listening for invites
    /// - Parameter account: CAIP10 blockachain account
    func goPrivate(account: Account) async throws

    /// Registers an invite key if not yet registered on this client from keyserver
    /// Starts listening for invites
    /// - Parameter account: CAIP10 blockachain account
    /// - Returns: The public invite key
    func goPublic(account: Account) async throws

    /// Accepts a chat invite by id from account specified as inviteeAccount in Invite
    /// - Parameter inviteId: Invite id
    /// - Returns: Thread topic
    @discardableResult
    func accept(inviteId: Int64) async throws -> String

    /// Rejects a chat invite by id from account specified as inviteeAccount in Invite
    /// - Parameter inviteId: Invite id
    func reject(inviteId: Int64) async throws

    /// Sends a chat message to an active chat thread from account specified as selfAccount in Thread
    /// - Parameters:
    ///   - topic: thread topic
    ///   - message: chat message
    func message(topic: String, message: String) async throws

    /// Ping its peer to evaluate if it's currently online
    /// - Parameter topic: chat thread topic
    func ping(topic: String)

    /// Leaves a chat thread and stops receiving messages
    /// - Parameter topic: chat thread topic
    func leave(topic: String) async throws

    /// Sets peer account with public key
    /// - Parameter account: CAIP10 blockachain account
    /// - Parameter publicKey: Account associated publicKey hex string
    func setContact(account: Account, publicKey: String) async throws

    /// Get received invetes list
    func getReceivedInvites() -> [ReceivedInvite]

    /// Get sent invetes list
    func getSentInvites() -> [SentInvite]

    /// Get threads list
    func getThreads() -> [Thread]

    /// Get messages list
    func getMessages(topic: String) -> [Message]
}
```

### Chat Client Objects

#### ReceivedInvite

```swift
public struct ReceivedInvite: Codable, Equatable {
    public enum Status: String {
        case pending
        case rejected
        case approved
    }
    public let id: Int64
    public let message: String
    public let inviterAccount: Account
    public let inviteeAccount: Account
    public let inviterPublicKey: String
    public let inviteePublicKey: String
    public let timestamp: UInt64    
    public var status: Status
}
```

#### SentInvite

```swift
public struct SentInvite: Codable, Equatable {
    public enum Status: String, Codable, Equatable {
        case pending
        case approved
        case rejected
    }
    public let id: Int64
    public let message: String
    public let inviterAccount: Account
    public let inviteeAccount: Account
    public let timestamp: UInt64
    public var status: Status
}
```

#### Message

```swift
public struct Message: Codable, Equatable {
    public struct Media: Codable, Equatable {
        let type: String
        let data: String
    }
    public let topic: String
    public let message: String
    public let authorAccount: Account
    public let timestamp: UInt64
    public let media: Media?
}
```

#### Thread

```swift
public struct Thread: Codable, Equatable {
    public let topic: String
    public let selfAccount: Account
    public let peerAccount: Account
}
```

### Methods


#### Register Identity at a Keyserver

In order to use Chat SDK account must register identity in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/). To verify ownership over blockchain account when registering identities in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/) user's must sign message provided on `onSign(message: String)` callback. Currenlty only [`EIP191`](https://eips.ethereum.org/EIPS/eip-191) signatures are supported in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/)

##### Chat.instance.register
```swift
func register(account: Account, privateKey: String) async throws {
    _ = try await Chat.instance.register(account: account) { [unowned self] message in
        let signature = self.onSign(message: message, privateKey: privateKey)
        return SigningResult.signed(signature)
    }
}

func onSign(message: String, privateKey: String) -> CacaoSignature {
    let privateKey = Data(hex: privateKey)
    let signer = MessageSignerFactory(signerFactory: DefaultSignerFactory()).create()
    return try! signer.sign(message: message, privateKey: privateKey, type: .eip191)
}
```

To not be discoverable to everyone, set `private` param to `true`. If this flag is `true` then only identity is restored in [Keyserver](https://docs.walletconnect.com/2.0/specs/servers/keys/). Parameter `private` is set to `false` by default.

#### Resolve invitee public invite key with blockchain address
In order to invite someone for a chat converstion, inviter must know invitee public invite key. To resolve a invitee's public invite key that is required to invite into a chat thread, call `Chat.instance.resolve`

##### `Chat.instance.resolve`
```swift
func resolve(account: Account) async throws -> String {
    return try await Chat.instance.resolve(account: account)
}
```

#### Invite into Chat Thread

After acquiring the invitee's public key, you can send an invitation. Invitations can include short messages to encourage the invitee to accept. To send an invitation, use the `Chat.instance.invite` method. Sent invitations are stored and can be retrieved using the `Chat.instance.getSentInvites`.

##### `Chat.instance.invite`
```swift
func invite(inviterAccount: Account, inviteeAccount: Account, message: String) async throws {
    let inviteePublicKey = try await Chat.instance.resolve(account: inviteeAccount)
    let invite = Invite(message: message, inviterAccount: inviterAccount, inviteeAccount: inviteeAccount, inviteePublicKey: inviteePublicKey)
    try await Chat.instance.invite(invite: invite)
}
```

The invitee receives invitations via the `newReceivedInvitePublisher`, which provides the necessary data to respond to the invitation. Received invitations are stored and can be retrieved using the `Chat.instance.getReceivedInvites]`.

#### Accepting and Rejecting an Invite

The invitee has the option to accept or reject the invitation. To accept an invitation, call the `Chat.instance.accept` method. To reject an invitation, call the `Chat.instance.reject` method.

##### `Chat.instance.accept`
```swift
func accept(invite: ReceivedInvite) async throws {
    try await Chat.instance.accept(inviteId: invite.id)
}
```

##### `Chat.instance.reject`
```swift
func reject(invite: ReceivedInvite) async throws {
    try await Chat.instance.reject(inviteId: invite.id)
}
```

Inviter receives invite response on either `acceptPublisher` when invitee accepted the invite or on `rejectPublisher` when invitee rejected the invite. 

#### Sending a Chat Message

After succesful invite inviter and invitee can E2EE direct messages with attached media. To send message call `Chat.instance.message` method. 

##### `Chat.instance.message`

```swift
func sendMessage(topic: String, message: String) async throws {
    try await Chat.instance.message(topic: topic, message: message)
}
```

#### Leaving a Chat Thread

Calling `Chat.instance.leave` with a chat thread topic causes the caller to stop receiving chat messages, removal of thread in storage and removal of chat messages on given thread in storage.

##### `Chat.instance.leave`

```swift
func leave(thread Thread) async throws {
    try await Chat.instance.leave(topic: thread.topic)
}
```

#### Going Private

If you don't want your account to be discoverable to everyone, you can remove its public invite key from the Keyserver. Calling the `Chat.instance.goPrivate` method means that your account will no longer listen for incoming invitations.

##### `Chat.instance.goPrivate`

```swift
func goPrivate(account: Account) async throws {
    try await Chat.instance.goPrivate(account: account)
}
```

#### Going Public

If you want your account to be discoverable to everyone, you can add its public invite key to the Keyserver. Calling the `ChatClient.goPublic` method means that your account will start listening for incoming invitations.

##### `Chat.instance.goPublic`

```swift
func goPublic(account: Account, privateKey: String) async throws {
    try await Chat.instance.goPublic(account: account)
}
```

#### Unregistering Identity

To stop using the Chat SDK on a device, the account should call the `Chat.instance.unregister` method. This removes the identity key that was assigned to the device.

##### `Chat.instance.unregister`

```swift
func unregister(account: Account, privateKey: String) async throws {
    try await Chat.instance.unregister(account: account) { message in
        let signature = self.onSign(message: message, privateKey: privateKey)
        return SigningResult.signed(signature)
    }
}

func onSign(message: String, privateKey: String) -> CacaoSignature {
    let privateKey = Data(hex: privateKey)
    let signer = MessageSignerFactory(signerFactory: DefaultSignerFactory()).create()
    return try! signer.sign(message: message, privateKey: privateKey, type: .eip191)
}
```

#### Getting Received Invitations

Clients can retrieve all received invitations for a given account by calling `Chat.instance.getReceivedInvites`. `ReceivedInvite` contains a status of type `ReceivedInvite.Status` to describe whether the invitation is still pending, was rejected, or has been approved.

##### `Chat.instance.getReceivedInvites`

```swift
func getReceivedInvites() -> [ReceivedInvite] {
    return Chat.instance.getReceivedInvites()
}
```

#### Getting Sent Invites

Clients can retrieve all sent invitations for a given account by calling `Chat.instance.getSentInvites`. `SentInvite` contains a status of type `SentInvite.Status` to describe whether the invitation is still pending, was rejected, or has been approved.

##### `Chat.instance.getSentInvites`
```swift
func getSentInvites() -> [SentInvite] {
    return Chat.instance.getSentInvites()
}
```

#### Getting Threads

Clients can retrieve all threads for a given account by calling the `Chat.instance.getThreads` method. The `Thread]` object contains data on the topic that two accounts are communicating about.

##### `Chat.instance.getThreads`

```swift
func getThreads() -> [WalletConnectChat.Thread] {
    return Chat.instance.getThreads()
}
```

#### Getting Messages

Clients can fetch all messages for given thread by calling `Chat.instance.getMessages`. `Message` contains data neccessary to display a message. `Message.Media` can be attached to message for versatility.

##### `Chat.instance.getMessages`

```swift
func getMessages(thread: WalletConnectChat.Thread) -> [Message] {
    Chat.instance.getMessages(topic: thread.topic)
}
```