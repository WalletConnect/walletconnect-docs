# Chat Identity Keys

Identity Keys are used to verify Blockchain Account ownership and validating chat invites are legitimate.

## Short Description

These are randomly generated ed25519 key pairs that are only present one per client. The Wallet user would sign a CAIP-122 message to generate a CACAO that authorizes the client to sign messages on the behalf of the Blockchain Account

## Key Authorization

Client will only generate a single identity key per blockchain accoun per client. The wallet user could use multiple blockchain accounts with a single client by authorizing one respective identity key for each. Additionally the wallet can use multiple clients with the same blockchain account by authorizing a new identity key on a new client.

Identity Keys are ed25519 key pairs generated internally and the client will expose a CAIP-122 message which includes the public key of the Identity Key pair in the nonce in the form of a did-key.


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

* Domain = walletconnect.com
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
walletconnect.com wants you to sign in with your Ethereum account:
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

When two clients are using the Chat API they need to verify each others Identity Keys used in Chat invite payloads (request and response). Therefore we use the Keys Server to index these keys privately and the counter-party can validate that the key would be used for the corresponding account in the Chat identities

## Key Authentication

Now that we have generated, authorized and registered Identity Keys we can use them for authentication for [different purposes](./chat-authentication.md) but also importantly we must use it to register the proposal encryption keys

When we are registering a proposal encryption key we must use the following mandatory fields in the jwt:

* iat - timestamp when jwt was issued 
* exp - timestamp when jwt must expire
* iss - public key of the identity key
* sub - public key for proposal encryption key
* aud - key server url used for registering

Expiry will be calculated 1 day (86400 seconds) from issued date

