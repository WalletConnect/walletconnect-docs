# Notify Spam Protection

To ensure a positive end-user experience, it's essential to mitigate spam and
protect users from [chat spam](../chat/spam-protection.md) and notification spam. This document outlines the measures taken to prevent spam and maintain a high-quality experience for end-users.

Note, wallets and dapps implementing this SDK have the ability to expand on this
protection due to the customizability of the SDK. An example of this is
[Web3Inbox Spam Protection](../../meta-clients/web3inbox/spam-protection.md).

## Innate Passive Protection

These spam protections come prepackaged with the Notify SDK and require no
additional configuration.

### Notification Protection

1. Limited notifications: Only one notification per dapp per hour is
   allowed. This is to prevent dapps spamming a user as seen in Web2.
2. Permissioned dapps: Initially, only vetted partners are allowed in the
   program via our Cloud app.


## User-Triggered Protection

These spam protections come prepackaged with the Notify SDK but require action by
the end user.

### Notification Protection

1. A user can unsubscribe from a dapp's notifications at any time. This is done
   through the `deleteSubscription` function in the client.
