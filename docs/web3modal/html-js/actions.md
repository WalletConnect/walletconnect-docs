import IframeComponent from '../../components/IframeComponent';

# Actions

For majority of your tasks like getting account details, managing chains, interacting with contracts etc. you will be using actions provided by [wagmi core](https://wagmi.sh), so make sure to read over their documentation as well. Below are some Web3Modal specific actions that you might find useful.

## web3modal.openModal

Programmatically open the modal.

```js
interface Options {
  route?: "Account" | "ConnectWallet" | "Help" | "SelectNetwork";
}
await web3modal.openModal(options?: Options);
```

## web3modal.closeModal

Programmatically close the modal.

```js
web3modal.closeModal()
```

## web3modal.subscribeModal

Subscribe or unsubscribe from modal's state.

```js
const unsubscribe = web3modal.subscribeModal(newState => console.log(newState))
unsubscribe()
```

## web3modal.setDefaultChain

Sets the default chain **before** the user connects. After the user connects, use the wagmi network get/switch action. The default chain is `mainnet` or first chain in wagmi config if `mainnet` is not available.

```js
web3modal.setDefaultChain(polygon)
```

## web3modal.setTheme

Programmatically set or update modal's theme.

```js
web3modal.setTheme({
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#F5841F'
    // ...
  }
})
```

<IframeComponent />
