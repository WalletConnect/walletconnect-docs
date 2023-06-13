import Container from '../../components/Container';

# Dapp Usage

## Implementation

Import Web3Modal package, replace `YOUR_PROJECT_ID` with your [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in) Project ID and add your Project's info in `providerMetadata`

```tsx
import { Web3Modal } from '@web3modal/react-native';

const projectId = 'YOUR_PROJECT_ID';

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
};

function App() {
  return (
    <>
      <Web3Modal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  )
}
```

## Add Connect Button

Add our pre-built button component in your dapp to open/close connection and account modals. Alternatively, use your own button along with the [useWeb3Modal](#useweb3modal) hook.

*Note: A new session is created automatically when the modal is opened, so avoid calling `provider.connect` by yourself.

```tsx
import { Web3Modal, Web3Button } from '@web3modal/react-native';

const projectId = 'YOUR_PROJECT_ID';

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
};



function App() {
  return (
    <>
      <Web3Button />
      <Web3Modal projectId={projectId} providerMetadata={providerMetadata}  />
    </>
  )
}
```

## useWeb3Modal

Hook to programmatically control the modal. Useful when you want to use your own UI elements and subscribe to modals state.

```tsx
import { useWeb3Modal } from "@web3modal/react-native";

const { isOpen, open, close, provider, isConnected, address } = useWeb3Modal();

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

// Wallet connection state
isConnected;

// Connected account's address
address;

```
#### Example
```tsx
import { Pressable, Text } from 'react-native';
import { Web3Modal, useWeb3Modal } from '@web3modal/react-native';

const projectId = 'YOUR_PROJECT_ID';

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
};


function App() {
  const { open, isConnected } = useWeb3Modal();
  return (
    <>
      <Pressable onPress={open}>
        <Text>{isConnected ? 'View Account' : 'Connect'}</Text>
      </Pressable>
      <Web3Modal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  )
}
```