# Cold start of Notify SDK with History API

## Motivation

A cold start means that Push SDK running for the first time on a device without any cached state. The account that is used for `enableSync` of PushClient API may already have some kind of history (pushSubscriptions, pushMessages). The HistoryAPI's purpose is to restore history and state after a cold start.

Note: Launching a client after 30 days of inactivity is also considered a cold start

## Implementation

1. W1 already have some `pushSubscriptions`, `pushMessages` history
2. Wn performing cold start on different device and have the same account as W1
3. Wn configuring sync for an account with `enableSync` method of PushClient
4. Wn register HistoryAPI for `wc_syncSet` and `wc_syncDel` SyncAPI methods. Request tags could found in [Sync API](../core/sync/readme.md) specs
5. Wn fetching sync messages containing PushSubscription payloads. Topic to fetch and keys to decrypt payloads is deriving according [Sync API](../core/sync/readme.md). PushSubscriptions description could found in[PushSubscriptions sync storage specs](./usage-of-sync-api.md)
6. Wn combines `pushSubscriptions` inserts with deletions and updating local database
7. Wn subscribing for `pushSubscriptions` topics
8. Wn setting subscription symKey P into keychain to be able to decrypt pushMessages payloads
9. Wn fetching `wc_pushMessage` messages for every subscription topic from HistoryAPI. Request tags could found in [Push RPC methods](./rpc-methods.md) 
10. Wn decrypt pushMessages payload with symKey P and updating local database