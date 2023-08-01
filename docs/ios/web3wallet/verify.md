# Verify

Verify API allows dapps on all platforms (web, Android and iOS) to securely validate if the end-user is on the correct domain, via their Wallet and the Web3Wallet SDK.

Once the wallet knows whether the end-user was on uniswap.com or eviluniswap.com they can cross-reference this with our registry.

These simple solutions make phishing attacks significantly harder and hence make a more anxiety free crypto experience for end-users.

---

`VerifyContext` provides a domain verification information about `Session.Proposal` and `Request`. It consists of origin of a Dapp from where the request has been sent, validation enum that says whether origin is **unknown**, **valid** or **invalid** and verify URL server.

To enable or disable verification find the **Verify SDK** toggle in your project [cloud](https://cloud.walletconnect.com).

```swift
public struct VerifyContext: Equatable, Hashable {
   public enum ValidationStatus {
       case unknown
       case valid
       case invalid
   }

   public let origin: String?
   public let validation: ValidationStatus
   public let verifyUrl: String
}
```
