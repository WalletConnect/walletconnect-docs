# Push Server Authentication

> **Warning**
> This spec is subject to change; all initial changes made will be non-breaking. For more information read the [footnote](#footnote).

We use Ed25519 to verify that requests from the Relay are valid and intended for the Push Server Instance that has received them.

## Implementation
The Push Server instance also fetches the Relay's public key and caches it so that requests received can be validated. 

For every request received the Push Server instance retrieves the `X-Ed25519-Signature` and `X-Ed25519-Timestamp` headers. If these headers are 
not present the request will be treated as unauthenticated. Once these headers are retrieved we can reconstruct the original signature body as below:
```
{timestamp}.{body length}.{body}
```
Then Push Server will ensure the signature is from the Cached public key and that the body of the signature matches the body that was reconstructed. If
any part of validation fails the request will be treated as unauthenticated and no action should be taken. If the signature is valid the request can
then be acted upon.

## Relay Endpoints

### GET `/public-key`
#### Response
> **Note**
> This is an example Ed25519 Public Key, this is not a valid Public Key for the Relay.
```
693a98827a9c7e8f818af53b9720671eb4d3075815a8c2c8f6d0da12ba1aba7a
```

## Footnote
This is an initial authentication spec which keeps some acknowledged risks from the v1 push server. There are plans to improve upon this spec to
ensure there are no edge cases or other ways for either the Relay or Push Server to be mimicked/impersonated. Changes to this spec will initially
be non-breaking but there is a breaking change planned for some point in the future to use a more sturdy authentication system.
