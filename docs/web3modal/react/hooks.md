# Hooks

For majority of your tasks like getting account details, managing chains, interacting with contracts etc. you will be using react hooks provided by [wagmi](https://wagmi.sh), so make sure to read over their documentation as well. Below are some Web3Modal specific hooks that you might find useful.

## useWeb3Modal

Hook to programmatically control the modal. Useful when you want to use your own UI elements and subscribe to modals state.

```tsx
import { useWeb3Modal } from "@web3modal/react";

const { isOpen, open, close, setDefaultChain } = useWeb3Modal();

// Modal's open state
isOpen;

// Open modal
interface Options {
  route?: "Account" | "ConnectWallet" | "Help" | "SelectNetwork";
}
await open(options?: Options);

// Close modal
close();

// Sets the default chain BEFORE user is connected.
// Use wagmi network get / switch action AFTER user is connected.
// Default chain will be `mainnet` or first wagmi chain in config if `mainnet` is not available.
setDefaultChain(polygon);
```

## useWeb3ModalTheme

Hook to set or update theme options like `themeVariables` and `themeMode`.

```tsx
import { useWeb3ModalTheme } from '@web3modal/react'

const { theme, setTheme } = useWeb3ModalTheme()

// Modal's theme object
theme

// Set modal theme
setTheme({
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#F5841F'
    // ...
  }
})
```
