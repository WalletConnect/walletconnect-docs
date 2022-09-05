# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: { metadata: Metadata, iss?: string }): Promise<void>;

  // for responder to pair a pairing created by a proposer
  public abstract pair(params: { uri: string }): Promise<Sequence>;

  // request wallet authentication
  public abstract request(params: RequestParams): Promise<{ uri, id }>;

  // respond wallet authentication
  public abstract respond(params: RespondParams): Promise<boolean>;

  // query all pending requests
  public abstract getPendingRequests(): Promise<Record<number, PendingRequest>>;
  
  // query pairings
  public abstract getPairings(): Promise<Array<Pairing>>;
  
  // for either to ping a peer in a pairing
  public abstract ping(params: { topic: string; }): Promise<void>;
  
  // for either peer to disconnect a pairing
  public abstract disconnect(params: { topic: string }): Promise<void>;


  // ---------- Events ----------------------------------------------- //

  // subscribe to auth response
  public abstract on("auth_response", (id: number, response: Response) => {}): void;

  // for wallet to listen on auth request
  public abstract on("auth_request", (id: number, message: string) => {}): void;
}
```
