# Relay Server API

## WebSocket

WebSocket supports JSON-RPC methods. For more details, please visit [Relay RPC docs](./relay-server-rpc.md).

## HTTP

### Register Webhook

Used to register a webhook that would return an incoming message to the webhook.

`POST /register-webhook`

Body:

```jsonc
{
    "clientId": string,
    "webhook": string
}
```



### Message Id

A Relay message is globally available and it's always an utf8 string. Therefore the message id is derived as the sha256 hash.

```sh
message_id = sha256(message)
```
