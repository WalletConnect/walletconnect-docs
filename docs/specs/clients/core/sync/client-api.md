# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { core: CoreClient }): Promise<void>;

  // get message to sign for an account
  public abstract getMessage(params: { account: string }): Promise<string>;

  // register an account to sync
  public abstract register(params: { account: string, signature: string }): Promise<void>;

  // checks if account is already registered in sync
  public abstract isRegistered(params: { account: string }): boolean;
  
  // create a store
  public abstract create(params: { account: string, store: string }): Promise<void>;

  // set value. Returns true if value changed, false otherwise.
  public abstract set(params: { account: string, store: string, key: string, value: string }): Promise<boolean>;

  // delete value. Returns true if value existed before delete, false otherwise. 
  public abstract delete(params: { account: string, store: string, key: string }): Promise<boolean>

  // get stores
  public abstract getStores(params: { account: string }): Promise<StoreMap>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to session proposal
  public abstract on("sync_update", (account: string, store: string, update: StoreUpdate) => {}): void;
}
```
