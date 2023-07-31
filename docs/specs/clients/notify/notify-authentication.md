# Notify Authentication

In this document we will describe the authentication payloads for different methods:

- Notify Subscription
- Notify Subscription Response
- Notify Message
- Notify Receipt
- Notify Update Response


All of the above authentication payloads will share the following claims:

- act - description of action intent. Must be equal to specific value defined in each payload
- iat - timestamp when jwt was issued
- exp - timestamp when jwt must expire
- ksu - key server for identity key verification

## Notify Subscription

The wallet creates a notify subscription by signing a JWT with the Identity Key corrresponding the blockchain account subscribed

This is achieved using [Identity Keys](../../servers/keys/identity-keys) and did-jwt with the following claims:

- act - description of action intent. Must be equal to "notify_subscription"
- iss - did:key of an identity key. Enables to resolve attached blockchain account.
- aud - did:key of an identity key. Enables to resolve associated Dapp domain used.
- sub - blockchain account that this notify subscription is associated with (did:pkh)
- scp - scope of notification types authorized by the user
- app - dapp's domain url

Expiry should be calculated from the addition of the issuance date and the notify request TTL (2592000 seconds)

## Notify Subscription Response

Once the Notify Server has successfully handled the incoming notify subscription request, it will acknowledge it by responding with a public key used for key agreement on the Notify topic.

- act - description of action intent. Must be equal to "notify_subscription_response"
- iss - did:key of an identity key. Allows for the resolution of which Notify server was used.
- aud - did:key of an identity key. Allows for the resolution of the attached blockchain account.
- sub - did:key of the public key used for key agreement on the Notify topic 
- app - dapp's domain url

Expiry should be calculated from the addition of the issuance date and the notify request TTL (86400 seconds)

## Notify Message

For each Notify message sent, the Dapp will have an authenticated payload signed by the chosen Notify Server which will have associated an authentication key for each Dapp domain.

This is achieved using [Dapp Authentication](./dapp-authentication.md) keys which are exposed by the Notify Server but hosted on the Dapp's domain.

The message payload is a did-jwt with the following claims:

- act - description of action intent. Must be equal to "notify_message"
- iss - did:key of an identity key. Enables to resolve associated Dapp domain used.
- aud - blockchain account that notify subscription is associated with (did:pkh)
- sub - hash of the matching subscription payload
- app - dapp's domain url
- msg - message object including the following parameters:
    - title - short message used in the title of the notification
    - body - long messages ued in the body of the notification
    - icon - image url used to display with the notification
    - url -  redirect url for call-to-action related to notification
    - type - notification type which matches the scope of notify subscription

Expiry should be calculated from the addition of the issuance date and the notify request TTL (86400 seconds)

## Notify Receipt

For each Notify message received, the Wallet will acknowledge its receipt with an authenticated payload that verifies that an authorized identity key received it.

- act - description of action intent. Must be equal to "notify_receipt"
- iss - did:key of an identity key. Enables to resolve attached blockchain account.
- aud - did:key of an identity key. Enables to resolve associated Dapp domain used.
- sub - hash of the stringified notify message object received
- app - dapp's domain url

Expiry should be calculated from the addition of the issuance date and the notify request TTL (86400 seconds)

## Notify Update

The wallet creates a notify update by signing a JWT with the Identity Key corrresponding the blockchain account subscribed

This is achieved using [Identity Keys](../../servers/keys/identity-keys) and did-jwt with the following claims:

- act - description of action intent. Must be equal to "notify_update"
- iss - did:key of an identity key. Enables to resolve attached blockchain account.
- aud - did:key of an identity key. Enables to resolve associated Dapp domain used.
- sub - blockchain account that this notify subscription is associated with (did:pkh)
- scp - scope of notification types authorized by the user
- app - dapp's domain url

Expiry should be calculated from the addition of the issuance date and the notify request TTL (2592000 seconds)


## Notify Update Response

Once the Notify Server has successfully handled the incoming notify update request then it will acknowledge it by responding with a hash of the new subscription payload.

- act - description of action intent. Must be equal to "notify_update_response"
- iss - did:key of an identity key. Enables to resolve associated Dapp domain used.
- aud - did:key of an identity key. Enables to resolve attached blockchain account.
- sub - hash of the new subscription payload
- app - dapp's domain url

Expiry should be calculated from the addition of the issuance date and the notify request TTL (86400 seconds)

## Notify Delete

Once the Notify client wants to delete the subscription completely then it should authenticate the following request including the reason for deleting the subscription.

- act - description of action intent. Must be equal to "notify_delete"
- iss - did:key of an identity key. Enables to resolve attached blockchain account.
- aud - did:key of an identity key. Enables to resolve associated Dapp domain used.
- sub - reason for deleting the subscription
- app - dapp's domain url

## Notify Delete Response

Once the Notify Server has sucessfully handled the subscription deletion then it should authenticate the following request including the hash of the existing subscription payload.

- act - description of action intent. Must be equal to "notify_delete_response"
- iss - did:key of an identity key. Enables to resolve associated Dapp domain used.
- aud - did:key of an identity key. Enables to resolve attached blockchain account.
- sub - hash of the existing subscription payload
- app - dapp's domain url