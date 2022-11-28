# Actions

## web3modal.openModal

Programmatically open the modal.

```js
web3modal.openModal();
```

## web3modal.closeModal

Programmatically open the modal.

```js
web3modal.closeModal();
```

## web3modal.subscribeModal

Subscribe or unsubscribe from modal's state.

```js
const usnubscribe = web3modal.subscribeModal((newState) =>
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
