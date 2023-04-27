# Wallet Client API

```typescript
abstract class WalletClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(): Promise<void>;

  // approve push subscription 
  public abstract approve(params: {
        id: number 
        onSign: (message: string) => Cacao.Signature
   }): Promise<boolean>;

  // reject push subscription 
  public abstract reject(params: { id: number, reason: Reason }): Promise<boolean>;
  
  // send wc_PushSubscription request
  public abstract subscribe(params: { 
        metadata: Metadata,
        account: string,
        onSign: (message: string) => Cacao.Signature
  }): Promise<boolean>;

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, PushSubscription>>;

  // get all messages for a subscription
  public abstract getMessageHistory(params: { topic: string }): Promise<Record<number, PushMessageRecord>>

  // delete active subscription
  public abstract deleteSubscription(params: { topic: string }): Promise<void>;
  
  // delete push message
  public abstract deletePushMessage(params: { id: number }): Promise<void>;
  
  // decrypt push subscription message
  public abstract decryptMessage(topic: string, encryptedMessage: string): Promise<PushMessage>;

  // ---------- Events ----------------------------------------------- //

  // for wallet to listen for push subscription created
  public abstract on("push_subscription", (result: PushSubscription | Error) => {}): void;

  // for wallet to listen on push request
  public abstract on("push_request", (id: number, account: string, metadata: Metadata) => {}): void;
  
  //  for wallet to listen on push messages
  public abstract on("push_message", (message: PushMessageRecord, metadata: Metadata) => {}): void;

  // for wallet to listen on push deletion
  public abstract on("push_delete", (topic: string) => {}): void;
}
```
