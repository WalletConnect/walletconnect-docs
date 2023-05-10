# Chat Invite

## User Flow

Once A has knowledge of the peer B's public key it can invite into a chat thread and with the following flow initiate a conversation:

1. A sends an invite to B's public key and adds an opening message
2. B receives the chat invite with an opening message
3. B accepts the chat invite and the thread is created
4. A receives notification the chat was accepted and created

Now both A and B can exchange messages in the newly created chat thread

## Invite Protocol

A1,A2,Ax - clients that have access A blockchain account keys
B1,B2,Bx - clients that have access B blockchain account keys

A1 retrieves the public key associated with B's blockchain account, publicKey X.
A1 generates a keyPair Y to encrypt the invite with derived DH symKey I.
A1 sends invite encrypted with type 1 envelope to the invite topic including publicKey Y.
A2 get updated with sent invite that contains response topic and symKey I and privKeyY

Invite topic is derived as the hash of the publicKey X.

B1 decrypts type 1 envelope with the privateKey X and publicKey Y and deriving DH symKey I.
B1 accepts the invite and generates a keyPair Z for chat thread.
B1 sends response with publicKey Z on response topic encrypted with type 0 envelope.

Response topic is derived as the hash of the symKey I.

B1 derives symKey T using publicKey Y and privKey Z.
B1 updates thread storage
B2 get updated with thread that contains topic, selfAccount, peerAccount and symKey T
B2 needs to update status (or remove) of received invite with peerAccount

Thread topic is derived as the hash of the symKey T.

Ax receives response which includes publicKey Z.
Ax derives symKey T using privKey Y and publicKey Z.
Ax tries to update thread storage if not yet updated

Ax and Bx both subscribe to thread topic and encrypt messages with symKey T.
