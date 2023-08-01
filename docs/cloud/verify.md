# Verify

Verify API allows dapps on all platforms (web, Android and iOS) to securely validate if the end-user is interacting with the correct domain, via their Wallet and the Web3Wallet SDK.

Once the wallet knows whether the end-user was on uniswap.com or eviluniswap.com they can cross-reference this with our registry.

These simple solutions make phishing attacks significantly harder and hence make a more anxiety free crypto experience for end-users.

## Cloud Verification

In order to verify your Dapp domain in WalletConnect Cloud follow these steps:

1. Head over [cloud.walletconnect.com](https://cloud.walletconnect.com)

2. Create a new project.

3. Head over to explorer tab and fill in the necessary fields. Most importantly, fill in the Homepage section with your website URL which you wish to verify.

<!-- ![create-push-url](/assets/verify/tab.png) -->

<p align="center">
  <img src="/assets/verify/tab.png" />
</p>

4. After you fill in all necessary details (description, logo, type, etc), hit save and go back to Settings tab.

<!-- ![create-push-url](/assets/verify/dns-verification.png) -->

<p align="center">
  <img src="/assets/verify/dns-verification.png" />
</p>

5. Click on the copy button and head over to your Domain Name Registrar/Provider to edit your DNS records.

6. Under “Type”, select “TXT”. In the “Answer” section, paste the text you copied from cloud dashboard. This field may vary across DNS dashboards. If you’re trying to register a subdomain, add it under “Host”. Feel free to leave TTL at its default value.

<!-- ![create-push-url](/assets/verify/dns-record.png) -->

<p align="center">
  <img src="/assets/verify/dns-record.png" />
</p>

7. Depending on your DNS settings, this might take a while to reflect. You can check out DNS settings for your website with CLI tools like Dig or with websites like [MXToolbox](https://mxtoolbox.com/SuperTool.aspx?action=txt)

8. Once this is done and you have confirmed this change is reflected, head on back to your Cloud Dashboard and click on Verify. You should see a Toast pop up in the bottom right section of your screen and the domain verification section should have a green tick next to it.

<p align="center">
  <img src="/assets/verify/verified.png" />
</p>