# Push Proposal

## User Flow

User visits application that connected with their wallet

App can prompt a push proposal after connecting or it can provide a "bell" button for the user to trigger the push proposal

User can approve or reject the push proposal from their wallet.

In future events, the app can trigger notifications after subscription has been approved.

## Proposal Protocol

### Pre-requisites

Wallet and Dapp are required to establish pairing topic before proceeding to Push protocol execution.

Additonally Wallet must meet the pre-requisites for the [Push Subscribe](./push-subscribe.md) to complete this flow

### Protocol

Proposal protocol will be established as follows:

1. Dapp queries Push Server for the key agreement public key (X)
2. Dapp sends push proposal on pairing topic with public key X, relay and metadata
3. Wallet receives push proposal with public key X on pairing topic
4. Wallet generates key pair Y
5. Wallet derives symmetric key with keys X and Y
6. Push topic is derived from sha256 hash of symmetric key 
7. Wallet sends push subscribe request to Push Server with subscriptionAuth
8. Wallet responds to Dapp with subscriptionAuth
9. Dapp derives subscriptionId from sha256 hash of subscriptionAuth
10. Dapp verifies with Push Server that subscription was created with matching subscriptionId.