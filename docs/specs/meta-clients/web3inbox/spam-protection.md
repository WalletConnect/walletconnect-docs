# Web3Inbox Spam Protection

To ensure a positive end-user experience, it's essential to mitigate spam and
protect users from [chat spam](../../clients/chat/spam-protection.md) and [notify spam](../../clients/notify/spam-protection.md).
This document outlines the measures taken to prevent spam and maintain a
high-quality experience for end-users.

Web3Inbox SDK takes extra steps as an opinionated consumer of the Chat and Notify SDK.

## Innate Passive Protection

Web3Inbox, like any consumer of the Chat and Notify SDK, natively leverages the protection provided by the Chat and Notify SDK.

## User-Triggered Protection
These spam protections come prepackaged with the Chat SDK but require action by the end user.

### Chat Invite Protection

* Web3Inbox will not render hyperlinks in invite messages to help prevent users clicking on a suspicious URL by accident.

### Chat Thread Protection

* Web3Inbox's UI exposes all active spam protection actions provided by the Chat SDK. This of course includes the `leave` function which blocks a spamming user.
* Web3Inbox sends notifications from peers by default, but if one has a peer that sends many messages in succession, one can use the Web3Inbox SDK's `muteContact` function to prevent receiving notifications from a selected peer.

### Notification Protection

* Web3Inbox's UI exposes all active spam protection actions provided by the Notify SDK. This of course includes the `deleteSubscription` function which blocks a spamming dapp.


