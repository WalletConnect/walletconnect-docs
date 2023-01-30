# Cast Server API

## Register

Used to notify a message to a set of accounts 

`POST /register`

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

Body:

```jsonc
{
    "notification": {
        "title": string,
        "subtitle": string?,
        "body": string,
        "icon": string,
        "url": string
    },
    "accounts": string[]
}
``` 
