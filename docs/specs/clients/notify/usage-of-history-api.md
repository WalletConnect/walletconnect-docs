# Cold start of Notify SDK with Archive API

## Motivation

A cold start represents the Notify SDK running for the first time on a device without any cached state. The account that is used for `enableSync` of NotifyClient API may already have some kind of history (notifySubscriptions, notifyMessages). The Archive API's purpose is to restore history and state after a cold start.

Note: Launching a client after 30 days of inactivity is also considered a cold start

## Implementation

1. W1 already has some `notifySubscriptions`, `notifyMessages` history
2. Wn performs cold start on different device but the same account as W1
3. Wn configures sync for an account with `enableSync` method of NotifyClient
4. Wn registers Archive API for `wc_syncSet`, `wc_syncDel` of SyncAPI methods and `notify_message` of Notify API method. Request tags can be found in [Sync API](../core/sync/rpc-methods.md) and [Notify API](./rpc-methods.md)specs
5. Wn fetches sync messages containing NotifySubscription payloads. Topic to fetch and keys to decrypt payloads are derived according to [Sync API](../core/sync/readme.md). NotifySubscriptions description can be found in [NotifySubscriptions sync storage specs](./usage-of-sync-api.md)
6. Wn combines `notifySubscriptions` inserts with deletions and updates the local database
7. Wn subscribes for `notifySubscriptions` topics
8. Wn sets subscription symKey P in keychain to be able to decrypt notifyMessages payloads
9. Wn fetches `wc_notifyMessage` messages for every subscription topic from Archive API. Request tags can be found in [Notify RPC methods](./rpc-methods.md) 
10. Wn decrypts notifyMessages payload with symKey P and updates local database