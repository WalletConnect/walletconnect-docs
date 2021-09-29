# Reference Client API

```typescript
abstract class Client {
  // ---------- Methods ----------------------------------------------- //

  // initializes the client with persisted storage and a network connection
  public abstract init(params: {
    controller?: boolean;
    metadata?: AppMetadata;
    relayProvider?: string;
  }): Promise<void>;

  // for proposer to propose a session to a responder
  public abstract connect(params: {
    permissions: SessionPermissions;
    pairing?: Sequence;
  }): Promise<Sequence>;
  // for responder to receive a session proposal from a proposer
  public abstract pair(params: { uri: string }): Promise<Sequence>;

  // for responder to approve a session proposal
  public abstract approve(params: {
    proposal: SessionProposal;
    response: SessionResponse;
  }): Promise<Sequence>;
  // for responder to reject a session proposal
  public abstract reject(params: {
    proposal: SessionProposal;
    reason: Reason;
  }): Promise<void>;
  // for responder to upgrade session permissions
  public abstract upgrade(params: {
    topic: string;
    permissions: SessionPermissions;
  }): Promise<void>;
  // for responder to update session state
  public abstract update(params: {
    topic: string;
    state: SessionState;
  }): Promise<void>;

  // for proposer to request JSON-RPC
  public abstract request(params: {
    topic: string;
    request: RequestArguments;
    chainId?: string;
  }): Promise<any>;
  // for responder to respond JSON-RPC
  public abstract respond(params: {
    topic: string;
    response: JsonRpcResponse;
  }): Promise<void>;

  // for either to send notifications
  public abstract notify(params: {
    topic: string;
    notification: Notification;
  }): Promise<void>;
  // for either to disconnect a session
  public abstract disconnect(params: {
    topic: string;
    reason: Reason;
  }): Promise<void>;

  // ---------- Events ----------------------------------------------- //

  // subscribe to pairing proposal
  public abstract on("pairing_proposal", (pairingProposal: PairingProposal) => {}): void;

  // subscribe to session proposal
  public abstract on("session_proposal", (sessionProposal: SessionProposal) => {}): void;

  // subscribe to session request
  public abstract on("session_request", (sessionRequest: SessionRequest) => {}): void;

  // subscribe to session notification
  public abstract on("session_notification", (sessionNotification: SessionNotification) => {}): void;
}

interface Sequence {
  topic: string;
}

interface AppMetadata {
  name: string;
  description: string;
  url: string;
  icons: string[];
}

interface SessionPermissions {
  blockchain: {
    chains: string[];
  };
  jsonrpc: {
    methods: string[];
  };
}

interface SessionProposal {
  topic: string;
  relay: {
    protocol: string;
    params?: any;
  };
  proposer: {
    publicKey: string;
    metadata: AppMetadata;
  };
  signal: {
    method: "pairing";
    params: Sequence;
  };
  permissions: SessionPermissions;
  ttl: number;
}

interface SessionState {
  accounts: string[];
}

interface SessionResponse {
  state: SessionState;
}

interface Reason {
  code: number;
  message: string;
}

interface RequestArguments {
  method: string;
  params: any;
}

interface JsonRpcRequest {
  id: number;
  jsonrpc: "2.0";
  method: string;
  params: any;
}

interface JsonRpcResult {
  id: number;
  jsonrpc: "2.0";
  result: any;
}

interface JsonRpcError {
  id: number;
  jsonrpc: "2.0";
  error: {
    code: number;
    message: string;
  };
}

type JsonRpcResponse = JsonRpcResult | JsonRpcError;

interface Notification {
  type: string;
  data: any;
}

interface SessionRequest {
  topic: string;
  request: JsonRpcRequest;
  chainId?: string;
}

interface SessionNotificaiton {
  topic: string;
  notification: Notification;
}

interface PairingProposal {
  topic: string;
  relay: {
    protocol: string;
    params?: any;
  };
  proposer: {
    publicKey: string;
  };
  signal: {
    method: "pairing";
    params: {
      uri: string;
    };
  };
  permissions: {
    jsonrpc: {
      methods: string[];
    };
  };
  ttl: number;
}
```
