---
description: Quick Start For Dapps using Web3 Provider
---

# Web3 Provider

## Quick Start For Dapps \(Web3 Provider\)

{% hint style="info" %}
You can use the **Test Wallet** to test your integration at [test.walletconnect.org](https://test.walletconnect.org) \([Source code](https://github.com/WalletConnect/walletconnect-test-wallet)\). Keep in mind that this is **not a secure wallet - Do not store funds**.
{% endhint %}

### Install

{% tabs %}
{% tab title="yarn" %}

```bash
yarn add web3 @walletconnect/web3-provider
```

{% endtab %}

{% tab title="npm" %}

```bash
npm install --save web3 @walletconnect/web3-provider
```

{% endtab %}
{% endtabs %}

{% hint style="success" %}
Syntax shown below is Javascript ES6 which requires bundling and transpiling to run in web browsers.
If unfamiliar we recommend setting up an environment using [Webpack Starter](https://github.com/wbkd/webpack-starter) or [Create React App](https://github.com/facebook/create-react-app)
{% endhint %}

## Setup

```javascript
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // Required
});

//  Enable session (triggers QR Code modal)
await provider.enable();

//  Create Web3
const web3 = new Web3(provider);
```

## Events (EIP-1193)

```javascript
// Subscribe to accounts change
provider.on("accountsChanged", (accounts: string[]) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId: number) => {
  console.log(chainId);
});

// Subscribe to networkId change
provider.on("networkChanged", (networkId: number) => {
  console.log(networkId);
});

// Subscribe to session connection/open
provider.on("open", () => {
  console.log("open");
});

// Subscribe to session disconnection/close
provider.on("close", (code: number, reason: string) => {
  console.log(code, reason);
});
```

## Provider Methods

```javascript
// Send JSON RPC requests
const result = await provider.send(method: string, params?: any[]);

// Close provider session
await provider.close()
```

## Web3 Methods

```javascript
//  Get Accounts
const accounts = await web3.eth.getAccounts();

//  Get Chain ID
const chainId = await web3.eth.chainId();

//  Get Network ID
const networkId = await web3.eth.net.getId();

// Send Transaction
const txHash = await web3.eth.sendTransaction(tx);

// Sign Transaction
const signedTx = await web3.eth.signTransaction(tx);

// Sign Message
const signedMessage = await web3.eth.sign(msg);

// Sign Typed Data
const signedTypedData = await web3.eth.signTypedData(msg);
```

## Provider Options

1. Required (at least one of the following)
   a. infuraId - the Infura app ID is used for read requests that don't require user approval like signing requests
   b. rpc - custom rpc url mapping with chainId keys for each url (check custom rpc url section)
2. Optional
   a. bridge - the Bridge URL points to the bridge server used to relay WalletConnect payloads - default="https://bridge.walletconnect.org"
   b. chainId - preferred chain id to be provided by the wallet on session request - default=1

## Custom RPC URL

WalletConnect Web3 Provider uses a HTTP connection to a remote node to make read calls instead of making unnecessary JSON-RPC requests through the WalletConnect session.

It's required to pass either the infuraId or rpc option values to make this connection remotely. If you would like to use your own custom RPC url you don't need to pass an InfuraId for the provider to work.

Example RPC mapping by chainId

```javascript
const provider = new WalletConnectProvider({
  rpc: {
    1: "https://mainnet.mycustomnode.com",
    3: "https://ropsten.mycustomnode.com",
    100: "https://dai.poa.network"
    // ...
  }
});
```
