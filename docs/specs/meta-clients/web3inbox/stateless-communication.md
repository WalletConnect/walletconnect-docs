# Stateless Communication

In the case of stateless mode, the parent (Eg: native app displaying a webview)
will communicate using `postMessage`, sending messages one-way to the client.

The message format should be as follows:

```typescript
class EventMessage {
  eventName: string
  eventData: Object
  type: 'chat' | 'push'
}
```

Where `eventName` is 1:1 original event name from the original clients since
they are already prefixed. Eg: `chat_message`. `eventData` is the unencrypted
event data coming from the original client. Eg: `Message` coming from
`chat_message` event.

`type` is the name of the client the event is coming from.
