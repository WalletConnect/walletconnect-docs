# Verify

Verify API allows dapps on all platforms (web, Android and iOS) to securely validate if the end-user is on the correct domain, via their Wallet and the Web3Wallet SDK.

Once the wallet knows whether the end-user was on uniswap.com or eviluniswap.com they can cross-reference this with our registry.

These simple solutions make phishing attacks significantly harder and hence make a more anxiety free crypto experience for end-users.

---

Wallet.Event.VerifyContext provides a domain verification information about SessionProposal, SessionRequest and AuthRequest.

It consists of origin of a Dapp from where the request has been sent, validation Enum that says whether origin is VALID, INVALID or UNKNOWN and verify url server.

```kotlin
data class VerifyContext(
    val id: Long,
    val origin: String,
    val validation: Model.Validation,
    val verifyUrl: String
)

enum class Validation {
    VALID, INVALID, UNKNOWN
}
```
