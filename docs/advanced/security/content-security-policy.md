# Content Security Policy (CSP)

## Overview

A Content Security Policy (CSP) is a security feature that helps protect web applications from various attacks like Cross-Site Scripting (XSS), clickjacking, and data injection. By specifying allowed content sources, CSPs minimize the risk of executing malicious content on your site.

## CSP Guidance

### AppKit

The following is a **partial CSP** that covers WalletConnect's libraries and services for [AppKit](https://docs.walletconnect.com/appkit/overview). Note that **you may need to define additional sources based on your application's requirements**.

```
default-src 'self';
script-src 'self';
style-src https://fonts.googleapis.com;
img-src 'self' data: blob: https://walletconnect.org https://walletconnect.com https://secure.walletconnect.com https://secure.walletconnect.org https://tokens-data.1inch.io https://tokens.1inch.io https://ipfs.io;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://rpc.walletconnect.com https://rpc.walletconnect.org https://explorer-api.walletconnect.com https://explorer-api.walletconnect.org https://relay.walletconnect.com https://relay.walletconnect.org wss://relay.walletconnect.com wss://relay.walletconnect.org https://pulse.walletconnect.com https://pulse.walletconnect.org https://api.web3modal.com https://api.web3modal.org https://keys.walletconnect.com https://keys.walletconnect.org https://notify.walletconnect.com https://notify.walletconnect.org https://echo.walletconnect.com https://echo.walletconnect.org https://push.walletconnect.com https://push.walletconnect.org wss://www.walletlink.org;
frame-src 'self' https://verify.walletconnect.com https://verify.walletconnect.org https://secure.walletconnect.com https://secure.walletconnect.org;
```

:::info

You may need to list the RPC endpoints used by blockchain networks you have enabled (e.g. via the [`@wagmi/chains` package](https://wagmi.sh/core/api/chains)) as part of your `connect-src` definition.

For a full of list of RPC sources used by `wagmi/viem`, please refer to [Viem's chain definitions](https://github.com/wevm/viem/tree/main/src/chains/definitions).

:::

## Testing and Deploying Your CSP

### Test Your CSP in a Staging Environment

Run through your standard user flows in a staging environment with CSP enforcement. This may include connecting to browser extension wallets, transacting, logging out, etc. Directives may need updates after SDK upgrades. Always test your CSP again before deploying updates to production.

### Using Report-Only Mode

Use the `Content-Security-Policy-Report-Only` header, which sends violation reports without enforcing policies. This helps assess the impact of CSP changes without affecting functionality.

### Deployment

First deploy your CSP in `report-only` mode. After validation, migrate to `Content-Security-Policy` for enforcement.

### Monitoring

Configure `report-uri` or `report-to` to receive violation reports and set up a monitoring dashboard for review.
