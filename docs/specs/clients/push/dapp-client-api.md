# Dapp Client API

```typescript
abstract class DappClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata, castUrl?: string }): Promise<void>;

  // request push subscription
  public abstract request(params: { account: string, pairingTopic: string }): Promise<{ id }>;

  // send push notification message
  public abstract notify(params: { topic: string, message: PushMessage }): Promise<void>

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, PushSubscription>>;

  // delete active subscription
  public abstract deleteSubscription(params: { topic: string }): Promise<void>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to push response
  public abstract on("push_response", (id: number, response: { error?: Reason, subscription?: PushSubscription }) => {}): void;

 // subscribe to push deletion
  public abstract on("push_delete", (topic: string) => {}): void;
}
```
