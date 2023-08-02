import Container from '../../components/Container';

# Installation

## Obtain Project ID

Every project that uses WalletConnect SDKs needs to obtain a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in). This process is completely free and only takes a few minutes.

## Add Packages

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="rn-cli" label="React Native CLI">

```bash npm2yarn
npm install @walletconnect/modal-react-native
```

Additionally add these extra packages to help with async storage, polyfills, modals and SVG's.

```bash npm2yarn
npm install @react-native-async-storage/async-storage react-native-get-random-values react-native-modal react-native-svg
```

On iOS, use CocoaPods to add the native modules to your project:

```
npx pod-install
```

### Additional Setup for RN < 0.70

#### Install big-integer
```bash npm2yarn
npm install big-integer
```

#### Apply Polyfill
Add this line in your project's root file, making sure it's executed before `@walletconnect/modal-react-native` is imported

```js
if (typeof BigInt === 'undefined') global.BigInt = require('big-integer')
```

</TabItem>

<TabItem value="expo" label="Expo">

```
npx expo install @walletconnect/modal-react-native
```

Additionally add these extra packages to help with async storage, polyfills, modals and SVG's.

```
npx expo install @react-native-async-storage/async-storage react-native-get-random-values react-native-modal react-native-svg
```

<Tabs>
<TabItem value="sdk48" label="Expo 48">

### Additional Setup for Expo SDK 48

If you are using Expo SDK 48, there's an [issue](https://github.com/expo/expo/issues/17270) with `react-native-get-random-values`, so we need to temporarily fix this by installing expo-crypto library and creating a custom  [shim file](https://github.com/WalletConnect/modal-react-native/blob/main/example/expo-crypto-shim.js).

#### Create a shim file
Create `expo-crypto-shim.js`

```js
///expo-crypto-shim.js
import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto';

class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}

// eslint-disable-next-line no-undef
const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto();

(() => {
  if (typeof crypto === 'undefined') {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();
```

#### Install expo-crypto package

```
npx expo install expo-crypto
```

#### Apply Polyfill

Import the shim file in your project, making sure this line executes before the first `@walletconnect/modal-react-native` import.

```javascript
import './expo-crypto-shim.js'

...

import { useWalletConnectModal } from '@walletconnect/modal-react-native';
```

</TabItem>

<TabItem value="sdk49" label="Expo 49">

### Additional Setup for Expo SDK 49

If you are using Expo SDK 49, there's an [issue](https://github.com/expo/expo/issues/17270) with `react-native-get-random-values`, so we need to manually update it's version to `v1.9.0` and exclude this package from Expo validations. For more info, read [Selectively opt out of package version validations](https://blog.expo.dev/expo-sdk-49-c6d398cdf740)

#### Install latest version of "react-native-get-random-values"

```bash npm2yarn
npm install react-native-get-random-values@1.9.0
```

#### Modify your package.json

Exclude `react-native-get-random-values` in your package.json to avoid warnings from Expo.

```json
"dependencies": {
  ...
},
"expo": {
  "install": {
    "exclude": [
      "react-native-get-random-values"
    ]
  }
},
"devDependencies": {
  ...
}
```

</TabItem>

</Tabs>

</TabItem>
</Tabs>
