---
description: Quick Start For Dapps using Standalone Client
---

# Standalone Client

## Quick Start For Dapps \(Standalone Client\)

{% hint style="info" %}
You can use the **Test Wallet** to test your integration at [test.walletconnect.org](https://test.walletconnect.org) \([Source code](https://github.com/WalletConnect/walletconnect-test-wallet)\). Keep in mind that this is **not a secure wallet - Do not store funds**.
{% endhint %}

### Install

{% tabs %}
{% tab title="yarn" %}

```bash
yarn add @walletconnect/client @walletconnect/qrcode-modal
```

{% endtab %}

{% tab title="npm" %}

```bash
npm install --save @walletconnect/client @walletconnect/qrcode-modal
```

{% endtab %}
{% endtabs %}

{% hint style="success" %}
Syntax shown below is Javascript ES6 which requires bundling and transpiling to run in web browsers. If unfamiliar we recommend setting up an environment using [Webpack Starter](https://github.com/wbkd/webpack-starter) or [Create React App](https://github.com/facebook/create-react-app)
{% endhint %}

### Initiate Connection

```javascript
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  connector.createSession();
}

// Subscribe to connection events
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete connector
});
```

### Send Transaction \(eth_sendTransaction\)

```javascript
// Draft transaction
const tx = {
  from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
  to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
  data: "0x", // Required
  gasPrice: "0x02540be400", // Optional
  gas: "0x9c40", // Optional
  value: "0x00", // Optional
  nonce: "0x0114", // Optional
};

// Send transaction
connector
  .sendTransaction(tx)
  .then((result) => {
    // Returns transaction id (hash)
    console.log(result);
  })
  .catch((error) => {
    // Error returned when rejected
    console.error(error);
  });
```

### Sign Transaction \(eth_signTransaction\)

```javascript
// Draft transaction
const tx = {
  from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
  to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
  data: "0x", // Required
  gasPrice: "0x02540be400", // Optional
  gas: "0x9c40", // Optional
  value: "0x00", // Optional
  nonce: "0x0114", // Optional
};

// Sign transaction
connector
  .signTransaction(tx)
  .then((result) => {
    // Returns signed transaction
    console.log(result);
  })
  .catch((error) => {
    // Error returned when rejected
    console.error(error);
  });
```

### Sign Personal Message \(personal_sign\)

```javascript
// Draft Message Parameters
const message = "My email is john@doe.com - 1537836206101"

const msgParams = [
  convertUtf8ToHex(message)                                                 // Required
  "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",                             // Required
];


// Sign personal message
connector
  .signPersonalMessage(msgParams)
  .then((result) => {
    // Returns signature.
    console.log(result)
  })
  .catch(error => {
    // Error returned when rejected
    console.error(error);
  })
```

### Sign Message \(eth_sign\)

```javascript
// Draft Message Parameters
const message = "My email is john@doe.com - 1537836206101";

const msgParams = [
  "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",                            // Required
  keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))    // Required
];


// Sign message
connector
  .signMessage(msgParams)
  .then((result) => {
    // Returns signature.
    console.log(result)
  })
  .catch(error => {
    // Error returned when rejected
    console.error(error);
  })
```

### Sign Typed Data \(eth_signTypedData\)

```javascript
// Draft Message Parameters
const typedData = {
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Person: [
      { name: "name", type: "string" },
      { name: "account", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  },
  primaryType: "Mail",
  domain: {
    name: "Example Dapp",
    version: "1.0.0-beta",
    chainId: 1,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  },
  message: {
    from: {
      name: "Alice",
      account: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    to: {
      name: "Bob",
      account: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    },
    contents: "Hey, Bob!",
  },
};

const msgParams = [
  "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3", // Required
  typedData, // Required
];

// Sign Typed Data
connector
  .signTypedData(msgParams)
  .then((result) => {
    // Returns signature.
    console.log(result);
  })
  .catch((error) => {
    // Error returned when rejected
    console.error(error);
  });
```

### Send Custom Request

```javascript
// Draft Custom Request
const customRequest = {
  id: 1337,
  jsonrpc: "2.0",
  method: "eth_signTransaction",
  params: [
    {
      from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
      to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
      data: "0x",
      gasPrice: "0x02540be400",
      gas: "0x9c40",
      value: "0x00",
      nonce: "0x0114",
    },
  ],
};

// Send Custom Request
connector
  .sendCustomRequest(customRequest)
  .then((result) => {
    // Returns request result
    console.log(result);
  })
  .catch((error) => {
    // Error returned when rejected
    console.error(error);
  });
```
