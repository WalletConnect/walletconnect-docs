# WalletConnect Explorer Submissions

Submitting your project to the WalletConnect Explorer not only allows you to create a listing for your dapp or wallet on our Explorer [page](https://explorer.walletconnect.com/), but it also makes your project more discoverable to users.

Note: The status of your listing does not impact your users' ability to use WalletConnect. In other words, your users will still be able to use WalletConnect even if your submission has yet to be approved.

### WalletConnect v1.0 Shutdown: Impact on Explorer Submissions

WalletConnect v1.0 was shutdown on June 28 ([read more](https://medium.com/walletconnect/walletconnect-v1-0-has-now-been-shut-down-ff9baec96690)).

If you are a wallet or dapp that currently only supports WalletConnect v1.0, we strongly recommend that you migrate to WalletConnect v2.0 immediately. Please visit the [migration section of our docs](../migration-from-v1.x/overview) to get started right away.

### Have a Question?

If you have a question regarding the WalletConnect Explorer or your project's listing, please send an email to cloud@walletconnect.com.

## Submission Process for WalletConnect v2.0 Wallets and Hybrid Apps

To expedite approval of your submission, it is essential that you test with the following example dapp to ensure a successful WalletConnect v2.0 integration.

- Web3Modal Laboratory: https://lab.web3modal.com

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

- Wallets should test with our example dapp [here](https://lab.web3modal.com/)
- Dapps should test with our example wallet [here](https://react-web3wallet.vercel.app/)
