# Relay Server

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

- `<hostname>`
- `<scheme>://<hostname>`
- `<scheme>://<hostname>:<port>`
- `*.<hostname>`

Adding `dapp.example.com` to the allowlist will only allow requests from that origin. Requests from other origins will be dendied.

## Error Codes

| Reason                 | Error Code |
| ---------------------- | ---------- |
| Project ID doesn't exist | 401        |
| Exists and is invalid  | 403        |
| Too many requests  | 1013        |