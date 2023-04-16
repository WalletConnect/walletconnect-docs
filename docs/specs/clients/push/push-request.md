# Push Request

## User Flow

User visits application that connected with their wallet

App can prompt a push request after connecting or it can provide a "bell" button for the user to trigger the push request

User can approve or reject the push request from their wallet.

In future events, the app can trigger push notifications after subscription has been approved.

## Request Protocol

### Pre-requisites

Wallet and Dapp are required to establish pairing P before proceeding to Push protocol execution.

### Protocol

Request protocol will be established as follows:

1. Dapp sends push request on pairing P with public key X, relay and metadata
2. Dapp subscribes to response topic, which is the sha256 hash of public key X
3. Wallet receives push request with public key X on pairing P
4. Wallet generates key pair Y
5. Wallet derives symmetric key with keys X and Y
6. Push topic is derived from sha256 hash of symmetric key 
7. Wallet subscribes to push topic 
8. Wallet sends proposal response(type1 envelope) on response topic with subscriptionAuth
9. Dapp receives proposal response on response topic
10. Dapp derives symmetric key and decrypts subscriptionAuth
11. Dapp registers address at the Cast Server
 
