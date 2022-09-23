# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata}): Promise<void>;

  // for responder to pair a pairing created by a proposer
  public abstract pair(params: { uri: string }): Promise<Sequence>;

  // for proposer to create inactive pairing
  public abstract create(): Promise<{ uri }>;
  
  // for both to subscribe on methods requests
  public abstract register(params: { methods: string });
  
  // query pairings
  public abstract getPairings(): Promise<Array<Pairing>>;
  
  // for either to ping a peer
  public abstract ping(params: { topic: string; }): Promise<void>;
  
  // for either peer to disconnect a pairing
  public abstract disconnect(params: { topic: string }): Promise<void>;


  // ---------- Events ----------------------------------------------- //

  // emits on subscribed request
  public abstract onRequest(${registered_request}, (topic: string, request: Request) => {}): void;
```
