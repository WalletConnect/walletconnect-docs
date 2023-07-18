---
id: readme
slug: /
position: 1
---

# WalletConnect v1.0

## Introduction

WalletConnect is an open protocol to communicate securely between Wallets and Dapps \(Web3 Apps\). The protocol establishes a remote connection between two apps and/or devices using a Bridge server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers. The connection is initiated by one peer displaying a **QR Code** or deep link with a standard WalletConnect URI and is established when the counter-party approves this connection request. It also includes an optional Push server to allow Native applications to notify the user of incoming payloads for established connections.

## Getting Started

Currently the WalletConnect protocol has references implementations written in Typescript for the Client, the Bridge Server and the Push server.

To quickly setup your Dapp or Wallet, go to the Quick Start section for code examples.

To read in more detail about the WalletConnect protocol, go to [Technical Specification](specs/readme.md)

Additionally you can also consult the API references for [Client](client-api.md), [Bridge Server](bridge-server.md) and [Push Server](push-server.md).

## Useful Links

| **Test Wallet** | **Example Dapp** |
| --------------- | --------------- |
| [![test wallet](/assets-1.0/img_3394.jpg)](https://test.walletconnect.org) | [![example dapp](/assets-1.0/screenshot-2019-01-31-16.52.57.png)](https://example.walletconnect.org) |
| [test.walletconnect.org](https://test.walletconnect.org) \([Source code](https://github.com/WalletConnect/walletconnect-test-wallet)\) | [example.walletconnect.org](https://example.walletconnect.org) \([Source code](https://github.com/WalletConnect/walletconnect-example-dapp)\) |

## Community

Share your experience, contribute or ask questions with the WalletConnect Community:

- **Twitter**: [https://twitter.com/walletconnect](https://twitter.com/walletconnect)
- **GitHub**: [https://github.com/orgs/WalletConnect/discussions/](https://github.com/orgs/WalletConnect/discussions/)
