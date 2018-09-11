# Getting Started

## Description

Wallet Connect is a simple solution that bridges communication between browser-based Dapps and mobile wallets using a QR code to establish the initial connection. It is an open protocol and does not require a Dapp user to install a browser extension. The protocol is agnostic to specific mobile wallets a user may want to use and enables Dapp developers to integrate with multiple wallets through a single implementation.

- enable users to use their mobile wallets with Dapps without having to install a browser extension
- enable users to use the wallet of their choice without worrying about which Dapps have integrated with which wallets
- simplify wallet integration for Dapp developers instead of requiring them to integrate each wallet individually
- provide flexibility to Dapp developers about which Wallet Connect bridge servers they want to use to communicate with mobile wallets
- provide control to the mobile wallet developers on how push notifications are sent to their users

### Quick Start For Dapps (Browser SDK)

1.  Setup

```bash
yarn add walletconnect

# OR

npm install --save walletconnect
```

2.  Implementation

```js
import WalletConnect from 'walletconnect'

/**
 *  Create a webConnector
 */
const webConnector = new WalletConnect(
  {
    bridgeUrl: 'https://bridge.walletconnect.org',  // Required
    dappName: 'INSERT_DAPP_NAME',                   // Required
  }
)

/**
 *  Create a new session
 */
const session = await webConnector.initSession()

if (session.new) {
  const { uri } = session; // Display QR code with URI string

  const sessionStatus = await webConnector.listenSessionStatus() // Listen to session status

  const accounts = sessionStatus.data // Get wallet accounts
} else {
  const { accounts } = session // Get wallet accounts
}

/**
 *  Draft transaction
 */
const tx = {from: '0xab12...1cd', to: '0x0', nonce: 1, gas: 100000, value: 0, data: '0x0'}

/**
 *  Create transaction
 */
const transactionId = await webConnector.createTransaction(tx)

/**
 *  Listen to transaction status
 */
const transactionStatus = await webConnector.listenTransactionStatus(transactionId)

if (transactionStatus.success) {
  const { txHash } = transactionStatus // Get transaction hash
}
```

### Quick Start For Wallets (React-Native SDK)

1.  Setup

```bash
/**
 *  Install NPM Package
 */

yarn add rn-walletconnect-wallet

# OR

npm install --save rn-walletconnect-wallet

/**
 *  Nodify 'crypto' package for cryptography
 */

# install "crypto" shims and run package-specific hacks
rn-nodeify --install "crypto" --hack
```

2.  Implementation

```js
import RNWalletConnect from 'rn-walletconnect-wallet'

/**
 *  Create WalletConnector (using the URI from scanning the QR code)
 */
const walletConnector = new RNWalletConnect(uri)

/**
 *  Send session data
 */
await walletConnector.sendSessionStatus({
  fcmToken: '12354...3adc',
  pushEndpoint: 'https://push.walletconnect.org/notification/new',  
  data: {
    accounts: [
      '0x4292...931B3',
      '0xa4a7...784E8',
      ...
    ]
  }
})

/**
 *  Handle push notification events & Get transaction data
 */
FCM.on(FCMEvent.Notification, event => {
  const { sessionId, transactionId } = event;

  const transactionData = await walletConnector.getTransactionRequest(transactionId);
});

/**
 *  Send transaction status
 */
await walletConnector.sendTransactionStatus(transactionId, {
  success: true,
  txHash: '0xabcd...873'
})

/**
 *  Get all transactions from bridge
 */
const allTransactions = await walletConnector.getAllTransactionRequests();

// allTransactions is a map from transactionId --> transactionData
const transactionData = allTransactions[someTransactionId];
```

## Community

Share your experience, contribute or ask questions with the WalletConnect Community

- Github: [https://github.com/walletconnect](https://github.com/walletconnect)

- Telegram: [https://t.me/walletconnect](https://t.me/walletconnect)

- Forum: [https://discuss.walletconnect.org](https://discuss.walletconnect.org)
