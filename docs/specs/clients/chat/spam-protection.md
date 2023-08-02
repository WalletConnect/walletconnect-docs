# Chat Spam Protection

To ensure a positive end-user experience, it's essential to mitigate spam and
protect users from chat spam and [notifications spam](../notify/spam-protection.md).
This document outlines the measures taken to prevent spam and maintain a
high-quality experience for end-users.

Note, wallets implementing this SDK have the ability to expand on this
protection due to the customizability of the SDK. An example of this is
[Web3Inbox Spam Protection](../../meta-clients/web3inbox/spam-protection.md).

## Innate Passive Protection

These spam protection come prepackaged with the Chat SDK and require no
additional configuration.

### Invite Protection

1. Cannot re-invite a peer who already declined an invite: The SDK maintains
   state and prevents inviting a peer who exists in the `sentInvites` store.
2. Invite messages are limited to 200 characters to prevent spammers sending
   invites with spam content.
   
   
### Message Protection

1. The SDK prevents absurdly long messages, with a character limit of 2000
   characters per message.

## User-triggered Protection

These spam protections come prepackaged with the Chat SDK but require action by
the end user.

### Thread Protection

1. A user can leave a thread at anytime, effectively "blocking" a peer using the
   `leave` function. This works inherently because of the above innate invite
   protection. For example, if a peer was compromised and began sending spam
   messages, one could immediately block them. 

