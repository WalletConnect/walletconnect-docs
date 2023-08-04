# Web3Inbox SDK API

The Web3InboxSDK encompasses both [Notify](../../clients/notify/README.md) and
[Chat](../../clients/chat/README.md) methods and event listeners. All methods
within the class documented here are used internally by the web3inbox web
app. Internally, the state is managed through [RxJS](https://rxjs.dev/),
which allows the SDK to cleanly listen to events from anywhere. This of
course includes the Chat & Notify clients in the webapp. 

## Stateless Mode
In the case of the webapp being integrated in a native webview, RxJS hooks
into the `message` event on the window, receiving messages from the
`postMessage` calls. Note, this also enables communication with any parent
context (React Native, web page displaying Web3Inbox in an `iframe`, etc).

This is Web3InboxSDK's stateless mode, where it won't manage any clients and
will instead just be relaying info to the embedded Web3Inbox user interface.

```typescript

abstract class Web3InboxSDKChatFacade {
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
    inviteId: number;
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

  // returns all account addresses that are muted for an account
  public abstract getMutedContacts(params: {
    account: string;
  }): Promise<[string]>;
  
  /*
    Event observing.
    Note: All observers return a method to stop observing.
  */
  // subscribe to new chat invites received
  public abstract observe("chat_invite", Observer<{ id: number, invite: Invite}>): () => void;

  // subscribe to new chat thread joined
  public abstract observe("chat_joined", Observer<{ topic: string }>): () => void;

  // subscribe to new chat messages received
  public abstract observe("chat_message", Observer<{ topic: string, payload:  Message}>): () => void;

  // subscribe to new chat thread left
  public abstract observe("chat_left",  Observer<{ topic: string }>): () => void;

  // subscribe to updates from sync stores
  public abstract observe("sync_update", Observer<{ store: string, update: StoreUpdate }>): () => void;
}

abstract class Web3InboxSDKNotifyFacade {
  // request notify subscription
  public abstract request(params: { account: string, pairingTopic: string }): Promise<{ id }>;
  
  // send notify message
  public abstract notify(params: { topic: string, message: NotifyMessage }): Promise<void>
  
  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, NotifySubscription>>;
  
  // delete active subscription
  public abstract delete(params: { topic: string }): Promise<void>;
  
  /*
    Event observing.
    Note: All observers return a method to stop observing.
  */
  public abstract observe("notify_subscription", Observer<{id: number, response:{error?: Reason, subscription?: NotifySubscription }}>): () => void;

  // subscribe to updates from sync stores
  public abstract observe("sync_update", Observer<{ store: string, update: StoreUpdate }>): () => void;
}

abstract class Web3InboxSDK {

  // Note that the facade objects are not the actual clients, but a layer on top
  // of them, this is so that their functionality and state can be managed
  // within web3inbox.
  public readonly get chat: Web3InboxSDKChatFacade
  public readonly get notify: Web3InboxSDKNotifyFacade

  // If the init function does not receive `params`, Web3InboxSDK operates in a 
  // stateless manner where it does not maintain chat/notify clients and only
  // listens to external events.
  public static abstract init(params?: {
    relayUrl: string;
    projectId: string;
    castUrl?: string;
  }): Promise<Web3InboxSDK>
  
}
```

