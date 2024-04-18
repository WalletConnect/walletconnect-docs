# FAQs

## What chains does WalletConnect support?

WalletConnect operates as a chain-agnostic protocol, adhering to the [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md) standard. While the WalletConnect protocol supports various chains, you can refer to the [list](../cloud/chains/chain-list.mdx) for the known compatible blockchains. However, please note that our SDKs have certain limitations on the chains they support.

If you intend to extend support for non-EVM chains in your wallet or dapp, it is recommended to review the cross-chain primitives supported by the WalletConnect protocol through the Chain Agnostic Standards Alliance's [Namespaces](https://namespaces.chainagnostic.org/) project. Additionally, feel free to reach out to our community team for further guidance. In the event that the desired chain lacks documentation in the Namespaces project, you can collaborate with an expert in the respective chain's tooling and submit a [namespaces PR](https://github.com/ChainAgnostic/namespaces/?tab=readme-ov-file#namespaces).

## Will the relay server `bridge.walletconnect.org` still work in v2?

No, the bridge servers are v1 only.

## How can I reconnect to the same pairing if my browser was restarted?

The `signClient` will restore & reconnect its pairings automatically after the page is reloaded. All pairings are stored on the page's `localStorage`.

For more context, feel free to check our [web examples](https://github.com/WalletConnect/web-examples).

## The default relay endpoint is blocked. How can I get around this?

When initializing `signClient`, you can set `relayUrl` to `wss://relay.walletconnect.org`.

```js
const signClient = await SignClient.init({
  projectId: '<YOUR PROJECT ID>',
  relayUrl: 'wss://relay.walletconnect.org',
  metadata: {}
})
```

## How can we use a custom relay for our bridge without a WC URI parameter as the host?

You are more than welcome to utilize a custom URI parameter during testing. However, it is currently not recommended for use in a production environment.

## Why is self-hosting not an option at this time? Are there plans to make this possible in the future?

We understand the desire for developers to self-host their own relay. We share this vision, and have embarked on a decentralization roadmap in order to achieve this. By the end of this summer, we will launch a permissioned network and invite a select group of partners to participate in this crucial first phase. Our objective is to make self-hosting relay a reality with the creation of the decentralized WalletConnect Network, and we appreciate your patience as we progress in this enormous mission.
