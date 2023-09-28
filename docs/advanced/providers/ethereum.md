# Ethereum Provider

[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compliant Provider for WalletConnect v2. You can use this on it's own or pass down to libraries like ethers, viem, web3js and others.

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
  optionalChains, // OPTIONAL chains
  showQrModal, // REQUIRED set to "true" to use @walletconnect/modal
  methods, // REQUIRED ethereum methods
  optionalMethods, // OPTIONAL ethereum methods
  events, // REQUIRED ethereum events
  optionalEvents, // OPTIONAL ethereum events
  rpcMap, // OPTIONAL rpc urls for each chain
  metadata, // OPTIONAL metadata of your app
  qrModalOptions // OPTIONAL - `undefined` by default, see https://docs.walletconnect.com/web3modal/options
})
```

## Use with WalletConnectModal

When `showQrModal` is enabled and `@walletconnect/modal` package is installed, ethereum provider will automatically show and hide [WalletConnectModal](../walletconnectmodal/about.mdx). You can also pass all relevant modal options under `qrModalOptions`. See [WalletConnectModal options](../walletconnectmodal/options.mdx) for all available fields.

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

## Required and Optional Chains

With Ethereum Provider, the package passed the required chains through `chains` and if your dapp wants to provide other optionalNamespaces this is passed through `optionalChains`.

Example code can be found [here](https://github.com/wagmi-dev/references/blob/main/packages/connectors/src/walletConnect.ts#L134) and further documentation on namespaces can be found in this [spec](https://docs.walletconnect.com/specs/clients/sign/namespaces).

The example below specifies Ethereum Mainnet (chainId `1`) as a required chain via `chains`, and Ethereum Goerli (chainId `5`) as an optional chain via `optionalChains`.

```typescript
await EthereumProvider.init({
  projectId: process.env.TEST_PROJECT_ID,
  chains: [1], // chains added to required namespaces
  optionalChains: [5] // chains added to optional namespaces
  ...
})
```

Another example of those that want to pass several optional chains:

```typescript
await EthereumProvider.init({
  projectId: process.env.TEST_PROJECT_ID,
  chains: [1], // chains added to required namespaces
  optionalChains: [5, 56, 137, 10, 100] // chains added to optional namespaces
  ...
})
```

## Required and Optional Methods

By default, `EthereumProvider` specifies `eth_sendTransaction` and `personal_sign` as required methods. For those that want to request additional methods for the session, we recommend passing these through `optionalMethods`.
The default behaviour for the required methods can also be overridden by specifying the `methods` option directly.

For more information of the source code, please refer to [here](https://github.com/WalletConnect/walletconnect-monorepo/blob/v2.0/providers/ethereum-provider/src/EthereumProvider.ts#L167). This optional passing is them consumed in our Sign Client [here.](https://github.com/WalletConnect/walletconnect-monorepo/blob/v2.0/providers/ethereum-provider/src/EthereumProvider.ts#L277)

```typescript
await EthereumProvider.init({
  projectId: process.env.TEST_PROJECT_ID,
  chains: [1],
  optionalChains,
  optionalMethods: ['eth_signTypedData', 'eth_signTypedData_v4', 'eth_sign'],
  ...
})
```
