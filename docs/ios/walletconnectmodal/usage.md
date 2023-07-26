# Usage

## Configure Networking and Pair clients

Make sure that you properly configure Networking and Pair Clients first.
- [Networking](../core/networking-configuration.md)


## Initialize WalletConnectModal Client

In order to initialize a client just call a `configure` method from the Web3Wallet instance wrapper

```swift
let metadata = AppMetadata(
    name: "Example Wallet",
    description: "Wallet description",
    url: "example.wallet",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
    // Used for the Verify: to opt-out verification ingore this parameter
    verifyUrl: "verify.walletconnect.com"
)
        
WalletConnectModal.configure(
    projectId: PROJECT_ID,
    metadata: metadata
)
```

This example will default to using following namespaces. 

```swift
let methods: Set<String> = ["eth_sendTransaction", "personal_sign", "eth_signTypedData"]
let events: Set<String> = ["chainChanged", "accountsChanged"]
let blockchains: Set<Blockchain> = [Blockchain("eip155:1")!]
let namespaces: [String: ProposalNamespace] = [
    "eip155": ProposalNamespace(
        chains: blockchains,
        methods: methods,
        events: events
    )
]

let defaultSessionParams =  SessionParams(
                                requiredNamespaces: namespaces,
                                optionalNamespaces: nil,
                                sessionProperties: nil
                            )
```

If you want to change that you can call configure and define your own session parameters like this.

```swift
let metadata = AppMetadata(...)

let sessionParams = SessionParams(...)
        
WalletConnectModal.configure(
    projectId: PROJECT_ID,
    metadata: metadata,
    sessionParams: sessionParams
)
```

or you can change them later by calling `WalletConnectModal.set(sessionParams: SessionParams(...))`
 

## WalletConnectModal Usage

To actually present the modal you can simply call.

```swift
WalletConnectModal.present()
```

It will traverse the view hierarchy and try to present from top most controller. This is meant more towards SwiftUI.

Otherwise you can specify the viewController to present from.

```swift
WalletConnectModal.present(from: viewController)
```

## Subscribe for WalletConnectModal Publishers

The following publishers are available to subscribe:

```swift
public var sessionPublisher: AnyPublisher<[Session], Never>
public var sessionSettlePublisher: AnyPublisher<Session, Never>
public var sessionRejectionPublisher: AnyPublisher<(Session.Proposal, Reason), Never>
public var sessionDeletePublisher: AnyPublisher<(String, Reason), Never>
public var sessionResponsePublisher: AnyPublisher<Response, Never>
public var socketConnectionStatusPublisher: AnyPublisher<SocketConnectionStatus, Never>
```

## Sign methods

WalletConnectModal is internally using Sign SDK and most of its method are being exposed through WalletConnectModal interface.


## Where to go from here
Check the WalletConnectModal usage in our Example Showcase app that is part of WalletConnectSwiftV2 repository.
Build API documentation in Xcode by going to `Product -> Build Documentation`