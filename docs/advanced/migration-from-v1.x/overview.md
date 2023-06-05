import Container from '../../components/Container';

# Migration from v1.x

The WalletConnect v1.0 protocol will be shut down on June 28, 2023, which means that it is necessary for all wallets and dapps to migrate to the WalletConnect v2.0 protocol.

This migration guide is intended for wallets and dapps still on WalletConnect v1.0 and will cover everything you need to complete a successful migration to WalletConnect v2.0.

## Migration Paths

There are different migration paths for Wallets and Dapps.

- Wallets must support v1.0 and v2.0 in parallel.
- Dapps will support only one version at a time.

We recommend that Dapps put v2.0 support in staging as early as possible to allow testing with Wallets.

<Container
items={[
{
name: "Dapps",
description: "Upgrade your Web3Modal or other dapp libraries.",
url: `/2.0/advanced/migration-from-v1.x/dapps`
},
{
name: "Wallets",
description: "Wallets must support v1.0 and v2.0 in parallel",
url: `/2.0/advanced/migration-from-v1.x/wallets`
}
]}
/>

## Migration schedule

WalletConnect v2.0 is **NOT** backwards-compatible with v1.0. Therefore, we must coordinate a migration schedule to ensure end-users do not suffer from this transition.

Most importantly we must migrate Wallets before Dapps can start supporting v2.0. This is because Wallets can support both versions in parallel and route connection requests to corresponding clients using the version number specified in the URI present in the QR Code or Deep Link.

We will be shutting down all Cloud-hosted servers for v1.0 on 28 June 2023. Read our blog post about the [v1.0 shutdown extension](https://medium.com/walletconnect/weve-reset-the-clock-on-the-walletconnect-v1-0-shutdown-now-scheduled-for-june-28-2023-ead2d953b595).

## Migration Changes

The overall UX has not changed despite the internal protocol changes thus you will find an almost identical developer experience as well.

The only major difference is that we now require a `projectId` for all our SDKs which you can find more information [here](https://docs.walletconnect.com/2.0/cloud/relay). You can get your your `projectId` by registering for a WalletConnect Cloud account at [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-up).

The Bridge URL is no longer supported. It has been replaced with the Relay URL, which is `wss://relay.walletconnect.com`.
