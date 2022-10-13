# Push Proposal

## User Flow

User visits application that connected with its wallet

App can prompt a push proposal after connecting or it can provide a "bell" button that user can trigger the push proposal

User can approve or reject the push proposal from its wallet.

In future events, the app can trigger push notitifcations after subscriptions has been approved.

## Proposal Protocol

#### Prerequisites
Wallet and Dapp are required to establish pairing P before proceeding to Push protocol execution.


#### Protocol

Proposal protocol will be established as follows:

1. Dapp sends push proposal on pairing P with publicKey, relay and metadata
2. Wallet receives push proposal with public key X on pairing P
3. Wallet generates key pair Y
4. Wallet derivees symmetric key derived with keys X and Y
5. Push topic is derived from sha256 hash of symmetric key 
6. Wallet subscribes to push topic 
7. Wallet sends proposal response on pairing P with publicKey Y 
8. Dapp receives proposal response on pairing P
9. Dapp derives topic and symmetric key 
