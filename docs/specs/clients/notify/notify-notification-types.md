# Notification Types

Not every message is the same and not every wallet user wants to receive every possible notification that a dapp targets their wallet account.

Notification Types define a scope of messages that the user authorizes the dapp to notify the user related to their wallet account.

## Definitions

A notification type includes a name and a description.

A notification type name is a machine-readable lowercase string and not internationalized which matches the following regex: `[\w-/]{3,32}`.

A notification type description is a human-readable case-sensitive string and not internationalized which matches the following regex: `[\w\s.]{3,100}`.


## Configuration

In order for dapps to expose their notification types they must store a static json file named `wc-notify-config.json` in their `.well-known` path under their domain url.

The file should include the following schema:

* version = schema version number
* lastModified = date last modified in unix epoch timestamp in seconds
* types = array of available types with `name` and `description` schema

For example:

```jsonc
https://example.com/.well-known/wc-notify-config.json

// wc-notify-config.json
{
  "version": 1,
  "lastModified": 1681289416,
  "types": [
    {
      "name": "promotional",
      "description": "Get notified when new features or products are launched"
    },
    {
      "name": "transactional",
      "description": "Get notified when new on-chain transactions target your account"
    },
    {
      "name": "private",
      "description": "Get notified when new updates or offers are sent privately to your account"
    },
    {
      "name": "alerts",
      "description": "Get notified when urgent action is required from your account"
    }
  ]
}
```

## Subscription Scope

A Notify Subscription will include a claim labelled `scp` with a string value include the user authorized notification types separated by whitespaces.

For example:

```jsonc
// did-jwt
{
  ...otherClaims
  "scp": "promotional private alerts"
}
```

## Notify Message

A Notify Message will include a parameter called `type` in the message payload which indicates the notification type is being delivered to the wallet user

```jsonc
{
  "title": string,
  "body": string,
  "icon": string,
  "url": string,
  "type": string // <--- notification type
}
```
