# Actions

## Modal Actions

## web3modal.openModal

Programmatically open the modal.

```js
import { web3modal } from "./main.js";

web3modal.openModal();
```

## web3modal.closeModal

Programmatically open the modal.

```js
import { web3modal } from "./main.js";

web3modal.closeModal();
```

## web3modal.subscribeModal

Subscribe or unsubscribe from modal's state.

```js
import { web3modal } from "./main.js";

const usnubscribe = web3modal.subscribeModal((newState) =>
  console.log(newState)
);
unsubscribe();
```

## web3modal.setTheme

Programmatically set or update modal's theme.

```js
import { web3modal } from "./main.js";

web3modal.setTheme({
  themeMode: "dark",
  themeColor: "blue",
  themeBackground: "gradient",
});
```

## Wagmi Actions

[Wagmi](https://wagmi.sh/core/getting-started) is a collection of actions containing everything you need to start working with Ethereum. wagmi makes it easy to display ENS and balance information, sign messages, interact with contracts, and much more.

See [Wagmi Documentation](https://wagmi.sh/core/getting-started) for more information.
