import IframeComponent from '../../components/IframeComponent';

# Dapp Integration Guide

## Dapp Guide Section Topics

- WalletConnect Code/Component Setup
- Constructing unsigned transactions
- Sending unsigned transactions for signing using WalletConnect
- Adding the signature to the ExtrinsicPayload
- Signing and sending the transaction to the node

---

# WalletConnect Code/Component Setup

1. **One time step**: Generate a unique `projectId` by visiting and creating your project’s profile on WalletConnect’s project dashboard at: https://cloud.walletconnect.com/.

2. Import `UniversalProvider` and `{ Web3Modal }` from `@walletconnect/universal-provider` and `@web3modal/standalone` respectively.

```js
import UniversalProvider from '@walletconnect/universal-provider'
import { Web3Modal } from '@web3modal/standalone'
```

3. Instatiate a universal provider using the `projectId` created for your app.

```js
const provider = await UniversalProvider.init({
  projectId: '2ea3f3ghubh32b8ie2f2',
  relayUrl: 'wss://relay.walletconnect.com'
})
```

4. On user action (e.g. user clicks connect for WalletConnect), call the connect method on the providers sign client passing in preferred params.

WalletConnect uses chain ids based on the CAIP standard (CAIP-13 for Polkadot Namespace): [Polkadot WalletConnect CAIP-13](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-13.md)

- polkadot CAIP id = `91b171bb158e2d3848fa23a9f1c25182`
- kusama CAIP id = `b0a8d493285c2df73290dfb7e61f870f`
- westend CAIP id = `e143f23803ac50e8f6f8e62695d1ce9e`
- Chain ids correspond to the genesis hash for each respective chain

### Example Namespace and Sign Client connect call:

**Note**: this serves as an example. The supported methods, chains, and events can all be defined by the dapp team based on the requirements of the dapp.

```js
const params = {
  requiredNamespaces: {
    polkadot: {
      methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
      chains: ['polkadot:91b171bb158e2d3848fa23a9f1c25182'],
      events: ['chainChanged", "accountsChanged']
    }
  }
}

const { uri, approval } = await provider.client.connect(params)
```

5. Create a standalone modal using your dapps WalletConnect projectid and specifying version 2 of WalletConnect.

```js
const web3modal = new Web3Modal({
  projectId: '2ea3f3ghubh32b8ie2f2',
  walletConnectVersion: 2
})
```

6. Open the modal prompting the user to scan the QR code with their wallet app or copy the URI from the modal and paste into their wallet app to begin the session creation process.

```js
// if there is a URI from the client connect step open the modal
if (uri) {
  web3modal.openModal({ uri })
}
// await session approval from the wallet app
const walletConnectSession = await approval()
```

7. Get the accounts from the session for use in constructing transactions.

```js
const walletConnectAccount = Object.values(walletConnectSession.namespaces)
  .map(namespace => namespace.accounts)
  .flat()

// grab account addresses from CAIP account formatted accounts
const accounts = wcAccounts.map(wcAccount => {
  const address = wcAccount.split(':')[2]
  return address
})
```

# Constructing Unsigned Transactions

One thing the dapp must do is properly construct the unsigned transaction. This consists of constructing an object with the intended chain’s metadata including the `specVersion`, `transactionVersion`, etc. In addition to these, you must provide the transaction data (`method`, `address` etc). Below is an example of what this general structure looks like using polkadotjs but this can be done in any valid way:

```js
const unsignedTransaction = {
  specVersion: api.runtimeVersion.specVersion.toHex(),
  transactionVersion: api.runtimeVersion.transactionVersion.toHex(),
  address: selectedWalletConnectAccountAddress,
  blockHash: lastHeader.hash.toHex(),
  blockNumber: blockNumber.toHex(),
  era: era.toHex(),
  genesisHash: api.genesisHash.toHex(),
  method: method.toHex(),
  nonce: nonce.toHex(),
  signedExtensions: [
    'CheckNonZeroSender',
    'CheckSpecVersion',
    'CheckTxVersion',
    'CheckGenesis',
    'CheckMortality',
    'CheckNonce',
    'CheckWeight',
    'ChargeTransactionPayment'
  ],
  tip: api.registry.createType('Compact<Balance>', 0).toHex(),
  version: tx.version
}
```

8. A specific example of constructing an unsigned transaction using polkadotjs api to retrieve the chains metadata.

```js
// import api and wsprovider
import { ApiPromise, WsProvider } from '@polkadot/api';

//instantiate wsProvider and api
const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });

const lastHeader = await api.rpc.chain.getHeader();
  const blockNumber = api.registry.createType(
    'BlockNumber',
    lastHeader.number.toNumber()
  );
const tx = api.tx.balances.transfer(keyring.bob.publicKey, 100);

const method = api.createType('Call', tx);
  const era = api.registry.createType('ExtrinsicEra', {
  current: lastHeader.number.toNumber(),
  period: 64,
});

const accountNonce = getBalanceAccount(submitAddress)?.nonce || 0;
const nonce = api.registry.createType('Compact<Index>', accountNonce);

const unsignedTransaction = {
  specVersion: api.runtimeVersion.specVersion.toHex(),
  transactionVersion: api.runtimeVersion.transactionVersion.toHex(),
  address: selectedWalletConnectAccountAddress,
  blockHash: lastHeader.hash.toHex(),
  blockNumber: blockNumber.toHex(),
  era: era.toHex(),
  genesisHash: api.genesisHash.toHex(),
  method: method.toHex(),
  nonce: nonce.toHex(),
  signedExtensions: [
    'CheckNonZeroSender',
    'CheckSpecVersion',
    'CheckTxVersion',
    'CheckGenesis',
    'CheckMortality',
    'CheckNonce',
    'CheckWeight',
    'ChargeTransactionPayment',
  ],
  tip: api.registry.createType('Compact<Balance>', 0).toHex(),
  version: tx.version,
};
```

# Sending unsigned transactions to the wallet for signing using WalletConnect

9. Send the unsigned transaction to the paired wallet for signing using the providers sign client. This triggers a `session_request` event which must be handled by the paired wallet.

```js
const result = await client.request({
  chainId: 'polkadot:91b171bb158e2d3848fa23a9f1c25182',
  topic: walletConnectSession.topic,
  request: {
    method: 'polkadot_signTransaction',
    params: {w
      address: selectedWalletConnectAddress,
      transactionPayload: unsignedTransaction
    }
  }
})
```

Once the request resolved, the expected response should be a result object which contains a signature

```js
{
  signature: '0x09u03f0h3nf34f0m3mn0fn34fn3f' // an example result
}
```

## Adding the signature to the ExtrinsicPayload

Using this signature, we can now create an `ExtrinsicPayload` and add the signature. Below is an example of this general step:

```js
// create the extrinsic payload using the unsigned transaction
const rawUnsignedTransaction = api.registry.createType('ExtrinsicPayload', unsignedTransaction, {
    version: unsignedTransaction.version,
  });

  // add the signature to the extrinsic payload
tx.addSignature(selectedWalletConnectAddress, result.signature, rawUnsignedTransaction);
```

# Signing and sending the transaction to the node

Now, it is just about attaching the returned signature to the transaction and submitting it as specified by the dApp. Below is a specific example showing this process:

```js
const rawUnsignedTransaction = api.registry.createType('ExtrinsicPayload', unsignedTransaction, {
    version: unsignedTransaction.version,
  });

tx.addSignature(selectedWalletConnectAddress, result.signature, rawUnsignedTransaction);

// send the signed transaction to the node
const unsub = await tx.send(({ status, events }) => {
    // optionally handle ready status, notify user of submission
    if (status.isReady) {
          // ...
    }

    // optionally handle in block status, notify user of in block
    if (status.isInBlock) {
      // ...
    }

    // let user know outcome of transaction
    if (status.isFinalized) {
      events.forEach(({ event: { method } }) => {
      // if success optionally notify/update state
        if (method === 'ExtrinsicSuccess') {
          // ...
          unsub(); // unsubscribe from extrinsic
        } else if (method === 'ExtrinsicFailed') {
        // on failure optionally notify/update state
          // ...
          unsub(); // unsubscribe from extrinsic
        }
    })
  }
});
```

<IframeComponent />
