# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(): Promise<void>;

  // register a blockchain account with a public key / returns the public key
  public abstract register(params: {
    account: string;
    private?: boolean;
  }): Promise<string>;

  // queries the default keyserver with a blockchain account / returns the public key
  public abstract resolve(params: {
    account: string;
  }): Promise<string>;

  // sends a chat invite to peer account / returns an invite id
  public abstract invite(params: {
    account: string;
    invite: Invite;
  }): Promise<number>;

  // accepts a chat invite by id / returns thread topic
  public abstract accept(params: {
    inviteId: number;
  }): Promise<string>;

// rejects a chat invite by id
  public abstract reject(params: {
    inviteId: string;
  }): Promise<void>;

  // sends a chat message to an active chat thread
  // This uses a chat queue as described in chat-message-queue.md
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

  // returns all invites matching an account / returns maps of invites indexed by id
  public abstract getInvites(params: {
    account: string;
  }): Promise<Map<string, Invite>>

  // returns all threads matching an account / returns map of threads indexed by topic
  public abstract getThreads(params: {
    account: string;
  }): Promise<Map<string, Thread>>;

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
  
  // Internal use only, read more chat-message-queue.md
  public abstract on("queue_message", ({ topic: string, payload: Message }) => {}): void;
  
  // subscribe to queued messages that got delivered
  public abstract on("queued_message_delivered", ({ topic: string, payload: Message }) => {}): void;

  // subscribe to new chat thread left
  public abstract on("chat_left",  ({ topic: string }) => {}): void;
}
```
