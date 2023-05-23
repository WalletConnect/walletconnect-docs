import IframeComponent from '../../components/IframeComponent';

---
description: Quick Start For Dapps using Auth Client
---

# Dapp Usage

:::info
For an example implementation, please refer to our [`react-dapp-auth` example](https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-auth).
:::

**1. Initialize your WalletConnect AuthClient, using [your Project ID](../../cloud/relay.md).**

```javascript
import AuthClient from '@walletconnect/auth-client'

const authClient = await AuthClient.init({
  projectId: '<YOUR_PROJECT_ID>',
  metadata: {
    name: 'my-auth-dapp',
    description: 'A dapp using WalletConnect AuthClient',
    url: 'my-auth-dapp.com',
    icons: ['https://my-auth-dapp.com/icons/logo.png']
  }
})
```

**2. Subscribe to `auth_response`.**

:::info
To listen to pairing-related events, please follow the guidance for [Pairing API event listeners](../core/pairing-api.md).
:::

```javascript
authClient.on('auth_response', ({ params }) => {
  if (Boolean(params.result?.s)) {
    // Response contained a valid signature -> user is authenticated.
  } else {
    // Handle error or invalid signature case
    console.error(params.message)
  }
})
```

You can derive the users' wallet address by destructing and splitting `params.result.p.iss`.

```javascript
const { iss } = params.result.p.iss
const walletAddress = iss.split(':')[4]
console.log(walletAddress)
// "0x977aeFEC1879160eC9560cd16f08e12B6DF52ed1"
```

For the full log of the `params` object:

```
{
    id: 1674070525664600,
    jsonrpc: "2.0",
    result: {
        h: {
            t: "eip4361"
        },
        p: {
            aud: "http://localhost:3000/",
            domain: "localhost",
            version: "1",
            nonce: "dl9Xu8ICZZ0dj4VUS",
            ia": "2023-01-18T19:35:25.664Z",
            statement: "Sign in with wallet.",
            iss: "did:pkh:eip155:1:0x977aeFEC1879160eC9560cd16f08e12B6DF52ed1"
        },
        s: {
            s: "0x9edd446e150fad96ec24ab60c697055dc7c7815cc84a727cafa4a5a0d6f09909764332e14f8bee2430b81e6e4169c3b5bb5cbf7931a569ae78bffc953c8b6a7f1c",
            t: "eip191"
        }
    }
}
```

**3. Request Authentication**

Update your import to include `generateNonce`.

```javascript
import AuthClient, { generateNonce } from '@walletconnect/auth-client'

// ...

const { uri } = await authClient.request({
  aud: '<FULL_URL_OF_LOGIN_PAGE>',
  domain: '<YOUR_DOMAIN>',
  chainId: 'eip155:1',
  type: 'eip4361',
  nonce: generateNonce()
})
```

The `uri` can then be displayed as a QRCode or as a deep link.

**Example deep link (preferred for desktop wallets):**

`mywallet://wc?uri={uri}`

**Example universal link (preferred for mobile wallets):**

`https://mywallet.com/wc?uri={uri}`

<IframeComponent />
