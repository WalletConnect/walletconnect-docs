---
description: Quick Start For Wallets Using React-Native Client
---

# React-Native Client

## Quick Start For Wallets \(React-Native Client\)

{% hint style="info" %}
You can use the **Example Dapp** to test your integration at [example.walletconnect.org](https://example.walletconnect.org) \([Source code](https://github.com/WalletConnect/walletconnect-example-dapp)\)
{% endhint %}

### Install

{% tabs %}
{% tab title="yarn" %}
Install NPM Package

```bash
yarn add @walletconnect/client
```

Polyfill NodeJS modules for React-Native

```bash
yarn add rn-nodeify
rn-nodeify --install --hack
```

{% endtab %}

{% tab title="npm" %}
Install NPM Package

```bash
npm install --save @walletconnect/client
```

Polyfill NodeJS modules for React-Native

```bash
npm install --save rn-nodeify
rn-nodeify --install --hack
```

{% endtab %}
{% endtabs %}

### Initiate Connection

```javascript
import WalletConnect from "@walletconnect/client";

// Create connector
const connector = new WalletConnect(
  {
    // Required
    uri: "wc:8a5e5bdc-a0e4-47...TJRNmhWJmoxdFo6UDk2WlhaOyQ5N0U=",
    // Required
    clientMeta: {
      description: "WalletConnect Developer App",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "WalletConnect",
    },
  },
  {
    // Optional
    url: "https://push.walletconnect.org",
    type: "fcm",
    token: token,
    peerMeta: true,
    language: language,
  }
);

// Subscribe to session requests
connector.on("session_request", (error, payload) => {
  if (error) {
    throw error;
  }

  // Handle Session Request

  /* payload:
  {
    id: 1,
    jsonrpc: '2.0'.
    method: 'session_request',
    params: [{
      peerId: '15d8b6a3-15bd-493e-9358-111e3a4e6ee4',
      peerMeta: {
        name: "WalletConnect Example",
        description: "Try out WalletConnect v1.x.x",
        icons: ["https://example.walletconnect.org/favicon.ico"],
        url: "https://example.walletconnect.org"
      }
    }]
  }
  */
});

// Subscribe to call requests
connector.on("call_request", (error, payload) => {
  if (error) {
    throw error;
  }

  // Handle Call Request

  /* payload:
  {
    id: 1,
    jsonrpc: '2.0'.
    method: 'eth_sign',
    params: [
      "0x23f166bb38add8b588c58987e789c78a4b720589",
      "My email is karicwit@gmail.com - 0x60806040"
    ]
  }
  */
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete connector
});
```

### Manage Connection

```javascript
// Approve Session
connector.approveSession({
  accounts: [                 // required
    '0x2fe8f0e4e65a3aafc1546ce99435f5df41a54cc0',
    '0x23f166bb38add8b588c58987e789c78a4b720589',
    ...
  ],
  chainId: 1                  // required
})

// Reject Session
connector.rejectSession({
  message: 'OPTIONAL_ERROR_MESSAGE'       // optional
})


// Kill Session
connector.killSession()
```

### Manage Call Requests

```javascript
// Approve Call Request
connector.approveRequest({
  id: 1,
  result: "0xae6025325fc0bc173bda059f52b4c5077c0ad3560b177b79f15f0d59c15f7b4a4f432f939bec14b9ab56216371ca0454057eae1257cc53137539d8afe3dae1c71c"
});

// Reject Call Request
connector.rejectRequest({
  id: 1,                                  // required
  error: {
    code: "OPTIONAL_ERROR_CODE"           // optional
    message: "OPTIONAL_ERROR_MESSAGE"     // optional
  }
});
```
