# Client API

Client manages only one blockchain account at a time which is set on `init()` method call. To switch accounts call register with new parameters. Client only listens to one topic for invites at a time. 

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  // sets currently managed blockchain account
  public abstract init(account: string): Promise<void>;

  // - registers a blockchain account with an identity key if not yet registered on this client
  // - registers invite key and starts listening on invites if private is true
  // - onSign(message) is a callback for signing CAIP-122 message to verify blockchain account ownership
  // returns the public identity key
  // calling register with another account switches currently managed blockchain account
  public abstract register(params: {
    account: string;
    private?: boolean;
    onSign: (message: string) => Cacao.Signature
  }): Promise<string>;

  // queries the keyserver with a blockchain account
  // returns the invite key
  public abstract resolve(params: {
    account: string;
  }): Promise<string>;

  // unregisters an invite key of blockchain account from keyserver 
  // stops listening for invites
  // stores the invite in a separate store for pendingThreads
  // returns the public invite key
  public abstract stopListeningToInvites(): Promise<string>;

  // sends a chat invite from curently managed account to peer account 
  // returns an invite id
  public abstract invite(params: {
    inviteeAccount: string;
    invite: Invite;
  }): Promise<number>;

  // accepts a chat invite by id from curently managed account 
  // returns thread topic
  public abstract accept(params: {
    inviteId: number;
  }): Promise<string>;

  // rejects a chat invite by id from curently managed account
  public abstract reject(params: {
    inviteId: string;
  }): Promise<void>;

  // sends a chat message to an active chat thread from curently managed account
  public abstract message(params: {
    topic: string;
    message: string;
    media?: Media
  }): Promise<void>;

  // ping its peer to evaluate if it's currently online
  public abstract ping(params: {
    topic: string;
  }): Promise<void>

  // leaves a chat thread and stops receiving messages
  public abstract leave(params: {
    topic: string;
  }): Promise<void>;

  // adds peer account with public key 
  public abstract addContact(params: {
    account: string;
    publicKey: string;
  }): Promise<void>

  // returns all invites for currently managed account / returns maps of invites indexed by id
  public abstract getInvites(): Promise<Map<string, Invite>>

  // returns all threads for currently managed account / returns map of threads indexed by topic
  public abstract getThreads(): Promise<Map<string, Thread>>;
  
  // returns all pending threads for currently managed account / returns map of threads indexed by topic
  public abstract getPendingThreads(): Promise<Map<string, PendingOrRejectedThread>>;

  // returns all messages matching a thread's topic / returns array of messages
  public abstract getMessages(params: {
    topic: string;
  }): Promise<[Message]>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to new chat invites received
  public abstract on("chat_invite", ({ id: number, invite: Invite }) => {}): void;

  // subscribe to new chat thread joined
  public abstract on("chat_joined",  ({ topic: string }) => {}): void;

  // subscribe to new chat messages received
  public abstract on("chat_message", ({ topic: string, payload: Message }) => {}): void;

  // subscribe to new chat thread left
  public abstract on("chat_left",  ({ topic: string }) => {}): void;
}
```
