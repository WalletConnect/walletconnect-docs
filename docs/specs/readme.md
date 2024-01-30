import Container from '../components/Container';

# WalletConnect v2.0 Protocol Specs

In this repository, we document and discuss features that are currently under development and experimentation. All content is highly subjected to change and in constant development, so feel free to edit, propose, discuss, comment, rant, etc. If you want to start a technical discussion, just open a PR or an issue.

## Clients

<Container
items={[
{
name: "Sign API",
description: "Sign is a remote signer protocol to communicate securely between web3 wallets and dapps.",
url: `/specs/clients/sign`
},
{
name: "Auth API",
description: "Auth is an authentication protocol that can be used to log-in blockchain wallets into apps.",
url: `/specs/clients/auth`
},
{
name: "Notify API",
description: "Notify is a notification protocol that enables apps to notify users of both off-chain and on-chain events.",
url: `/specs/clients/notify`
},
{
name: "Chat API",
description: "Chat is a direct messaging protocol that can enable wallets to message each other.",
url: `/specs/clients/chat`
},
{
name: "Core API",
description: "Core API consolidates several core modules that are shared between all other high-level APIs.",
url: `/specs/clients/core`
}
]}
/>

## Servers

<Container
items={[
{
name: "Relay Server",
description: "Relay server routes messages between clients using publish-subscribe pattern with topic-based routing.",
url: `/specs/servers/relay`
},
{
name: "Keys Server",
description: "Keys Server indexes Chat invite keys for discoverability and also verifies identity key ownership.",
url: `/specs/servers/keys`
},
{
name: "Push Server",
description: "Push server observes incoming messages on the behalf of a Client through a webhook on the Relay Server.",
url: `/specs/servers/push/spec`
},
{
name: "Notify Server",
description: "Notify server tracks encryption keys on the behalf of a client and publishes messages to the Relay Server.",
url: `/specs/servers/notify/notify-server-api`
},
{
name: "Archive Server",
description: "Archive server persists Relay messages indefinitely on the behalf of a client through a webhook.",
url: `/specs/servers/archive`
},
{
name: "Verify Server",
description: "Verify server is used to authenticate the origin of an attestation id which is related to a JSON-RPC payload sent.",
url: `/specs/servers/verify`
}
]}
/>
