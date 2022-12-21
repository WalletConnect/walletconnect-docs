# Components

## Web3Modal

Core component that should be placed at the root of your app. See [configuration docs](../configuration.md) for available props. Additionaly to configuration props, this component also requires `ethereumClient` prop which references wagmi client.

```tsx
import { Web3Modal } from "@web3modal/react";

return <Web3Modal projectId="..." ethereumClient={...} />;
```

## Web3Button

Pre-styled connect/disconnect button that reacts to modal's theme changes.

```tsx
import { Web3Button } from "@web3modal/react";

interface Props {
  icon?: "show" | "hide";
  label?: string;
  balance?: "show" | "hide";
}

return <Web3Button />;
```
