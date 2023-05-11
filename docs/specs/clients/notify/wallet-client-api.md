# Wallet Client API

```typescript
abstract class WalletClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(): Promise<void>;

  // approve notify subscription 
  public abstract approve(params: {
        id: number 
        onSign: (message: string) => Cacao.Signature
   }): Promise<boolean>;

  // reject notify subscription 
  public abstract reject(params: { id: number, reason: Reason }): Promise<boolean>;
  
  // update notify subscription
  public abstract update(params: { topic: string, scope: string[] }): Promise<boolean>;
  
  // send notify subscription
  public abstract subscribe(params: { 
        metadata: Metadata,
        account: string,
        onSign: (message: string) => Cacao.Signature
  }): Promise<boolean>;

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, NotifySubscription>>;

  // get all messages for a subscription
  public abstract getMessageHistory(params: { topic: string }): Promise<Record<number, NotifyMessageRecord>>

  // delete active subscription
  public abstract deleteSubscription(params: { topic: string }): Promise<void>;
  
  // delete notify message
  public abstract deleteNotifyMessage(params: { id: number }): Promise<void>;
  
  // decrypt notify subscription message
  public abstract decryptMessage(topic: string, encryptedMessage: string): Promise<NotifyMessage>;

  // ---------- Events ----------------------------------------------- //

  // for wallet to listen for notify subscription created
  public abstract on("notify_subscription", (result: NotifySubscription | Error) => {}): void;

  // for wallet to listen on notify request
  public abstract on("notify_request", (id: number, account: string, metadata: Metadata) => {}): void;
  
  //  for wallet to listen on notify messages
  public abstract on("notify_message", (message: NotifyMessageRecord, metadata: Metadata) => {}): void;
  
  // for wallet to listen for result of notify subscription update
  public abstract on("notify_update", (result: NotifySubscription | Error) => {}): void;

  // for wallet to listen on notify deletion
  public abstract on("notify_delete", (topic: string) => {}): void;
}
```
