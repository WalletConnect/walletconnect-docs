# Invite Keys

Invite keys are used by Chat API for public blockchain account resolution.

When we are registering a chat invite key we must use the following mandatory fields in the jwt:

* iat - timestamp when jwt was issued 
* exp - timestamp when jwt must expire
* iss - public identity key in form of did:key
* sub - public key for chat invite key
* aud - key server url used for registering
* pkh - corresponding blockchain account (did:pkh)

Expiry will be calculated 1 hour (3600 seconds) from issued date
