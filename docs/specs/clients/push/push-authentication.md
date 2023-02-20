# Push Authenticaiton

Given that a dapp is proposing a push subscription for a blockchain account that client's don't have to authenticate in advence, wallet needs to prove account ownership in Push Subscription response.

This is achieved using [Identity Keys](././servers/keys/identity-keys) and did-jwt with following claims:

iat - timestamp when jwt was issued
exp - timestamp when jwt must expire
iss - did:key of an identity key. Enables to resolve attached blockchain account.
ksu - key server for identity key verification
aud - The Cast Server url / projectID
sub - blockchain account that push subscription has been proposed for (did:pkh)

Expiry should be calculated from addition of issuance date and and push request ttl (86400 seconds)
 
