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
yarn add @walletconnect/react-native
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
npm install --save @walletconnect/react-native
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
import RNWalletConnect from "@walletconnect/react-native";

// Create WalletConnector
const walletConnector = new RNWalletConnect(
  {
    uri: "wc:8a5e5bdc-a0e4-47...TJRNmhWJmoxdFo6UDk2WlhaOyQ5N0U=" // Required
  },
  {
    clientMeta: {
      // Required
      description: "WalletConnect Developer App",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "WalletConnect"
    },
    push: {
      // Optional
      url: "https://push.walletconnect.org",
      type: "fcm",
      token: token,
      peerMeta: true,
      language: language
    }
  }
);

// Subscribe to session requests
walletConnector.on("session_request", (error, payload) => {
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
        description: "Try out WalletConnect v1.0.0-beta",
        icons: ["https://example.walletconnect.org/favicon.ico"],
        url: "https://example.walletconnect.org"
      }
    }]
  }
  */
});

// Subscribe to call requests
walletConnector.on("call_request", (error, payload) => {
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
      "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
      "My email is john@doe.com - 1537836206101"
    ]
  }
  */
});

walletConnector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete walletConnector
});

// This will trigger session_request callback
walletConnector.createSession();
```

### Manage Connection

```javascript
// Approve Session
walletConnector.approveSession({
  accounts: [                 // required
    '0x4292...931B3',
    '0xa4a7...784E8',
    ...
  ],
  chainId: 1                  // required
})

// Reject Session
walletConnector.rejectSession({
  message: 'OPTIONAL_ERROR_MESSAGE'       // optional
})


// Kill Session
walletConnector.killSession()
```

### Manage Call Requests

```javascript
// Approve Call Request
walletConnector.approveRequest({
  id: 1,
  result: "0x41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a"
});

// Reject Call Request
walletConnector.rejectRequest({
  id: 1,                                  // required
  error: {
    code: "OPTIONAL_ERROR_CODE"           // optional
    message: "OPTIONAL_ERROR_MESSAGE"     // optional
  }
});
```
