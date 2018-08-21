# Getting Started

## Description

Wallet Connect is a simple solution that bridges communication between browser-based Dapps and mobile wallets using a QR code to establish the initial connection. It is an open protocol and does not require a Dapp user to install a browser extension. The protocol is agnostic to specific mobile wallets a user may want to use and enables Dapp developers to integrate with multiple wallets through a single implementation.

- enable users to use their mobile wallets with Dapps without having to install a browser extension
- enable users to use the wallet of their choice without worrying about which Dapps have integrated with which wallets
- simplify wallet integration for Dapp developers instead of requiring them to integrate each wallet individually
- provide flexibility to Dapp developers about which Wallet Connect bridge servers they want to use to communicate with mobile wallets
- provide control to the mobile wallet developers on how push notifications are sent to their users

## Quick Start \(for Dapps\)

### Install package

```bash
yarn add walletconnect

# OR

npm install --save walletconnect
```

### Getting Started

```javascript
import WalletConnect from 'walletconnect'

/**
 *  Create a webConnector
 */
const webConnector = new WalletConnect(
  'https://walletconnect.matic.network', // bridge url
  {
    dappName: 'INSERT_DAPP_NAME'
  }
)

/**
 *  Create a new session
 */
const session = await webConnector.createSession()

console.log(session.sessionId) // prints session id
console.log(session.sharedKey.toString('hex')) // prints shared private key

/**
 *  Listen to session status
 */
webConnector.listenSessionStatus((err, result) => {
  console.log(result) // check result
})

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
webConnector.listenTransactionStatus(transactionId, (err, result) => {
  console.log(result) // check result
})
```

## Community

Share your experience, contribute or ask questions with the WalletConnect Community

Github: [https://github.com/walletconnect](https://github.com/walletconnect)
Telegram: [https://t.me/walletconnect](https://t.me/walletconnect)
Forum: [https://discuss.walletconnect.org](https://discuss.walletconnect.org)
