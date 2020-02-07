# Dapp Monitoring

Monitoring Dapps can be very tricky to measure performance and simultaneously perserve user privacy. Fortunately the team at [Terminal](https://terminal.co/) have made their goal to solve this problem and they have added support for WalletConnect on their platform.

Below you can find how to integrate the Terminal SDK with the WalletConnect Client.

Surfacing logs and analytics from WalletConnect is trivially different than most other integrations. If your dapp is integrated with WalletConnect then you probably initialize your WalletConnect browser object similar to this:

```javascript
import WalletConnect from "@walletconnect/browser";

// Create a walletConnector
const walletConnector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org" // Required
});
//add your wallet connection logic
```

To begin surfacing logs for calls using this web3 provider, simply wrap the web3 instance in a few easy steps as shown below.

1. Install the Terminal SDK (Our NPM page for [more details](https://www.npmjs.com/package/@terminal-packages/sdk) )npm I @terminal-packages/sdk

2. [Sign up](https://terminal.co/signup) for Terminal and [generate an API key](https://docs.terminal.co/terminal-platform/create-an-api-key)

3. Wrap your provider by importing the Terminal SDK package and including the account API Key, ProjectID, and the WalletConnect bridge URL.

   1. Get your ProjectID from your Terminal’s project settings

   2. apiKey is where you paste your Terminal API Key.

   3. walletConnectOptions is an object that you will pass the bridge URL into.

Note that the source will be picked up automatically from WalletConnect and put into the logs. However, not all wallets make this information available. For more information about adding provider options checkout [TerminalSDK Quickstart](https://docs.terminal.co/logs-analytics/hexsdk-quickstart).

```javascript
import WalletConnect from "@walletconnect/browser";
import { TerminalWalletConnectBrowserProvider } from "@terminal-packages/sdk";

const walletConnector = new TerminalWalletConnectBrowserProvider({
  apiKey: "YOUR_TERMINAL_API_KEY",
  projectId: "YOUR_TERMINAL_PROJECTID",
  walletConnectOptions: {
    bridge: "https://bridge.walletconnect.org"
  }
});
//add your wallet connection logic
```

Remember that you must use `TerminalWalletConnectBrowserProvider` and NOT `TerminalHttpProvider`. Once you have initialized your WalletConnect object in this way, simply make calls as you did before and get all the logs surfaced to your Terminal account.
