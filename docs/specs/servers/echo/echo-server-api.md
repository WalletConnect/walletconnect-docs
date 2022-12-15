# Echo Server API

## Register

Used to register a clientId with corresponding tokenId

`POST /clients`

Body:

```jsonc
{
    "clientId": string,
    "tokenId": string,
    "relayUrl": string
}
```



## Push

The webhook triggered when a message is observed on the relay

`POST /push`

Body:

```jsonc
{
    "clientId": string,
    "topic" : string,
    "message" : string,
    "tag" : number, 
}
```
