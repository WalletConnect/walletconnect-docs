# API Keys

## How to implement

Api keys will be consumed through url parameters.

Url parameters used:

- `apiKey`: Your api key can be obtained from [walletconnect.com](https://walletconnect.com)

Example URL:

`https://relay.walletconnect.com/?apiKey=c4f79cc821944d9680842e34466bfbd`

This can be instantiated from the client with the `apiKey` in the `WalletConnectClient` constructor.

```javascript
import WalletConnectClient from "@walletconnect/client";
const client = await WalletConnectClient.init({
  apiKey: "c4f79cc821944d9680842e34466bfb",
});
```

## Allowlist

Since most of the wallet and dapp code will be client side, the security of the api key depends on the proper implementation of User Agent and HTTP Origin for wallets.

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
| Api key Doesn't Exists | 401        |
| Exists and is invalid  | 403        |
