---
description: Stellar JSON-RPC Methods
---

# Stellar

## stellar_signAndSubmitXDR

This method sends the Stellar transaction encoded as [XDR](https://developers.stellar.org/api/introduction/xdr/) to the wallet. The wallet is expected to sign the transaction and submit it to the Stellar network. For accounts protected with [multisig](https://developers.stellar.org/docs/glossary/multisig/), the wallet should also handle the collection of signatures and submission of the transaction at a later time.
The method returns the transaction status: `success` - if the transaction was successfully confirmed in the Stellar network, `pending` - if the transaction requires additional signatures

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `xdr` : `STRING` -  stellar transaction encoded as XDR

### Returns

    1. `Object` - Signing parameters:
    	1.1. `status` : `success` or `pending`

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "stellar_signAndSubmitXDR",
  "params": {
    "xdr": "AAAAAPewD+/6X8o0bx3bp49Wf+mUhG3o+TUrcjcst717DWJVAAAAyAFvzscADTkNAAAAAAAAAAAAAAACAAAAAAAAAAYAAAACWE1BVEsAAAAAAAAAAAAAAAPvNOuztX4IjvV8pztsEc1/ZnTz0G3p5Cx4vcf04+xUAAONfqTGgAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAD2NyeXB0b21hcmluZS5ldQAAAAAAAAAAAAAAAAF7DWJVAAAAQK3vfUCZ8mbjW3ssMd0n1tJTF9Fv6EbuJ6cWKkYXBqG5itqanPbFzIQoZEHbPS8nr2vo4dROvKI0uQzNcfExKwM="
  }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "status": "success"
  }
}
```

## stellar_signXDR

This method sends the Stellar transaction encoded as [XDR](https://developers.stellar.org/api/introduction/xdr/) to the wallet. The wallet is expected to sign the transaction and return the signed transaction.

### Parameters

    1. `Object` - Signing parameters:
    	1.1. `xdr` : `STRING` -  stellar transaction encoded as XDR

### Returns

    1. `Object` - Signing parameters:
    	1.1. `signedXDR` : `STRING` -  stellar transaction encoded as XDR

### Example

```javascript
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "stellar_signAndSubmitXDR",
  "params": {
    "xdr": "AAAAAPewD+/6X8o0bx3bp49Wf+mUhG3o+TUrcjcst717DWJVAAAAyAFvzscADTkNAAAAAAAAAAAAAAACAAAAAAAAAAYAAAACWE1BVEsAAAAAAAAAAAAAAAPvNOuztX4IjvV8pztsEc1/ZnTz0G3p5Cx4vcf04+xUAAONfqTGgAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAD2NyeXB0b21hcmluZS5ldQAAAAAAAAAAAAAAAAF7DWJVAAAAQK3vfUCZ8mbjW3ssMd0n1tJTF9Fv6EbuJ6cWKkYXBqG5itqanPbFzIQoZEHbPS8nr2vo4dROvKI0uQzNcfExKwM="
  }
}

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "signedXDR": "AAAAAPewD+/6X8o0bx3bp49Wf+mUhG3o+TUrcjcst717DWJVAAAAyAFvzscADTkNAAAAAAAAAAAAAAACAAAAAAAAAAYAAAACWE1BVEsAAAAAAAAAAAAAAAPvNOuztX4IjvV8pztsEc1/ZnTz0G3p5Cx4vcf04+xUAAONfqTGgAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAD2NyeXB0b21hcmluZS5ldQAAAAAAAAAAAAAAAAF7DWJVAAAAQK3vfUCZ8mbjW3ssMd0n1tJTF9Fv6EbuJ6cWKkYXBqG5itqanPbFzIQoZEHbPS8nr2vo4dROvKI0uQzNcfExKwM="
  }
}
```
