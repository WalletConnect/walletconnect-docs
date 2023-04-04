# Push Subscribe

## User Flow

The Push subscribe flow will require a dapp to host a static json file which will contain a DID document compliant with `did:web` method as specified [here](https://w3c-ccg.github.io/did-method-web/). In this DID document we will specify a X25519 public key that will be used by the Push API protocol to derive a symmetric key for the Push topic.

On the Wallet side we will be able to fetch a list of dapps that expose public keys for Push subscribe from a registry as for example our WalletConnect Cloud Explorer. These public keys are generated on the Cast server which will be able to listen for new subscriptions sent by the wallet to the subscribe topic which is the sha256 hash of the public key exposed.

Once the wallet user has selected the dapp which they intend to subscribe to, the wallet will be able to subscribe remotely without visiting the dapp.

## Subscribe Protocol

### Pre-requisites

The Push subscribe flow will require a dapp to host a static json file which will contain a DID document compliant with `did:web` method as specified [here](https://w3c-ccg.github.io/did-method-web/). In this DID document we will specify a X25519 public key that will be used by the Push API protocol to derive a symmetric key for the Push topic.



### Protocol

Subscribe protocol will be established as follows:

1. Wallet fetches public key X from the did:web document
2. Wallet derives response topic, which is the sha256 hash of public key X
3. Wallet generates key pair Y
4. Wallet derives symmetric key with keys X and Y
5. Push topic is derived from sha256 hash of symmetric key
6. Wallet sends push subscribe request (type 1 envelope) on response topic with subscriptionAuth
7. Cast Server receives push subscribe request on response topic
8. Cast Server derives symmetric key and decrypts subscriptionAuth
9. Cast Server triggers webhook to notify Dapp of new registered address
10. Cast Server responds to push subscribe request
11. Wallet receives push subscribe response
12. Wallet subscribes to Push Topic which is sha256 of symmetric key
