# Message Status

Given the Chat API relies on the Relay API for peer communication, we can build the following message status:

- Pending
- Published
- Delivered

## Pending

A message is considered pending from the moment the Chat API has called the Relay API to publish the message.

This should be a very short period of time given that the Chat API and Relay API are already connected.

A message could be pending longer given certain network conditions: hanging websocket, offline internet access or slow internet connection.

## Published

A message is considered published from the moment the Relay API has received acknowledgement from the Relay Server that the message has been received and will be relayed to its receiver.

## Delivered

A message is considered delivered from the moment the peer has sent a corresponding response to the wc_chatMessage request as a message receipt.
