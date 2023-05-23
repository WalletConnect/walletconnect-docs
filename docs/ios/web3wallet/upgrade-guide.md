import IframeComponent from '../../components/IframeComponent';

# Upgrade Guide

If you are a developer currently using Sign v2 or Auth and want to update to the Web3Wallet SDK, it's a straightforward process. Here are the updated functions along with their corresponding Sign v2 functions for reference.

### Instantiate client

#### Before
```swift
let metadata = AppMetadata(name: String?,
    description: String?,
    url: String?,
    icons: [String]?
)
Pair.configure(metadata: Metadata)
Auth.configure(signerFactory: SignerFactory)
Networking.configure(projectId: InputConfig.projectId, socketFactory: SocketFactory())
```

#### Now

You need to configure only `Web3Wallet` instance and `Networking`

```swift
let metadata = AppMetadata(name: String?,
    description: String?,
    url: String?,
    icons: [String]?
)
Networking.configure(projectId: InputConfig.projectId, socketFactory: SocketFactory())
Web3Wallet.configure(metadata: metadata, signerFactory: DefaultSignerFactory())
```

### Properties and functions wrappers

#### Before
```swift
    SignClient.sessionProposalPublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.sessionProposalPublisher.sink { ... }
```
---
#### Before
```swift
    SignClient.sessionRequestPublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.sessionRequestPublisher.sink { ... }
```
---
#### Before
```swift
    AuthClient.authRequestPublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.authRequestPublisher.sink { ... }
```
---
#### Before
```swift
    SignClient.sessionsPublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.sessionsPublisher.sink { ... }
```
---
#### Before
```swift
    SignClient.socketConnectionStatusPublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.socketConnectionStatusPublisher.sink { ... }
```
---
#### Before
```swift
    SignClient.sessionSettlePublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.sessionSettlePublisher.sink { ... }
```
---
#### Before
```swift
    SignClient.sessionDeletePublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.sessionDeletePublisher.sink { ... }
```
---
#### Before
```swift
    SignClient.sessionResponsePublisher.sink { ... }
```
#### Now
```swift
    Web3WalletClient.sessionResponsePublisher.sink { ... }
```
---
#### Before
```swift
    await SignClient.approve(proposalId: proposalId, namespaces: namespaces)
```
#### Now
```swift
    await Web3WalletClient.approve(proposalId: proposalId, namespaces: namespaces)
```
---
#### Before
```swift
    await SignClient.reject(proposalId: proposalId, reason: reason) // For the wallet to reject a session proposal.
```
#### Now
```swift
    await Web3WalletClient.reject(proposalId: proposalId, reason: reason) // For the wallet to reject a session proposal.
```
---
#### Before
```swift
    await AuthClient.reject(requestId: requestId) // For wallet to reject authentication request
```
#### Now
```swift
    await Web3WalletClient.reject(requestId: requestId) // For wallet to reject authentication request
```
---
#### Before
```swift
    await SignClient.update(topic: topic, namespaces: namespaces)
```
#### Now
```swift
    await Web3WalletClient.update(topic: topic, namespaces: namespaces)
```
---
#### Before
```swift
    await SignClient.extend(topic: topic)
```
#### Now
```swift
    await Web3WalletClient.extend(topic: topic)
```
---
#### Before
```swift
    await SignClient.respond(topic: topic, requestId: requestId, response: response)
```
#### Now
```swift
    await Web3WalletClient.respond(topic: topic, requestId: requestId, response: response)
```
---
#### Before
```swift
    await SignClient.emit(topic: topic, event: event, chainId: chainId)
```
#### Now
```swift
    await Web3WalletClient.emit(topic: topic, event: event, chainId: chainId)
```
---
#### Before
```swift
    await PairingClient.pair(uri: uri)
```
#### Now
```swift
    await Web3WalletClient.pair(uri: uri)
```
---
#### Before
```swift
    await SignClient.disconnect(topic: topic)
```
#### Now
```swift
    await Web3WalletClient.disconnect(topic: topic)
```
---
#### Before
```swift
    SignClient.getSessions()
```
#### Now
```swift
    Web3WalletClient.getSessions()
```
---
#### Before
```swift
    AuthClient.formatMessage(payload: payload, address: address)
```
#### Now
```swift
    Web3WalletClient.formatMessage(payload: payload, address: address)
```
---
#### Before
```swift
    await AuthClient.respond(requestId: requestId, signature: signature, from: account)
```
#### Now
```swift
    await Web3WalletClient.respond(requestId: requestId, signature: signature, from: account)
```
---
#### Before
```swift
    SignClient.getPendingRequests(topic: topic)
```
#### Now
```swift
    Web3WalletClient.getPendingRequests(topic: topic)
```
---
#### Before
```swift
    SignClient.getSessionRequestRecord(id: id)
```
#### Now
```swift
    Web3WalletClient.getSessionRequestRecord(id: id)
```
---
#### Before
```swift
    AuthClient.getPendingRequests(account: account)
```
#### Now
```swift
    Web3WalletClient.getPendingRequests(account: account)
```
---
#### Before
```swift
    await SignClient.cleanup()
```
#### Now
```swift
    await Web3WalletClient.cleanup()
```
---
#### Before
```swift
    PairingClient.getPairings()
```
#### Now
```swift
    Web3WalletClient.getPairings()
```

<IframeComponent />
