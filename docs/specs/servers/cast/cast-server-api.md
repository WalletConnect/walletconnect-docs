# Cast Server API

## Register

Used to notify a message to a set of accounts 

`POST /register`

Body:

```jsonc
{
    "message": string,
    "symKey": string
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