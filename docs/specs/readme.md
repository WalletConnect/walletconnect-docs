import Container from '../components/Container';

# WalletConnect v2.0 Protocol Specs

In this repository, we document and discuss features that are currently under development and experimentation. All content is highly subjected to change and in constant development, so feel free to edit, propose, discuss, comment, rant, etc. If you want to start a technical discussion, just open a PR or an issue.

<Container
  items={[
    {
      name: "Sign API",
      description: "Sign is a remote signer protocol to communicate securely between web3 wallets and dapps.",
      url: `/2.0/specs/clients/sign`
    },
    {
      name: "Auth API",
      description: "Auth is an authentication protocol that can be used to log-in blockchain wallets into apps.",
      url: `/2.0/specs/clients/auth`
    },
    {
      name: "Push API",
      description: "Push is a push notification protocol that enables apps to notify users of both off-chain and on-chain events.",
      url: `/2.0/specs/clients/push`
    },
    {
      name: "Chat API",
      description: "Chat is a direct messaging protocol that can enable wallets to message each other.",
      url: `/2.0/specs/clients/chat`
    },
    {
      name: "Core API",
      description: "Core API consolidates several core modules that are shared between all other high-level APIs.",
      url: `/2.0/specs/clients/core`
    },
    {
      name: "Relay Server",
      description: "Relay server routes messages between clients using publish-subscribe pattern with topic-based routing.",
      url: `/2.0/specs/servers/relay`
    },
    {
      name: "Keys Server",
      description: "Keys Server indexes Chat invite keys for discoverability and also verifies identity key ownership.",
      url: `/2.0/specs/servers/keys`
    },
    {
      name: "Echo Server",
      description: "Echo server observes incoming messages on the behalf of a Client through a webhook on the Relay Server.",
      url: `/2.0/specs/servers/echo`
    },
    {
      name: "Cast Server",
      description: "Cast server tracks encryption keys on the behalf of a client and publishes messages to the Relay Server.",
      url: `/2.0/specs/servers/cast`
    }
  ]}
/>
