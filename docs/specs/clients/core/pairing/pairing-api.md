# Pairing API

```typescript
abstract class PairingClient {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata}): Promise<void>;

  // for responder to pair a pairing created by a proposer
  public abstract pair(params: { uri: string }): Promise<Sequence>;

  // for proposer to create inactive pairing
  public abstract create(): Promise<{ uri: string }>;

  // for either to activate a previously created pairing
  public abstract activate(params: { topic: string }): Promise<void>;

  // for both to subscribe on methods requests
  public abstract register(params: { methods: string[], type: ProtocolType }): Promise<void>;

  // for either to update the expiry of an existing pairing.
  public abstract updateExpiry(params: { topic: string, expiry: number }): Promise<void>;

  // for either to update the metadata of an existing pairing.
  public abstract updateMetadata(params: { topic: string, metadata: Metadata }): Promise<void>;

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
