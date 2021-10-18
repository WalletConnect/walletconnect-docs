# Legacy Clients

During the beta development of the WalletConnect clients, there were NPM packages distributed for Browser, React-Native and NodeJS clients which targetted different platforms.

```bash
# For Browser apps
> @walletconnect/browser

# For React-Native apps
> @walletconnect/react-native

# For NodeJS apps
> @walletconnect/node
```

Now it's unnecessary to choose between the different packages and there is a single isomorphic client distributed on NPM package for all platforms

```bash
# For all apps
> @walletconnect/client
```

If you used to integrate any of the above standalone clients for WalletConnect, we describe below how you should migrate to the isomorphic client now distributed

## Migrating from Browser Client

Migrating from the Browser client to the isomorphic client is as simple as replacing with the new client package.

```bash npm2yarn
npm uninstall --save @walletconnect/browser
npm install --save @walletconnect/client
```

Another thing to note about Browser client specifically is that now the QRCode Modal integration has been simplified and the qrcode-modal package can now be injected and handled by the client itself.

**Before**

```javascript
import WalletConnect from "@walletconnect/browser";
import QRCodeModal from "@walletconnect/qrcode-modal";

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  connector.createSession().then(() => {
    // get uri for QR Code modal
    const uri = connector.uri;
    // display QR Code modal
    QRCodeModal.open(uri, () => {
      console.log("QR Code Modal closed");
    });
  });
}

// Subscribe to connection events
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Close QR Code Modal
  QRCodeModal.close();

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
});
```

**After**

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
```

## Migrating from React-Native Client

Migrating from the React-Native client to the isomorphic client you need to replace with the new client package and update the constructor arguments.

```bash npm2yarn
npm uninstall --save @walletconnect/react-native
npm install --save @walletconnect/client
```

Previously the React-Native client required you to pass the clientMeta and push options as part of the second argument, however now the clientMeta is part of the first argument and push options is isolated in the second argument.

**Before**

```javascript
import RNWalletConnect from "@walletconnect/react-native";

const connector = new RNWalletConnect(
  {
    uri: "wc:8a5e5bdc-a0e4-47...TJRNmhWJmoxdFo6UDk2WlhaOyQ5N0U=", // Required
  },
  {
    clientMeta: {
      // Required
      description: "WalletConnect Developer App",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "WalletConnect",
    },
    push: {
      // Optional
      url: "<YOUR_PUSH_SERVER_URL>",
      type: "fcm",
      token: token,
      peerMeta: true,
      language: language,
    },
  }
);
```

**After**

```javascript
import WalletConnect from "@walletconnect/client";

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
    url: "<YOUR_PUSH_SERVER_URL>",
    type: "fcm",
    token: token,
    peerMeta: true,
    language: language,
  }
);
```

## Migrating from NodeJS Client

Migrating from the NodeJS client to the isomorphic client you need to replace with the new client package and update the constructor arguments.

```bash npm2yarn
npm uninstall --save @walletconnect/node
npm install --save @walletconnect/client
```

Previously the NodeJS client required you to pass the clientMeta as part of the second argument, however now the clientMeta is part of the first argument.

**Before**

```javascript
import NodeWalletConnect from "@walletconnect/node";

const connector = new NodeWalletConnect(
  {
    uri: "wc:8a5e5bdc-a0e4-47...TJRNmhWJmoxdFo6UDk2WlhaOyQ5N0U=", // Required
  },
  {
    clientMeta: {
      // Required
      description: "WalletConnect Developer App",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "WalletConnect",
    },
  }
);
```

**After**

```javascript
import WalletConnect from "@walletconnect/client";

const connector = new WalletConnect({
  // Required
  uri: "wc:8a5e5bdc-a0e4-47...TJRNmhWJmoxdFo6UDk2WlhaOyQ5N0U=",
  // Required
  clientMeta: {
    description: "WalletConnect Developer App",
    url: "https://walletconnect.org",
    icons: ["https://walletconnect.org/walletconnect-logo.png"],
    name: "WalletConnect",
  },
});
```

