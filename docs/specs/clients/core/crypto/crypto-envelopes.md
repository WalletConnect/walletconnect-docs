# Crypto Typed Envelopes

Typed envelopes purpose is to provide flexible and future proof jsonrpc serialization methods. All WalletConnect protocols requests should use one of the following envelope serialization types.

## Envelope Structure:

First byte of any serialized envelope string always defines its type so envelope structure is known:  
tp - type byte (1 byte)

### Type 0 Envelope

Used when peers agreed on symmetric key and both are able to seal and open the sealbox.

algo: ChaCha20-Poly1305

tp - type byte (1 byte) = 0
iv - initialization vector (12 bytes)
ct - ciphertext (N bytes)
tag - authentication tag (16 bytes)
sb - sealbox: ct + tag

#### Serialized Envelope:

tp + iv + sb

### Type 1 Envelope

Used by client that is able to seal the message but it's peer is unable to open the sealbox as it is missing public key for Diffie Hellman key agreement. After deriving symmetric key using `pk` and private key associated with the topic the envelope has been received on both peers are able to seal and open the sealbox.

algo: ChaCha20-Poly1305

tp - type byte (1 byte) = 1
pk - public key (32 bytes)
iv - initialization vector (12 bytes)
ct - ciphertext (N bytes)
tag - authentication tag (16 bytes)
sb - sealbox: ct + tag

#### Serialized Type 1 Envelope:

tp + pk + iv + sb
