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

When initializing `signClient`, you can set `rpcUrl` to `wss://relay.walletconnect.com`. 

```js
const signClient = await SignClient.init({
  projectId: "<YOUR PROJECT ID>",
  relayUrl: "wss://relay.walletconnect.com",
  metadata: {},
});
```

</p>

</details>

<details className="box faq"><summary className="faq-question">How can we use a custom relay for our bridge without a WC URI parameter as the host?</summary>
<p className="faq-answer">

You are more than welcome to utilize a custom URI parameter during testing. However, it is currently not recommended for use in a production environment. 

</p>

</details>

<details className="box faq"><summary className="faq-question">Why is self-hosting RPC nodes not an option at this time? Are there plans to make this possible in the future?</summary>
<p className="faq-answer">

We understand the desire for developers to self-host their own RPC nodes. We share this vision, and have embarked on a decentralization roadmap in order to achieve this. This summer, we will launch a permissioned network and invite a select group of partners to participate in this crucial first phase. Our objective is to make self-hosting RPC nodes a reality with the creation of the decentralized WalletConnect Network, and we appreciate your patience as we progress in this enormous mission. 

</p>

</details>
