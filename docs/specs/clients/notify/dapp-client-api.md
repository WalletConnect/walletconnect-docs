# Dapp Client API

:::caution

Push API is under development. Want early access? Join our [Pilot Program](https://walletconnect.com/partners)

:::

```typescript
abstract class DappClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata, castUrl?: string }): Promise<void>;

  // propose notify subscription
  public abstract propose(params: { account: string, scope: string[], pairingTopic: string }): Promise<{ id }>;

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<string, NotifySubscription>>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to notify response
  public abstract on("notify_response", (id: number, response: { error?: Reason, subscription?: NotifySubscription }) => {}): void;

 // subscribe to notify deletion
  public abstract on("notify_delete", (topic: string) => {}): void;
}
```
