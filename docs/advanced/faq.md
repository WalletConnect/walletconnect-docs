# FAQs

<details className="box faq"><summary className="faq-question">Will relay server <code>bridge.walletconnect.org</code> still work in V2 </summary>
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
  relayUrl: "walletconnect.org",
  metadata: {},
});
```

</p>

</details>