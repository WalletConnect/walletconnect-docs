# Cloud

At the heart of WalletConnect is a relay server that transmits encrypted payloads between wallets and dapps. Our protocol establishes a remote pairing between two apps and/or devices using a relay server to relay payloads. You can run your own open source relay server, or use our cloud offering to get started right away.

The WalletConnect Cloud web app is available at https://cloud.walletconnect.com, and is a developer portal to manage WalletConnect services and access.

It can be used for the following services:

- Project management for generating projectId's for public relay server access
- Listing management for creating and [Cloud explorer listings](cloud-explorer.md)

## Project ID

### How to implement

The Project ID is consumed through URL parameters.

URL parameters used:

- `projectId`: Your Project ID can be obtained from [walletconnect.com](https://walletconnect.com)

Example URL:

`https://relay.walletconnect.com/?projectId=c4f79cc821944d9680842e34466bfbd`

This can be instantiated from the client with the `projectId` in the `WalletConnectClient` constructor.

```javascript
import SignClient from "@walletconnect/sign-client";
const signClient = await SignClient.init({
  projectId: "c4f79cc821944d9680842e34466bfb",
});
```

### Allowlist

Since most of the wallet and dapp code will be client side, the security of the Project ID depends on the proper implementation of User Agent and HTTP Origin for wallets.

#### Applications

User Agent for wallets.

TODO insert screenshot of Allowlist for User Agent.

##### Kotlin

##### Swift

#### Websites

Website [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin).

TODO insert screenshot of Allowlist for HTTP Origin.

### Error Codes

| Reason                                       | Error Code |
| -------------------------------------------- | ---------- |
| Invalid auth token                           | 401        |
| Origin is not allowed or invalid project ID  | 403        |
