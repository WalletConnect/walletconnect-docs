# Chain Ecosystem Onboarding

Any chain can accelerate their reach into the broader Web3 ecosystem by integrating with WalletConnect. [WalletConnect V2](https://medium.com/walletconnect/walletconnect-v2-0-protocol-whats-new-3243fa80d312) provides multi-chain compatibility, session management and JSON-RPC management) with [Auth](https://medium.com/walletconnect/introducing-walletconnect-auth-one-click-wallet-login-to-simplify-web3-ux-9cc11fd18aba) and [Sign](https://medium.com/walletconnect/walletconnect-sign-v2-0-the-final-release-is-here-864b21e8d1ca) final any chain can take advantage of WalletConnect's secure end to end messaging.
WalletConnect supports and uses the foundational industry strandard [CAIPs](https://github.com/ChainAgnostic/CAIPs), for interoperability in the Web3 ecosystem.
WalletConnect connects wallets and dapps. Wallets need to support our Core V2 Sign and Auth SDKs and dapps can use Web3Modal to connect to a wallet that suports WalletConnect.

Chains need to provide the following to support Web3Modal for dapps:
1. RPC node for accessing transaction information on the L1 or similar endpoint and provide it for [Web3Modal](https://github.com/WalletConnect/web3modal).
2. Chains need to create a standalone libray for their L1 similar to [Solib](https://github.com/WalletConnect/solib) or WAGMI. Chains will need to expose similar capabilities as represented in the [API template](https://github.com/WalletConnect/web3modal/tree/V2/chains/ethereum).

Chain ecosystem onboarding framework:
Our recommended approach in general is the following: Phase 1 Wallets Phase 2 Dapps
1. Wallets integrate [V2 (Sign SDK)](../introduction/sign.md) and [V2 (Auth SDK)](../introduction/auth.md) utilizing our Javascript, Kotlin, or Swift SDKs. This will ensure the ecosystem of dApps have wallets to connect to. 
2. Dapps can integrate either [Web3Modal](../introduction/web3modal.md) (Open source web3 solution) or any other library of choice. We are focused on enhancing Web3Modal so developers can be sure that we have dedicated resources focused on issues.
