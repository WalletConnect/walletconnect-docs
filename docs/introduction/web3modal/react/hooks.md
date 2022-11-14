# Hooks

## Modal Hooks

React hooks to programatically control the modal. Usefull when you want to use your own ui components and react to modal state.

```tsx
import { useWeb3Modal } from "@web3modal/react";

const { isOpen, open, close } = useWeb3Modal();
```

## Wagmi Hooks

Refer to [Wagmi Docs](https://wagmi.sh/docs/getting-started) for detailed instructions about using their hooks. Wagmi is a collection of React Hooks containing everything you need to start working with Ethereum. wagmi makes it easy to display ENS and balance information, sign messages, interact with contracts, and much more — all with caching, request deduplication, and persistence.
