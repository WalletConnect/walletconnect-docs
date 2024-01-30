# Verify

Verify API is a security-focused feature that allows wallets to notify end-users when they may be connecting to a suspicious or malicious domain, helping to prevent phishing attacks across the industry.

Once a wallet knows whether an end-user is on uniswap.com or eviluniswap.com, it can help them to detect potentially harmful connections through Verify's combined offering of WalletConnect’s domain registry and [Blowfish's domain scanner](https://docs.blowfish.xyz/reference/scan-domain-1).

For wallets looking to implement Verify into their product, find out how to get started [here](../web3wallet/verify).

## Cloud Verification

In order to verify your app domain in WalletConnect Cloud follow these steps:

1. Head over to [cloud.walletconnect.com](https://cloud.walletconnect.com)

2. Create a new project or click on the project you would like to verify.

3. On the settings tab, head over to the 'Domain verification' section and fill in the website URL that you wish to verify.

<!-- ![create-push-url](/assets/verify/tab.png) -->

<p align="center">
  <img src="/assets/verify/verify-domain.png" />
</p>

4. Click on the copy button and head over to your domain Name Registrar/Provider to edit your DNS records.
   Alternatively, if you can't manage DNS records for your project (eg: ENS or vercel.app) you can host a static file
   under `/.well-known/walletconnect.txt` which contains the entire verification code that you copied. If you are using the static file method, you can jump over step 7.

5. Under `Type`, select `TXT`. In the “Answer” section, paste the text you copied from the cloud dashboard. This field may vary across DNS dashboards. If you’re trying to register a subdomain, add it under `Host`. Feel free to leave TTL at its default value.

<!-- ![create-push-url](/assets/verify/dns-record.png) -->

<p align="center">
  <img src="/assets/verify/dns-record.png" />
</p>

6. Depending on your DNS settings, this might take a while to reflect. You can check out DNS settings for your website with CLI tools like Dig or with websites like [MXToolbox](https://mxtoolbox.com/SuperTool.aspx?action=txt)

7. Once this is done and you have confirmed this change is reflected, head on back to your Cloud Dashboard and click on Verify.

<p align="center">
  <img src="/assets/verify/verify-btn.png" />
</p>

8. You should see a toast pop up in the bottom right section of your screen and the domain verification section should have a green tick next to it.

<p align="center">
  <img src="/assets/verify/verified.png" />
</p>
