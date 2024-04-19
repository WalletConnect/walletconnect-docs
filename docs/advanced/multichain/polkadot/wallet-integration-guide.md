# Wallet Integration Guide

## Wallet Guide Section Topics

- WalletConnect Code/Component Setup
- Approving a Session Proposal
- Rejecting a Session Proposal
- Handling Session Request Events
- Session Persistence/Management

---

1. **Getting Started:** Generate a unique `projectId` by visiting and creating your project's profile on WalletConnect's project dashboard at:
   - `https://cloud.walletconnect.com/`

# WalletConnect Code/Component Setup

2. Import Core and Web3Wallet from WalletConnect.

```js
import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'
```

3. Instantiate and add Core and Web3Wallet to the state of the wallet.

```js
const core = new Core({ projectId: 'fgu234234njbhvhv23525bj' })
const web3wallet = await Web3Wallet.init({
  core: core,
  metadata: {
    name: 'Example WalletConnect Wallet',
    description: 'Example WalletConnect Integration',
    url: 'myexamplewallet.com',
    icons: []
  }
})
```

4. Create a function to accept a session `uri` which will be passed from a dapp when a user either scans the dapp's WalletConnect qrcode modal or manually copies and pastes the uri from the modal into the wallet's UI.

```js
const onConnect = async (uri: string) => {
  // call web3wallet.core.pairing.pair( { uri: uri })
  // with the uri received from the dapp in order to emit the
  // `session_proposal` event
  const result = await web3wallet.core.pairing.pair({ uri })
}
```

5. Handle the `session_proposal` event on the `web3wallet`. This event is triggered when the `pair` method is called on `web3wallet.core.pairing` to create a pairing session.

# Approving a Session Proposal (Example)

When approving a session proposal, the wallet can perform any necessary checks such as ensuring that the proposal includes all required namespaces and any optional namespaces. The approval response also contains the approved accounts as part of the namespace. Below is an example showing the format for wallet accounts and how to include them in a session proposal approval.

```js
// example account addresses in wallet state
const substrateAccounts = [
  '5CK8D1sKNwF473wbuBP6NuhQfPaWUetNsWUNAAzVwTfxqjfr',
  '5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX'
]

// format the accounts to match the chain:chain_id:address format
const walletConnectAccounts = accounts.map(
  account => `polkadot:91b171bb158e2d3848fa23a9f1c25182:${account.address}`
)

web3wallet.on('session_proposal', async proposal => {
  // optionally show user a modal or way to reject or approve session
  showWalletConnectModal()

  // handle user approval case

  // create the approved session with selected accounts, supported methods, chains and events for your wallet
  const session = await web3wallet.approveSession({
    id: proposal.id,
    namespaces: {
      polkadot: {
        accounts: walletConnectAccounts,
        methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
        chains: ['polkadot:91b171bb158e2d3848fa23a9f1c25182'],
        events: ['chainChanged", "accountsChanged']
      }
    }
  })

  // create response object
  const response = { id: proposal.id, result: 'session approved', jsonrpc: '2.0' }

  // respond to the dapp request with the approved session's topic and response
  await web3wallet.respondSessionRequest({ topic: session.topic, response })
})
```

# Rejecting a Session Proposal (Example)

If the user does not approve the requested chains, methods, or accounts, or if the wallet does not support the requested chains or methods, the response should not be considered a success. Below is an example of rejecting a session proposal.

```js
// Note: session_request is emitted when the client on the dapp end calls the request method
// import getSdkError to create predefined ErrorResponse types
import { getSdkError } from '@walletconnect/utils'

web3wallet.on('session_proposal', async proposal => {
  // optionally show user a modal or way to reject or approve session
  showWalletConnectModal()

  // handle user reject action
  await web3wallet.rejectSession({
    id: proposal.id,
    reason: getSdkError('USER_REJECTED')
  })
})
```

# Handling Session Request Event

A dapp triggers an event when it requires the wallet to carry out a specific action, such as signing a transaction. The event includes a topic and a request object, which will differ based on the requested action. As seen in the [WalletConnect Web Examples](https://github.com/WalletConnect/web-examples/blob/main/advanced/wallets/react-wallet-v2/src/lib/PolkadotLib.ts), two common use cases in polkadot are signing messages and signing transactions. These methods are represented here as `polkadot_signMessage` and `polkadot_signTransaction` respectively and each simply signs the respective payload and returns the signature to the dapp. An example of a `session_request` event handler containing both can be found below.

```js
web3wallet.on('session_request', async requestEvent => {
  const { params, id } = requestEvent
  const { request } = params
  const address = request.params?.address

  // check that the request address is in your users list of wallets
  // Example:
  const wallet = getPolkadotWallet(address) //

  if (!wallet) {
    throw new Error('Polkadot wallet does not exist')
  }

  // handle supported methods (polkadot_signMessage, polkadot_signTransaction)
  switch (request.method) {
    case 'polkadot_signMessage':
      // call function used by wallet to sign message and return the signature
      const signature = await yourwallet.signMessage(request.params.message)

      // create the response containing the signature in the result
      const response = { id, result: { signature: signature }, jsonrpc: '2.0' }

      // respond to the dapp request with the response and topic
      await web3wallet.respondSessionRequest({ topic, response })

    case 'polkadot_signTransaction':
      // call function used by wallet to sign transactions and return the signature
      const signature = await yourwallet.signTransaction(request.params.transactionPayload)

      // create the response containing the signature in the result
      const response = { id, result: { signature: signature }, jsonrpc: '2.0' }

      // respond to the dapp request with the response and topic
      await web3wallet.respondSessionRequest({ topic, response })

    // throw error for methods your wallet doesn't support
    default:
      throw new Error(getSdkError('INVALID_METHOD').message)
  }
})
```

# Sessions Persistence/Management

- sessions can be saved/stored so users dont have to pair repeatedly
- sessions can be disconnected from using `await web3wallet.disconnectSession({ topic: topic });` passing the session topic.
- sessions can be extended using `await web3wallet.extendSession({ topic: topic });` passing the session topic.
- Default session lifetime is 7 days for WalletConnect v2.0.

# Further Documentation for WalletConnect 2.0

- https://docs.walletconnect.com/
