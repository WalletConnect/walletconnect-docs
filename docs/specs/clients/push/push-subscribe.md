import IframeComponent from '../../../components/IframeComponent';

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
2. Subscribe topic is derived from the sha256 hash of public key X
3. Wallet generates key pair Y
4. Wallet derives symmetric key S with keys X and Y
5. Wallet sends push subscribe request (type 1 envelope) on subscribe topic with subscriptionAuth
6. Response topic is derived from the sha256 hash of symmetric key S
7. Wallet subscribes to response topic
8. Cast Server receives push subscribe request on subscribe topic
9. Cast Server derives symmetric key and decrypts subscriptionAuth
10. Cast Server triggers webhook to notify Dapp of new registered address
11. Cast Server generates key pair Z
12. Cast Server derives symmetric key P with keys Y and Z
13. Cast Server responds to push subscribe request on response topic
14. Wallet receives push subscribe response on the response topic
15. Wallet derives symmetric key P
16. Push topic is derived from the sha256 hash of the symmetric key P
17. Wallet subscribes to push topic for future push messages

<IframeComponent />
