import Container from '../../components/Container';

# Migration from v1.x

The WalletConnect v1.0 protocol will be shut down on **June 28, 2023 at 2pm (UTC)**, which means that it is necessary for all wallets and dapps to migrate to the WalletConnect v2.0 protocol immediately. This revised shutdown date is due to a one-time extension to the migration, which was originally scheduled to conclude on March 1, 2023.

This migration guide is intended for wallets and dapps still on WalletConnect v1.0. It will cover everything you need to complete a successful migration to WalletConnect v2.0. For more information, please read our blog post on the [WalletConnect v1.0 shutdown extension](https://medium.com/walletconnect/weve-reset-the-clock-on-the-walletconnect-v1-0-shutdown-now-scheduled-for-june-28-2023-ead2d953b595).

## Migration Paths

There are different migration paths for wallets and dapps.

- Wallets can and should support WalletConnect v1.0 and v2.0 in parallel.
- Dapps can only support one version at a time. We therefore recommend dapps to put WalletConnect v2.0 support in staging as early as possible to allow testing with wallets.

<Container
items={[
{
name: "Dapps",
description: "Upgrade your Web3Modal or other dapp libraries",
url: `dapps`
},
{
name: "Wallets",
description: "Support v1.0 and v2.0 in parallel",
url: `wallets`
}
]}
/>

## Wallet-Dapp Coordination

WalletConnect v2.0 is **NOT** backwards-compatible with v1.0. Therefore, we must coordinate this migration to ensure minimal disruption to the end user experience.

Wallets can support both versions of WalletConnect in parallel, routing connection requests to corresponding clients using the version number specified in the URI present in the QR code or deep link. Wallets should therefore upgrade to WalletConnect v2.0 ASAP.

Dapps can only support one version of WalletConnect at a time. However, that doesn't mean that dapps should wait to get started on their migration. We recommend that dapps set up staging branches ASAP, which will enable immediate testing and allow for an easy switch to WalletConnect v2.0.

## WalletConnect v1.0 vs. v2.0

Despite the internal protocol changes, the overall UX between WalletConnect v1.0 and v2.0 remains consistent. You will find an almost identical developer experience as well, except for two key differences.

- `projectId`: We now require one for all of our SDKs, and it can be easily obtained by registering for a WalletConnect Cloud account at [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-up). You can find more information [here](../../cloud/relay).
- The bridge URL is no longer supported. It has been replaced by the relay URL, which is `wss://relay.walletconnect.com`.

To learn more about the protocol changes between WalletConnect v1.0 and v2.0, click [here.](./what-changed-from-v1.0.md)

## Have a Question?

If you have a migration-related question, please check out the [FAQ section](./migration-faq.md) of our migration docs.

If you require technical assistance, please let us know by creating an issue on [WalletConnect's GitHub](https://github.com/orgs/WalletConnect/discussions/categories/v1-v2-migration-support).
