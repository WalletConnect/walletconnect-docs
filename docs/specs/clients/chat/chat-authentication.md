# Chat Authentication

Given that Chat API supports multiple clients with different [Identity Keys](./chat-identity-keys.md) for the same blockchain account, we must validate different payloads:

1. Invite Proposals
2. Invite Approvals
3. Chat Messages
4. Chat Receipts

This will be achieved using did-jwt which the different purposes above will have the same mandatory fields:

* iat - timestamp when jwt was issued 
* exp - timestamp when jwt must expire
* iss - public key of the identity key
* ksu - key server for identity key verification

Expiry will be calculated 30 days (2592000 seconds) from issued date


## Invite Proposals

When we are validating invite proposal we must use the following additional fields in the jwt:

* sub - opening message included in the invite
* aud - responder/invitee blockchain account (did:pkh)

## Invite Approvals

When we are validating invite approvals we must use the following additional fields in the jwt:

* sub - public key sent by the responder/invitee
* aud - proposer/inviter blockchain account (did:pkh)


## Chat Messages

When we are validating chat messages we must use the following additional fields in the jwt:

* sub - message sent by the author account
* aud - recipient blockchain account (did:pkh)
* xma - extensible media attachment (optional)

## Chat Receipts

When we are validating chat receipts we must use the following additional fields in the jwt:

* sub - hash of the message received
* aud - sender blockchain account (did:pkh)

