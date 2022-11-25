# Actions

## Modal Actions

## ModalCtrl actions

Controller to programatically control the modal. Useful when you want to use your own UI components and React to modal state.

```js
import { ModalCtrl } from "@web3modal/core";

ModalCtrl.open();

ModalCtrl.close();

const unsubscribe = ModalCtrl.subscribe((newState) => console.log(newState));
usubscribe();
```

## ConfigCtrl actions

Controller to programatically control the modal config. Currently used to set and access theme options.

```js
import { ConfigCtrl } from "@web3modal/core";

ConfigCtrl.setTheme({
  themeColor: "green",
  themeMode: "dark",
  themeBackground: "gradient",
});

const unsubscribe = ConfigCtrl.subscribe((newState) => console.log(newState));
usubscribe();
```

## Wagmi Actions

[Wagmi](https://wagmi.sh/core/getting-started) is a collection of actions containing everything you need to start working with Ethereum. wagmi makes it easy to display ENS and balance information, sign messages, interact with contracts, and much more.

See [Wagmi Documentation](https://wagmi.sh/core/getting-started) for more information.
