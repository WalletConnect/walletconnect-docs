# Actions

## Modal Actions

### web3modal.openModal

Programmatically open the modal.

```js
interface Options {
  route?: "Account" | "ConnectWallet" | "Help" | "SelectNetwork";
}
await web3modal.openModal(options?: Options);
```

### web3modal.closeModal

Programmatically close the modal.

```js
web3modal.closeModal();
```

### web3modal.subscribeModal

Subscribe or unsubscribe from modal's state.

```js
const unsubscribe = web3modal.subscribeModal((newState) =>
  console.log(newState)
);
unsubscribe();
```

### web3modal.setDefaultChain

Sets the default chain **before** the user connects. After the user connects, use the wagmi network get/switch action. The default chain is `mainnet` or first chain in wagmi config if `mainnet` is not available.

```js
web3modal.setDefaultChain(mainnet);
```

### web3modal.setTheme

Programmatically set or update modal's theme.

```js
web3modal.setTheme({
  themeMode: "dark",
  themeColor: "blue",
  themeBackground: "gradient",
});
```

## Wagmi Actions

[Wagmi](https://wagmi.sh/core/getting-started) is a collection of actions containing everything you need to start working with Ethereum. wagmi makes it easy to display ENS and balance information, sign messages, interact with contracts, and much more.

See [Wagmi Documentation](https://wagmi.sh/core/getting-started) for more information.
