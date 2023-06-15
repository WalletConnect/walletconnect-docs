# Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(): Promise<void>;

  // request wallet authentication
  public abstract request(params: RequestParams, topic: string): Promise<{ uri, id }>;

  // respond wallet authentication
  public abstract respond(params: RespondParams, iss: string): Promise<boolean>;

  // query all pending requests
  public abstract getPendingRequests(): Promise<Record<number, PendingRequest>>;

  // format payload to message string 
  public abstract formatMessage(payload: PayloadParams, iss: string): Promise<string>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to auth response
  public abstract on("auth_response", (response: Response) => {}): void;

  // for wallet to listen on auth request
  public abstract on("auth_request", (id: number, pairingTopic: String, payload: PayloadParams, verifyContext: VerifyContext) => {}): void;
}
```
