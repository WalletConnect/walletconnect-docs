# Actions

## Modal Actions

### web3modal.openModal

Programmatically open the modal.

```js
web3modal.openModal();
```

### web3modal.closeModal

Programmatically close the modal.

```js
web3modal.closeModal();
```

### web3modal.subscribeModal

Subscribe or unsubscribe from modal's state.

```js
const usnubscribe = web3modal.subscribeModal((newState) =>
  console.log(newState)
);
unsubscribe();
```

### web3modal.setSelectedChain

Programmatically set selected chain. (Only sets in scope of wbe3modal, not wagmi)

```js
web3modal.setSelectedChain();
```

### web3modal.getSelectedChain

Programmatically get selected chain. (Only gets in scope of wbe3modal, not wagmi)

```js
web3modal.getSelectedChain();
```

### web3modal.subscribeSelectedChain

Subscribe or unsubscribe from selected chain changes. (Only subscribes in scope of wbe3modal, not wagmi)

```js
const usnubscribe = web3modal.subscribeSelectedChain((newState) =>
  console.log(newState)
);
unsubscribe();
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
