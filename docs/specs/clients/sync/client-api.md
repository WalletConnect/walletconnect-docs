# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { core: CoreClient }): Promise<void>;

  // get message to sign for an account
  public abstract getMessage(params: { account: string }): Promise<string>;

  // register an account to sync
  public abstract register(params: { account: string, signature: string }): Promise<string>;
  
  // create a store
  public abstract create(params: { account: string, store: string }): Promise<string>;

  // set value 
  public abstract set(params: { store: string, key: string, value: string }): Promise<string>;

  // delete value 
  public abstract delete(params: { store: string, key: string }): Promise<string>

  // get stores
  public abstract getStores(params: { account: string }): Promise<StoreMap>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to session proposal
  public abstract on("sync_update", (store: string, update: StoreUpdate) => {}): void;
}
```
