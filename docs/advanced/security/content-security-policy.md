# Content Security Policy (CSP)

## Overview

A Content Security Policy (CSP) is a security feature that helps protect web applications from various attacks like Cross-Site Scripting (XSS), clickjacking, and data injection. By specifying allowed content sources, CSPs minimize the risk of executing malicious content on your site.

## CSP Guidance

The following is a **partial CSP** that covers WalletConnect's libraries and services. Note that **you may need to define additional sources based on your application's requirements**.

```
default-src 'self';
script-src 'self';
style-src https://fonts.googleapis.com;
img-src 'self' data: blob: https://walletconnect.org https://walletconnect.com https://secure.walletconnect.com https://secure.walletconnect.org https://tokens-data.1inch.io https://tokens.1inch.io https://ipfs.io;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://rpc.walletconnect.com https://rpc.walletconnect.org https://explorer.walletconnect.com https://explorer.walletconnect.org https://relay.walletconnect.com https://relay.walletconnect.org wss://relay.walletconnect.com wss://relay.walletconnect.org https://pulse.walletconnect.com https://pulse.walletconnect.org https://api.web3modal.com https://api.web3modal.org wss://www.walletlink.org;
frame-src 'self' https://verify.walletconnect.com https://verify.walletconnect.org https://secure.walletconnect.com https://secure.walletconnect.org;
```

## Testing and Deploying Your CSP

### Test Your CSP in a Staging Environment

Run through your standard user flows in a staging environment with CSP enforcement. This may include connecting to browser extension wallets, transacting, logging out, etc. Directives may need updates after SDK upgrades. Always test your CSP again before deploying updates to production.

### Using Report-Only Mode

Use the `Content-Security-Policy-Report-Only` header, which sends violation reports without enforcing policies. This helps assess the impact of CSP changes without affecting functionality.

### Deployment

First deploy your CSP in `report-only` mode. After validation, migrate to `Content-Security-Policy` for enforcement.

### Monitoring

Configure `report-uri` to receive violation reports and set up a monitoring dashboard for review.
