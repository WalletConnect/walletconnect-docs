# FAQs

<details className="box faq"><summary>How to get WalletConnect v2 support on the wallet I use?</summary>
<p>

If you enjoy using WalletConnect on your dapp, then you need to go to your wallet's Github, create and issue, and let them know you would like v2 support.

</p>
</details>

<details className="box faq"><summary>How can I reconnect using that same pairing session in case my browser was restarted?</summary>
<p>

The `signClient` has an internal storage cache. It will restore & reconnect its pairings automatically after the page is reloaded. All pairings are stored on the page's `localStorage`.


For more context, feel free to check our [web examples](https://github.com/WalletConnect/web-examples).
</p>

</details>