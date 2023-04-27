# SDK API

```typescript
class Web3Wallet {
  // initializes the client (BOTH)
  public abstract init(params: { core: CoreClient }): Promise<void>;
  
  // establish pairing from URI (BOTH)
  public abstract pair(params: { uri: string }): Promise<void>;
  
   // approve a session proposal (SIGN)
  public abstract approveSession(params: {
    id: number;
    namespaces: Map<string, SessionNamespace>;
    relayProtocol?: string;
  }): Promise<Session>;

  // reject a session proposal (SIGN)
  public abstract rejectSession(params: {
    proposerPublicKey: string;
    reason: Reason;
  }): Promise<void>;
  
  // update session namespaces (SIGN)
  public abstract updateSession(params: {
    topic: string;
    namespaces: Map<string, SessionNamespace>;
  }): Promise<void>;

  // update session expiry (SIGN)
  public abstract extendSession(params: {
    topic: string;
  }): Promise<void>;

  // respond JSON-RPC request (SIGN)
  public abstract respondSessionRequest(params: {
    topic: string;
    response: JsonRpcResponse;
  }): Promise<void>;
  
  // respond Auth Request (AUTH)
  public abstract respondAuthRequest(params: RespondParams, iss: string): Promise<boolean>;
  
  // emit session events (SIGN)
  public abstract emitSessionEvent(params: {
    topic: string;
    event: SessionEvent;
    chainId: string;
  }): Promise<void>;
  

 // disconnect a session (SIGN)
  public abstract disconnectSession(params: {
    topic: string;
    reason: Reason;
  }): Promise<void>;
  
  // query all active sessions (SIGN)
  public abstract getActiveSessions(): Promise<Record<string, Session>>;
  
  // format payload to message string (AUTH)
  public abstract formatMessage(payload: PayloadParams, iss: string): Promise<string>;
  
  // query all pending session requests (SIGN)
  public abstract getPendingSessionProposals(): Promise<Record<number, SessionProposal>>;
  
  // query all pending session requests (SIGN)
  public abstract getPendingSessionRequests(): Promise<Record<number, SessionRequest>>;
  
  // query all pending auth requests (AUTH)
  public abstract getPendingAuthRequests(): Promise<Record<number, PendingRequest>>;
  
  // register device token for Push server (BOTH)
  public abstract registerDeviceToken(token: string): Promise<void>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to session proposal (SIGN)
  public abstract on("session_proposal", (sessionProposal: SessionProposal, verifyContext: VerifyContext) => {}): void;

  // subscribe to session request (SIGN)
  public abstract on("session_request", (sessionRequest: SessionRequest, verifyContext: VerifyContext) => {}): void;

  // subscribe to session delete (SIGN)
  public abstract on("session_delete", (sessionDelete: { id: number, topic: string }) => {}): void;

  // subscribe to auth request (AUTH)
  public abstract on("auth_request", (id: number, pairingTopic: String, payload: PayloadParams, verifyContext: VerifyContext) => {}): void;
}
```
