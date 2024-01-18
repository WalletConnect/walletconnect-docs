# Shared Core Instance

:::note
The following content are only available for JavaScript.
:::

WalletConnect's SDKs are designed to share common logic and resources via the `@walletconnect/core` package.

**If you intend to leverage multiple SDKs together (e.g. Sign + Auth), it is highly recommended to instantiate
a single `Core` instance and pass it to the relevant SDKs.** This avoids each SDK creating its own `Core` instance,
and thus duplicating computation, memory allocation, event listeners etc.

In the following example, we first instantiate a `Core` instance, and then proceed to instantiate both the Sign
and Auth SDK with this shared `Core`:

```ts
import { Core } from '@walletconnect/core'
import SignClient from '@walletconnect/sign-client'
import { AuthClient } from '@walletconnect/auth-client'

// First instantiate a separate `Core` instance.
const core = new Core({
  projectId: '<YOUR_PROJECT_ID>'
})

const metadata = {
  name: 'Example Dapp',
  description: 'Example Dapp',
  url: '#',
  icons: ['https://walletconnect.com/walletconnect-logo.png']
}

// Pass `core` to the SignClient on init.
const signClient = await SignClient.init({ core, metadata })

// Pass `core` to the AuthClient on init.
const authClient = await AuthClient.init({ core, metadata })
```
