# Relay Webhooks

Webhooks are used to delegate to third-party services with higher availability to watch both incoming and outgoing messages authorized by the client.

Clients will be subscribed to different topics and they can register a watch webhook with a corresponding service url and webhook url to also receive messages matching these topics.

Clients can register webhooks directly through JSON-RPC both with HTTP or WebSocket API and they can also unregister these webhooks independently if these services are unavailable.

Watch webhooks will replicate published messages as webhook events but will not affect the delivery status of messages in the respective mailboxes.

Relay will guarantee delivery of these watch webhooks up to the TTL of the published message with the maximum upper limit of 86 400 seconds (24 hours).

Relay will use exponential backoff to retry delivering webhook events in case the target services are unavailable.

Watch webhooks have a maximum expiry of 30 days and they must be re-registered to be extended.