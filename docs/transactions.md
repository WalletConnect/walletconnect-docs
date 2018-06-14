![Transaction Diagram](./images/walletconnect-transaction-diagram.png)

1.  Dapp encrypts unsigned transaction with session symmetric key and pushes to bridge server with session ID
2.  Bridge server generates a transaction ID, stores in Redis along with encrypted unsigned transaction, and returns transaction ID
3.  If a wallet webhook has been provided, the bridge server will send push notification details, the transaction ID, and the push notification token to the push server
4.  Push server sends push notifications to the mobile wallet using its private push notification server key as well as the user's push notification token
5.  Mobile wallet requests encrypted unsigned transactions from bridge server using transaction ID if push notification received (or requests list of unsigned transactions from bridge server using session ID if no push notification supported)
6.  Bridge server returns encrypted transaction details
7.  Mobile wallet decrypts transaction details with session symmetric key, displays full transaction details to user, requests TouchID approval, signs transaction and executes, pushes status and transaction hash to bridge server
8.  Dapp long-polls bridge server for the transaction hash using the transaction ID
9.  Dapp receives status and transaction hash
