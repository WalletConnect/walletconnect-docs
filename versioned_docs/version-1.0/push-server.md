# Push Server API Reference

:::info

If you are looking at implementing push for v2, please refer to the new [Echo Server spec](https://github.com/WalletConnect/echo-server/blob/main/spec/spec.md) as support for the Push Server API is being removed from v2 in the coming weeks.

:::

## Register Push Notification Subscription

```bash
  POST <YOUR_PUSH_SERVER_URL>/new
  Content-Type: application/json
  Body:
  {
    "bridge": <bridge_url>,
    "topic": <client_id>,
    "type": <push_type>,
    "token": <push_token>,
    "peerName": <peer_name>,
    "language": <language_code>,
  }

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-8
  Body:
  {
    "success": true
  }
```

## Trigger Push Notification \(Webhook\)

```bash
  POST <YOUR_PUSH_SERVER_URL>/push
  Content-Type: application/json
  Body:
  {
    "topic": <client_id>
  }

  Response:
  Status: 200
  Content-Type: application/json; charset=utf-8
  Body:
  {
      "success": true
  }
```
