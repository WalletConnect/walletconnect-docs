# Ethereum Provider

Ethereum Provider for WalletConnect v2

## Installation

```bash npm2yarn
npm install @walletconnect/ethereum-provider @web3modal/standalone
```

## Initialization

```typescript
import { EthereumProvider } from '@walletconnect/ethereum-provider'

const provider = await EthereumProvider.init({
  projectId, // REQUIRED your projectId
  chains, // REQUIRED chain ids
  showQrModal, // REQUIRED set to "true" to use @web3modal/standalone,
  methods, // OPTIONAL ethereum methods
  events, // OPTIONAL ethereum events
  rpcMap, // OPTIONAL rpc urls for each chain
  metadata, // OPTIONAL metadata of your app
  qrModalOptions // OPTIONAL - `undefined` by default, see https://docs.walletconnect.com/2.0/web3modal/options
})
```

## Use with Web3Modal

It is easy to enable Web3Modal support for your dApp. Simply pass `showQrModal: true` to the `init()` method. Learn more about this in Web3Modal documentation for [React](../web3modal/react/ethereum-provider/installation) or [HTML](../web3modal/html/ethereum-provider/installation)

## Use without Web3Modal

You can subscribe to the `display_uri` event and handle the URI yourself.

```ts
provider.on('display_uri', (uri: string) => {
  // ... custom logic
})

await provider.connect()
// or
await provider.enable()
```

## Sending Requests

```typescript
const result = await provider.request({ method: 'eth_requestAccounts' })

// OR

provider.sendAsync({ method: 'eth_requestAccounts' }, CallBackFunction)
```

## Events

```typescript
// chain changed
provider.on('chainChanged', handler)
// accounts changed
provider.on('accountsChanged', handler)
// session established
provider.on('connect', handler)
// session event - chainChanged/accountsChanged/custom events
provider.on('session_event', handler)
// connection uri
provider.on('display_uri', handler)
// session disconnect
provider.on('disconnect', handler)
```

## Required and Optional Namespaces

With Ethereum Provider, the package passed the required chains through `chains` and if your dapp wants to provide other optionalNamespaces this is passed through `optionalChains`.

Example code can be found [here](https://github.com/wagmi-dev/references/blob/main/packages/connectors/src/walletConnect.ts#L134) and further documentation on namespaces can be found in this [spec](https://docs.walletconnect.com/2.0/specs/clients/sign/namespaces).

```typescript
await EthereumProvider.init({
      projectId: process.env.TEST_PROJECT_ID,
      chains: [1], // chains added to required namespaces
      optionalChains: [42], // chains added to optional namespaces
    });
```