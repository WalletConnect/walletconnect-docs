# Dapp Client API

```typescript
abstract class DappClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata, castUrl?: string }): Promise<void>;

  // request notify subscription
  public abstract request(params: { account: string, pairingTopic: string }): Promise<{ id }>;

  // send notify notification message
  public abstract notify(params: { topic: string, message: NotifyMessage }): Promise<void>

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, NotifySubscription>>;

  // delete active subscription
  public abstract deleteSubscription(params: { topic: string }): Promise<void>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to notify response
  public abstract on("notify_response", (id: number, response: { error?: Reason, subscription?: NotifySubscription }) => {}): void;

 // subscribe to notify deletion
  public abstract on("notify_delete", (topic: string) => {}): void;
}
```
