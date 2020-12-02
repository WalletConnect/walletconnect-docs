# Smart Contract Wallets

Smart Contract wallets like [Argent](https://argent.gitbook.io/argent/wallet-connect-and-argent) are fully supported by WalletConnect protocol.

However there is some considerations to be taken when integration WalletConnect in your dapp regarding Smart Contract wallets about how the accounts are exposed in the session, the message signatures are returned and the transactions are broadcasted.

## Accounts

Whenever you connect your dapp to a smart contract wallet you will actually receive the smart account address for the wallet. This is not to be confused with the delegate keys that are used to sign messages and transactions.

You can detect smart contract wallets by verifying on-chain if the exposed account address has any associated code deployed.

{% tabs %}
{% tab title="ethers.js" %}

```js
import { providers, utils } from "ethers";

const provider = new providers.JsonRpcProvider(rpcUrl);

const bytecode = await provider.getCode(address);

const isSmartContract = bytecode && utils.hexStripZeros(bytecode) !== "0x";
```

{% endtab %}

{% tab title="web3.js" %}

```js
import Web3 from "web3";

const web3 = new Web3(rpcUrl);

const bytecode = await web3.eth.getCode(address);

const isSmartContract = bytecode && utils.hexStripZeros(bytecode) !== "0x";
```

{% endtab %}
{% endtabs %}

Smart contract wallets are essentially multi-signature wallets that use multiple keys to authorize operations on the behalf of these smart contract accounts so you will have to take into consideration how messages and transactions are handled by your dapp.

## Messages

Normally when verifying messages from signatures of "normal" accounts which are Externally Owned Accounts (EOA) you would use an ECDSA method called `ecrecover()` that would return you the corresponding public key which will then map to an address.

In the case of Smart Contract Wallets you are not able to sign a message with the smart contract account therefore the standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) was defined to outline a validation method which can be called on-chain labelled `isValidSignature()`.

```solidity
contract ERC1271 {
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature
  )
    public
    view
    returns (bytes4 magicValue);
}
```

This method has a single parameter `_hash` which should be [EIP-191](https://eips.ethereum.org/EIPS/eip-191) compliant and could be computed using:

{% tabs %}
{% tab title="ethers.js" %}

```js
import { utils } from "ethers";

const hash = utils.hashMessage(message);
```

{% endtab %}

{% tab title="web3.js" %}

```js
import Web3 from "web3";

const web3 = new Web3(rpcUrl);

const hash = web3.eth.accounts.hashMessage(message);
```

{% endtab %}
{% endtabs %}

## Transactions

Smart Contract wallets like [Argent](https://argent.gitbook.io/argent/wallet-connect-and-argent) commonly use the concept of meta transactions. These are a particular type of transaction which are signed by one or more key pairs but are submitted to the Ethereum network by a relayer.

The relayer pays the gas fee (in ETH) and the wallet will refund the relayer (in ETH or ERC20 tokens) up to an amount signed by the wallet's owner.

From your dapp's perspective, this is managed by the mobile wallet application. Your dapp will submit a regular `{ to, value, data }` transaction to the web3 provider. This transaction will be transmitted to the mobile wallet application through WalletConnect.

The mobile wallet will transform the data into a meta transaction:

- `to` will be the `RelayerManager` contract address
- `data` will be the encoded data of the call to the execute() method with the relevant parameters

Your dapp will receive the transaction hash in order to monitor the status of the transaction and events will be emitted as usual.

The relayer has the ability to replay a transaction with a higher gas price due to fluctuating network conditions. The transaction hash is modified and the Dapp will not be aware of the new transaction hash.

One solution could be for your Dapp to observe a specific event being emitted instead of transaction status. There is currently work on standardizing events for transactions replies that has been recently proposed with [EIP-2831](https://eips.ethereum.org/EIPS/eip-2831). We hope to improve our SDKs in the future to take this standard into account.
