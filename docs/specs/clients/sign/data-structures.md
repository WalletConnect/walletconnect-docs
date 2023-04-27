# Data Structures

In this document we define data structures and definitions used in the v2.0-rc protocol

## Relay

Relay is defined by the transport protocol used for the two clients to publish and subscribe messages between each other.

```jsonc
{
  "protocol": string,
  "data": string, // optional
}
```

## Session

Session is a topic encrypted by a symmetric key derived using a key agreement established after an approved proposal and it has a controller participant that can update its accounts, methods, events and expiry.

```jsonc
{
  "topic": string,
  "pairingTopic: string,
  "relay": {
    "protocol": string,
    "data": string
  },
  "self": {
    "publicKey": string,
    "metadata": Metadata
  },

  "peer": {
    "publicKey": string,
    "metadata": Metadata
  },

  "expiry": Int64, // timestamp (seconds)
  "acknowledged": boolean,
  "controller": string,
  "namespaces": {
    "<namespace_name>" : {
      "accounts": [string],
      "methods": [string],
      "events": [string]
    }
  },
  "requiredNamespaces": {
    "<namespace_name>" : {
      "chains": [string],
      "methods": [string],
      "events": [string]
    }
  },
}
```

## Proposal

Proposal is sent by the proposer client to be approved or rejected by the responder who is assumed to be the controller of the resulting session and will respond with its public key to derive the future topic and symKey.

```jsonc
{
  "id": number, // json-rpc request id
  "relays": [
    {
      "protocol": string,
      "data": string
    }
  ],
  "proposer": {
    "publicKey": string,
    "metadata": Metadata
  },
  "requiredNamespaces": {
    "<namespace_name>" : {
      "chains": [string],
      "methods": [string],
      "events": [string]
    }
  },
  "pairingTopic": string
}
```

## Response

Response is sent by the responder client and can either be an approval or rejection to the proposal made and if approved will be followed by a settlement request on the new topic derived from the hashed symmetric key from the key agreement

```jsonc
// Approval
{
  "relay": {
    "protocol": string,
    "data": string // Optional
  },
  "responderPublicKey": string
}

// Rejection

{
  "error": {
    "code": Int64,
    "message": string
  }
}
```

## Settlement

Settlement is sent by the responder after approval and it's broadcasted right after the response on the new topic derived from the hashed symmetric key from the key agreement

```jsonc
{
  "relay": {
    "protocol": string,
    "data": string // Optional
  },
  "controller": {
    "publicKey": string,
    "metadata": Metadata
  },
  "namespaces": {
    "<namespace_name>": {
      "accounts": [string],
      "methods": [string],
      "events": [string]
    }
  },
  "requiredNamespaces": {
    "<namespace_name>": {
      "chains": [string],
      "methods": [string],
      "events": [string]
    }
  },
  "optionalNamespaces": {
    "<namespace_name_OR_chain>": {
      "chains": [string],
      "methods": [string],
      "events": [string]
    }
  },
  "sessionProperties": {
    "property": string
  },
  "expiry": Int64, // seconds
}
```

## Verify Context

Verify Context is appended to Session Proposals and Session Requests to provide metadata that was constructed internally by the client that is relevant to the specific proposal or request

```jsonc
{
  "verified": {
    "origin": string,
    "validation": "UNKNOWN" | "VALID" | "INVALID",
    "verifyUrl": string
  }
}
```
