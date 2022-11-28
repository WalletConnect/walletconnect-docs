# FAQs

<details className="box faq"><summary className="faq-question">How can I get WalletConnect v2 support on my wallet?</summary>
<p className="faq-answer">

If you enjoy using WalletConnect and would like your wallet of choice to work with v2, then you will need to request the update as a feature. You can generally do this by finding your wallet's GitHub repo, and opening an issue.

For more information on migrating from v1 to v2, visit this [page](https://docs.walletconnect.com/2.0/advanced/migrating-from-v1.0).

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

When initializing `signClient`, you can set `rpcUrl` to `walletconnect.org` or `walletconnect.dev`. 

```js
const signClient = await SignClient.init({
  projectId: "<YOUR PROJECT ID>",
  relayUrl: "walletconnect.org",
  metadata: {},
});
```

</p>

</details>