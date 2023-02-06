# Cast Server API

## Register

Used to notify a message to a set of accounts 

`POST /register`

Headers:
:warning: This header is temporary

`Auth: {project_id}`

Body:

```jsonc
{
    "account": string,
    "symKey": string,
    "relayUrl": string
}
```




## Notify

Used to notify a message to a set of accounts 

`POST /notify`

Headers:
:warning: This header is temporary

`Auth: {project_id}`

Body:

```jsonc
{
    "notification": {
        "title": string,
        "body": string,
        "icon": string,
        "url": string
    },
    "accounts": string[]
}
``` 

Response: 

```jsonc
{
  "sent": string[],
  "failed": string[][],
  "notFound": string[]
}
```
