# Authentication

## User Flow

User visits a new website that requires authentication from wallet.

1. Website displays Pairing qrcode or deep link 
2. User scans qrcode or redirects to wallet
3. User approves prompt for auth in wallet
4. User returns to website after prompt success
5. Website is now authenticated with signed message

User returns to a previously visited website before authentication expiry

1. Website checks if user is authenticated from local storage
2. Website is now authenticated with signed message

User returns to a previously visited website after authentication expiry

1. Website checks if user is authenticated from local storage
2. Website generates new keypair and derives a new response topic from it
3. Website sends new request to previously paired wallet, using known pairing topic, but subscribes to new response topic
4. User is prompted/redirected to wallet
5. User approves prompt for auth in wallet, wallet responds on the new response topic
6. User returns to website after prompt success
7. Website is now authenticated with signed message

## Request Protocol

#### Prerequisites
A and B are required to establish pairing before proceeding to Auth protocol execution.


#### Protocol

A generates keyPair X and generates response topic.

Response topic is the hash of publicKey X.

A will construct an authentication request.

A publishes request on A-B pairing.

A subscribes to messages on response topic.

B receives request on A-B pairing.

B constructs message to be signed from request and signs it.

B generates keyPair Y and generates shared symKey R.

B encrypts response with symKey R as type 1 envelope.

B sends response on response topic.

A receives response and validates signature.

If signature is valid, then user is authenticated.
