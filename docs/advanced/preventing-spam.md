# Preventing Spam

To ensure a positive end-user experience, it's essential to mitigate spam and protect users from unwanted chat invites and push notifications. This document outlines the measures taken to prevent spam and maintain a high-quality experience for end-users.

## Push SDK Spam Mitigation

### At Launch

1. Limited push notifications: Only one push notification per dapp per hour is allowed.
2. Permissioned dapps: Initially, only vetted partners are allowed in the program via our Cloud app.

### Beyond Launch

1. Spam scoring system: A scoring system that assigns positive or negative points to actions taken by a dapp. The higher the score, the more likely a dapp is spamming. Actions such as sending multiple messages within a fixed time interval will increase a dapp's spam score. Restrictions or blocks will be imposed on dapps that cross specific thresholds.
2. Customizable limits and reporting: Wallet developers will have the option to set up custom limits per dapp and implement a report button in notifications. Users can configure their preferences for receiving notifications from dapps, helping to identify and block "bad" dapps.

## Chat SDK Spam Mitigation

### At Launch

1. Limited message requests: Wallets can only send 30 message requests per day.
2. Reputation-based allowlisting: Only allowlisted addresses with a certain reputation are allowed to send requests. This includes partner wallets like Trust and users with specific credentials, such as POAP holders.
3. One-time invite: Wallets can send only one invite to a recipient. If the invitation is declined, it cannot be sent again. Chat SDK manages the availability to send invites on the device.
4. Blocking consecutive invites: Chat SDK will block subsequent invites from the same sender. If local data is cleared, another invite might get through.
5. Unregistering inviteKey: Wallets can unregister their inviteKey from the Keyserver to become undiscoverable, preventing others from sending them invites.
6. Leaving chat threads: Users can leave a chat thread or conversation if someone is spamming messages.

### Beyond Launch

1. QR code-based chat invitations: Users will be able to invite themselves by showing a QR code, similar to the experience offered by Telegram. This allows users to skip Keyserver registration and not be discoverable at any moment.