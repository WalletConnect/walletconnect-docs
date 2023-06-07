# Components

## Web3Modal

Core component that should be placed at the root of your app. See [options docs](../options.md) for available props. Additionally to configuration props, this component also requires `ethereumClient` prop which references wagmi client.

```tsx
import { Web3Modal } from "@web3modal/react";

return <Web3Modal projectId="..." ethereumClient={...} />;
```

## Web3Button

Pre-styled connect/disconnect button that reacts to modal's theme changes.

```tsx
import { Web3Button } from '@web3modal/react'

interface Props {
  icon?: 'show' | 'hide'
  label?: string
  balance?: 'show' | 'hide'
}

return <Web3Button />
```

## Web3NetworkSwitch

Pre-styled network switch button that reacts to modal's theme and network changes.

```tsx
import { Web3NetworkSwitch } from '@web3modal/react'

return <Web3NetworkSwitch />
```

## W3mQrCode

WalletConnect styled QRCode that allows for an image in the center

```tsx
import { W3mQrCode } from '@web3modal/react'

return <W3mQrCode size={200} imageUrl="url/to/image" uri="data" />
```

