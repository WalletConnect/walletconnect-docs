# Notify Proposal

## User Flow

User visits application that connected with their wallet

App can prompt a notify proposal after connecting or it can provide a "bell" button for the user to trigger the notify proposal

User can approve or reject the notify proposal from their wallet.

In future events, the app can trigger notifications after subscription has been approved.

## Proposal Protocol

### Pre-requisites

Wallet and Dapp are required to establish pairing topic before proceeding to Notify protocol execution.

Additonally Wallet must meet the pre-requisites for the [Notify Subscribe](./notify-subscribe.md) to complete this flow

### Protocol

Proposal protocol will be established as follows:

1. Dapp queries Notify Server for the key agreement public key (X)
2. Dapp sends notify proposal on pairing topic with public key X, relay and metadata
3. Wallet receives notify proposal with public key X on pairing topic
4. Wallet generates key pair Y
5. Wallet derives symmetric key with keys X and Y
6. Notify topic is derived from sha256 hash of symmetric key 
7. Wallet sends notify subscribe request to Notify Server with subscriptionAuth
8. Wallet responds to Dapp with subscriptionAuth
9. Dapp derives subscriptionId from sha256 hash of subscriptionAuth
10. Dapp verifies with Notify Server that subscription was created with matching subscriptionId.
