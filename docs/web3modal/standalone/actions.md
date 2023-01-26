# Actions

## web3modal.openModal

Programmatically open the modal.

```js
// Open modal (if route is not provided, modal opens view based on connection / config status)
export interface Options {
  uri?: string
  standaloneChains?: string[]
  route?: 'Account' | 'ConnectWallet' | 'Help' | 'SelectNetwork'
}

await web3modal.openModal(options?: Options);
```

## web3modal.closeModal

Programmatically close the modal.

```js
web3modal.closeModal();
```

## web3modal.subscribeModal

Subscribe or unsubscribe from modal's state.

```js
const unsubscribe = web3modal.subscribeModal((newState) =>
  console.log(newState)
);
unsubscribe();
```

## web3modal.setTheme

Programmatically set or update modal's theme.

```js
web3modal.setTheme({
  themeMode: "dark",
  themeColor: "blue",
  themeBackground: "gradient",
});
```
