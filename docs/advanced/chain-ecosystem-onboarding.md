# Chain Ecosystem Onboarding

Our general approach for new chain onboarding is as follows. A couple of pre-reads for the engineering/product team:
1. [CAIPs](https://github.com/ChainAgnostic/CAIPs) - this is a foundational industry standard we're promoting for interoperability in the Web3 ecosystem.
2. For an ecosystem approach dApps will need a library to easily use WalletConnect, we're working on updating Web3Modal with enhance UI, interoperability and overall experience.
Chain ecosystem onboarding framework:
WalletConnect V2 [enhancements](https://medium.com/walletconnect/walletconnect-v2-0-protocol-whats-new-3243fa80d312) primer (multi-chain compatibility, session management and JSON-RPC management)
Our recommended approach in general is the following: Phase 1 Wallets Phase 2 Dapps
1. Wallets integrate [V2 (Sign SDK)](../introduction/sign.md) utilizing our Javascript, Kotlin, or Swift SDKs (dependent on wallet offering mobile vs desktop). This will ensure the ecosystem of dApps have wallets to connect to. I also want to reiterate [CAIPs](https://github.com/ChainAgnostic/CAIPs) which is the underlying open standard for multi chain interoperability.
2. dApps can wait until there's a critical mass of wallets and then integrate either [Web3Modal](../introduction/web3modal.md) (Open source web3 solution) or any other library of choice. We are focused on enhancing Web3Modal so developers can be sure that we have dedicated resources focused on issues.
a. An example in the Solana ecosystem is the [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter) which utilizes WalletConnect within the library.
b. We plan on launching an updated version of Web3Modal V2 (W3MV2) by 9/15 and we are on target and may even have more functionality at launch than expected.