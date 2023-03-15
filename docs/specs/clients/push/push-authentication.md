# Push Authentication

Given that a dapp is proposing a push subscription for a blockchain account that clients don't have to authenticate in advance, the wallet needs to prove account ownership in the Push Subscription response.

This is achieved using [Identity Keys](../../servers/keys/identity-keys) and did-jwt with the following claims:

`iat` - timestamp when jwt was issued

`exp` - timestamp when jwt must expire

`iss` - did:key of an identity key. Enables to resolve attached blockchain account.

`ksu` - key server for identity key verification

`aud` - dapp's url

`sub` - blockchain account that push subscription has been proposed for (did:pkh)

Expiry should be calculated from the addition of the issuance date and the push request TTL (86400 seconds)
 
