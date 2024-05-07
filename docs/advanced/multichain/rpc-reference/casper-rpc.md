# Casper

## Methods

### casper_sign_deploy

Use the `casper_sign_deploy` method to request the user to approve or reject the signature of a transaction (aka deploy). The wallet should validate the received deploy object and present the details to the user for his review.

#### Parameters

- `address`. Type: `string`. The chain namespace and the public key corresponding to the key pair that signs the transaction separated with a colon character.
- `deploy`. Type: `object`. A Deploy object as per the Casper protocol specificatio.

#### Returns

- `deploy`. Type: `object`. The Deploy object including the newly generated approval item as per the Casper protocol specification.

If the user rejects the signature, the wallet returns the WalletConnect SDK error `USER_REJECTED`.

#### Example

Request:

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "casper_sign_deploy",
  "params": {
    "deploy": {
      "hash": "a3301c9da7f0183f1c8904bed7fc72cf563454509462cada378b3f42a92f7b4f",
      "header": {
        "account": "02032E126170e5f28443775330B5B5Fe29dCE1a1dD3269910349525935ccbaf352EA",
        "timestamp": "2024-02-01T08:41:59.207Z",
        "ttl": "30m",
        "gas_price": 1,
        "body_hash": "188d88eedd3dc64b4ac3f8ca9b74be2b2fa588e2d537875d22b7e1a68658d19e",
        "dependencies": [],
        "chain_name": "casper-test"
      },
      "payment": {
        "ModuleBytes": {
          "module_bytes": "",
          "args": [["amount", { "bytes": "0400e1f505", "cl_type": "U512" }]]
        }
      },
      "session": {
        "Transfer": {
          "args": [
            ["amount", { "bytes": "0500f2052a01", "cl_type": "U512" }],
            [
              "target",
              {
                "bytes": "0202e99759649fa63a72c685b72e696b30c90f1deabb02d0d9b1de45eb371a73e5bb",
                "cl_type": "PublicKey"
              }
            ],
            ["id", { "bytes": "01d204000000000000", "cl_type": { "Option": "U64" } }]
          ]
        }
      },
      "approvals": []
    },
    "address": "casper:casper-test:02032E126170e5f28443775330B5B5Fe29dCE1a1dD3269910349525935ccbaf352EA"
  }
}
```

Response:

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "deploy": {
      "hash": "a3301c9da7f0183f1c8904bed7fc72cf563454509462cada378b3f42a92f7b4f",
      "header": {
        "account": "02032E126170e5f28443775330B5B5Fe29dCE1a1dD3269910349525935ccbaf352EA",
        "timestamp": "2024-02-01T08:41:59.207Z",
        "ttl": "30m",
        "gas_price": 1,
        "body_hash": "188d88eedd3dc64b4ac3f8ca9b74be2b2fa588e2d537875d22b7e1a68658d19e",
        "dependencies": [],
        "chain_name": "casper-test"
      },
      "payment": {
        "ModuleBytes": {
          "module_bytes": "",
          "args": [["amount", { "bytes": "0400e1f505", "cl_type": "U512" }]]
        }
      },
      "session": {
        "Transfer": {
          "args": [
            ["amount", { "bytes": "0500f2052a01", "cl_type": "U512" }],
            [
              "target",
              {
                "bytes": "0202e99759649fa63a72c685b72e696b30c90f1deabb02d0d9b1de45eb371a73e5bb",
                "cl_type": "PublicKey"
              }
            ],
            ["id", { "bytes": "01d204000000000000", "cl_type": { "Option": "U64" } }]
          ]
        }
      },
      "approvals": [
        {
          "signer": "02032E126170e5f28443775330B5B5Fe29dCE1a1dD3269910349525935ccbaf352EA",
          "signature": "02ad07c25d7cef27598f67c7bafce3e07e4198de7884f0e48041965c0f0be2690956d25bae0510bec9463da4aa6a5e591fb3cb88c8f31df85bc0b6f857b80f64e2"
        }
      ]
    }
  }
}
```

### casper_sign_message

Use `casper_sign_message` to request the user to sign a message. It's recommended to use this method with human-readable text messages. Upon user approval, the wallet must generate a signature for the prefixed message `"Casper Message:\n" + message`. The prefix protects the user against misuse of this method, preventing a malicious actor from trying to trick the user into signing arbitrary data, like a network transaction.

#### Parameters

- `address`. Type: `string`. The chain namespace and the public key corresponding to the key pair that signs the transaction separated with a colon character.
- `message`. Type: `string`. The message to be signed.

#### Returns

- `signature`. Type: `string`. The signature of the message.

If the user rejects the signature, the wallet returns the WalletConnect SDK error `USER_REJECTED`.

#### Example

Request:

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "casper_sign_message",
  "params": {
    "message": "CSPR.studio wants you to sign in with your Casper account:\n0x01953...808f3 \n\nIssued At: 07/21/2023 10:07:25\nnonce: 428b62e4",
    "address": "casper:casper-test:0202a8e3e5E32800792F37F738d95BF2610d86E97922D13ab97945bb062824ed9E8A"
  }
}
```

Response:

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "casper_sign_message",
  "result": {
    "signature": "b52482afd2392b715cc43d9ad9f1f7067752a10ba5b49b89bc61b398e478841e6d8a4a224aeb944a34f23d98a232cdab6e5a60a5e886e8b0719d7b84277c405f"
  }
}
```

## Events

Currently, this specification doesn't define any required events for wallets.
