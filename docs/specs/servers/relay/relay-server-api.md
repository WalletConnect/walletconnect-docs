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
