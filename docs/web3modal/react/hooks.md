# Hooks

## Modal Hooks

### useWeb3Modal

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

### useWeb3ModalTheme

Hook to set or update theme options like `themeVariables` and `themeMode`.

```tsx
import { useWeb3ModalTheme } from "@web3modal/react";

const { theme, setTheme } = useWeb3ModalTheme();

// Modal's theme object
theme;

// Set modal theme
setTheme({
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "Roboto, sans-serif",
    "--w3m-accent-color": "#F5841F",
    // ...
  },
});
```

## Wagmi Hooks

[Wagmi react](https://wagmi.sh/react/getting-started) has a collection of Hooks containing everything you need to start working with Ethereum. wagmi makes it easy to display ENS and balance information, sign messages, interact with contracts, and much more — all with caching, request deduplication, and persistence.

See [wagmi docs](https://wagmi.sh/react/getting-started) for more information.
