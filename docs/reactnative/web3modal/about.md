import Container from '../../components/Container';


# Introduction

:::caution
**`@web3modal/react-native` is currently in Alpha and is not production-ready**.

It's public API and associated documentation may still see significant and breaking changes.
:::

`@web3modal/react-native` simplifies the modal integration process for dapp developers. It is designed to make complex tasks like connecting wallets, performing transactions and managing accounts easy. Please note that only V2 [WCURIs](../../specs/clients/core/pairing/pairing-uri) will work with this SDK, as V1 is being deprecated by June 28th, 2023.

If you need assistance at any point during development, please feel free to reach out to us via [GitHub Discussions](https://github.com/orgs/WalletConnect/discussions/categories/web3modal-sdk-support?discussions_q=is%3Aopen+category%3Aweb3modal-sdk-support).

## Current features
- Connect with a wallet through deep linking
- Connect with a wallet using a QR Code
- Automatic session recovery/restore
- Use our provider to interact with chains
- Expo support

## Upcoming features
- Account View with balance
- Chain selection
- Use own storage manager
- [explorerRecommendedWalletIds](https://docs.walletconnect.com/2.0/web3modal/options#explorerrecommendedwalletids-optional)
- [explorerExcludedWalletIds](https://docs.walletconnect.com/2.0/web3modal/options#explorerexcludedwalletids-optional)
- UI improvements

## Sample App
To check more in details go and visit our Web3Modal implementation app [here](https://github.com/WalletConnect/react-native-examples/tree/main/dapps/v2Explorer).

<video controls width="448" height="448">
  <source src="/assets/web3modal_reactnative_preview.mp4" type="video/mp4" />
</video>

## Roadmap

### Phase 1: MVP Development (Q2 - Q3)
- [x] Feature Implementation: Begin implementing core features, focusing on the most critical functionality first.
- [ ] Continuous Testing and Bug Fixes: Conduct thorough testing throughout the development process, identify and fix any issues or bugs to ensure a stable and reliable product.
- [x] Documentation: Prepare comprehensive documentation to assist users in understanding and effectively utilizing the product.
- [ ] Performance Optimization: Optimize the product's performance by fine-tuning code, and addressing any bottlenecks.

### Phase 2: Alpha Testing and Feedback (Q3)
- [ ] Internal Testing: Conduct extensive testing of the product within the development team to identify any remaining issues or areas for improvement.
- [ ] Alpha Testing: Release a limited version of the product to a select group of external users for real-world testing and feedback.
- [ ] User Feedback and Iteration: Gather feedback from alpha users and iterate on the product based on their suggestions and observations, prioritizing critical improvements.
- [ ] Bug Fixes and Stability Enhancements: Address reported issues, fix bugs, and enhance the stability of the product based on alpha testing feedback.

### Phase 3: Release and Post-Launch (Q3)
- [ ] Final Testing: Conduct comprehensive testing of the product to ensure all reported issues have been resolved and the product is ready for a stable release.
- [ ] Product Launch: Release the stable version of the product to the market, making it available for purchase or use by customers.
- [ ] Customer Support and Feedback: Provide ongoing customer support, promptly address any post-launch issues or concerns, and collect feedback to inform future updates and enhancements.

By following this roadmap, we aim to have a stable version of the product ready for release in Q3. However, please note that timelines and specific milestones may be subject to adjustment based on various factors, such as unexpected challenges, customer feedback, or changes in priorities.
