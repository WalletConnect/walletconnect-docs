# Technical Specification

## Introduction

WalleConnect is an open-source standard for connecting desktop Dapps to mobile Wallets. The architecture consists in 4 components to allow secure communication between a desktop Dapp without requiring any hardware or software from the User yet without comprising the security of any of its components.

The 4 components of the architecture consist:

1. Desktop Dapp (Browser SDK)
2. Mobile Wallet (Mobile SDK)
3. Bridge Server / Node
4. Push Notification Webhook

The first two components integrate with the WalletConnect standard by the developers installing the respective SDK: a Browser SDK for the Dapp's front-end in and a Mobile SDK for the mobile Wallet which manages and stores the User’s private keys for their accounts.

The last two components are crucial to allow seamless User experience. The Bridge server/node can be deployed by the Dapp developer or a third party or a shared public network and it will guarantee the WalletConnect communication to be established. The Push notification webhook is an optional component to handle the WalletConnect push notifications for the mobile Wallet, supporting both FCM and APN type of notifications for both iOS and Android platforms.

In the next section we will discuss in more tehnical overview the core design of the WalletConnect standard which will go into more detail on the communications being relayed.

## Core Design

The core of the design is enable data to be realyed between a desktop Dapp and a mobile Wallet using a server as bridge without sharing its contents. This is done by displaying a QR Code containing the session data on the Dapp to be scanned by the Wallet.

The session data includes 3 parameters:

- Session ID
- Bridge Url
- Symmetric Key

Provided with the symmetric key the Dapp and the Wallet can now relay data in and end-to-end encrypted communication. From the Bridge viewpoint it is simply relaying encrypted payload between two parites. The Wallet will also be notified about Dapp requests that require User consent thus it can optionally share push notification data with the Bridge to trigger notifications on the User's device

The push notification data includes:

- Push Type
- Push Token
- Push Webhook

Given the technical overview of the core design, in the next section we will describe the detailed communcations between the Dapp and the Wallet.

## Detailed Communications

The WalletConnect standard has fundamentally 2 types of communications that are exchanged between the Dapp and the Wallet.

The 2 types of communcations are:

- Session Requests
- Call Requests

Session requests are similar to when a Dapp requests Metamask the User's accounts with the difference that instead of prompting the User to unlock Metamask, the User is prompted to scan the WalletConnect QR Code with the mobile Wallet. Analagous to the EIP 1102, the User can approve or reject the session request to expose the User's accounts from the Wallet to Dapp.

Call requests are triggered by the Dapp when the User is requested to sign a JSON-RPC call. The user is able to approve or reject these requests. If approved, the Wallet signs the JSON-RPC call and returns the result to the Dapp. Supported JSON-RPC methods include `eth_sendTransaction`, `eth_signTransaction`, `eth_sign`, `eth_signTypedData`, etc.

### Session Requests

1. Desktop Dapp requests Bridge server to generate a new session ID
2. Desktop Dapp generates a session symmetric Key
3. Desktop Dapp prompts user to scan QR Code with session data
4. Mobile Wallet scans the QR Code to get session data
5. Mobile Wallet encrypts the User’s accounts with the symmetric key
6. Mobile Wallet sends it to the Bridge server using the session ID
7. Desktop Dapp listens to session request update and gets encrypted Accounts
8. Desktop Dapp decrypts the User’s accounts with symmetric Key

### Call Requests

1. Desktop Dapp encrypts data into a call request with symmetric ey
2. Desktop Dapp sends the call request to the Bridge using the session ID
3. Bridge Server triggers push notification by the Push server
4. Mobile Wallet fetches call request data from the Bridge server
5. Mobile Wallet decrypts call request with symmetric key
6. Mobile Wallet displays call request to the User to be signed or not
7. Mobile Wallet shares the User’s response of the call request
