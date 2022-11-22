# Echo Server API

## Register

Used to register a clientId with corresponding tokenId

`POST /clients`

Body:

```jsonc
{
    "clientId": string,
    "tokenId": string
}
```



## Notify

Used to notify a message to a set of accounts 

`POST /notify`

Body:

```jsonc
{
    "message": string,
    "accounts": string[]
}
``` 