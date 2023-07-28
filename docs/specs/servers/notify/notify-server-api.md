# Notify Server API

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
Notify server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

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
Notify server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

## Notify

Used to notify a message to a set of accounts

`POST /notify`

### Authentication
Notify server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

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

Used to generate a subscribe topic for a dapp to receive push subscriptions, returns a public key and identity key that should be stored on dapps's domain a did:web document. Requires the dapps url to be sent in the body.

**Note:** this method is idempotent and will always return the same key.

`POST /subscribe-topic`

### Authentication
Notify server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

Body:

```jsonc
{
    "dappUrl": string
}
``` 

Response:

```jsonc
{
  "identityPublicKey": string,
  "subscribeTopicPublicKey": string 
}
``` 

Failed:

```jsonc
{
  "reason": string
}
```

## Subscribers 

Returns the list of all accounts currently subscribed to this dapp.

`GET /subscribers`

### Authentication
Notify server expects an `Authorization` header in the form `Authorization: Bearer <project_secret>` using the project secret associated with a project id. The secret used should be the one that was generated automatically when configuring notify - with the name`cast_subscribe_topic_public_key`  

Response:

```jsonc
{
  []string
}
``` 


