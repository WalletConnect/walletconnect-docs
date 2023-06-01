# Crypto Keys

WalletConnect can be simply described as a remote protocol for communication between clients using end-to-end encryption and there are also uses of authentication.

In this document we will describe how this is achieved through different key types and crypto algorithms

## Key Types

There are three types of keys that are used in our protocol:

1. Authentication Public Key Pairs - these are key pairs with both a private key and a public key that are persisted and generated on each client internally. These keys are used to authenticate either the client itself when connecting to a server (eg. Relay) or they are used to authenticate a blockchain account such as an Identity Key

2. Encryption Public Key Pairs - these are key pairs with both a private key and a public key that are ephemerally generated on each client internally. These are not used for blockchain transactions at all and are purely for messaging purposes. These keys are on the Curve25519 and will be used for secret derivation

3. Encryption Symmetric Keys - these are keys used for encryption of the messages exchanged in our communication protocol which can be derived from two sources:

    * random source - these are only used for pairings where a key is randomly generated and exchanged between two clients
    * secret derivation - these are used for all of our protocol APIs to establish a secure channel between the two clients using a Diffie-Hellman key exchange (x25519). After the key exchange the derived secret is hashed using HKDF to obtain the correct symmetric key

## Key Algorithms

There are the algorithms that we use in our communication protocol:

* Ed25519 - used for all persisted client or blockchain account authentication
* Sha-256 - used for hashing keys into topics that are used for publish-subscribe network
* Curve25519 - used as our elliptic curve for public key cryptography
* X25519 - used for secret derivation between two clients
* HKDF - used for a symmetric key derivation using the DH secret
* Chacha20-poly1305 - used for encryption and authentication of messages
