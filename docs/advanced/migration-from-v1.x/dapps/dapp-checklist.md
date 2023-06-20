# Integration Checklist

To ensure a smooth integration process, we strongly recommend conducting internal testing of the WalletConnect v2.0 experience to ensure seamless UX.

## Example Dapp

Our primary example of a WalletConnect v2.0 dapp is linked [here](https://react-app.walletconnect.com/). This uses Web3Modal v2.0 + wagmi and supports the following methods:

- `eth_sendTransaction
- `eth_signTransaction`
- `personal_sign`
- `eth_sign (standard)`
- `eth_signTypedData`
- `connect`
- `disconnect`

The source code for this WalletConnect v2.0 dapp is [here](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2).

## Required and Optional Namespaces and Methods

With V2, we allow for multichain and various methods to be passed through the dapp and wallet client. If you are looking to add additional chains or methods to your data, please refer to these respective dapps on the ethereum provider:

[Required and Optional Chains](../../../web/providers/ethereum#required-and-optional-chains)
[Required and Optional Methods](../../../web/providers/ethereum#required-and-optional-methods)

## Testing

Please test your dapp's WalletConnect v2.0 integration with as wide a range of wallets as possible to ensure a correct implementation that follows a similar flow to our aforementioned example dapp. Wallets that you can test with include:

1. Web3Wallet example wallet ([Link](https://react-web3wallet.vercel.app/))
2. Alpha Wallet ([iOS](https://apps.apple.com/us/app/alphawallet-ethereum-binance/id1358230430)) ([Android](https://play.google.com/store/apps/details?id=io.stormbird.wallet&hl=en&gl=US))
3. Trust ([iOS](https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409)) ([Android](https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en&gl=US))
4. Zerion ([iOS](https://apps.apple.com/us/app/zerion-wallet-crypto-web3/id1456732565)) ([Android](https://play.google.com/store/apps/details?id=io.zerion.android&hl=en&gl=US))

### Testing Process

We highly recommend testing with _ALL_ of the above wallets.

Please follow these steps:

- Have your dapp deployment open + show the QR code
- Scan with the respective wallet
- Approve the methods
- Test with the methods that your dapp uses (i.e. `eth_sendTransaction`)
- Succesful connect - disconnect experience

### Testing Resources

We have created a sample QA Testing Rubric Guide [here](https://docs.google.com/spreadsheets/d/12Hqu3yjcqnjSuE2MyHsvFhPfoMkY3DH9MdLaIb2woxw/edit?usp=sharing).

We also have a list of example wallets and dapps on the [Awesome WalletConnect](https://github.com/WalletConnect/awesome-walletconnect) page. You can use the resources here to test your WalletConnect v2.0 integration!

Below are screenshots that show testing our [Web3Wallet SDK example wallet](https://react-wallet.walletconnect.com/) against our [WalletConnect v2.0 example dapp](https://react-app.walletconnect.com/).

![session-request-example](/assets/Web3Wallet.png)

The above shows scanning the example dapp from the example wallet.

![session-request-example](/assets/SessionRequestExample.png)

The above shows a preview of the eth methods your dapp may use.

## Done with Your Integration?

Once you feel confident with the QA process, please check out the [explorer submission process](../explorer-submission.md) to add your dapp to the [WalletConnect Explorer](https://walletconnect.com/explorer).
