# Sync Protocol

## Key Coordination

A user can synchronize multiple clients assuming that it can sign the same message and deterministically return the same signature. This is possible as a property of ECDSA and EdDSA which most blockchain accounts use to verify signatures from a private key.

Therefore using the same mechanism we will request the wallet to sign a message that only the exact same account can return and therefore use it to generate sets of keys in our protocol.

To do so we will use the [BIP-32 standard](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) which describes how HD Wallets work using multiple keys being derived from a single seed.

### Generating a message to sign

In order for us to get the same signature for all clients we must have a fixed message to be signed. The message should be unique for each account and informative for the user to understand the intent.

```sh
I authorize this app to sync my account:  <CAIP_10_ACCOUNT>

Read more about Sync API: https://docs.walletconnect.com/2.0/specs/clients/sync
```

Once the wallet returns us the signature we must convert it into a BIP-32 seed. For example:

```js
message = "I authorize this app to sync my account: eip155:1:0x58315c689b483a66b951EDEfAbf8847c75e44B45\n\nRead more about Sync API: https://docs.walletconnect.com/2.0/specs/clients/sync"
signature = "0xc91265eadb1473d90f8d49d31b7016feb7f7761a2a986ca2146a4b8964f3357569869680154927596a5829ceea925f4196b8a853a29c2c1d5915832fc9f1c6a01c"
```

### Converting a signature to a seed

The signature can be encoded differently depending on the namespace the blockchain account is associated with therefore we shall treat the signature as an utf8 string.

We take the resulting utf8 bytes from the signature and we hash it using SHA-256 to obtain an entropy with 32 bytes. For example:

```js
signature = "0xc91265eadb1473d90f8d49d31b7016feb7f7761a2a986ca2146a4b8964f3357569869680154927596a5829ceea925f4196b8a853a29c2c1d5915832fc9f1c6a01c"
entropy = "118cf02858a7e588b0e76f40bcfd7dd985eb3a21dc524b0200a7cbcbec0a7841"
```

Using the derived entropy from the signature we will deterministically generate the seed for our HD wallet to coordinate keys across clients.

### Generate stores with different keys

Now that we have a BIP-32 compatible seed we can derive different derivation paths in the HD wallet to generate different synchronized stores.

Usually wallets use BIP-44 to standardize derivation paths for different accounts but in our case we will take a similar approach with different schema.

```sh
store_base_path = "m/77'/0'/0"
store_path = store_base_path + "/" + store_specific_path
```

BIP-32 derivation paths require us to use 32-bit unsigned integers (uint32) but our store names will be utf8 strings therefore we will convert them by slicing them into 4 characters or less without padding them then converting into uint32 and finally separating them into different branches using the "/" separator. For example:

```sh
store_name = "my-user-profile"
store_name_sliced = ["my-u", "ser-", "prof", "ile"]
store_name_uint32 = [1836658037, 1936028205, 1886547814, 6909029]
store_path = "m/77'/0'/0/1836658037/1936028205/1886547814/6909029"
```

Now using the BIP-32 standard we can derive a store key using the signatured-based seed and the store derivation path.

Since all clients that the user authorizes by signing a message will derive the same seed and the derivation paths are also deterministically generated from the store name, we can encrypt the state changes to synchronize the clients.

## State Changes

To communicate state changes between all clients we will publish messages under a topic in our Relay Network. The topic will be different for each store and messages will be encrypted with a corresponding key. The topic will be a SHA256 hash of the store key. For example:

```sh
store_name = "my-user-profile"
store_path = "m/77'/0'/0/1836658037/1936028205/1886547814/6909029"
store_key = "164a1b53452729c86d18127d912a9bab83c516885101a0b0fb8287b998014e74"
store_topic = "741f8902d339c4c16f33fa598a6598b63e5ed125d761374511b2e06562b033eb"
```

There will be only two operations for state changes: setting values and deleting values. Both the keys and values are restricted to strings. The state can be overriden or "updated" by simplying setting a different value with the same key.

These state changes will be published as JSON-RPC requests that will be stringified and encrypted with the store key and similarly to other WalletConnect clients they will use a time-based JSON-RPC id which is a timestamp in miliseconds appended by 3 random digits. The state changes will be "optimistic" in that they should be published in an async manner and the client's "set" and "delete" should resolve before the completion of the successful publishing of the message. 

Therefore we can solve conflicts by using the JSON-RPC id published for the last state change on that specific key-value pair by prioritizing the highest integer.

### Setting State

Considereing the conflict resolution described with JSON-RPC id let's walkthrough an example with setting state between two clients.

A and B are synced with the same store and A publishes the following state change:

```js
// published by A
{
  id: 1675012319603550,
  jsonrpc: '2.0',
  method: 'wc_syncSet',
  params: { key: 'username', value: '@johndoe98' }
}
```

Now the store has one key ("username") with a value "@johndoe98". Then coincidently A and B publish a state change within the same milisecond (`1675012321135`):

```js
// published by A
{
  id: 1675012321135267,
  jsonrpc: '2.0',
  method: 'wc_syncSet',
  params: { key: 'username', value: '@johndoe123' }
}

// published by B
{
  id: 1675012321135117,
  jsonrpc: '2.0',
  method: 'wc_syncSet',
  params: { key: 'username', value: '@johndoe456' }
}

```

Given that A's payload has an id with a higher integer than B's payload then its corresponding state change is prioritized as the latest change. Now the store has one key ("username") with a value "@johndoe123".

Another critical detail to note is that we must persist keys that are deleted with `wc_syncDel` in order to detect state changes for keys that had values erased. 

### Deleting State

Whenever a client wants to delete state associated with a key-value pair it will publish a state change with the method `wc_syncDel` and the parameter would include the associated key. Let's walkthrough an example:

```js
// store (before)
{
  updates: {
      username: 1675012321135267,
  },
  state: {
      username: '@johndoe456',
  }
}

// published by A
{
  id: 1675706949227363,
  jsonrpc: '2.0',
  method: 'wc_syncDel',
  params: { key: 'username' }
}

// store (after)
{
  updates: {
      username: 1675706949227363,
  },
  state: {}
}
```

The state has been completely removed for the key-value pair associated with key `username` but the jsonrpc id for the lastest state change was persisted and this would allow us to resolve future conflicts with state changes with the exact same key.

## State History

Sync API has a dependency on the History API which backs up all the messages published through the Relay server. Without the History API it would not be possible for all clients to be correctly synced as they would miss state changes.

Using the History API we can retrieve all the messages published in the past even past their TTL expired. Therefore all clients will register the intent to persist messages correspodning store topics in order to allow future clients to retrieve the state changes in the past and recreate the state before subscribing to new changes.

Let's take for example the user authorizes a new client C to sync to the same store above as A and B. Therefore it will retrieve messages for the matching topic then it will be able to decrypt them using the store key and then parse the previous payloads and conclude that the store has a one key ("username") with a value "@johndoe123".
