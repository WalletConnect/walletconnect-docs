# UX Considerations

In this document, we are going to describe the desired user experience (UX) for WalletConnect 2.0 protocol according the available client API methos and other best practices for both dapps and wallets.

## Single Client

The first consideration is quite a technical one but it will affect the UX. The WalletConnect 2.0 client is expected to behave as singleton. The only scenario where an application may need to instantiate a second client is to act as hybrid app (or proxy signer) which controls two clients where one client is controller and the other is non-controller.

Most importantly all state for displaying information to the user should be available to the application from a single client for both dapps and wallets. You can track active pairings, active sessions, requests made and responses sent. An application whether its a dapp or a wallet can set all listeners to the same client and identify all events through the topics.

## Topic Identifiers

Topics are always unique, regardless if it's a pairing or a session and if it's proposed or active. Because topics are always unique you can track any event regarding updates, ugprades, requests, responses or disconnects to always the correct pairing or session.

## Prioritize Sessions

Sessions are the most important concept in WalletConnect 2.0. Pairings are exclusively used for proposing sessions and they should not be displayed to users. Sessions on the other hand are important to the user.

From a dapp perspective, you should identify to the wallet the name of the Wallet that is connect, which chains is connected with and expose options to select the account to act for signing, additionally it should always be able to disconnect from the dapp.

From a wallet perspectice, you should list all active sessions in the client to the user and the user should be able to expand the session view to inspect which accounts and chains are exposed, additionally it should always be able to disconnect from the wallet.

## Chain Switching

Chain switching is a pattern common in dapps (especially on Ethereum) which require the user to switch chains from the wallet to reflect it on the dapp. This should be avoided completely using WalletConnect 2.0.

Dapps should request upfront as many chains as possible from the wallet to expose in order to allow the user to control which chain and/or account is using directly from the dapp.

Wallets should try to meet compatibility with their user's most popular chains to prevent chain switching. Therefore allowing the dapp to build a better UX that can be controlled from the dapp.

## Chain Targetting

All signing requets should be targetted to a specific chain. While the protocol does not enforce dapps to target the chain they intend to request a message or transaction to be signed. You should always aim to include this information for the users to make a rational decision.

Wallets should use the target chain identifier to accompany signing requests with a name or logo to identify which chain is the dapp requesting the user to sign for.

## Chain Decoupling

This more relevant for Wallets where some multi-chain wallets have the concept of an "active" chain on their interface. This should be completely decoupled from the session permissions on WalletConnect 2.0. A user should be able to expose and sign methods targetted at a chain that is different than the active one in the wallet.

## Account Decoupling

This more relevant for Wallets where some multi-account wallets have the concept of an "active" account on their interface. This should be completely decoupled from the session state on WalletConnect 2.0. A user should be able to expose and sign methods targetted at an account that is different than the active one in the wallet.

## JSON-RPC Permissions

Probably the hardest concept to grasp for most developers is the idea that each signing methods has its own JSON-RPC method and that compatibility must be met for a dapp and a wallet to successfully connect.

A dapp should request permissions strictly for the signing JSON-RPC methods that it needs. It should not attempt to request more than is strictly necessary. This why we can guarantee greater compatibility without blocking the user with errors during the session.

A wallet should only accept sessions proposals that include JSON-RPC methods that it knows. It should not attempt to accept methods that are unknown to avoid the user faces errors during the session for incompatible methods.

When incompatibility happens the wallet will throw an error with a corresponding code that will list the methods that are mismatched. A dapp can still request a new session from the wallet using the remaining set of methods that fit compatibility if the dapp has fallback logic to operate without them.
