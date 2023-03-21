
# Pairing URI

## Schema ([EIP-1328](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1328.md))

    uri         = "wc" ":" topic [ "@" version ][ "?" parameters ]
    topic       = STRING
    version     = 1*DIGIT
    parameters  = parameter *( "&" parameter )
    parameter   = key "=" value
    key         = STRING
    value       = STRING

## Parameters

### Required

- `symKey` (STRING) = symmetric key used for pairing encryption
- `methods` (STRING) = comma separated array of inner arrays of methods. Inner arrays are grouped by `ProtocolType`
- `relay-protocol` (STRING) = protocol name used for relay

### Optional

- `relay-data` (STRING) = hex data payload used for relay

## Example

    topic = "7f6e504bfad60b485450578e05678ed3e8e8c4751d3c6160be17160d63ec90f9"
    version = 2
    symKey = "587d5484ce2a2a6ee3ba1962fdd7e8588e06200c46823bd18fbd67def96ad303"
    methods = [wc_sessionPropose],[wc_authRequest,wc_authBatchRequest]
    relay = { protocol: "irn", data: "" }

```
uri = "wc:7f6e504bfad60b485450578e05678ed3e8e8c4751d3c6160be17160d63ec90f9@2?symKey=587d5484ce2a2a6ee3ba1962fdd7e8588e06200c46823bd18fbd67def96ad303&methods=[wc_sessionPropose],[wc_authRequest,wc_authBatchRequest]&relay-protocol=irn"
```
