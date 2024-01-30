# Glossary

## Sequence

Sequences refers to a complete flow starting from a Proposal and reaching Settlement. A proposer will create a sequence proposal that will derive a Signal to share out-of-band with the responder in order to reach agreement regarding different permissions and conditions for the sequence. A Sequence establishes how the two clients will relay messages with each other, which keys they will use to encrypt and authenticate messages and additionally what are the permissions regarding the JSON-RPC requests that can be made, notifications that can be emitted and what state will be shared.

There are two types of sequences specified by the protocol called Pairing and Session.

## Pairing

Pairing is a specialized sequence which has fixed permissions to only allow a client to propose sessions through it using the method `wc_sessionPropose` which it will be used as a signal out-of-band for session proposals.

## Session

Session is a generalized sequence which has customizable permissions regarding JSON-RPC requests, notifications emitted and also what accounts are exposed based on the set of chains determined in the permissions.

## Signal

A signal is a payload that can be shared outside of the sequence (out-of-band) to communicate a proposal to another client. Each sequence has its own type of signal.

Pairing is a specialized sequence which has fixed permissions therefore the signal can be encoded as an URI using only the proposal topic, proposer's publicKey, relay protocol options and the controller flag for the proposer. This can be shared either through a qrcode or deep link between clients.

Session is a generalized sequence which has customized permissions therefore the signal is a proposal sent through a settled pairing already established between the two clients.

## Settlement

Settlement refers to the internal event which both clients will execute from a successful response of a sequence proposal.

In the case of a responder, the settlement happens before the response is published to the proposer.

In the case of a proposer, the settlement happens after receiving the response published by the responder.

Settlement will generate a shared key using the key pairs of the participants and it will determine the topic from hashing the shared key which is only known to both participants

## Controller

A client can be either a controller or non-controller. This means that all sequences responded and/or proposed by this client will be controlled by it.

A controller is not bounded by the permissions set by the sequence, meaning it can send any JSON-RPC request, emit any notification type and is the only participant that upgrade the permissions or update the state of the sequence.

The controller client will always be the "wallet" which is exposing blockchain accounts to a "dapp" and therefore is also in charge of signing.

Disconnecting is however not exclusive to the controller client and can be triggered by either participants.

## Expiry

Expiry refers to the timestamp when the sequence is deleted.

Whenever the responder settles the sequence it calculates the expiry by adding the TTL to the current timestamp. The proposer would then use the expiry calculated by the responder.

Expiry times are always represented in seconds.

## Time to Live (TTL)

Time to live (TTL) refers to the maximum duration for a sequence to live.

TTL plus the current timestamp is used to calculate the expiry timestamp.

TTL times are always represented in seconds.

## Shared Key

Shared key is the key derived using both participants key pairs using the elliptic curve Diffie-Hellman (ECDH) key agreement scheme.

The chosen elliptic curve was Curve25519 offering 128 bits of security (256 bits key size) which was specifically designed for ECDH and it's widely supported by many different platforms natively. The name of its DH function is X25519

## Authenticated Encryption

Authentication Encryption refers to a form of encryption which simultaneously assures the confidentiality and authenticity of data.

The chosen approach was to encrypt-then-mac which produces a MAC based on the resulting ciphertext. The encryption uses AES-256-CBC with a random Initialization Vector (IV) and authentication uses HMAC-SHA256. The encrypted payloads are serialized in the following order: iv, publicKey, mac and cipherText.

To derive the encryption and authentication keys it uses a SHA512 hash of the shared key using the first 32bytes for encryption and the last 32 bytes for authentication

## JSON-RPC

JSON-RPC is a stateless, light weight remote procedure call (RPC) protocol which uses JSON (RFC 4627) as data format. You can read more about JSON-RPC specification [here](https://www.jsonrpc.org/specification)

## Relay

Relay refers to the system, network and/or mechanism used to send and receives messages between the two clients.

## Publish-Subscribe pattern

Publish-Subscribe (also known as PubSub) is a messaging pattern where senders of messages (publishers) do not send messages directly to receivers but instead label messages with a topic that can be listened to by subscribers. Subscribers only receive messages matching the topics that have expressed interest on.

## Topics

Topics are 32 bytes hexadecimal strings which are used to identify messages sent between two clients regarding either proposed sequences or settled sequences. Proposed sequences use a randomly generated topic while Settled sequences use a SHA256 hash of the sharedKey.

## Namespaces

Namespaces are used to specify the chains, methods and events that are intended to be used in a particular session. They establish the minimal requirement for a wallet and a dapp to get paired. There are two types of namespaces,

### Proposal namespaces

A dapp sends a proposal namespace to the wallet for pairing. The proposal namespace contains the list of chains, methods and events that are required for the dapp. The wallet validates if the received proposal namespaces are valid and returns a session namespace as a response if it is valid. If the requested proposal namespaces are not valid, the session cannot be established and the wallet rejects it with an error code that tells the dapp if the proposal namespaces have invalid chains, methods, events or if it was rejected by the user

**Example :** If a dapp wants access to Ethereum Mainnet, Polygon and Cosmos Mainnet - the required chains, methods and events should be mentioned in the proposal namespaces request as follows :

```js
{
  "eip155": {
    "chains": ["eip155:137", "eip155:1"],
    "methods": ["eth_sign"],
    "events": ["accountsChanged"]
  },
  "cosmos": {
    "chains": ["cosmos:cosmoshub-4"],
    "methods": ["cosmos_signDirect"],
    "events": ["someCosmosEvent"]
  }
}
```

### Session namespaces

The dapp validates if the received proposal namespaces comply with the session namespaces. If they comply, a session is established successfully and pairing is completed. If not, the session is not established and all the cached data related to the namespaces are deleted. The session namespace can also choose to provide access to more chains, methods or events that were not a part of the proposal namespaces.

**Example :** The following is an example for a session namespace which complies with the requested proposal namespace example,

```js
{
  "eip155": {
    "accounts": [
      "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
      "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
    ],
    "methods": ["eth_sign"],
    "events": ["accountsChanged"]
  },
  "cosmos": {
    "accounts": [
      "cosmos:cosmoshub-4:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0"
    ],
    "methods": ["cosmos_signDirect", "personal_sign"],
    "events": ["someCosmosEvent", "proofFinalized"]
  }
}
```

You can also see that `personal_sign` method and `proofFinalized` event are not requested by the proposal namespaces but is still granted by the session namespaces. Hence, session namespaces can grant additional access to more chains, methods and events which were not requested by the proposal namespaces.
