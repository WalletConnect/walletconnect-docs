Wallet Connect is a simple solution that bridges communication between browser-based Dapps and mobile wallets using a QR code to establish the initial connection. It is an open protocol and does not require a Dapp user to install a browser extension. The protocol is agnostic to specific mobile wallets a user may want to use and enables Dapp developers to integrate with multiple wallets through a single implementation.

---

#### Goals

* enable users to use their mobile wallets with Dapps without having to install a browser extension
* enable users to use the wallet of their choice without worrying about which Dapps have integrated with which wallets
* simplify wallet integration for Dapp developers instead of requiring them to integrate each wallet individually
* provide flexibility to Dapp developers about which Wallet Connect bridge servers they want to use to communicate with mobile wallets
* provide control to the mobile wallet developers on how push notifications are sent to their users

---

#### Components

Bridge server
... Ephemeral session management server to facilitate the passing of information between a Dapp and a mobile wallet. A Dapp can choose which bridge server to use.
Wallet push server
... Manages push notifications to a mobile wallet. This server is maintained by the wallet if they choose to provide push notification functionality to their users. Wallets can implement their own rate-limiting logic.

---

#### Data being transferred between a Dapp and a mobile wallet:

* Public wallet address(es) from mobile wallet to Dapp
* Unsigned transaction details from Dapp to mobile wallet
* Transaction hash from mobile wallet to Dapp

---

#### More Documentation

Read more specific details on the data flows:

[Accounts Flow](./accounts.md)

[Transactions Flow](./transactions.md)
