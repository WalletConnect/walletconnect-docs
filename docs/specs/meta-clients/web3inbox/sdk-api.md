# Web3Inbox SDK API

The Web3InboxSDK will encompass both [Push](../../clients/push/README.md) and
[Chat](../../clients/chat/README.md) methods and event listeners. All methods 
within the class documented here will be used internally by the web3inbox web
app. Internally, the state will be managed through [RxJS](https://rxjs.dev/), 
which will allow the SDK to cleanly listen to events from anywhere. This will of
course the include the Chat & Push clients in the webapp. In the case of the
webapp being integrated in a native webview, RxJS will hook into the `message`
event on the window, receiving messages from the `postMessage` calls. Note, this
will also enable communication with any parent context (React Native, web page
displaying Web3Inbox in an `iframe`, etc)


```typescript
abstract class Web3InboxSDK {

  // If the init function does not receive `params`, Web3InboxSDK operates in a 
  // stateless manner where it does not maintain chat/push clients and only
  // listens to external events.
  public static abstract init(params?: {
    relayUrl: string;
    projectId: string;
  }): Promise<Web3InboxSDK>
  
  // ---------- Chat Methods (Internal W3I use) ----------------------------------------------- //
  
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
  
  
  // ---------- Push Methods (Internal W3I use) ----------------------------------------------- //
  
  // request push subscription
  public abstract request(params: { account: string, pairingTopic: string }): Promise<{ id }>;
  
  // send push notification message
  public abstract notify(params: { topic: string, message: PushMessage }): Promise<void>
  
  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, PushSubscription>>;
  
  // delete active subscription
  public abstract delete(params: { topic: string }): Promise<void>;
  
  // ---------- Events ----------------------------------------------- //
  // Although the listeners are available, the intended use is to get
  // events through RxJS observers
  
  // subscribe to new chat invites received
  public abstract on("chat_invite", ({ id: number, invite: Invite }) => {}): void;

  // subscribe to new chat thread joined
  public abstract on("chat_joined",  ({ topic: string }) => {}): void;

  // subscribe to new chat messages received
  public abstract on("chat_message", ({ topic: string, payload: Message }) => {}): void;

  // subscribe to new chat thread left
  public abstract on("chat_left",  ({ topic: string }) => {}): void;
  
  // subscribe to push response
  public abstract on("push_response", (id: number, response: { error?: Reason, subscription?: PushSubscription }) => {}): void;
}
```

