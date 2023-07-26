# Identity Keys

Identity Keys are used to verify Blockchain Account ownership and validating peer to peer requests are legitimate without requiring the wallet user to sign every message with their blockchain private key.

## Short Description

These are randomly generated ed25519 key pairs that are only present one per client. The Wallet user signs a CAIP-122 message to generate a CACAO that authorizes the client's identity key to sign messages on the behalf of the Blockchain Account.

## Key Authorization

Client only generates a single identity key per blockchain account per client. The wallet user uses multiple blockchain accounts with a single client by authorizing one respective identity key for each. Additionally the wallet can use multiple clients with the same blockchain account by authorizing a new identity key on a new client.

Identity Keys are ed25519 key pairs generated internally and the client will expose a CAIP-122 message which includes the public key of the Identity Key pair in the Resources in the form of a did-key.


### Message Format

Template Message (CAIP-122)

```md
${domain} wants you to sign in with your ${namespace-name} account:
${address}

URI: ${uri}
Version: ${version}
Chain ID: ${chain-id}
Nonce: ${nonce}
Issued At: ${issued-at}
```

Let's use the account `eip155:1:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` and identity key  use the following fields:

* Domain = keys.walletconnect.com
* Namespace Name = Ethereum
* Address = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
* URI = https://keys.walletconnect.com
* Version = 1
* Chain ID = 1
* Nonce = bb0b6514e8a5e817
* Issued At = 2022-12-09T15:29:36.509Z
* Resources = ["did:key:z6MkqJ6qV18zBazggzhGMHNgadEQGbX9RceEH3j2G6kNTbKq"]

Formatted Message (CAIP-122)

```md
keys.walletconnect.com wants you to sign in with your Ethereum account:
0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

URI: https://keys.walletconnect.com
Version: 1
Chain ID: 1
Nonce: bb0b6514e8a5e817
Issued At: 2022-12-09T15:29:36.509Z
Resources:
- did:key:z6MkqJ6qV18zBazggzhGMHNgadEQGbX9RceEH3j2G6kNTbKq
```

### CACAO Format

```
{
  "h": {
    "t": "eip4361"
  },
  "p": {
    "aud": "https://keys.walletconnect.com",
    "iat": "2022-03-10T17:09:21.481+03:00",
    "iss": "did:pkh:eip155:1:0xBAc675C310721717Cd4A37F6cbeA1F081b1C2a07",
    "nonce": "bb0b6514e8a5e817",
    "domain": "walletconnect.com",
    "version": "1",
    "resources": [
      "did:key:z6MkqJ6qV18zBazggzhGMHNgadEQGbX9RceEH3j2G6kNTbKq,
    ],
  },
  "s": {
    "s": "5ccb134ad3d874cbb40a32b399549cd32c953dc5dc87dc64624a3e3dc0684d7d4833043dd7e9f4a6894853f8dc555f97bc7e3c7dd3fcc66409eb982bff3a44671b",
    "t": "eip191"
  }
}
```

## Key Registration

When two clients are using a peer to peer API for some requests they need to verify each others Identity Keys. Therefore we use the Keys Server to index these keys privately and the counter-party can validate that the key would be used for the corresponding account in the WalletConnect identities.

## Authentication

Now that we have generated, authorized and registered Identity Keys we can use them for authentication for different purposes:

* [Chat Authentication](../../clients/chat/chat-authentication.md)
* [Notify Authentication](../../clients/notify/notify-authentication.md)
* [Chat Invite Keys registration](../../clients/chat/invite-keys.md)

## Unregistration 

In order to unregister an Identity Key did-jwt needs to be created and sent to designated [API endpoint](./keys-server-api.md#remove-identity-key)

When we are unregistering an Identity Key we must use the following mandatory fields in the jwt:

* iat - timestamp when jwt was issued 
* exp - timestamp when jwt must expire
* iss - public identity key in form of did:key
* aud - key server URL used for registering
* pkh - corresponding blockchain account (did:pkh)
* act - description of action intent. Must be equal to "unregister_identity"
