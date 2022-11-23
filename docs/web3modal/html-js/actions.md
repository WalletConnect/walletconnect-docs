# Actions

## Modal Actions

Custom controllers to programatically control the modal. Useful when you want to use your own ui components and react to modal state.

```js
import { ModalCtrl } from "@web3modal/core";

ModalCtrl.open();

ModalCtrl.close();

const unsubscribe = ModalCtrl.subscribe((newState) => console.log(newState));
usubscribe();
```

## Wagmi Actions

[Wagmi](https://wagmi.sh/core/getting-started) is a collection of actions containing everything you need to start working with Ethereum. wagmi makes it easy to display ENS and balance information, sign messages, interact with contracts, and much more.

See [Wagmi Documentation](https://wagmi.sh/core/getting-started) for more information.
