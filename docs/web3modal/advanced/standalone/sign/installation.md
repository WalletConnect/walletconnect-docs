# Installation

## Obtain Project ID

Every project using WalletConnect SDKs (including Web3Modal) needs to obtain `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

## Add Packages

```bash npm2yarn
npm install @walletconnect/sign-client @web3modal/standalone
```

## Implementation

Start by importing Web3Modal and Sign SDK packages, then create web3modal and sign clients. Manage session connection via sign sdk and pass pairing uri to web3modal. Finally, manage when modal gets open or closed.

```ts
import SignClient from '@walletconnect/sign-client'
import { Web3Modal } from '@web3modal/standalone'

const projectId = 'YOUR_PROJECT_ID'

const web3Modal = new Web3Modal({
  walletConnectVersion: 2,
  projectId,
  standaloneChains: ['eip155:1']
})

const signClient = await SignClient.init({ projectId })

const { uri, approval } = await signClient.connect({
  requiredNamespaces: {
    eip155: {
      methods: ['eth_sign'],
      chains: ['eip155:1'],
      events: ['accountsChanged']
    }
  }
})

if (uri) {
  web3Modal.openModal({ uri, standaloneChains: ['eip155:1'] })
  await approval()
  web3Modal.closeModal()
}
```
