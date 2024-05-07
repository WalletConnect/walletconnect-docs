# Namespaces Guide

## Guide Section Topics

- [Understanding Namespaces](#understanding-namespaces)
- [Proposal Namespaces](#proposal-namespaces)
- [Proposal Namespace Example](#proposal-namespace-example)
- [Session Namespaces](#session-namespaces)
- [Session Namespace Example](#session-namespace-example)
- [Chains](#chains), [Methods](#methods) and [Events](#events)
- [Using Namespaces with the Universal Provider](#dapps-universal-provider-and-namespaces)
- [Using Namespaces with the Web3Wallet](#wallets-web3wallet-and-namespaces)

### Understanding Namespaces

- Pairing sessions use specific methods, events and chains during their lifetimes. These arguments constitute what is known as a `namespace`.
- Namespaces are used to specify the chains, methods and events that are intended to be used in a particular session.
- They establish the minimal requirement for a wallet and a dapp to get paired. There are two types of namespaces, `proposal namespaces` and `session namespaces`.

### Proposal Namespaces

- A dapp sends a proposal namespace to the wallet for pairing. The proposal namespace contains the list of `chains`, `methods` and `events` that the dapp intends to make use of.
- The wallet validates if the received proposal namespaces are valid and returns a session with its approved namespaces as a response if it is valid along with the approved accounts for each chain in the namespace.
- If the requested proposal namespaces are not valid based on the wallets rules, the session cannot be established and the wallet rejects it with an error code that tells the dapp if the proposal namespaces have invalid chains, methods, events or if it was simply rejected by the user.

### Proposal Namespace Example

An example Proposal Namespace for a dapp which supports connecting to Polkadot, Ethereum, Polygon and Cosmos:

```js
{
  "polkadot": {
    "chains": [
        "polkadot:91b171bb158e2d3848fa23a9f1c25182", // Polkadot
        "polkadot:b0a8d493285c2df73290dfb7e61f870f", // Kusama
        ],
    "methods": ["polkadot_signMessage"],
    "events": ["accountsChanged"]
  },
  "eip155": {
    "chains": [
        "eip155:1",   // Ethereum
        "eip155:137"  // Polygon
        ],
    "methods": ["eth_sign"],
    "events": ["accountsChanged"]
  },
  "cosmos": {
    "chains": ["cosmos:cosmoshub-4"], // Cosmos
    "methods": ["cosmos_signDirect"],
    "events": ["someCosmosEvent"]
  }
}
```

### Session Namespaces

- The wallet validates if the received proposal namespaces match with the session namespaces it supports. If they match, a session is established successfully and pairing is completed. If not, the session is not established.
- The wallet session can also choose to provide access to more chains, methods or events that were not a part of the proposal namespaces. This means a dapp could send a proposal namespace with only Polkadot `['polkadot:91b171bb158e2d3848fa23a9f1c25182']` in its requiredNamespaces `chains` field but a wallet could return a session namespace with both Polkadot and Kusama `['polkadot:91b171bb158e2d3848fa23a9f1c25182','polkadot:b0a8d493285c2df73290dfb7e61f870f']` as part of the sessions namespaces.

### Session Namespace Example

```js
{
  "polkadot": {
    "accounts": [
        "polkadot:91b171bb158e2d3848fa23a9f1c25182:AZBEwbZhYeiofodZnM2iAoshP3pXRPNSJEKFqEPDmvv1mY7"
    ]
    "methods": ["polkadot_signMessage", "polkadot_signTransaction"],
    "events": ["accountsChanged"]
  },
  "eip155": {
    "accounts": [
      "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
      "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
    ],
    "methods": ["eth_sign"],
    "events": ["accountsChanged"]
  },
  "cosmos": {
    "accounts": [
      "cosmos:cosmoshub-4:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0"
    ],
    "methods": ["cosmos_signDirect", "personal_sign"],
    "events": ["someCosmosEvent", "proofFinalized"]
  }
}
```

### Chains

- `chains` is an array of chain ids which represent the chains the session will be using during its lifetime. For Polkadot, the format for each chain id is the chain agnostic namespace (e.g. `eip155`, `polkadot`, `cosmos` etc) followed by a colon and the genesis hash for the chain (e.g. `91b171bb158e2d3848fa23a9f1c25182` for Polkadot).
- A dapp or wallet can make as many or as few chain ids a part of its namespace as desired.

### Methods

- `methods` is represented as an array of wallet defined methods that a session supports.
- These are not pre-defined or centrally implemented and can be modified/extended as needed by a wallet.
- In the above Polkadot session namespace example there are two given methods `polkadot_signMessage` and `polkadot_signTransaction`. The idea for the functionality of these methods is to sign the relevant data (either a message or unsigned transaction) and return the signature. [An example for each method](https://github.com/WalletConnect/web-examples/blob/main/advanced/wallets/react-wallet-v2/src/lib/PolkadotLib.ts).
- If a dapp required additional method support such as receiving the signed hex for a transaction in order to submit it rather than the signature, a wallet only needs to define and add support for the method so that any dapp that requires that functionality can use it when making requests.
- An example would be adding a method named `polkadot_getSignedHex` and creating an implementation that signs, and returns the hash of the signed transaction.

```js
// Example Session Namespace
{
  "polkadot": {
    "accounts": [
        "polkadot:91b171bb158e2d3848fa23a9f1c25182:AZBEwbZhYeiofodZnM2iAoshP3pXRPNSJEKFqEPDmvv1mY7"
    ],
    "methods": [
        "polkadot_signMessage",
        "polkadot_signTransaction"
        "polkadot_getSignedHex",
    ],
    "events": ["accountsChanged"],
  }
 }

// In the wallets codebase, you'd add functionality to be called when this new method is called from a WalletConnect session
// Specific Example Implementation:

public async getSignedHex(payload: SignerPayloadJSON) {
    this.registry.setSignedExtensions(payload.signedExtensions)
    const txPayload = this.registry.createType('ExtrinsicPayload', payload, {
      version: payload.version
    });

    const { signature } = txPayload.sign(this.keypair)

    const extrinsic = registry.createType(
        'Extrinsic',
        { method: payload.method },
        { version: payload.version }
    );

    extrinsic.addSignature(unsigned.address, signature, unsigned);

    const hex = extrinsic.toHex();

    return { hex };
  }
```

- Wallets and dapps can define an agreed upon interface based on a particular chain or ecosystems needs.

### Events

- `events` represent specific changes in a sessions state that a dapp or wallet may want to take some action on.
- For example, a dapp or a wallet might want to perform some action if the user changes the selected session accounts. An example of emitting this event can be found below:

```js
await signClient.emit({
  topic,
  event: {
    name: 'accountsChanged',
    data: ['AZBEwbZhYeiofodZnM2iAoshP3pXRPNSJEKFqEPDmvv1mY7']
  },
  chainId: 'polkadot:91b171bb158e2d3848fa23a9f1c25182'
})
```

This can be useful in a wallet if a user is adding additional accounts to a session so that the wallet or dapp can respond and update their respective states using events such as `session_update` to update the accounts, chains, methods or events for the session or `session_delete` to end a session. [(More on events)](https://docs.walletconnect.com/specs/clients/sign/session-events#session_request).

### Using Namespaces

In order to creat a session proposal, call the connect method on the universal provider's sign client. The sign clients `connect` method accepts an object based on the following interface:

```js
interface ConnectParams {
  requiredNamespaces?: ProposalTypes.RequiredNamespaces;
  optionalNamespaces?: ProposalTypes.OptionalNamespaces;
  sessionProperties?: ProposalTypes.SessionProperties;
  pairingTopic?: string;
  relays?: RelayerTypes.ProtocolOptions[];
}
```

### Dapps: Universal Provider and Namespaces:

The connect method on the universal provider expects an object that matches the above `ConnectParams` interface. All fields are optional and in the below example we use only the `requiredNamespaces` field in our proposal namespace:

```js
const proposalNamespace = {
  requiredNamespaces: {
    polkadot: {
      methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
      chains: ['polkadot:91b171bb158e2d3848fa23a9f1c25182'],
      events: ['chainChanged', 'accountsChanged']
    }
  }
}

// call connect on the universal provider passing the proposal namespace

const { uri, approval } = await provider.client.connect(proposalNamespace)
```

### Wallets: Web3Wallet and Namespaces:

When the web3wallet approves and creates a session, it must provide the session proposal `id` as well as the session `namespaces` which are approved for use in the session. An example of what this looks like is below.

```js
const session = await web3wallet.approveSession({
  id: proposal.id,
  namespaces: {
    polkadot: {
      accounts: [
        'polkadot:91b171bb158e2d3848fa23a9f1c25182:AZBEwbZhYeiofodZnM2iAoshP3pXRPNSJEKFqEPDmvv1mY7'
      ],
      methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
      chains: ['polkadot:91b171bb158e2d3848fa23a9f1c25182'],
      events: ['chainChanged', 'accountsChanged']
    }
  }
})
```

More information on namespaces can be found [here](https://docs.walletconnect.com/specs/clients/sign/namespaces#controller-side-validation-of-incoming-proposal-namespaces-wallet).
