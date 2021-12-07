# Client Communication

WalletConnect 2.0 clients will communicate state and events for the out-of-band sequences, both session and pairing, through JSON-RPC methods which are exclusively used to communicate between the two connected clients. These will be published and subscribed under corresponding topics for both before and after settlement. This can be described under a single matrix that encompasses these two states for both sequences.

|         | before settlement                         | after settlement                                                                                                                               |
| ------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| pairing | wc_pairingApprove <br /> wc_pairingReject | wc_pairingUpdate <br /> wc_pairingUpgrade <br /> wc_pairingDelete <br /> wc_pairingPayload <br /> wc_pairingPing <br /> wc_pairingNotification |
| session | wc_sessionApprove <br /> wc_sessionReject | wc_sessionUpdate <br /> wc_sessionUpgrade <br /> wc_sessionDelete <br /> wc_sessionPayload <br /> wc_sessionPing <br /> wc_sessionNotification |

However this matrix does not include the pairing and session proposals which happen out-of-band of each sequence communication:

- pairing proposal is shared through a URI shared as qrcode or deep link between two clients
- session proposal is shared through a wc_pairingPayload request which includes the method wc_sessionPropose and corresponding params described below

## JSON-RPC API

Below you can find all the JSON-RPC methods used between clients to communicate state and events with corresponding interface for both request and response. Any interfaces referenced below (eg. `RelayProtocolOptions`, `PairingParticipant`, etc) refer to the same interfaces described in the [technical specification](./tech-spec.md)

### wc_pairingApprove

This request is sent as response for a pairing proposal which is signaled externally using a URI shared between clients.

```typescript
// request
interface WCPairingApproveRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingApprove";
  params: {
    relay: RelayProtocolOptions;
    responder: PairingParticipant;
    expiry: number;
    state: PairingState;
  };
}

// response
interface WCPairingApproveResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

**NOTE:** The response for this request will serve as the acknowledgement of the proposer's pairing settlement

### wc_pairingReject

This request is sent as response for a pairing proposal which is signaled externally using a URI shared between clients.

```typescript
// request
interface WCPairingRejectRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingReject";
  params: {
    reason: string;
  };
}

// response
interface WCPairingRejectResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

**NOTE:** The response for this request will serve as the acknowledgement of the proposer's pairing settlement

### wc_pairingUpdate

This request is used to update state of the pairing participant which is optionally provided by the controller to share app metadata during the pairing lifetime.

```typescript
// request
interface WCPairingUpdateRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingUpdate";
  params: {
    state: Partial<PairingState>;
  };
}

// response
interface WCPairingUpdateResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingUpgrade

This request is used to upgrade permissions of the pairing during the its lifetime provided by the controller.

```typescript
// request
interface WCPairingUpgradeRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingUpgrade";
  params: {
    permissions: Partial<PairingPermissions>;
  };
}

// response
interface WCPairingUpgradeResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingDelete

This request is used to delete the pairing and notify the peer that it won't be receiving anymore payloads being relayed with this topic and specifies a reason for deleting before expire.

```typescript
// request
interface WCPairingDeleteRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingDelete";
  params: {
    reason: string;
  };
}

// response
interface WCPairingDeleteResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingPayload

This request is used to relay payloads that match the list of methods agreed upon pairing settlement. Any requests sent with unauthorized methods will be immediately rejected by the client.

```typescript
// request
interface WCPairingPayloadRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingPayload";
  params: {
    request: {
      method: string;
      params: any;
    };
  };
}

// response
interface WCPairingPayloadResponse {
  id: number;
  jsonrpc: "2.0";
  result: any;
}
```

### wc_pairingPing

This request is used to internally ping the other client to verify that is online. Pings are responded automatically internally by either client. By default, clients will throw a timeout if a ping is not responded within 30 seconds.

```typescript
// request
interface WCPairingPingRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingPing";
  params: {};
}

// response
interface WCPairingPingResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingNotification

This request is used to emit events as notifications that match the list of types agreed upon pairing settlement. Any requests sent with unauthorized types will be immediately rejected by the controller client.

```typescript
// request
interface WCPairingNotificationRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_pairingNotification";
  params: {
    type: string;
    data: any;
  };
}

// response
interface WCPairingNotificationResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionPropose

This request is used send a session proposal to a client which has an already settled pairing therefore this method exists exclusively within a pairing payload and it's the only method permitted to be relayed through a pairing.

```typescript
// request
interface WCSessionProposeRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionPropose";
  params: {
    topic: string;
    relay: RelayProtocolOptions;
    proposer: SessionParticipant;
    signal: SessionSignal;
    permissions: SessionPermissions;
    ttl: number;
  };
}

// response
interface WCSessionProposeResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionApprove

This request is sent as response for a session proposal which is signaled externally using a URI shared between clients.

```typescript
// request
interface WCSessionApproveRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionApprove";
  params: {
    relay: RelayProtocolOptions;
    responder: SessionParticipant;
    expiry: number;
    state: SessionState;
  };
}

// response
interface WCSessionApproveResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

**NOTE:** The response for this request will serve as the acknowledgement of the proposer's session settlement

### wc_sessionReject

This request is sent as response for a session proposal which is signaled externally using a URI shared between clients.

```typescript
// request
interface WCSessionRejectRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionReject";
  params: {
    reason: string;
  };
}

// response
interface WCSessionRejectResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

**NOTE:** The response for this request will serve as the acknowledgement of the proposer's session settlement

### wc_sessionUpdate

This request is used to update state of the session participant which is optionally provided by the responder extra accounts during the session lifetime;

```typescript
// request
interface WCSessionUpdateRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionUpdate";
  params: {
    state: Partial<SessionState>;
  };
}

// response
interface WCSessionUpdateResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionUpgrade

This request is used to upgrade permissions of the session during the its lifetime provided by the controller.

```typescript
// request
interface WCSessionUpgradeRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionUpgrade";
  params: {
    permissions: Partial<SessionPermmissions>;
  };
}

// response
interface WCSessionUpgradeResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionDelete

This request is used to delete the session and notify the peer that it won't be receiving anymore payloads being relayed with this topic and specifies a reason for deleting before expire.

```typescript
// request
interface WCSessionDeleteRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionDelete";
  params: {
    reason: string;
  };
}

// response
interface WCSessionDeleteResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionPayload

This request is used to relay payloads that match the list of methods agreed upon session settlement. Any requests sent with unauthorized methods will be immediately rejected by the client.

```typescript
// request
interface WCSessionPayloadRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionPayload";
  params: {
    request: {
      method: string;
      params: any;
    };
    chainId?: string;
  };
}

// response
interface WCSessionPayloadResponse {
  id: number;
  jsonrpc: "2.0";
  result: any;
}
```

### wc_sessionPing

This request is used to internally ping the other client to verify that is online. Pings are responded automatically internally by either client. By default, clients will throw a timeout if a ping is not responded within 30 seconds.

```typescript
// request
interface WCSessionPingRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionPing";
  params: {};
}

// response
interface WCSessionPingResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionNotification

This request is used to emit events as notifications that match the list of types agreed upon session settlement. Any requests sent with unauthorized types will be immediately rejected by the controller client.

```typescript
// request
interface WCSessionNotificationRequest {
  id: number;
  jsonrpc: "2.0";
  method: "wc_sessionNotification";
  params: {
    type: string;
    data: any;
  };
}

// response
interface WCSessionNotificationResponse {
  id: number;
  jsonrpc: "2.0";
  result: true;
}
```
