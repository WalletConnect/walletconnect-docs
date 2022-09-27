# Sign

:::caution

Currently the [v1 Push](/push-server) is in available in v2, over the coming week this is going to be deprecated in favor of the new [Echo Server spec](https://github.com/WalletConnect/echo-server/blob/main/spec/spec.md)

:::

## Introduction

WalletConnect Sign is a remote signer protocol to communicate securely between web3 wallets and dapps. The protocol establishes a remote pairing between two apps and/or devices using a Relay server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers. The pairing is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this pairing request.

## Getting Started

There are getting started guides for the following clients platforms:

- [Web - Javascript](../javascript/sign/installation.md)
- [iOS - Swift](../swift/sign/installation.md)
- [Android - Kotlin](../kotlin/sign/installation.md)

## Examples and Resources

We have a set of [official examples](examples-and-resources.md) in various flavors of javascript, swift, and kotlin.
