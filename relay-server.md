# Relay Server API Reference

## Test Hello World

```bash
  GET https://relay.walletconnect.org/hello

  Response:
  Status: 200
  Content-Type: text/plain; charset=utf-8
  Body: Hello World, this is WalletConnect v2.0.0-alpha
```

## Subscribe Push Notification Webhook

```bash
  POST https://relay.walletconnect.org/subscribe
  Content-Type: application/json
  Body:
  {
    "topic": <client_id>,
    "webhook": <push_notification_webhook>
  }

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-8
  Body:
  {
    "success": true
  }
```
