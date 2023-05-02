# Push Authentication

In this document we will describe the authentication payloads for different methods

## Push Subscription

Given that a dapp is proposing a push subscription for a blockchain account that clients don't have to authenticate in advance, the wallet needs to prove account ownership in the Push Subscription response.

This is achieved using [Identity Keys](../../servers/keys/identity-keys) and did-jwt with the following claims:

`iat` - timestamp when jwt was issued

`exp` - timestamp when jwt must expire

`iss` - did:key of an identity key. Enables to resolve attached blockchain account.

`ksu` - key server for identity key verification

`aud` - dapp's url

`sub` - blockchain account that push subscription has been proposed for (did:pkh)

`act` - description of action intent. Must be equal to "push_subscription"

`scp` - scope of notification types authorized by the user

Expiry should be calculated from the addition of the issuance date and the push request TTL (86400 seconds)
