# Migrating from v1.0

WalletConnect v1.0 and v2.0 offer essentially the same end-user experience however they work very differently internally. This means that developers will have to consider different APIs and SDKs. Additionally some UX considerations need to be made when integration v2.0

## Migration schedule

WalletConnect v2.0 is **NOT** backwards-compatible with v1.0. Therefore we must coordinate a migration schedule to ensure end-users do not suffer from this transition.

Most importantly we must migrate Wallets before Dapps can start supporting v2.0. This is because Wallets can support both versions in parallel and route connection requests to corresponding clients using the version number specified in the URI present in the QR Code or Deep Link.

Once we reach a significant quota of Wallets supporting v2.0 then we can start migrating Dapps as they will be able to simply upgrade the major version of their packages on NPM.

## Multi-Chain support

Most interfaces are very similar to the previous version but the most contrasting difference between the two versions comes from its multi-chain support.

WalletConnect v1.0 mimics a lot of its behavior from Metamask's browser extension which meant that sessions tracked a single chainId, an accounts array and wallets controlled the chainId while dapps followed.

WalletConnect v2.0 instead allows dapps to request a set of chains as part of the scope of the session and Wallets respond with a success or error message when the compatibility is met. Additionally this means that the Wallet no longer controls the chainId of the chain but instead the session tracks multiple chainId's. Finally the Wallet will expose one or many accounts matching each of the chains requested by the Dapp and these can be updated on the session state during its lifetime.

## Chain-Agnostic interface

Previously on v1.0, WalletConnect expected only EVM-compatible Wallets and Dapps to use its protocol to interoperate. This assumption however brought its own constraints which disable other chain ecosystems to use meet compatibility and utilize the protocol.

WalletConnect v2.0 introduces a set of JSON-RPC methods that are permissioned to use within the session's lifetime. This means that a Dapp can request a minimum set of methods that requires to meet compatibility with the Wallet which can be responded with a success or error message when the compatibility is met. Additionally this means that not only the Dapp can determine if the Wallet can sign transactions and/or messages for the chain it needs but it also can detect support for experimental methods (eg. eth_signTypedData). Finally the Wallet can upgrade the set of methods it exposes during its session lifetime.

## Session Lifetime

Previously on v1.0, WalletConnect had indefinite session lifetime which meant that clients would persist the session state until one of the clients emitted an event to disconnect. This however introduced a lot of stalled session states where one of the clients would loose its state and never emitted an event to disconnect.

Therefore WalletConnect v2.0 introduces expiry timestamps for sessions which are currently defaulted to 7 days. This means that independent of the disconnect event not being emitted by a peer client then a client will disconnect and delete the session state after expiry is met.

Session requests include a TTL (time to live) value which can extend the default lifetime (7 days) of the session. Also the session expiry timestamp is calculated by the responder client which then shares the timestamp on its session response.

## Pairings & Sessions

The newest concept introduced with WalletConnect v2.0 which wasn't present in WalletConnect v1.0 were the pairings. Pairings which are special-purpose sessions used to propose new sessions which have a default lifetime of 30 days. Whenever a QR Code or Deep Link is generated to connect a Dapp and a Wallet it is used to establish a pairing, therefore when a session is expired or terminated it no longer requires clients to pair again if they still have an active pairing.

Pairings have longer expiration than Sessions because they are meant to be re-used for session proposals and they can request an infinite number of session proposals between Dapps and Wallets

## Single Client

Previously on v1.0, WalletConnect managed a session per each client which itself maintained a WebSocket connection with the Relay (aka Bridge) server. This design was not performant and it also introduced a lot of complexity managing multiple sessions specially for Wallets.

WalletConnect v2.0 clients are more monolithic but manage multiple sessions within one single client and transport all messages through a single WebSocket connection. This also means that WalletConnect v2.0 clients also manage their storage to persist the state of multiple sessions and consequently also pairings as well.

## Message Acknowledgement

Perhaps the biggest drawback of the WalletConnect v1.0 was that clients did not acknowledge received messages from the server and didn't track the history of JSON-RPC requests received

WalletConnect v2.0 clients track all JSON-RPC requests sent and received with the client, can ignore duplicates and acknowledge messages that were received. This means basically that independently of the server or node that WalletConnect v2.0 is connected to it won't affect the behavior of a session and its state can be restored without interruption.

## API Keys

API Keys will be required on v2.0 for the cloud version of WalletConnect, but this will not be required for self hosted WalletConnect relays. Read more about API Keys [here](api-keys.md).
