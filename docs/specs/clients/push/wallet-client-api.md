# Wallet Client API

```typescript
abstract class WalletClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: {}): Promise<void>;

  // approve push subscription 
  public abstract approve(params: { id: number }): Promise<boolean>;

  // reject push subscription 
  public abstract reject(params: { id: number, reason: Reason }): Promise<boolean>;

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, PushSubscription>>;

  // delete active subscription
  public abstract delete(params: { topic: string }): Promise<void>;

  // decrypt push subscription message
  public abstract decryptMessage(topic: string, encryptedMessage: string): Promise<PushMessage>;

  // ---------- Events ----------------------------------------------- //

  // for wallet to listen on push request
  public abstract on("push_request", (id: number, account: string, metadata: Metadata) => {}): void;
  
  //  for wallet to listen on push messages
  public abstract on("push_message", (message: PushMessage, metadata: Metadata) => {}): void;

  // for wallet to listen on push deletion
  public abstract on("push_delete", (topic: string) => {}): void;
}
```
