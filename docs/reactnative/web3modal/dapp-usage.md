import Container from '../../components/Container';

# Dapp Usage

## Implementation

Import Web3Modal package and replace `YOUR_PROJECT_ID` with your [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in) ID

```javascript
import { Web3Modal } from '@web3modal/react-native'

const projectId = 'YOUR_PROJECT_ID'

function App() {
  return (
    <>
      <Web3Modal projectId={projectId} />
    </>
  )
}
```

## Add connect button

Add our pre-built button component in your app to open/close connection and account modals. Alternatively, use your own button along with [useWeb3Modal](#useweb3modal) hook.

```javascript
import { Web3Modal, Web3Button } from '@web3modal/react-native'

const projectId = 'YOUR_PROJECT_ID'

function App() {
  return (
    <>
      <Web3Button />
      <Web3Modal projectId={projectId} />
    </>
  )
}
```

## useWeb3Modal

Hook to programmatically control the modal. Useful when you want to use your own UI elements and subscribe to modals state.

```tsx
import { useWeb3Modal } from "@web3modal/react-native";

const { isOpen, open, close, provider } = useWeb3Modal();

// Modal's open state
isOpen;

// Open modal
interface Options {
  route?: 'ConnectWallet' | 'Qrcode' | 'WalletExplorer';
}
await open(options?: Options);

// Close modal
close();

// Initialized provider
provider;
```
