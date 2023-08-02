import Container from '../../components/Container';

# Dapp Usage

## Implementation

Import WalletConnect Modal package, replace `YOUR_PROJECT_ID` with your [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in) Project ID and add your Project's info in `providerMetadata`

```tsx
import { WalletConnectModal } from '@walletconnect/modal-react-native';

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
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  )
}
```

## useWalletConnectModal

Hook to programmatically control the modal. Useful when you want to use your own UI elements and subscribe to modals state.

*Note: A new session is created automatically when the modal is opened, so avoid calling `provider.connect` by yourself.

```tsx
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

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
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

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
  const { open, isConnected } = useWalletConnectModal();
  return (
    <>
      <Pressable onPress={open}>
        <Text>{isConnected ? 'View Account' : 'Connect'}</Text>
      </Pressable>
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  )
}
```

## Sign a message
Once connected to the wallet, you can use our provider to send requests calling `provider.request({ method, params }, chainId)`

#### Example:
```tsx
import { utf8ToHex } from '@walletconnect/encoding';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

function ExampleScreen() {
  const { provider, address } = useWalletConnectModal();

  const personalSign = async () => {
    const message = 'Hello World';
    const hexMsg = utf8ToHex(message, true);
    const signature = await provider?.request(
      { method: 'personal_sign', params: [hexMsg, address] },
      'eip155:1' //optional
    );
  };
}
```