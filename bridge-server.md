# Bridge Server API Reference

## Test Hello World

```bash
  GET https://bridge.walletconnect.org/hello

  Response:
  Status: 200
  Content-Type: text/plain; charset=utf-8
  Body: Hello World, this is WalletConnect v1.0.0-beta
```

## Get Bridge Server Info

```bash
  GET https://bridge.walletconnect.org/info

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-8
  Body:
  {
    "name": "WalletConnect Bridge Server",
    "repository": "walletconnect-bridge",
    "version": "1.0.0-beta"
  }
```

## Subscribe Push Notification Webhook

```bash
  POST https://bridge.walletconnect.org/subscribe
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

