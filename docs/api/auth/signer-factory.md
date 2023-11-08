# Signer Factory (iOS only)

:::caution
Auth API is in the process of being greatly simplified, and will involve breaking changes. Please stand by.
:::

:::info
This only applies to Swift SDK for Auth
:::

WalletConnect Swift SDK does not depend on any third-party Web3 or crypto library. SignerFactory allows you to pass your own signer implementation.

Here's an example of SignerFactory implementation using [Web3.swift](https://github.com/WalletConnect/Web3.swift)

```swift
import Foundation
import CryptoSwift
import Web3
import Auth

public struct AuthSignerFactory: SignerFactory {

    public func createEthereumSigner() -> EthereumSigner {
        return Web3Signer()
    }
}

public struct Web3Signer: EthereumSigner {

    public func sign(message: Data, with key: Data) throws -> EthereumSignature {
        let privateKey = try EthereumPrivateKey(privateKey: [UInt8](key))
        let signature = try privateKey.sign(message: message.bytes)
        return EthereumSignature(v: UInt8(signature.v), r: signature.r, s: signature.s)
    }

    public func recoverPubKey(signature: EthereumSignature, message: Data) throws -> Data {
        let publicKey = try EthereumPublicKey(
            message: message.bytes,
            v: EthereumQuantity(quantity: BigUInt(signature.v)),
            r: EthereumQuantity(signature.r),
            s: EthereumQuantity(signature.s)
        )
        return Data(publicKey.rawPublicKey)
    }

    public func keccak256(_ data: Data) -> Data {
        let digest = SHA3(variant: .keccak256)
        let hash = digest.calculate(for: [UInt8](data))
        return Data(hash)
    }
}
```

Once AuthSignerFactory implemented it could be used to configure `Auth` client

```swift
Auth.configure(
    account: Account("eip155:1:0xe5EeF1368781911d265fDB6946613dA61915a501")!,
    signerFactory: AuthSignerFactory()
)
```
