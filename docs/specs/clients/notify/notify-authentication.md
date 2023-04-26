# Notify Authentication

In this document we will describe the authentication payloads for different methods

## Notify Subscription

Given that a dapp is proposing a notify subscription for a blockchain account that clients don't have to authenticate in advance, the wallet needs to prove account ownership in the Notify Subscription response.

This is achieved using [Identity Keys](../../servers/keys/identity-keys) and did-jwt with the following claims:

`iat` - timestamp when jwt was issued

`exp` - timestamp when jwt must expire

`iss` - did:key of an identity key. Enables to resolve attached blockchain account.

`ksu` - key server for identity key verification

`aud` - dapp's domain url

`sub` - blockchain account that notify subscription is associated with (did:pkh)

`act` - description of action intent. Must be equal to "notify_subscription"

`scp` - scope of notification types authorized by the user

Expiry should be calculated from the addition of the issuance date and the notify request TTL (86400 seconds)
 

## Notify Message

For each Notify message, the Dapp will have an authenticated payload signed by the chosen Cast Server which will have associated an authentication key for each Dapp domain.

This is achieved using [Dapp Authentication](./dapp-authentication.md) keys which are exposed by the Case Server but hosted on the Dapp's domain.

The message payload is a did-jwt with the following claims:

`iat` - timestamp when jwt was issued

`exp` - timestamp when jwt must expire

`iss` - did:key of an identity key. Enables to resolve which Cast server was used.

`ksu` - key server for identity key verification

`aud` - did:key of an identity key. Enables to resolve attached blockchain account.

`sub` - blockchain account that notify subscription is associated with (did:pkh)

`act` - description of action intent. Must be equal to "notify_message"

`app` - dapp's domain url

`msg` - message object including the following parameters:

    * title - short message used in the title of the notification

    * body - long messages ued in the body of the notification
 
    * icon - image url used to display with the notification
 
    * url -  redirect url for call-to-action related to notification
 
    * type - notification type which matches the scope of notify subscription

Expiry should be calculated from the addition of the issuance date and the notify request TTL (86400 seconds)
