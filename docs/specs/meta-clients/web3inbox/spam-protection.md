# Web3Inbox Spam Protection


To ensure a positive end-user experience, it's essential to mitigate spam and
protect users from [chat spam](../../clients/chat/spam-protection.md) and [push notifications spam](../../clients/push/spam-protection.md).
This document outlines the measures taken to prevent spam and maintain a
high-quality experience for end-users.

Web3Inbox SDK takes extra steps as an opinionated consumer of the Chat and Push
SDK.

## Innate passive protection

Web3Inbox, like any consumer of the push and chat SDK, natively leverages the
protection provided by the chat and push SDK.

## User-triggered protection
These spam protection come prepackaged with the Chat SDK but require action by
the end user.

### Chat Invite Protection
1. Web3Inbox will not render hyperlinks in invite messages to help prevent users
  clicking on a suspicious URL by accident

### Chat Thread Protection
1. Web3Inbox's UI exposes all active spam protection actions provided by the
   Chat SDK. This of course includes the `leave` function which blocks a
   spamming user.
2. Web3Inbox sends notifications from peers by default, but if one has a peer
   that sends many messages in succession, one can use the Web3Inbox SDK's
   `muteContact` function to prevent sending notifications from a selected peer.

### Push Notification Protection

1. Web3Inbox's UI exposes all active spam protection actions provided by the
   Push SDK. This of course includes the `deleteSubscription` function which blocks a
   spamming dapp.


