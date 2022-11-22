# Relay Server API

## WebSocket

WebSocket supports JSON-RPC methods (please review [Relay RPC](./relay-server-rpc.md))

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
