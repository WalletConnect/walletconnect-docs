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

## Chains & Namespaces

Chains and Namespaces are defined with different methods and events that are compatible for the set of chains within the scope.

As defined by the [CAIP-2](https://chainagnostic.org/CAIPs/caip-2), we have a schema for chain id's that is composed by both a chain namespace and a chain reference.

```sh
chain_id = chain_namespace + ":" + chain_reference
```

As defined by the [CAIP-10](https://chainagnostic.org/CAIPs/caip-10), we have a schema for account id's that is composed by a chain namespace, a chain reference and account address.

```sh
account_id = chain_id + ":" + account_address
```

These will be used for reference for both Proposals and Session Namespaces.

### Proposal Namespaces

Proposal namespaces will include: chains, methods and events.

#### Proposal Namespace

Namespace includes multiple chains within the same set of methods and events.

```jsonc
{
  "chains": string[], // set of CAIP-2 chain id's
  "methods": string[], // set of JSON-RPC methods
  "events": string[] // set of JSON-RPC events
}
```

#### Proposal Chain

Chain defines methods and events for a single chain id.

```jsonc
{
  "methods": string[], // set of JSON-RPC methods
  "events": string[] // set of JSON-RPC events
}
```

#### Proposal Namespace Map

A proposal namespace map can index these two data structures with either a namespace or chain id as a reference.

```jsonc
{
  "<chain_namespace>": ProposalNamespace,
  // OR
  "<chain_id>": ProposalChain,
}
```

### Session Namespaces

Session namespaces will include: chains, methods and events.

#### Session Namespace

Namespace includes multiple chains within the same set of methods and events.

```jsonc
{
  "chains": string[], // set of CAIP-10 account id's
  "methods": string[], // set of JSON-RPC methods
  "events": string[] // set of JSON-RPC events
}
```

#### Session Chain

Chain defines methods and events for a single chain id.

```jsonc
{
  "accounts": string[], // set of CAIP-10 account id's
  "methods": string[], // set of JSON-RPC methods
  "events": string[] // set of JSON-RPC events
}
```

#### Session Namespace Map

A sesion namespace map can index these two data structures with either a namespace or chain id as a reference

```jsonc
{
  "<chain_namespace>": SessionNamespace,
  // OR
  "<chain_id>": SessionChain,
}
```


## Session

Session is a topic encrypted by a symmetric key derived using a key agreement established after an approved proposal and it has a controller participant that can update its accounts, methods, events and expiry

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
  "namespaces": SessionNamespaceMap,
  "requiredNamespaces": ProposalNamespaceMap,
  "optionalNamespaces": ProposalNamespaceMap,
  "properties": Map<string, string>,
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
  "requiredNamespaces": ProposalNamespaceMap,
  "optionalNamespaces": ProposalNamespaceMap,
  "properties": Map<string, string>,
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
  "namespaces": SessionNamespaceMap,
  "expiry": Int64, // seconds
}
```
