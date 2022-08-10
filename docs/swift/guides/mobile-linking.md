# Mobile Linking in iOS

Using the URI commonly displayed in the QRCode it is possible to establish a connection by sharing this URI through a deep link or universal link on both Android and iOS.

The pattern we chose to adhere for a consistent UX across platforms for connection establishment is the following:

1. Dapp prompts user to connect
2. User presses button to connect and is shown a list of iOS compatible wallets
3. User is redirected to the wallet of choice
4. Wallet prompts user to approve or reject session
5. Wallet prompts user to return to Dapp manually
5a. Wallet prompts user to return to Dapp manually
5b. Wallet automatically returns to Dapp using `WalletConnectRouter`
6.
6a. User presses back/return button to return to Dapp

Similar pattern happens when signing requests are required from the user:

1. Dapp redirects user automatically to previously chosen wallet
2. Wallet prompts user to approve or reject request
3a. Wallet prompts user to return to Dapp manually
4a. User presses back/return button to return to Dapp
or 
3b. Wallet automatically returns to Dapp using `WalletConnectRouter`



## iOS Wallet Support


iOS has some more caveats to the integration but we ensure to make it as straightforward as possible. Since its operating system is not designed to handle multiple applications subscribing to the same deep linking schema, we've designed the QRCode Modal to list supporting wallets on our [Explorer](https://explorer.walletconnect.com/) and target specific deep links or universal links for each wallet.

To add your own wallet to the Explorer, login to your [WalletConnect Cloud](https://walletconnect.com) account.

We recommend that universal links are used instead of deep links for iOS since they provide smoother UX with less prompts. When a dapp triggers a mobile connection on iOS, you should expect the following links

```bash
# For deep links
examplewallet://wc?uri=wc:94caa59c77dae0dd234b5818fb7292540d017b27d41f7f387ee75b22b9738c94@2?relay-protocol=iridium&symKey=ce3a2c7724c03cf1769ba8b1bdedad5414cc7b920aa3fb72112b997d1916266f

# For universal links
https://example.wallet/wc?uri=wc:94caa59c77dae0dd234b5818fb7292540d017b27d41f7f387ee75b22b9738c94@2?relay-protocol=iridium&symKey=ce3a2c7724c03cf1769ba8b1bdedad5414cc7b920aa3fb72112b997d1916266f
```

Additionally when there is a signing request triggered by the dapp it will hit the deep link with an incomplete URI, this should be ignored and not considered valid as it's only used for automatically redirecting the users to approve or reject a signing request.

```bash
# For deep links
examplewallet://wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@2

# For universal links
https://example.wallet/wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@2
```


## iOS App Link Constraints

When using WalletConnect on iOS and triggering a wallet interaction (e.g. when sending a transaction or signing a message), you may experience issues where the native app is not opened as expected and a browser navigation occurs instead. For some wallets (e.g. [Rainbow](https://rainbow.me)) this will present a fallback website, while other wallets (e.g. [MetaMask](https://metamask.io)) will redirect to the App Store.

This issue occurs because app links on iOS will only open the native app when the following rules are followed:

- **The wallet interaction must be triggered by a user-initiated event,** e.g. in a click handler rather than on page load or in an asynchronous callback.
- **The wallet interaction must be triggered as soon as possible within the event handler.** Any preceding asynchronous work (e.g. estimating gas, resolving an ENS name, fetching a nonce) should have already completed before the event handler fires. This may require you to design the user experience around this constraint, preventing users from initiating a wallet interaction until it's ready rather than doing the work lazily.

**Note that even if your own code follows these rules, libraries you depend on may be running their own asynchronous logic before triggering a wallet interaction.** For example, [Ethers asynchronously populates transactions before sending them.](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) Known workarounds are documented below, but if you're still experiencing these issues, you should raise them with the relevant library maintainers.

### For Ethers v5

These are the known workarounds for avoiding app linking issues on iOS when using [Ethers v5](https://docs.ethers.io/v5).

#### When sending a transaction

- **[`signer.sendTransaction`](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) should be avoided in favor of [`signer.sendUncheckedTransaction`](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/#JsonRpcSigner-sendUncheckedTransaction).**

  This avoids an asynchronous call to retrieve the internal block number which Ethers uses to resolve a complete [`TransactionResponse`](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) object.

  Note that as a result of this optimization, `sendUncheckedTransaction` returns a mock transaction response that only contains the `hash` property and a `wait` method. All other properties are `null`.

- **The transaction's `to` property should be a plain address rather than an ENS name.**

  This avoids an asynchronous call to automatically resolve ENS names during the send process.

  If you still want to support ENS name resolution, you should manually run [`provider.resolveName`](https://docs.ethers.io/v5/api/providers/provider/#Provider-ResolveName) ahead of time, storing the result before the user attempts to send a transaction. Do not resolve ENS names in the event handler.

- **The transaction's `gasLimit` property should be set.**

  This avoids the asynchronous work performed in `sendTransaction` which automatically estimates the gas limit if it's missing.

  If you still want to use the same gas limit estimation logic from `sendTransaction`, you should manually run [`provider.estimateGas`](https://docs.ethers.io/v5/api/providers/provider/#Provider-estimateGas) ahead of time, storing the result before the user attempts to send the transaction. Do not estimate gas in the event handler.

#### When calling a write method on a contract

- **[`contract.METHOD_NAME`](https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend) should be avoided if favor of calling [`contract.populateTransaction.METHOD_NAME`](https://docs.ethers.io/v5/api/contract/contract/#contract-populateTransaction) ahead of time, then sending the populated transaction with [`signer.sendUncheckedTransaction`](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/#JsonRpcSigner-sendUncheckedTransaction).**

- When sending the populated transaction, you should [follow the same guidelines as regular transactions](#when-sending-a-transaction) to avoid any asynchronous logic breaking the app link navigation. Do not populate the contract transaction in the event handler.

#### When signing a message

- If the message depends on the result of an asynchronous call (e.g. retrieving a nonce when implementing [Sign-In With Ethereum](https://login.xyz)), you should do this work ahead of time, storing the result before the user attempts to sign the message. Do not perform this asynchronous work in the event handler.
