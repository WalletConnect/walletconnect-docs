# Cloud Relay

## Project ID

The Project ID is consumed through URL parameters.

URL parameters used:

- `projectId`: Your Project ID can be obtained from [walletconnect.com](https://walletconnect.com)

Example URL:

`https://relay.walletconnect.com/?projectId=c4f79cc821944d9680842e34466bfbd`

This can be instantiated from the client with the `projectId` in the `SignClient` constructor.

```javascript
import SignClient from "@walletconnect/sign-client";
const signClient = await SignClient.init({
  projectId: "c4f79cc821944d9680842e34466bfb",
});
```

## Allowlist

Limit access to known HTTP [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin).

Possible values for the origin value:

- `<scheme>://<hostname>`
- `<scheme>://<hostname>:<port>`
- `<scheme>://*.<hostname>`

Adding `https://dapp.example.com` to the allowlist will only allow requests from that origin. Requests from other origins will be denied. Using localhost (or 127.0.0.1) is also always permitted. 

Updates take 15 minutes to apply.

## Error Codes

| Reason                 | Error Code |
| ---------------------- | ---------- |
| Project ID doesn't exist | 401        |
| Exists and is invalid  | 403        |
| Too many requests  | 1013        |

## Websocket Close codes

| Code        | Description | Reconnect  |
| ----------- | ----------- |----------- |
| 1001        | Server terminating | Yes |
| 4008        | Client stale: connected without a prior subscription and is not sending data | When needed |
| 4010        | Load Rebalancing | Yes |
