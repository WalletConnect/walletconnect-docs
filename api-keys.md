# Api Keys

## How to implement

Api keys will consumed through the url parameters. The format of the url:

Url parameters needed

`apiKey`: Your api key obtained from [walletconnect.com](walletconnect.com)

Example URL:

`https://relay.walletconnect.com/?apiKey=c4f79cc821944d9680842e34466bfbd`

This can be instantiated from the client with the `apiKey` in the `WalletConnectClient` constructor.

```javascript
import WalletConnectClient from "@walletconnect/client";
const client = await WalletConnectClient.init({
  relayProvider: "wss://relay.walletconnect.org",
  apiKey: c4f79cc821944d9680842e34466bfb,
});
```

## Allowlist

Since most of the wallet and dapp code will be client side, the security of the api

### Applications

User Agent for wallets.

TODO insert screenshot of Allowlist.

### Websites

Website [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin).

TODO insert screenshot of Allowlist.

## Error Codes

| Reason                 | Error Code |
| ---------------------- | ---------- |
| Api key Doesn't Exists | 401        |
| Exists and is invalid  | 403        |
