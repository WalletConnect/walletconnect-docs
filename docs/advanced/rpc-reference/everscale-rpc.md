---
description: Everscale JSON-RPC Methods
---

# Everscale

### Common response model
```
{
    "data": dict | null,
    "error": string | null
}
```
### ever_processMessage
Generation of the message body and its signature.
##### Parameters:
1. source_address - message source address;
2. value - amount of coins attached to the message;
3. bounce - should the answer message be generated in case of an error;
4. dest_address - message destination address;
5. dest_payload - message destination payload;
6. dest_abi - destination contract ABI;
##### Returns:
1. signed_ext_message - signed external message;
##### Example:
```
// Example for MultisigWallet
// Request
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "ever_processMessage",
  "params": {
        "source_address": "0:695e42...b8d",
        "value": 1000000000,
        "bounce": False,
        "dest_address": "0:b38d96...708",
        "dest_payload": "",
        "dest_abi": ""
    }
}
 
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result":  {
        "data": {
            "signed_ext_message": "c0b0996a9f0ea8e472041857ff2da9cf8086a78603f823a7170891f43a217ff1"
        },
        "error": null
    }
}
```
