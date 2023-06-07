# WalletConnect Explorer Submissions

Submitting your project to the WalletConnect Explorer not only allows you to create a listing for your dapp or wallet on our Explorer [page](https://explorer.walletconnect.com/), but it also makes your project more discoverable to users.

Note: The status of your listing does not impact your users' ability to use WalletConnect. In other words, your users will still be able to use WalletConnect even if your submission has yet to be approved.

### WalletConnect v1.0 Shutdown: Impact on Explorer Submissions

The WalletConnect v1.0 shutdown is scheduled to take place on June 28 (read more [here](https://medium.com/walletconnect/t-1-month-last-call-to-migrate-before-the-walletconnect-v1-0-shutdown-692ffa9520aa)). Once the shutdown comes into effect, we will no longer accept submissions from wallets and dapps that support only WalletConnect v1.0.

If you are a wallet or dapp that currently only supports WalletConnect v1.0, we strongly recommend that you migrate to WalletConnect v2.0 immediately. Please visit the [migration section of our docs](https://docs.walletconnect.com/2.0/advanced/migration-from-v1.x/overview) to get started right away.

### Have a Question?

If you have a question regarding the WalletConnect Explorer or your project's listing, please send an email to cloud@walletconnect.com.

## Submission Process for WalletConnect v2.0 Wallets and Hybrid Apps

To expedite approval of your submission, it is essential that you test with the following example dapps to ensure a successful WalletConnect v2.0 integration.

- WalletConnect Sign v2.0: https://lab.web3modal.com/ManagedReact
- WalletConnect Auth: https://lab.web3modal.com/AuthReact

Please make sure all the items in the following checklist are correct. Failure to meet the following criteria will result in **an automatic rejection and prolong your project's submission process**.

- [ ] WalletConnect Sign v2.0 successfully connects
- [ ] WalletConnect Auth successfully connects
- [ ] Type and Category are selected
- [ ] A proper description of your wallet is provided
- [ ] Deep links are added for mobile and desktop wallets
- [ ] All supported chains are added (to allow for seamless chain switching for your end users)
- [ ] IF applicable: A case sensitive flag to detect browser extension/injected wallets (e.g. EIP-155 MetaMask for window.ethereum.metaMask)

## Submission Process for WalletConnect v2.0 Dapps

To expedite approval of your submission, it is essential that you test with the following example wallets to ensure a successful WalletConnect v2.0 integration.

- WalletConnect Sign v2.0: https://react-web3wallet.vercel.app/
- WalletConnect Auth: https://react-web3wallet.vercel.app/

Please make sure all the items in the following checklist are correct. Failure to meet the following criteria will result in **an automatic rejection and prolong your project's submission process**.

- [ ] WalletConnect Sign v2.0 successfully connects
- [ ] WalletConnect Auth successfully connects
- [ ] Type and Category are selected
- [ ] A proper description of your dapp is provided

## Wallets and Dapps on TestFlight or in Staging

We only accept submissions from wallets and dapps that are published and out of TestFlight. If that is the case for your wallet or dapp, please verify the following before submitting for review.

1.  Update the download links on the published version
2.  Add mobile deep links
3.  Test and confirm that your app connects with our example apps

- Wallets should test with our example dapp [here](https://lab.web3modal.com/ManagedReact)
- Dapps should test with our example wallet [here](https://react-web3wallet.vercel.app/)
