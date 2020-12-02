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
Syntax shown below is Javascript ES6 which requires bundling and transpiling to run in web browsers. If unfamiliar we recommend setting up an environment using [Webpack Starter](https://github.com/wbkd/webpack-starter) or [Create React App](https://github.com/facebook/create-react-app)
{% endhint %}

## Setup

First, instantiate your WalletConnect web3-provider using the following options: Infura or Custom RPC mapping

{% tabs %}
{% tab title="Infura" %}

```javascript
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const web3Provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
});

//  Enable session (triggers QR Code modal)
await web3Provider.enable();
```

{% endtab %}

{% tab title="Custom RPC" %}

```javascript
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const web3Provider = new WalletConnectProvider({
  rpc: {
    1: "https://mainnet.mycustomnode.com",
    3: "https://ropsten.mycustomnode.com",
    100: "https://dai.poa.network",
    // ...
  },
});

//  Enable session (triggers QR Code modal)
await web3Provider.enable();
```

{% endtab %}
{% endtabs %}

Then you can integrate your dapp using your favorite Ethereum library: ethers.js or web3.js

{% tabs %}
{% tab title="ethers.js" %}

```javascript
import { providers } from "ethers";

//  Wrap with Web3Provider from ethers.js
const provider = new providers.Web3Provider(web3Provider);
```

{% endtab %}

{% tab title="web3.js" %}

```javascript
import Web3 from "web3";

//  Create Web3 instance
const web3 = new Web3(web3Provider);
```

{% endtab %}
{% endtabs %}

## Events (EIP-1193)

```typescript
// Subscribe to accounts change
provider.on("accountsChanged", (accounts: string[]) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId: number) => {
  console.log(chainId);
});

// Subscribe to session connection
provider.on("connect", () => {
  console.log("connect");
});

// Subscribe to session disconnection
provider.on("disconnect", (code: number, reason: string) => {
  console.log(code, reason);
});
```

## Provider Methods

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

// Send JSON RPC requests
const result = await provider.request(payload: RequestArguments);

// Close provider session
await provider.disconnect()
```

## Web3 Methods

```typescript
//  Get Accounts
const accounts = await web3.eth.getAccounts();

//  Get Chain Id
const chainId = await web3.eth.chainId();

//  Get Network Id
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

### Required

In order to resolve non-signing requests you need to provide one of the following:

#### Infura ID

The infuraId will support the following chainId's: Mainnet (1), Ropsten (3), Rinkeby(4), Goerli (5) and Kovan (42)

```typescript
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
});
```

#### RPC URL Mapping

The RPC URL mapping should indexed by chainId and it requires at least one value.

```typescript
const provider = new WalletConnectProvider({
  rpc: {
    1: "https://mainnet.mycustomnode.com",
    3: "https://ropsten.mycustomnode.com",
    100: "https://dai.poa.network",
    // ...
  },
});
```

### Optional

You can also customize the connector through the provider using the following options

#### Bridge URL

Use your own hosted bridge by providing the url

```typescript
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  bridge: "https://bridge.myhostedserver.com",
});
```

#### Disable QR Code Modal

Use your own custom qrcode modal and disable the built-in one

```typescript
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  qrcode: false,
});

provider.connector.on("display_uri", (err, payload) => {
  const uri = payload.params[0];
  CustomQRCodeModal.display(uri);
});
```

#### Filter Mobile Linking Options

If you would like to reduce the number of mobile linking options or customize its order, you can provide an array of wallet names

```typescript
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
});
```
