---
description: XRPL JSON-RPC Methods
---

# XRPL

## xrpl_signTransaction

This method is used to sign and submit a transaction to the XRP Ledger (XRPL). Every transaction has the same set of [common fields][XRPL Transaction Common Fields], plus additional fields based on the [transaction type][XRPL Transaction Types]. It is expected that the dapp provides all transaction fields defined as `required`, but not necessarily the `auto-fillable`.

### Parameters

- `Object`
  - `tx_json` : `Object` - _(Required)_ JSON specification of the transaction.
  - `autofill` : `Boolean` - _(Optional)_ Defaults to `true`. Set to `false` to skip auto-filling parameters.
  - `submit` : `Boolean` - _(Optional)_ Defaults to `true`. Set to `false` to skip submitting the transaction.

Please note that if you set `submit` to `false`, your dapp will need to encode the signed `tx_json` to the required [binary format][XRPL Serialization], before you can send it as `tx_blob` to an XRPL node using the [submit][XRPL Signed Transaction] command.

### Returns

- `Object`
  - `tx_json` : `Object` - JSON specification of the complete transaction as signed, including any fields that were auto-filled.

### Example

The example below specifies a simple DEX order for selling 15,000 XRP in exchange for 7,072.8 USD.

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "xrpl_signTransaction",
    "params": {
        "tx_json": {
            "TransactionType": "OfferCreate",
            "Account": "rMBzp8CgpE441cp5PVyA9rpVV7oT8hP3ys",
            "Flags": 524288,
            "LastLedgerSequence": 7108682,
            "Expiration": 595640108,
            "TakerGets": "15000000000",
            "TakerPays": {
                "currency": "USD",
                "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                "value": "7072.8"
            }
        }
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "tx_json": {
            "Account": "rMBzp8CgpE441cp5PVyA9rpVV7oT8hP3ys",
            "Expiration": 595640108,
            "Fee": "10",
            "Flags": 524288,
            "OfferSequence": 1752791,
            "Sequence": 1752792,
            "LastLedgerSequence": 7108682,
            "SigningPubKey": "03EE83BB432547885C219634A1BC407A9DB0474145D69737D09CCDC63E1DEE7FE3",
            "TakerGets": "15000000000",
            "TakerPays": {
                "currency": "USD",
                "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                "value": "7072.8"
            },
            "TransactionType": "OfferCreate",
            "TxnSignature": "30440220143759437C04F7B61F012563AFE90D8DAFC46E86035E1D965A9CED282C97D4CE02204CFD241E86F17E011298FC1A39B63386C74306A5DE047E213B0F29EFA4571C2C",
            "hash": "73734B611DDA23D3F5F62E20A173B78AB8406AC5015094DA53F53D39B9EDB06C"
        }
    }
}
```

## xrpl_signTransactionFor

This method is used to add a signature to a [multi-signed][XRPL Multisign] transaction. The same common fields and transaction types as single-signed transactions are supported.

### Parameters

- `Object`
  - `tx_signer` : `String` - _(Required)_ The XRPL address of the signer.
  - `tx_json` : `Object` - _(Required)_ JSON specification of the transaction.
  - `autofill` : `Boolean` - _(Optional)_ Defaults to `false`. Set to `true` to auto-fill parameters.
  - `submit` : `Boolean` - _(Optional)_ Defaults to `false`. Set to `true` to submit the transaction.

Please note that `autofill` and `submit` both defaults to `false`, since explicit transaction specification and controlled submission is typically needed for multi-signed transactions.

### Returns

- `Object`
  - `tx_json` : `Object` - JSON specification of the complete transaction as signed, including any fields that were auto-filled.

### Example

The example below specifies a multi-signed payment transaction, already signed ([in serial][XRPL Multisign Methods]) by 3 of 4 required signers. Since only one more signature is required, the optional `submit` parameter has been set to `true`.

```javascript
// Request
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "xrpl_signTransactionFor",
    "params": {
        "submit": true,
        "tx_signer": "rJ4wmkgK8n93UjtaqQTaj1vxBwQWdLrBjP",
        "tx_json": {
            "Account": "rh2EsAe2xVE71ZBjx7oEL2zpD4zmSs3sY9",
            "TransactionType": "Payment",
            "Amount": "400000000000000",
            "Destination": "r9NpyVfLfUG8hatuCCHKzosyDtKnBdsEN3",
            "Fee": "5000",
            "Flags": 2147483648,
            "LastLedgerSequence": 73541531,
            "Sequence": 38,
            "Signers": [
                {
                    "Signer": {
                        "Account": "re3LGjhrCvthtWWwrfKbVJjXN9PYDeQDJ",
                        "SigningPubKey": "0320ECD5569CAFA4E23147BE238DBFB268DB3B5A502ED339387AC7DCA0ADC6FB90",
                        "TxnSignature": "3045022100EC2BF025E748A028187EDB3C350D518F91F05BC201EAFC9C92566DE9E48AA1B7022018847D172386E93679630E3905BD30481359E5766931944F79F1BA6D910F5C01"
                    }
                },
                {
                    "Signer": {
                        "Account": "rpcL6T32dYb6FDgdm4CnC1DZQSoMvvkLRd",
                        "SigningPubKey": "030BF97DA9A563A9A0679DD527F615CF8EA6B2DB55543075B72822B8D39910B5E1",
                        "TxnSignature": "304402201A891AF3945C81E2D6B95213B79E9A31635209AF0FB94DA8C0983D15F454179B0220388679E02CE6DE2AAC904A9C2F42208418BEF60743A7F9F76FC36D519902DA8C"
                    }
                },
                {
                    "Signer": {
                        "Account": "r3vw3FnkXn2L7St45tzpySZsXVgG75seNk",
                        "SigningPubKey": "030BE281F6DFF9AFD260003375B64235DDBCD5B7A54511BE3DA1FEF1ADE4A85D87",
                        "TxnSignature": "3044022049D36ACE39F1208B4C78A1550F458E54E21161FA4B52B3763C8FA9C4FE45B52C022003BE3579B5B5558A27BB7DC6A8ED163999A451665974138298469C1FDACA615F"
                    }
                }
            ],
            "SigningPubKey": ""
        }
    }
}

// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "tx_json": {
            "Account": "rh2EsAe2xVE71ZBjx7oEL2zpD4zmSs3sY9",
            "TransactionType": "Payment",
            "Amount": "400000000000000",
            "Destination": "r9NpyVfLfUG8hatuCCHKzosyDtKnBdsEN3",
            "Fee": "5000",
            "Flags": 2147483648,
            "LastLedgerSequence": 73541531,
            "Sequence": 38,
            "Signers": [
                {
                    "Signer": {
                        "Account": "re3LGjhrCvthtWWwrfKbVJjXN9PYDeQDJ",
                        "SigningPubKey": "0320ECD5569CAFA4E23147BE238DBFB268DB3B5A502ED339387AC7DCA0ADC6FB90",
                        "TxnSignature": "3045022100EC2BF025E748A028187EDB3C350D518F91F05BC201EAFC9C92566DE9E48AA1B7022018847D172386E93679630E3905BD30481359E5766931944F79F1BA6D910F5C01"
                    }
                },
                {
                    "Signer": {
                        "Account": "rpcL6T32dYb6FDgdm4CnC1DZQSoMvvkLRd",
                        "SigningPubKey": "030BF97DA9A563A9A0679DD527F615CF8EA6B2DB55543075B72822B8D39910B5E1",
                        "TxnSignature": "304402201A891AF3945C81E2D6B95213B79E9A31635209AF0FB94DA8C0983D15F454179B0220388679E02CE6DE2AAC904A9C2F42208418BEF60743A7F9F76FC36D519902DA8C"
                    }
                },
                {
                    "Signer": {
                        "Account": "r3vw3FnkXn2L7St45tzpySZsXVgG75seNk",
                        "SigningPubKey": "030BE281F6DFF9AFD260003375B64235DDBCD5B7A54511BE3DA1FEF1ADE4A85D87",
                        "TxnSignature": "3044022049D36ACE39F1208B4C78A1550F458E54E21161FA4B52B3763C8FA9C4FE45B52C022003BE3579B5B5558A27BB7DC6A8ED163999A451665974138298469C1FDACA615F"
                    }
                },
                {
                    "Signer": {
                        "Account": "rJ4wmkgK8n93UjtaqQTaj1vxBwQWdLrBjP",
                        "SigningPubKey": "02D5D616D4005B91DE02BF6E29157B514C667810860F389CF36DC9E4D5E73BFE79",
                        "TxnSignature": "304402207589FA73E72F85A2C8F82BBCB3C7C67C455D4C14A946BA427A4735F4ED106123022069845499A9DE50F26765F097BA0EA3C96E56A1304B380E0533514AEEF29363D7"
                    }
                }
            ],
            "SigningPubKey": "",
            "hash": "BA2AF0C652F46C97B85C1D17080EEC7422C092B0BD906DCA344B42EF30FA8285",
        }
    }
}
```

[XRPL Transaction Common Fields]: https://xrpl.org/transaction-common-fields.html
[XRPL Transaction Types]: https://xrpl.org/transaction-types.html
[XRPL Signed Transaction]: https://xrpl.org/transaction-basics.html#example-signed-transaction-blob
[XRPL Serialization]: https://xrpl.org/serialization.html#examples
[XRPL Algorithms]: https://xrpl.org/cryptographic-keys.html#signing-algorithms
[XRPL Multisign]: https://xrpl.org/multi-signing.html#multi-signing
[XRPL Multisign Methods]: https://xrpl.org/send-a-multi-signed-transaction.html#3-get-additional-signatures
