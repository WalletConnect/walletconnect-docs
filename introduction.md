# Introduction

WalleConnect is an open-source standard for connecting desktop Dapps to mobile Wallets. This system consists in 4 parts to allow interaction between a desktop app or web app without installing any browser extensions or requiring any hardware without comprising the security of any of its parts.

The 4 parts of the design consist:

1. Desktop Dapp
2. Mobile Wallet
3. Bridge Server
4. Push Server

The first two are self-explanatory, they consist on a desktop app or web app that serves as front-end for a Dapp and a mobile app that serves as a wallet by managing and storing the user’s private keys to their account\(s\).

The last two are crucial to this design and can be setup by anyone without any commitment to a single Dapp or Wallet. However it’s more logical for the Bridge server to be setup by Dapp development team and the Push server to be setup by the Wallet development team.

The Bridge server has the sole purpose to relay data between the Dapp and the Wallet by storing it momentarily under a session ID without ever knowing the contents of the relayed data.

The Push server has the sole purpose of triggering push notifications of the mobile Wallet device without sharing the secret required by the push notification service for either Android or iOS platforms.

In the next section we will discuss in more detail the core design of this standard, which will clarify how these parts communicate with each other.

## Core Design

The core of the design is to relay data between a desktop Dapp and a mobile Wallet using a server as bridge without sharing its contents. This is achieved by displaying a QR code containing session data on the Dapp that can be scanned by the Wallet.

This session data has 3 parameters:

* Session ID
* Bridge URL
* Symmetric Key

Given these the Dapp and the Wallet can now communicate without the Bridge knowing the contents of the data relayed. However the Wallet will also need to be notified about Dapp interactions that require user permission, hence it will need to share with the Bridge the required information to trigger these push notifications by the Push server.

The information required for push notifications is:

* Device ID
* FCM token
* Push Endpoint

Let’s walkthrough the most common interactions between a Dapp and a Wallet to demonstrate how this design would work.

## WalletConnect Interactions

When using a Dapp there is fundamentally 3 interactions that require the user’s Wallet. These are getting accounts, sending transactions and signing messages. The last two are essentially the same where the Dapp provides some data to be signed by the user on the Wallet and returning a signed transaction id or signed message, respectively. Thus we can reduce it as a single interaction in the form of signing request. However we need an initial interaction to create communication between the Dapp and the Wallet.

So we are left with 3 interactions with WalletConnect

1. Session Creation
2. Getting Accounts
3. Signing Requests

### Session Creation

In order to create a session, a Dapp must know beforehand the Bridge URL, which you setup your own by following the [Setting up a Bridge server](introduction.md) tutorial. Now that you have a Bridge URL, the session creation works as follow:

1. Desktop Dapp requests Bridge server to create a session ID
2. Desktop Dapp generates a ephemeral symmetric Key
3. Desktop Dapp shares session data using a QR code
4. Mobile Wallet scans the QR code to obtain session data

### Getting Accounts

At this point, the Desktop Dapp and Mobile Wallet now have both the session data necessary to communicate with each other. Thus we can proceed with the first fundamental interaction, Getting Accounts:

1. Mobile Wallet encrypts the user’s accounts with the symmetric key
2. Mobile Wallet sends it to the Bridge server using the session ID
3. Desktop Dapp listens to this change and fetches encrypted Accounts
4. Desktop Dapp decrypts the user’s accounts with symmetric Key

### Signing Requests

The Dapp can now display information to the user based on their accounts. Eventually when required the Dapp will ask the user to sign a transaction or a message, which brings us to the second interaction: Signing Requests:

1. Desktop Dapp encrypts data into a signing request with symmetric ey
2. Desktop Dapp sends the signing request to the Bridge using the session ID
3. Bridge server triggers push notification by the Push server
4. Mobile Wallet fetches signing request data from the Bridge server
5. Mobile Wallet decrypts signing request with symmetric key
6. Mobile Wallet displays signing request to the User to be signed or not
7. Mobile Wallet shares the user’s response of the signing request, which is either approved \(with transaction id or signed messaged\) or rejected

## Best Practices

Some best practices for presenting and handling WalletConnect Interactions are:

* Display a button for the user to choose type of Wallet whishes to use to connect to your Dapp
* Provide a QR code instantly to allow a seamless session creation
* Have an advanced menu or setting available to select a different bridge
* Display on the Wallet, information about the session including Dapp details, bride URL and accounts being symmetric
* Notify the user when the accounts were succesfully symmetric on both ends
* Prompt the user to check their mobile for a signing request
* Incentivise verifying critical parameters of the signing request
* Emphasise when the signing request involves an ether transaction or any transfer of assets

