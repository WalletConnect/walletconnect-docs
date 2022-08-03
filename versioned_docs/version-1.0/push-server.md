# Push Server API Reference

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

