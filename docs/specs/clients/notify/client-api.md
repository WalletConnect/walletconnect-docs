# Client API

:::caution

Notify API is under development. Want early access? Join our [Pilot Program](https://walletconnect.com/partners)

:::

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(): Promise<void>;
  
  // send notify subscription
  public abstract subscribe(params: { 
        metadata: Metadata,
        account: string,
        scope: string[],
        onSign: (message: string) => Cacao.Signature
  }): Promise<boolean>;

  // update notify subscription
  public abstract update(params: { topic: string, scope: string[] }): Promise<boolean>;

  // query notification types available for a dapp domain
  public abstract getNotificationTypes(params: {
      domain: string,
  }): Promise<NotifyAvailableTypes>

  // query all active subscriptions
  public abstract getActiveSubscriptions(params: {
    account?: string
  }): Promise<Record<string, NotifySubscription>>;

  // get all messages for a subscription
  public abstract getMessageHistory(params: { topic: string }): Promise<Record<number, NotifyMessageRecord>>

  // delete active subscription
  public abstract deleteSubscription(params: { topic: string }): Promise<void>;
  
  // delete notify message
  public abstract deleteNotifyMessage(params: { id: number }): Promise<void>;
  
  // decrypt notify subscription message
  public abstract decryptMessage(topic: string, encryptedMessage: string): Promise<NotifyMessage>;
  
  // Enable Sync by registering sync keys
  public abstract enableSync({
        account: string, 
        onSign: (message: string) => Cacao.Signature
  }): Promise<void>;

  // ---------- Events ----------------------------------------------- //

  // for wallet to listen for notify subscription created
  public abstract on("notify_subscription", (result: NotifySubscription | Error) => {}): void;
  
  //  for wallet to listen on notify messages
  public abstract on("notify_message", (message: NotifyMessageRecord, metadata: Metadata) => {}): void;
  
  // for wallet to listen for result of notify subscription update
  public abstract on("notify_update", (result: NotifySubscription | Error) => {}): void;

  // for wallet to listen on notify deletion
  public abstract on("notify_delete", (topic: string) => {}): void;
}
```
