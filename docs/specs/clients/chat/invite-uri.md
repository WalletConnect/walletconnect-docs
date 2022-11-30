# Invite URI

## Schema

    uri         = "wc" ":" "chat" "-" publicKey [ "@" version ][ "?" parameters ]
    publicKey   = STRING
    version     = 1*DIGIT
    parameters  = parameter *( "&" parameter )
    parameter   = key "=" value
    key         = STRING
    value       = STRING

## Parameters

### Required

- `account` (STRING) = account associated with public key
- `relay-protocol` (STRING) = protocol name used for relay

### Optional

- `relay-data` (STRING) = hex data payload used for relay

## Example

    topic = "2b9429ac1df3a4aa10814160f3342fbe5a566c771fc057b45c3df86a09f07a6d"
    version = 2
    account = "eip155:1:0xB55e875c8E58b1eB14858F8e255F3B4C595A01aD"
    relay = { protocol: "irn", data: "" }

```
uri = "wc:chat-2b9429ac1df3a4aa10814160f3342fbe5a566c771fc057b45c3df86a09f07a6d@2?relay-protocol=irn&account=eip155:1:0xB55e875c8E58b1eB14858F8e255F3B4C595A01aD"
```
