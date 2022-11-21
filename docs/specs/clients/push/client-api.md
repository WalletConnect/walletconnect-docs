# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: {}): Promise<void>;

  // request push subscription
  public abstract request(params: { accounts: string[] }): Promise<{ uri, id }>;

  // approve push subscription 
  public abstract approve(params: {}): Promise<boolean>;

  // reject push subscription 
  public abstract reject(params: { reason: Reason }): Promise<boolean>;

  // query all active subscriptions
  public abstract getActiveSubscriptions(): Promise<Record<number, PushSubscription>>;

  // decrypt push subscription message
  public abstract decryptMessage(topic:string, encryptedMessage: string): Promise<string>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to push response
  public abstract on("push_response", (id: number, subscription: PushSubscription) => {}): void;

  // for wallet to listen on push request
  public abstract on("push_request", (id: number, metadata: Metadata) => {}): void;
}
```
