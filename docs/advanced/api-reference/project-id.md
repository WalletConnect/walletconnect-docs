# Project ID

## How to implement

The Project ID is consumed through URL parameters.

URL parameters used:

- `projectId`: Your Project ID can be obtained from [walletconnect.com](https://walletconnect.com)

Example URL:

`https://relay.walletconnect.com/?projectId=c4f79cc821944d9680842e34466bfbd`

This can be instantiated from the client with the `projectId` in the `WalletConnectClient` constructor.

```javascript
import WalletConnectClient from "@walletconnect/client";
const client = await WalletConnectClient.init({
  projectId: "c4f79cc821944d9680842e34466bfb",
});
```

## Allowlist

Since most of the wallet and dapp code will be client side, the security of the Project ID depends on the proper implementation of User Agent and HTTP Origin for wallets.

### Applications

User Agent for wallets.

TODO insert screenshot of Allowlist for User Agent.

#### Kotlin

#### Swift

### Websites

Website [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin).

TODO insert screenshot of Allowlist for HTTP Origin.

## Error Codes

| Reason                 | Error Code |
| ---------------------- | ---------- |
| Project ID doesn't exist | 401        |
| Exists and is invalid  | 403        |
