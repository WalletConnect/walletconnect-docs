# Dapp Client API

```typescript
abstract class DappClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata, castUrl?: string }): Promise<void>;

  // propose push subscription
  public abstract propose(params: { account: string, scope: string[], pairingTopic: string }): Promise<{ id }>;

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, PushSubscription>>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to push response
  public abstract on("push_response", (id: number, response: { error?: Reason, subscription?: PushSubscription }) => {}): void;

 // subscribe to push deletion
  public abstract on("push_delete", (topic: string) => {}): void;
}
```
