# Migration FAQs

## Why is WalletConnect carrying out this migration?

The original WalletConnect protocol, which is often referred to as WalletConnect v1.0, was launched in 2018. Following a redesign aimed at enhancing protocol performance, WalletConnect v2.0 was launched in late 2021. This new version of the WalletConnect protocol offers improvements including multi-chain support, a new Relay URL API, and an end user experience that is faster, reliable, and more seamless.

We are now carrying out this migration as WalletConnect v2.0 is not backward compatible with WalletConnect v1.0, which was sunset in fall 2022. It is therefore necessary to migrate wallets and apps to WalletConnect v2.0 in a coordinated manner to ensure that there is a seamless transition and minimize any potential for disruption for end users. 

## What are the differences between WalletConnect v1.0 and v2.0?

WalletConnect v2.0 brings notable advancements to the protocol, including multi-chain support. To read more about the differences, click [here](what-changed-from-v1.0.md).

Developers getting started with WalletConnect v2.0 will also need a project ID. This project ID provides access to our infrastructure and enables enhanced insights for those that have implemented WalletConnect SDKs. You can easily obtain one by signing up on the [WalletConnect Cloud](https://cloud.walletconnect.com/).

## When will WalletConnect v1.0 be shut down - and what does that mean?

We will shut down WalletConnect v1.0 at 2pm (UTC) on June 28, 2023. Wallets and apps still utilizing the WalletConnect v1.0 bridge after this date will no longer be able to connect their users to another WalletConnect-supported app.

## Which wallets and apps are already on WalletConnect v2.0?

To find out which wallets and apps are already on WalletConnect v2.0, you can head over to our [Explorer page](https://walletconnect.com/explorer?version=2).

## I’m working on my WalletConnect v2.0 integration but am having technical issues. How can I get in touch with WalletConnect?

If you're experiencing technical issues, please open a discussion in our designated [support channel](https://github.com/orgs/WalletConnect/discussions/categories/v1-v2-migration-support).

## What happens if I don’t migrate in time?

If you are unable to complete your migration before the WalletConnect v1.0 shutdown comes into effect on June 28, it is likely that your users will experience connectivity issues. We therefore recommend that you begin your migration process as soon as possible, to minimize any potential impact on your user experience.

## I didn’t migrate before June 28, 2023. What should I do now?

The good news is that you’ve come to the right place! We strongly recommend that you begin your migration immediately, and you can do so by following the instructions laid out in the [migration section](./overview.md) of our docs.