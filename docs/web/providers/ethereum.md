# Ethereum Provider

[EIP-1993](https://eips.ethereum.org/EIPS/eip-1193) compliant Provider for WalletConnect v2. You can use this on it's own or pass down to libraries like ethers, viem, web3js and others.

## Installation

```bash npm2yarn
npm install @walletconnect/ethereum-provider @walletconnect/modal
```

## Initialization

```typescript
import { EthereumProvider } from '@walletconnect/ethereum-provider'

const provider = await EthereumProvider.init({
  projectId, // REQUIRED your projectId
  chains, // REQUIRED chain ids
  showQrModal, // REQUIRED set to "true" to use @walletconnect/modal
  methods, // OPTIONAL ethereum methods
  events, // OPTIONAL ethereum events
  rpcMap, // OPTIONAL rpc urls for each chain
  metadata, // OPTIONAL metadata of your app
  qrModalOptions // OPTIONAL - `undefined` by default, see https://docs.walletconnect.com/2.0/web3modal/options
})
```

## Use with WalletConnectModal

When `showQrModal` is enabled and `@walletconnect/modal` package is installed, ethereum provider will automatically show and hide [WalletConnectModal](../walletConnectModal/installation.mdx). You can also pass all relevant modal options under `qrModalOptions`. See [WalletConnectModal options](../walletConnectModal/options.mdx) for all available fields.

## Use without WalletConnectModal

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
  optionalChains: [42] // chains added to optional namespaces
})
```
