# Dapp Client API

```typescript
abstract class DappClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata, castUrl?: string }): Promise<void>;

  // request push subscription
  public abstract request(params: { account: string, pairingTopic?: string }): Promise<{ uri, id }>;

  // send push notification message
  public abstract notify(params: { topic: string, message: PushMessage }): Promise<void>

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<number, PushSubscription>>;

  // delete active subscription
  public abstract delete(params: { topic: string, message: PushMessage }): Promise<void>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to push response
  public abstract on("push_response", (id: number, response: { error?: Reason, subscription?: PushSubscription }) => {}): void;
}
```
 
