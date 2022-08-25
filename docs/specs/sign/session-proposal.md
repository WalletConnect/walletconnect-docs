# Session Proposal

## User Flow

User vists application that requires to connect wallet

1. App displays qrcode or deep link to connect wallet
2. User scans qrcode or redirects to wallet
3. User approves session proposal from App
4. User returns to app after success prompt
5. App receives accounts and namespaces from Wallet
6. App sends request to sign transaction or message
7. User redirects to wallet to inspect request
8. User approves transaction or message request
9. User returns to app after success prompt
10. App receives transaction confirmation or signature

## Proposal Protocol

Proposal protocol will be established has followed:

1. Dapp generates pairing URI with topic A, relayA, symmetric key
2. Dapp sends session proposal to topic A with publicKey, relayB, permissions and metadata
3. Dapps shares URI with topic A with topic A, relayA, symmetric key for encrypt topic A
4. Wallet pairs using shared URI topic A and symmetric key
5. Wallet receives session proposal from topic A
6. Wallet settles session with topic B using derived key
7. Wallet sends approval to topic A with relayB, publicKey to encrypt topic B
8. Wallet sends settlement payload to topic B with state, permissions and metadata
9. Dapp receives approval on topic A
10. Dapp settles session with topic B using derived key
11. Dapp receives settlement on topic B
12. Dapp sends acknowledgment on topic B
