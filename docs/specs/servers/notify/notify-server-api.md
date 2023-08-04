# Notify Server API

## Register Key Pair

Registers key agreement and authentication key pairs at the Notify Server for a registering dapp. Keys will be used on behalf of the dapp for creating subscriptions and signing notify messages. Keys must be stored in the diddoc under the dapp's domain.

### Authorization
The Notify server expects an Authorization header in the format Authorization: Bearer <project_secret>, using the project secret associated with a project id.

`GET /register`

Response: 

```jsonc
{
  "authenticationPubKey": string,
  "keyAgreementPubKey": string,
}
```

## Register Webhook

Used to register a webhook that would return when accounts are subscribed or unsubscribed

`POST /register-webhook`

### Authentication
Notify server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

Body:

```jsonc
{
    "events": string[], // subscribed or unsubscribed
    "webhook": string
}
```

Response:

```jsonc
{
    "id": string
}
```

Webhook payload:

```jsonc
{
    "id": string,
    "event": string, // subscribed or unsubscribed
    "account": string, // CAIP-10 account
    "dappUrl": string // dApp's URL with which the account was registered
}
```


## Registered Webhooks

Used to retrieve the list of registered webhooks

`GET /webhooks`

### Authentication
Notify server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

Response:

```jsonc
{
  "<webhook_id1>": {
    "url": "<webhook_url1>",
    "events": [
      "<event1>",
      "<event2>",
      ...
    ]
  },
  "<webhook_id2>": {
    "url": "<webhook_url2>",
    "events": [
      "<event1>",
      ...
    ]
  },
  ...
}
```


## Update Webhook

Used to update the registered webhook

`PUT /webhooks/<webhook_id>`

### Authentication
Cast server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

Body:

```jsonc
{
    "events": string[], // subscribed or unsubscribed
    "webhook": string
} 
```



## Delete Webhook

Used to delete the registered webhook

`DELETE /webhooks/<webhook_id>`

### Authentication
Cast server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

## Notify

Used to notify a message to a set of accounts

`POST /notify`

### Authentication
Cast server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

Body:

```jsonc
{
    "notification": {
        "title": string,
        "body": string,
        "icon": string,
        "url": string,
        "type": string
    },
    "accounts": string[]
}
``` 

Response: 

```jsonc
{
  "sent": string[],
  "failed": Failed[],
  "notFound": string[]
}
```

Failed:

```jsonc
{
  "account": string,
  "reason": string
}
```

## Subscribe Topic

Used to generate a subscribe topic for a dapp to receive notify subscriptions, returns a public key that should be stored on dapps's domain as a did:web document.

**Note:** this method is idempotent and will always return the same key.

`GET /subscribe-topic`

### Authentication
Cast server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

Response:

```jsonc
{
    "publicKey": string
}
``` 

Failed:

```jsonc
{
  "reason": string
}
```

## Authentication Key

Used to generate an authentication key for a dapp to send signed notify messages, returns a public key that should be stored on dapps's domain as a did:web document.

**Note:** this method is idempotent and will always return the same key.

`GET /authentication-key`

Response:

```jsonc
{
  "publicKey": string
}
``` 

Failed:

```jsonc
{
  "reason": string
}
```
