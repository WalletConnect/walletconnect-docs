# Client Synchronization

WalletConnect 2.0 clients will synchronize state and events for the out-of-band sequences, both session and pairing, through JSON-RPC methods which are exclusively used to communicate between the two connected clients. These will be published and subscribed under corresponding topics for both before and after settlement. This can be described under a single matrix that encompasses these two states for both sequences.

![outofband-sequence-sync](.gitbook/assets/outofband-sequence-sync.png)

## JSON-RPC API

Below you can find all the JSON-RPC methods used between clients to synchronize state and events with corresponding interface for both request and response. Any interfaces referenced below (eg. `RelayProtocolOptions`, `PairingParticipant`, etc) refer to the same interfaces described in the [technical specification](./tech-spec.md)

### wc_pairingApprove

This request is sent as response for a pairing proposal which is signaled externally using a URI shared between clients.

```typescript
// request
interface WCPairingApproveRequest {
  id: 1;
  jsonrpc: "2.0";
  method: "wc_pairingApprove";
  params: {
    topic: string;
    relay: RelayProtocolOptions;
    responder: PairingParticipant;
    expiry: number;
    state: PairingState;
  };
}

// response
interface WCPairingApproveResponse {
  id: 1;
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
  id: 2;
  jsonrpc: "2.0";
  method: "wc_pairingReject";
  params: {
    reason: string;
  };
}

// response
interface WCPairingRejectResponse {
  id: 2;
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
  id: 3;
  jsonrpc: "2.0";
  method: "wc_pairingUpdate";
  params: {
    state: Partial<PairingState>;
  };
}

// response
interface WCPairingUpdateResponse {
  id: 3;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingUpgrade

This request is used to upgrade permissions of the pairing during the its lifetime provided by the controller.

```typescript
// request
interface WCPairingUpgradeRequest {
  id: 4;
  jsonrpc: "2.0";
  method: "wc_pairingUpgrade";
  params: {
    permissions: Partial<PairingPermissions>;
  };
}

// response
interface WCPairingUpgradeResponse {
  id: 4;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingDelete

This request is used to delete the pairing and notify the peer that it won't be receiving anymore payloads being relayed with this topic and specifies a reason for deleting before expire.

```typescript
// request
interface WCPairingDeleteRequest {
  id: 5;
  jsonrpc: "2.0";
  method: "wc_pairingDelete";
  params: {
    reason: string;
  };
}

// response
interface WCPairingDeleteResponse {
  id: 5;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingPayload

This request is used to relay payloads that match the list of methods agreed upon pairing settlement. Any requests sent with unauthorized methods will be immediately rejected by the client.

```typescript
// request
interface WCPairingPayloadRequest {
  id: 6;
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
  id: 6;
  jsonrpc: "2.0";
  result: any;
}
```

### wc_pairingPing

This request is used to internally ping the other client to verify that is online. Pings are responded automatically internally by either client. By default, clients will throw a timeout if a ping is not responded within 30 seconds.

```typescript
// request
interface WCPairingPingRequest {
  id: 7;
  jsonrpc: "2.0";
  method: "wc_pairingPing";
  params: {};
}

// response
interface WCPairingPingResponse {
  id: 7;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_pairingNotification

This request is used to emit events as notifications that match the list of types agreed upon pairing settlement. Any requests sent with unauthorized types will be immediately rejected by the controller client.

```typescript
// request
interface WCPairingNotificationRequest {
  id: 8;
  jsonrpc: "2.0";
  method: "wc_pairingNotification";
  params: {
    type: string;
    data: any;
  };
}

// response
interface WCPairingNotificationResponse {
  id: 8;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionPropose

This request is used send a session proposal to a client which has an already settled pairing therefore this method exists exclusively within a pairing payload and it's the only method permitted to be relayed through a pairing.

```typescript
// request
interface WCSessionProposeRequest {
  id: 9;
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
  id: 9;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionApprove

This request is sent as response for a session proposal which is signaled externally using a URI shared between clients.

```typescript
// request
interface WCSessionApproveRequest {
  id: 10;
  jsonrpc: "2.0";
  method: "wc_sessionApprove";
  params: {
    topic: string;
    relay: RelayProtocolOptions;
    responder: SessionParticipant;
    expiry: number;
    state: SessionState;
  };
}

// response
interface WCSessionApproveResponse {
  id: 10;
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
  id: 11;
  jsonrpc: "2.0";
  method: "wc_sessionReject";
  params: {
    reason: string;
  };
}

// response
interface WCSessionRejectResponse {
  id: 11;
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
  id: 12;
  jsonrpc: "2.0";
  method: "wc_sessionUpdate";
  params: {
    state: Partial<SessionState>;
  };
}

// response
interface WCSessionUpdateResponse {
  id: 12;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionUpgrade

This request is used to upgrade permissions of the session during the its lifetime provided by the controller.

```typescript
// request
interface WCSessionUpgradeRequest {
  id: 13;
  jsonrpc: "2.0";
  method: "wc_sessionUpgrade";
  params: {
    permissions: Partial<SessionPermmissions>;
  };
}

// response
interface WCSessionUpgradeResponse {
  id: 13;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionDelete

This request is used to delete the session and notify the peer that it won't be receiving anymore payloads being relayed with this topic and specifies a reason for deleting before expire.

```typescript
// request
interface WCSessionDeleteRequest {
  id: 14;
  jsonrpc: "2.0";
  method: "wc_sessionDelete";
  params: {
    reason: string;
  };
}

// response
interface WCSessionDeleteResponse {
  id: 14;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionPayload

This request is used to relay payloads that match the list of methods agreed upon session settlement. Any requests sent with unauthorized methods will be immediately rejected by the client.

```typescript
// request
interface WCSessionPayloadRequest {
  id: 15;
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
  id: 15;
  jsonrpc: "2.0";
  result: any;
}
```

### wc_sessionPing

This request is used to internally ping the other client to verify that is online. Pings are responded automatically internally by either client. By default, clients will throw a timeout if a ping is not responded within 30 seconds.

```typescript
// request
interface WCSessionPingRequest {
  id: 16;
  jsonrpc: "2.0";
  method: "wc_sessionPing";
  params: {};
}

// response
interface WCSessionPingResponse {
  id: 16;
  jsonrpc: "2.0";
  result: true;
}
```

### wc_sessionNotification

This request is used to emit events as notifications that match the list of types agreed upon session settlement. Any requests sent with unauthorized types will be immediately rejected by the controller client.

```typescript
// request
interface WCSessionNotificationRequest {
  id: 17;
  jsonrpc: "2.0";
  method: "wc_sessionNotification";
  params: {
    type: string;
    data: any;
  };
}

// response
interface WCSessionNotificationResponse {
  id: 17;
  jsonrpc: "2.0";
  result: true;
}
```
