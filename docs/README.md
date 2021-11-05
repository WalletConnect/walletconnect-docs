---
id: readme
slug: /
position: 1
---

# WalletConnect v2.0

## Introduction

WalletConnect is an open protocol to communicate securely between Dapps and Wallets. The protocol establishes a remote pairing between two apps and/or devices using a Relay server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers. The pairing is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this pairing request.

## Getting Started

Currently the WalletConnect protocol has references implementations written in Typescript for the Client and the Relay Server

To quickly setup for your Dapp or Wallet, go to Quick Start section for code examples.

To read in more detail about the WalletConnect protocol, go to [Technical Specification](./protocol/tech-spec.md)

Additionally you can also consult the API references for [Client](./api/client-api.md) and [Relay Server](./api/relay-server.md).

## What's New

WalletConnect v2 is a complete rewrite and has many new features and advantages. Here are some new additions:

#### Chain Agnostic

Interoperate with any blockchain. Support new blockchains and rollups out-of-the-box.

#### Multi Chain

Connect to a wallet with one or more chains simultaneously and send transactions to different chains at the same time. No more chain switching.

#### Multi Session

Manage as many sessions as needed. A flexible API is provided to build the desired UX.

#### One-time Pairing

Establishes multiple sessions from a single pairing. Only one connection for an infinite number of sessions.

#### Reduced Bandwidth

Websocket management efficiently re-uses resources to multiplex all messages through a single socket without interruption.

#### Decentralized Messaging

Message relaying now uses Waku network to gossip messages through all nodes. No more depending on centralized servers.

#### Permission System

Explicitly require wallets to meet compatibility with all signing methods that your dapp requires. 

#### Guaranteed Delivery

Smarter caching mechanisms guarantee message delivery in more diverse network conditions.

#### Platform Agnostic

Works everywhere across desktop apps, browser apps, mobile apps, gaming apps and much more. 

## Useful Links

Here are some demos that you can use to try the protocol yourself

- App: [https://react-app.walletconnect.com](https://react-app.walletconnect.com)
- Wallet: [https://react-wallet.walletconnect.com](https://react-wallet.walletconnect.com)

## Community

Share your experience, contribute or ask questions with the WalletConnect Community

- Discord: [https://discord.walletconnect.com](https://discord.walletconnect.com)
- Twitter: [https://twitter.com/walletconnect](https://twitter.com/walletconnect)
- Github: [https://github.com/walletconnect](https://github.com/walletconnect)
