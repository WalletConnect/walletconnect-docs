# Cold start of Notify SDK with History API

## Motivation

A cold start represents the Push SDK running for the first time on a device without any cached state. The account that is used for `enableSync` of PushClient API may already have some kind of history (pushSubscriptions, pushMessages). The HistoryAPI's purpose is to restore history and state after a cold start.

Note: Launching a client after 30 days of inactivity is also considered a cold start

## Implementation

1. W1 already has some `pushSubscriptions`, `pushMessages` history
2. Wn performs cold start on different device but the same account as W1
3. Wn configures sync for an account with `enableSync` method of PushClient
4. Wn registers HistoryAPI for `wc_syncSet` and `wc_syncDel` SyncAPI methods. Request tags can be found in [Sync API](../core/sync/readme.md) specs
5. Wn fetches sync messages containing PushSubscription payloads. Topic to fetch and keys to decrypt payloads are derived according to [Sync API](../core/sync/readme.md). PushSubscriptions description can be found in [PushSubscriptions sync storage specs](./usage-of-sync-api.md)
6. Wn combines `pushSubscriptions` inserts with deletions and updates the local database
7. Wn subscribes for `pushSubscriptions` topics
8. Wn sets subscription symKey P in keychain to be able to decrypt pushMessages payloads
9. Wn fetching `wc_pushMessage` messages for every subscription topic from HistoryAPI. Request tags could found in [Push RPC methods](./rpc-methods.md) 
10. Wn decrypts pushMessages payload with symKey P and updates local database