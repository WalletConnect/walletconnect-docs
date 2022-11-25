# Hooks

## Modal Hooks

### useWeb3Modal

Hooks to programatically control the modal. Useful when you want to use your own ui components and react to modal state.

```tsx
import { useWeb3Modal } from "@web3modal/react";

const { isOpen, open, close } = useWeb3Modal();
```

### useWeb3ModalTheme

Hook to set/update theme options like `themeColor`, `themeMode` and `themeBackground`.

```tsx
import { useWeb3ModalTheme } from "@web3modal/react";

const { theme, setTheme } = useWeb3ModalTheme();
```

## Wagmi Hooks

[Wagmi](https://wagmi.sh/react/getting-started) is a collection of React Hooks containing everything you need to start working with Ethereum. wagmi makes it easy to display ENS and balance information, sign messages, interact with contracts, and much more — all with caching, request deduplication, and persistence.

See [Wagmi Documentation](https://wagmi.sh/react/getting-started) for more information.
