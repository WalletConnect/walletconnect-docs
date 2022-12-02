# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(): Promise<void>;

  // request wallet authentication
  public abstract request(params: RequestParams, topic: string ): Promise<{ uri, id }>;

  // respond wallet authentication
  public abstract respond(params: RespondParams, account: Account): Promise<boolean>;

  // query all pending requests
  public abstract getPendingRequests(): Promise<Record<number, PendingRequest>>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to auth response
  public abstract on("auth_response", (id: number, response: Response) => {}): void;

  // for wallet to listen on auth request
  public abstract on("auth_request", (id: number, payload: PayloadParams) => {}): void;
}
```
