# Reference Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: {
    metadata?: AppMetadata;
  }): Promise<void>;

  // for proposer to create a session 
  public abstract connect(params: {
    requiredNamespaces: Map<string, ProposalNamespace>;
    optionalNamespaces: Map<string, ProposalNamespace>;
    properties: Map<string, string>;
    relays?: RelayProtocolOptions[];
    pairingTopic?: string;
  }): Promise<Sequence>;

  // for responder to approve a session proposal
  public abstract approve(params: {
    id: number;
    namespaces: Map<string, SessionNamespace>;
    relayProtocol?: string;
  }): Promise<Sequence>;

  // for responder to reject a session proposal
  public abstract reject(params: {
    proposerPublicKey: string;
    reason: Reason;
  }): Promise<void>;

  // for controller to update session namespaces
  public abstract update(params: {
    topic: string;
    namespaces: Map<string, SessionNamespace>;
  }): Promise<void>;

  // for controller to update session expiry
  public abstract extend(params: {
    topic: string;
  }): Promise<void>;

  // for proposer to request JSON-RPC request
  public abstract request(params: {
    topic: string;
    request: RequestArguments;
    chainId: string;
  }): Promise<any>;

  // for responder to respond JSON-RPC request
  public abstract respond(params: {
    topic: string;
    response: JsonRpcResponse;
  }): Promise<void>;

  // for controller to send events
  public abstract emit(params: {
    topic: string;
    event: SessionEvent;
    chainId: string;
  }): Promise<void>;

    // for either to ping a peer in a session
  public abstract ping(params: {
    topic: string;
  }): Promise<void>;

  // for either to disconnect a session
  public abstract disconnect(params: {
    topic: string;
    reason: Reason;
  }): Promise<void>;


  // ---------- Events ----------------------------------------------- //

  // subscribe to session proposal
  public abstract on("session_proposal", (sessionProposal: SessionProposal) => {}): void;

  // subscribe to session request
  public abstract on("session_request", (sessionRequest: SessionRequest) => {}): void;

  // subscribe to session event
  public abstract on("session_event", (sessionEvent: SessionEvent) => {}): void;
}
```
