# EVM

## Prerequisites

1. Check if your chain exists in this [list](https://docs.walletconnect.com/advanced/multichain/chain-list). If not create a Github Issue. This is reviewed on a weekly basis. 

## Dapps

1. Wagmi: If you are looking to use Web3Modal or use wagmi, it is easier for the desired ecosystem to be added to the chains list. Check our their documentation [here.](https://wagmi.sh/core/chains#supported-chains)  Examples of chain specs can also be found [here.](https://github.com/wevm/viem/tree/main/src/chains/definitions) 
2. Ethers: For those using ethers, there is no specific chain configuration like wagmi so you will have to set custom chains settings. 
3. Add RPC method support to the example app here by opening a Github PR [here](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2). 

## Wallets

1. Check if your chain exists in this [list](https://docs.walletconnect.com/advanced/multichain/chain-list). If not create a Github Issue. This is reviewed on a weekly basis. 
2. Add RPC method support to the example wallet here by opening a Github PR [here.](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-wallet-v2) 

### Adoption

For a chain to benefit users, its prominent wallets and dApps must be registered in the Explorer. Encourage them to integrate with either Web3Modal (dapp side) or Web3Wallet (wallet side), allowing users to view the wallets as options when connecting to a dApp.