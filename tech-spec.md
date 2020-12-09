# WalletConnect 2.0 Protocol

9 December 2020
**Author:** Pedro Gomes <pedro@walletconnect.org>

## Overview

WalletConnect Protocol provides secure remote signing communication between a blockchain application and wallet which controls the authentication of the user's private keys. 

## Goals

The goal of WalletConnect protocol is to provide an interoperable secure remote signing experience between two separate environments where public key authentication is required to interface with a blockchain. The goals of the WalletConnect protocol include:

* Reducing end-user steps for connecting two environments securely
* Protect end-user activity across the relayer infrastructure
* Allow any blockchain application connect to any blockchain wallet

## Requirements

The protocol was designed to serve primarily but not exclusively mobile blockchain wallets which are targeted as the main signing environment for an end-user to manage its private keys for authenticating blockchain interactions.

 Hence the following core components were used to ensure secure and low-latency communication between the application and the wallet:

* JSON-RPC protocol
* X25519 shared key derivation
* AEAD encryption scheme

Finally the following standards were used to ensure protocol agnosticism to any blockchain interfaces when connecting applications and wallets:

* CAIP-2 blockchain identifiers
* CAIP-10 account identifiers
* CAIP-24 provider request
* CAIP-25 provider handshake

## Introduction

WalletConnect 2.0 protocol introduces new concepts when compared to its predecessor which it will purposefully break compatibility in order to provide a more consistent end-user experience across different wallets interfacing with different applications requesting to access different blockchain accounts. Not only WalletConnect 2.0 protocol becomes agnostic to the chain loosing it's strong coupling with the Ethereum blockchain state but also it decouples the session from the connection. Finally it also introduces a stronger set of rules in terms of session management in terms of lifetime cycles and duration.

In the following sections we will discuss progressively core concepts regarding relay protocols, out-of-band sequences, JSON-RPC payloads, session management and persistent storage.

## Relay Protocols

Contrary to its predecessor, the WalletConnect 2.0 protocol becomes agnostic to its relay infrastructure. While it's still possible to relay communication between a blockchain application and wallet using the Bridge Server, this is now defined as it's own relay protocol that follows a standard protocol. 

The Relay Protocol MUST follow a publish-subscribe pattern and which MUST have a JSON-RPC API interface that includes the following methods and corresponding behaviors with the relay network infrastructure:

* info - return status and information about network
* connect - start connection with network 
* disconnect - stop connection with network 
* publish - broadcast message with a topic to the network 
* subscribe - subscribe to messages with matching topic on the network 
* unsubscribe - unsubscribe to messages with matching topic on the network 
* subscription - incoming message with matching topic from the network 

Different protocols MUST have unique method prefixing to prevent conflicts when handling network interactions from the JSON-RPC API interface. For example, the Bridge server infrastructure would include methods such as `bridge_info`, `bridge_subscribe` and `bridge_publish`.

Some relay protocols may require some initialization parameters which need to be shared with another WalletConnect clients with out-of-band communication. For example, Bridge server infrastructure would include the url of the server as parameter:

```typescript
interface ProtocolOptions {
	name: string;
  params: any;
}

const protocolOptions: ProtocolOptions = {
  name: "bridge",
  params: {
    url: "wss://bridge.walletconnect.org"
  }
}

```

This shares some similarities with the WalletConnect 1.0 protocol which this protocol options were shared through the URI used when scanning a QR Code or deep linked. With the WalletConnect 2.0 protocol, any relay protocol is available therefore these protocols options are open to other potential relay infrastructure available to both the application and the wallet to share out-of-band which leads us to the out-of-band sequences.

## Out-of-Band Sequences

Just like its predecessor at its core there is a concept of a proposer and responder that share some out-of-band information that is not available to the relay protocol in order to relay payloads encrypted. This is now defined with WalletConnect 2.0 Protocol as an out-of-band sequence. There are two different sequences within WalletConnect 2.0 protocol: connection and session. 

They both follow the same procedure to settle a full sequence that goes as follows:

- Proposer generates a sequence proposal that includes a signal
- Proposer shares the signal with the target responder out-of-band
- Responder constructs the proposal using the received signal
- Responder sends response through relay protocol
  - if approved, responder settles sequence after sending response
  - if rejected, responder discards proposal after sending response
- Proposer receives response through relay protocol
  - if approved, proposer settles sequence after receiving response and sends acknowledgement
  - if reject, proposer discards proposal after receiving response
- (if approved) Responder receives acknowledgement 
  - Acknowledgement may include an error message which can unsettle the sequence

At this point, (if approved) both the proposer and the responder have settled a sequence and can now exchange payloads securely using the sequence information. 

While this conceptually describe the full flow sequence settlement procedure, we need to dive into what is actually sent between them when sharing a signal, constructing a proposal, sending a response and/or acknowledgement.

### Connection Signal

When a connection sequence is proposed it will use a URI as signal, this will be the out-of-band information shared between the proposer and the responder to construct the proposal. In the URI we will include the following parameters:

```typescript
interface UriParameters {
  protocol: string;
  version: number;
  topic: string;
  publicKey: string;
  relay: ProtocolOptions;
}

interface ConnectionSignal {
  type: "uri";
  params: {
    uri: string;
  }
}
```

### Connection Proposal

When the responder receives this URI it will be able to construct the connection sequence proposal.

```typescript
interface ConnectionParticipant {
  publicKey: string;
}

interface ConnectionProposal {
  topic: string;
  relay: ProtocolOptions;
  proposer: ConnectionParticipant;
  signal: ConnectionSignal;
  permissions: {
    jsonrpc: {
      methods: string[]
    }
  }
  ttl: number;
}
```

In the constructed proposal we are able to assert the following information:

- topic - subscribed by the proposer on the network to receive response
- relay - relay protocol and parameters used to connect to network
- proposer - public key used by the proposer to encrypted payloads after settlement
- signal - describes the signal parameters shared by the proposer
- permissions - permissions requested by the proposer (default = ["wc_sessionPropose"])
- ttl - time expected to live the settled connection sequence (default = 30 days)

### Connection Response

There are two possible outcomes for the response for a connection proposal: success or failure

#### Success

If the connection response is successful, then the responder must generate an X25519 key pair as well and derive the shared key for encrypting payloads once settled. Additionally the topic is generated as SHA256 hash of the derived shared key, this way the next topic is only known to both parties. Therefore the successful outcome response should follow as:

```typescript
interface ConnectionSuccessResponse {
  topic: string;
  relay: ProtocolOptions;
  responder: ConnectionParticipant;
  expiry: number;
}
```

**Note:** expiry is calculated using the sum of the timestamp at time settled by the responder and the ttl proposed by the proposer

#### Failure

If the connection is not successful, either because the responder rejected or any client errors occurred during settlement then the failure outcome response should follow as:

```typescript
interface ConnectionFailureResponse {
	reason: string;
}
```

**Note:** in practice there shouldn't be any reason to reject a connection proposal since it's only used for signaling sessions

### Connection Settlement

After response, the proposer should be able to settle its own sequence with the details shared. The responder public key is used for deriving the shared key and the derived topic should match the response topic. Finally it includes the expiry calculated by the responder and the connection is considered settled by both clients. The settled connection is structured as follows on both clients:

```typescript
interface ConnectionSettled {
  topic: string;
  relay: ProtocolOptions;
  sharedKey: string;
  self: ConnectionParticipant;
  peer: ConnectionParticipant;
  permissions: {
    jsonrpc: {
      methods: string[]
    }
  }
  expiry: number;
}
```

By now you should have noted that we have specified permissions but by default we only use a single method `wc_sessionPropose` allowed. This takes us to how connection and session relate to each other. 

On the WalletConnect 1.0 protocol, a connection was established per session which made bandwidth requirements for sessions unnecessarily high. Now with WalletConnect 2.0 protocol connections are settled independently of the sessions hence you have a settled connection being established as secure channel between two environments to send signals for session proposals.

Once two environments are tethered so-to-speak it can use the connection topic and derive shared key to send comprehensive session proposal with detailed permissions through the relay network encrypted.

Therefore the next sequence, session, will follow the same procedure for settlement but it will relay its out-of-band information encrypted through the settled connection.

### Session Signal

When a session is proposed through a settled connection it will use a signal structured with a topic as parameter matching the connection used to relay the proposal

```typescript
interface SessionSignal {
  method: "connection";
  params: {
    topic: string;
  }
}
```

### Session Proposal

The proposal will be listened to as part of the params of the `wc_sessionPropose` relayed across the connection settled and it will be structured as follows:

```typescript
interface SessionMetadata {
  name: string;
  description: string;
  url: string;
  icons: string[];
}

interface SessionParticipant {
  publicKey: string;
  metadata: SessionMetadata;
}

interface SessionProposal {
  topic: string;
  relay: ProtocolOptions;
  proposer: SessionParticipant;
  signal: Signal;
  permissions: {
    blockchain: {
      chainIds: string[];
    };
    jsonrpc: {
      methods: string[];
    };
  }
  ttl: number;
}
```

Session proposal look somewhat similar to connection proposal except for two particularities: participant metadata and blockchain permissions;

#### Participant Metadata

The metadata here is similar to v1.0 protocol and is displayed to the user to identify the proposal comes from the application that is attempting to connect remotely. It's also used to identify settled sessions after approval

#### Blockchain Permissions

The blockchain permissions together with the JSON-RPC methods that are described in parallel are complaint with CAIP-25 provider handshake parameters used to dictate the rules that will be used for the session. ChainIds are CAIP-2 blockchain identifiers that the application is requesting exposure from the wallet and the JSON-RPC methods are the set of methods the application requires from the wallet to fully support in order to establish a successful session sequence.

### Session Response

Just like connection sequence, session can have two outcomes for its response: success or failure

#### Success

The session response will be successful when the user approves the session proposal and the wallet verifies that it supports the requested blockchains and  JSON-RPC permissions.

Given that these conditions are met then the wallet will expose CAIP-10 blockchain accounts corresponding the requested blockchains and will derive a shared key to be used after session settlement.

```typescript
interface SessionSuccessResponse {
  topic: string;
  relay: ProtocolOptions;
  responder: SessionParticipant;
  expiry: number;
  state: {
    accountIds: string[];
  };
}
```

#### Failure

If the session is not successful, either because the user did not approve, permissions requested were not fully supported by the wallet or an error occurred during settlement then the response should be structured as follows:

``` typescript
interface SessionFailureResponse {
	reason: string;
}
```

### Session Settlement

After response, the proposer should be able to settle its own sequence with the details shared. The responder public key is used for deriving the shared key and the derived topic should match the response topic. Finally it includes the expiry calculated by the responder and the session is considered settled by both clients. The settled session is structured as follows on both clients:

```typescript
interface SessionSettled {
  topic: string;
  relay: ProtocolOptions;
  sharedKey: string;
  self: SessionParticipant;
  peer: SessionParticipant;
  permissions: {
    blockchain: {
      chainIds: string[];
    };
    jsonrpc: {
      methods: string[];
    };
  }
  expiry: number;
  state: {
    accountIds: string[];
  };
}
```

At this stage, we can consider two applications fully connected. A session has settled on both clients and the permissions have been established on both clients to exchange JSON-RPC payloads. 

## JSON-RPC Payloads

Now that WalletConnect 2.0 protocol is agnostic to the blockchain interface, it was important to dictate the rules upfront before session settlement to ensure a consistent end-user experience across multiple blockchain applications being interoperable with multiple blockchain wallets.

Therefore we will add support for CAIP-24 provider requests which will allow JSON-RPC requests to be accompanied with chainId target, this is translated as JSON-RPC request in WalletConnect between the two clients as follows:

```typescript
interface CAIP24Request extends JsonRpcRequest {
	id: number;
  jsonrpc: string;
  method: "wc_sessionPayload";
  params: {
    request: JsonRpcRequest;
    chainId?: string;
  }
}
```

This allows a blockchain application to be connected to a blockchain wallet on multiple chains at the same time and target requests individually. While chainId is optional, is highly recommended that is used by all providers built on top of the WalletConnect 2.0 protocol.

## Session Management

Contrary to its predecessor, WalletConnect 2.0 protocol is opinionated about session management on two fronts: lifecycles and duration.

### Lifecycles

As already explained on the out-of-band sequences which describe how connections signal session proposals. It's now important to note that session lifecycles are decoupled from the URI scanning or deep-linking which previously coupled to each session.

A session is proposed only through a tethered connection which can proposed for a user on an application. Therefore it's necessary that wallets design sessions to live in parallel and permit users to approve requests from different sessions simultaneously.

A JSON-RPC request from a session should never be displayed from an "active" session since multiple can be active at the same time.

### Duration

Additionally not only multiple sessions can be settled simultaneously, sessions MUST be persisted for the entire duration until expiry is met.

Only the user can terminate a session intentionally before the expiry is met therefore these sessions should be displayed in parallel on a session manager where the user can control which applications are still connected and can make requests. 

Therefore the sessions are stored controlled by the client to ensure the lifecycles and duration are respected. Which takes us to how persistent storage is handled by clients

## Persistent Storage

WalletConnect 2.0 clients are now also in control of persistent storage to ensure sessions are managed correctly on both sides hence the minimum requirement for a client to be compatible in all platforms by providing a basic key-value storage interface with asynchronous methods for get, set and delete