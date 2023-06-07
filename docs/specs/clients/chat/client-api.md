# Client API

Client manages multiple blockchain account at a time. Client listens to multiple topic for invites at a time. 

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection and keyserver URL
  public abstract init(params: {
    keyserverUrl?: string; //optional. If value not supplied default to keys.walletconnect.com
  }): Promise<void>;

  // - registers a blockchain account with an identity key if not yet registered on this client
  // - registers invite key if not yet registered on this client and starts listening on invites if private is false
  // - onSign(message) promise for signing CAIP-122 message to verify blockchain account ownership
  // returns the public identity key. Method should throw 'signatureRejected' if any errors comes from onSign promise. 
  public abstract register(params: {
    account: string;
    private?: boolean;
    onSign: (message: string) => Promise<Cacao.Signature>
  }): Promise<string>;

  // - unregisters a blockchain account with previously registered identity key 
  // - must not unregister invite key but must stop listening for invites
  public abstract unregister(params: {
    account: string;
  }): Promise<void>;

  // queries the keyserver with a blockchain account
  // returns the invite key
  public abstract resolve(params: {
    account: string;
  }): Promise<string>;

  // unregisters an invite key from keyserver 
  // stops listening for invites
  public abstract goPrivate(params: {
    account: string;
  }): Promise<void>;

  // registers an invite key if not yet registered on this client from keyserver 
  // starts listening for invites
  // returns the public invite key
  public abstract goPublic(params: {
    account: string;
  }): Promise<string>;

  // sends a chat invite 
  // creates and stores SentInvite with `pending` state
  // returns an invite id
  public abstract invite(params: {
    invite: Invite;
  }): Promise<number>;

  // accepts a chat invite by id from account specified as inviteeAccount in Invite
  // returns thread topic
  public abstract accept(params: {
    inviteId: number;
  }): Promise<string>;

  // rejects a chat invite by id from account specified as inviteeAccount in Invite
  public abstract reject(params: {
    inviteId: string;
  }): Promise<void>;

  // sends a chat message to an active chat thread from account specified as selfAccount in Thread
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

  // returns all invites matching an inviteeAccount from Invite 
  // returns maps of invites indexed by id
  public abstract getReceivedInvites(params: {
    account: string;
  }): Promise<Map<number, ReceivedInvite>>

  // returns all pending invites matching an inviterAccount from SentInvite 
  // returns maps of invites indexed by id
  public abstract getSentInvites(params: {
    account: string;
  }): Promise<Map<number, SentInvite>>;

  // returns all threads matching an selfAccount from Thread 
  // returns map of threads indexed by topic
  public abstract getThreads(params: {
    account: string;
  }): Promise<Map<string, Thread>>;

  // returns all messages matching a thread's topic / returns array of messages
  public abstract getMessages(params: {
    topic: string;
  }): Promise<[Message]>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to new chat invites received
  public abstract on("chat_invite", ({ invite: ReceivedInvite }) => {}): void;

  // subscribe to chat invite being accepted
  public abstract on("chat_invite_accepted", ({ topic: string, invite: SentInvite}) => {}): void;
  
  // subscribe to chat invite being rejected
  public abstract on("chat_invite_rejected", ({ invite: SentInvite}) => {}): void;

  // subscribe to new chat messages received
  public abstract on("chat_message", ({ payload: Message }) => {}): void;

  // subscribe to new chat thread left
  public abstract on("chat_left",  ({ topic: string }) => {}): void;
}
```
