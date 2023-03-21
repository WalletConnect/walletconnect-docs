# Stateless Communication

In the case of stateless mode, the parent (Eg: native app displaying a webview)
communicates using `postMessage`, sending messages one-way to the client.

The message format should be as follows, following JSON RPC:

```typescript
class EventMessage {
  jsonrpc: "2.0",
  method: string // eventName
  params: object // eventData
  id: number
}
```

Where `method`/`eventName` is 1:1 original event name from the original clients since
they are already prefixed. Eg: `chat_message`. `params`/`eventData` is the unencrypted
event data coming from the original client. Eg: `Message` coming from
`chat_message` event.
