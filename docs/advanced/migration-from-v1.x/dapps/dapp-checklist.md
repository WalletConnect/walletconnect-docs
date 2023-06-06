# Integration Checklist

To ensure a smooth integration process, we strongly recommend doing internal testing of the WalletConnect experience.

## Example Dapp

Our primary example of a WalletConnect V2 dapp is linked [here.](https://react-app.walletconnect.com/) This uses Web3Modal V2 + wagmi and supports the following methods:

- `eth_sendTransaction`
- `eth_signTransaction`
- `personal_sign`
- `eth_sign (standard)`
- `eth_signTypedData`
- `connect`
- `disconnect`

The source code for this V2 dapp is [here.](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2)

## Testing

Please test your dapp integration with various wallets to ensure that you have the correct implementation so it follows a similar flow to our aftermentioned example dapp.

1. Web3Wallet ([Link](https://react-web3wallet.vercel.app/))
2. Alpha Wallet ([iOS](https://apps.apple.com/us/app/alphawallet-ethereum-binance/id1358230430)) ([Android](https://play.google.com/store/apps/details?id=io.stormbird.wallet&hl=en&gl=US))
3. Trust ([iOS](https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en&gl=US)) ([Android](https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en&gl=US))
4. Zerion ([iOS](https://apps.apple.com/us/app/zerion-wallet-crypto-web3/id1456732565)) ([Android](https://play.google.com/store/apps/details?id=io.zerion.android&hl=en&gl=US))

### Testing process

We highly recommend testing with _ALL_ of the above wallets.

The following steps to follow would be:

- Have your dapp deployment open + show the QR Code
- Scan with the respective wallet
- Approve the methods
- Test with the methods that your dapp uses (i.e. `eth_sendTransaction` etc)
- Succesful Connect - Disconnect

We have created a sample QA Testing Rubric Guide [here.](https://docs.google.com/spreadsheets/d/12Hqu3yjcqnjSuE2MyHsvFhPfoMkY3DH9MdLaIb2woxw/edit?usp=sharing)

Below are screenshots of testing our Web3Wallet wallet against our dapp.

![session-request-example](/assets/Web3Wallet.png)

Scanning from the wallet side:

![session-request-example](/assets/SessionRequestExample.png)

Preview of what eth methods your dapp may use:

Once you are confident with the QA process, please check out the [Explorer Submission process](../explorer-submission.md).
