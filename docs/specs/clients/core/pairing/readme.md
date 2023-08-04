# Pairing API

## Description

Pairing API is a lightweight API for establishing an encrypted, protocol agnostic communication layer between peers. It's purpose is to provide a secure channel for proposing protocols or sending requests.


## Context

WalletConnect offers Sign, Auth and Notify Protocols. In order to allow reusable communication channel between peers, the Pairing API exposes a common interface and allows for sending and receiving multi-protocol requests over a single pairing.

This significantly improves end user experience by allowing to scan just a single QR code and receive requests from different protocols.

## User Flow

User visits a new website that requires a Sign session for submitting transactions and Auth for authentication

1. Website displays qrcode or deep link
2. User scans qrcode or redirects to wallet
3. Popup with session proposal and authentication request appears
4. User approves session request and authenticates
5. User returns to website after prompt success
6. User is now authenticated and has a sign session established with the dapp

## Request Protocol

#### Successful request handling if B registers protocol P

1. A creates random symKey S and pairing topic that is a sha256 hash of symKey S.
2. A encrypts request with symKey S. Pairing client does not expects any response. P is responsible for response subscription.
3. A sends request on pairing topic.
4. A generates URI and appends the query parameter with the keys "methods" and the value is an array of inner arrays.
5. B verifies that the URI's "methods" query parameter's value against B's cached "registered methods" list of protocol methods. If verification being valid then B subscribes to pairing topic from provided URI
6. B receives protocol P request.


#### Error case where B did not registered protocol P

1. A creates random symKey S and pairing topic that is a sha256 hash of symKey S.
2. A encrypts request with symKey S. Pairing client does not expects any response. P is responsible for response subscription.
3. A sends request on pairing topic.
4. A generates URI and appends the query parameter with a key "methods" with the value being a list of the required methods registered.
5. B verifies that the URI's "methods" query parameter equals B's cached "registered methods" list of protocol methods. The verification fails by based on any of the cases in [Pairing Methods](/docs/specs/clients/core/pairing/pairing-methods.md). B will notify user that it cannot pair with A, and internally publish a wc_deletePairing with a reason.

## Pairing lifecycle

**Inactive Pairing** - A pairing is considered inactive if the proposing peer has no proof that any peer has paired with it. Inactive pairings should expire 5 minutes after being created.

**Active Pairing** - A pairing is considered active if any of peer has a proof that other peer can respond to it. Active pairings should have a 30 days expiry period.

- Proposing peer is creating an inactive pairing and sends protocol P's request. If the response for that request is delivered, the proposing peer should activate the pairing as it has proof that peer has paired.

- Responding peer should always create an active pairing on its side after calling `pair()` function.

- Pairing expiry should be updated to another 30 days on each peer after any request or response from its peer has been delivered proving that pairing remains active.


