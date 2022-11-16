# Chain Ecosystem Onboarding

Any chain can accelerate their reach into the broader Web3 ecosystem by integrating with WalletConnect. [WalletConnect v2](https://medium.com/walletconnect/walletconnect-v2-0-protocol-whats-new-3243fa80d312) provides multi-chain compatibility, session management and JSON-RPC management. Any chain can take advantage of WalletConnect's secure end-to-end encrypted messaging with [Auth](https://medium.com/walletconnect/introducing-walletconnect-auth-one-click-wallet-login-to-simplify-web3-ux-9cc11fd18aba) and [Sign](https://medium.com/walletconnect/walletconnect-sign-v2-0-the-final-release-is-here-864b21e8d1ca). 
WalletConnect supports and uses the foundational industry standard [CAIPs](https://github.com/ChainAgnostic/CAIPs), for interoperability in the Web3 ecosystem.


In order for dapps to use Web3Modal to connect to wallets, wallets must support our Core v2, Sign and Auth SDK's.

Chains need to provide the following to support Web3Modal for dapps:
1. RPC node for accessing transaction information on the L1 or similar endpoint and provide it for [Web3Modal](https://github.com/WalletConnect/web3modal).
2. Chains need to create a standalone libray for their L1 similar to [Solib](https://github.com/WalletConnect/solib) or WAGMI. Chains will need to expose similar capabilities as represented in the [API template](https://github.com/WalletConnect/web3modal/tree/V2/chains/ethereum).

## Onboarding Framework
Our recommended approach is the following: 

- Phase 1 Wallets
- Phase 2 Dapps
1. Wallets integrate [Sign v2](../introduction/sign.md) and [Auth v2](../introduction/auth.md) utilizing our Javascript, Kotlin, or Swift SDKs. This will ensure the ecosystem of dapps have wallets to connect to.
2. Dapps can integrate either [Web3Modal](../introduction/web3modal.md) (open source web3 solution) or any other library of choice. We are focused on enhancing Web3Modal so developers can be sure that we have dedicated resources focused on issues.
