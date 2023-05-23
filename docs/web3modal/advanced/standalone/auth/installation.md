import IframeComponent from '../../../../components/IframeComponent';

# Installation

## Obtain Project ID

Every project using WalletConnect SDKs (including Web3Modal) needs to obtain `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

## Add Packages

```bash npm2yarn
npm install @walletconnect/auth-client @web3modal/standalone
```

## Implementation

Start by importing Web3Modal and Auth SDK packages, then create a Web3Modal and Auth instance.
Manage auth connection via auth sdk and pass generated uri to web3modal. Finally, manage when modal gets open or closed by subscribing to auth sdk events.

```ts
import AuthClient, { generateNonce } from '@walletconnect/auth-client'
import { Web3Modal } from '@web3modal/standalone'

const projectId = 'YOUR_PROJECT_ID'

const web3Modal = new Web3Modal({
  projectId,
  walletConnectVersion: 2,
  standaloneChains: ['eip155:1']
})

const authClient = await AuthClient.init({
  projectId,
  metadata: {
    name: 'Web3Lab',
    description: 'Web3Modal Laboratory',
    url: 'https://lab.web3modal.com',
    icons: ['https://lab.web3modal.com/favicon.ico']
  }
})

authClient.on('auth_response', ({ params }) => {
  web3Modal.closeModal()
})

const { uri } = await authClient.request({
  aud: 'https://yourapp.com/',
  domain: 'yourapp.com',
  chainId: 'eip155:1',
  type: 'eip4361',
  nonce: generateNonce(),
  statement: 'Sign in with wallet.'
})

if (uri) {
  await web3Modal.openModal({ uri })
}
```

<IframeComponent />
