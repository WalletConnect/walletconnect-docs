# FAQs

<details className="box faq"><summary className="faq-question">Will the relay server <code>bridge.walletconnect.org</code> still work in v2?</summary>
<p className="faq-answer">

No, the bridge servers are v1 only.

</p>

</details>

<details className="box faq"><summary className="faq-question">How can I reconnect to the same pairing if my browser was restarted?</summary>
<p className="faq-answer">

 The `signClient` will restore & reconnect its pairings automatically after the page is reloaded. All pairings are stored on the page's `localStorage`.


 For more context, feel free to check our [web examples](https://github.com/WalletConnect/web-examples).

</p>

</details>

<details className="box faq"><summary className="faq-question">The default RPC endpoint is blocked. How can I get around this?</summary>
<p className="faq-answer">

When initializing `signClient`, you can set `rpcUrl` to `relay.walletconnect.org`. 

```js
const signClient = await SignClient.init({
  projectId: "<YOUR PROJECT ID>",
  relayUrl: "relay.walletconnect.org",
  metadata: {},
});
```

</p>

</details>

<details className="box faq"><summary className="faq-question">How can we use a custom relay for our bridge without a WC URI parameter for the host?</summary>
<p className="faq-answer">

 A custom URI parameter can be utilized during testing, however it is not recommended for use in a production environment.

</p>

</details>

<details className="box faq"><summary className="faq-question">Why is self-hosting of RPC nodes not currently an option and what are the plans for decentralization?</summary>
<p className="faq-answer">

We acknowledge the concerns around centralization and the desire for developers to self-host their own RPC nodes. However, at this time, we will not be able to offer that option. We understand that in the web3 space, decentralization is a key concern. We have chosen a more pragmatic solution and have observed that currently, the industry standard is the use of third-party RPC services.

This summer, we will be launching a permissioned network available to a select group of partners. This will allow for more decentralization of nodes and will provide additional options for developers.

</p>

</details>
