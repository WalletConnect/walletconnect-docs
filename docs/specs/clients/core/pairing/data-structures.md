# Data Structures

## Metadata

Metadata is a set of parameters used to identify each participant in a pairing which are provided by the consumer for the client to broadcast to its peer

```jsonc
{
  "name": string,
  "description": string,
  "url": string,
  "icons": [string],
  "verifyUrl": string, // Optional
  "redirect": { // Optional
    "native": string, // Optional
    "universal": string, // Optional
  },
}
```

## Pairing

Pairing is a topic encrypted by a symmetric key shared through a URI between two clients with the sole purpose of communicating session proposals

```jsonc
{
  "topic": string,
  "relay": {
    "protocol": string,
    "data": string
  },
  "peerMetadata": Metadata,
  "expiry": Int64,
  "active": boolean
}
```

## Error Response

```typescript
interface ErrorResponse {
  id: number;
  error: {
    code: number;
    message: string;
  };
}
```

## Relay

Relay is defined by the transport protocol used for the two clients to publish and subscribe messages between each other.

```jsonc
{
  "protocol": string,
  "data": string, // optional
}
```

## Protocol Types

```jsonc
 const ProtocolType = {
  Sign: "sign",
  Auth: "auth",
  Chat: "chat",
  Notify: "notify"
 }
```