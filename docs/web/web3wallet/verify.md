# Verify

Verify API allows dapps on all platforms (web, Android and iOS) to securely validate if the end-user is interacting with the correct domain, via their Wallet and the Web3Wallet SDK.

Once the wallet knows whether the end-user was on uniswap.com or eviluniswap.com they can cross-reference this with our registry.

These simple solutions make phishing attacks significantly harder and hence make a more anxiety free crypto experience for end-users.

---

```typescript
export function getVerifyStatus(context?: Verify.Context) {
  if (!context) return ''
  switch (context.verified.validation) {
    case 'VALID':
      return '✅'
    case 'INVALID':
      return '❌'
    case 'UNKNOWN':
      return '❓'
    default:
      return ''
  }
}
```

Then in your JS/TS file, add in the function with your authorization requests

```javascript
// authentcation.js
import { getVerifyStatus } from '../utils/verify'
...
web3wallet.on("auth_request", async (authRequest) => {
  const { id, params, verifyContext } = authRequest
  const validation = getVerifyStatus(verifyContext)
  // 1. prompt the user to approve the auth request
  ...
    <p> {verifyContext.verified.origin} {validation} </p>
  ...
  // 2. respond to the auth request
  await web3wallet.respondAuthRequest(...)
})
```
