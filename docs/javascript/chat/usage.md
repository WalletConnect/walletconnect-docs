# Usage

:::caution
**The WalletConnect Chat SDK is currently in Alpha and is not production-ready**.

Its public API and associated documentation may still see significant and breaking changes.
:::

:::info
For an example implementation, please refer to our [react-wallet-chat example](https://github.com/WalletConnect/web-examples/tree/main/wallets/react-wallet-chat) and [demo](https://react-wallet-chat.walletconnect.com/)
:::

### Initialize your WalletConnect ChatClient, using [your Project ID](../../cloud/relay.md)

```javascript
import { ChatClient } from "@walletconnect/chat-client";

const chatClient = await ChatClient.init({
  projectId: "<YOUR PROJECT ID>",
  keyseverUrl: "<YOUR KEYSERVER URL: eg: https://keys.walletconnect.com"
});
```

### Set up listeners for chat-related events

```javascript
chatClient.on("chat_invite", async (event) => {
  // React to an incoming invite to chat.
});

chatClient.on("chat_invite_accepted", async (event) => {
  // React to your peer joining a given chat.
});

chatClient.on("chat_invite_rejected", async (event) => {
  // React to your peer declining your invite
});

chatClient.on("chat_message", (event) => {
  // React to an incoming messages for a given chat.
});

chatClient.on("chat_ping", (event) => {
  // React to an incoming ping event from a peer on a given chat topic.
});

chatClient.on("chat_left", (event) => {
  // React to a peer leaving a given chat.
});
```

### Register your blockchain address with the key server

To allow for other Chat SDK user's to invite you to a chat, you need to register your account with the public key server.

The key server expects a full CAIP-2 account for the address (as shown below).

```javascript
await chatClient.register({ account: `eip155:1:0xa6de541...`, onSign: async () => {} });
```

### Inviting another peer to chat

To send a chat invitation to a peer, you can call `.invite()` with your account and an `invite` object:

```javascript
const inviteePublicKey = await chatClient.resolve({ account: 'eip155:1:0xf5d44...' })
await chatClient.invite({
  message: "Hey, Let's chat!,
  inviterAccount: `eip155:1:0xa6de541...`, // your CAIP-2 formatted account that you registered previously.
  inviteeAccount: 'eip155:1:0xf5d44...', // the CAIP-2 formatted account of the recipient.
  inviteePublicKey
});
```

### Accepting or rejecting an incoming invite

When your client receives an invite from a peer, you're able to accept/reject it by calling `.accept()/.reject()` with the invite's `id`.

```javascript
await chatClient.accept({ id: invite.id });

// or

await chatClient.reject({ id: invite.id });
```

### Sending a chat message

To send a message to a peer in an established chat thread (i.e. after you or the peer have accepted an invite),
you can call `.message()` with the following parameters:

```javascript
await chatClient.message({
  topic: chatThread.topic,
  message: "Hey, good to hear from you!",
  authorAccount: `eip155:1:0xa6de541...`, // your CAIP-2 formatted account that you registered previously.
  timestamp: Date.now(),
});
```

### Leaving a chat thread

To leave an established chat thread (deleting the thread and its associated messages), call `.leave()` with
the chat thread's topic:

```javascript
await chatClient.leave({ topic: chatThread.topic });
```
