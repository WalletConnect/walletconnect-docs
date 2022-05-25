# Wallet Usage

## 1. Initialize client as a controller

When initializing WalletConnect client as a wallet, you will need to pass an additional `controller` option. Please see [Controller glossary](../../introduction/glossary#controller) to learn more.

```js
const client = await WalletConnectClient.init({
  controller: true,
  // Other options
});
```

## 2. Listen to and handle new session proposals

Usually dApps are responsible for session initialization
