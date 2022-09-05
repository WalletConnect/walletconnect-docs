# Sign API Overview

## Description

Sign API establishes a session between a dapp and a wallet in order to expose a set of blockchain accounts that can sign transactions and/or messages using a secure remote JSON-RPC transport with methods and events.

## Context

In v1.0 the session and pairing were coupled which meant that a URI was shared to retrieve the session proposal and it established the pairing simultaneously. However that also meant that a new session would require establishing a pairing again.

In v2.0 the session and pairing are decoupled which means that a URI is shared to construct a pairing proposal and only after settling the pairing then the dapp can propose a session using that pairing.

### Problem

Given the new pattern with v2.0 protocol we have a far more interactive protocol that negotiates the pairing exclusively for session proposal transmission. This is very useful because a pairing can be proposed independently from the session and they exist in parallel.

However this introduced a new problem which didn’t exist with v1.0. When using deep linking or universal linking to connect a session with a new pairing on v2.0 protocol this URI is shared by swiping between a dapp and a wallet.

This swipe puts the dapp (usually in a browser window) on the background which means that the websocket is then killed and it can’t receive the response for the pairing proposal published by the wallet.

Thus if the dapp never receives the pairing response that means it also will never publish the session proposal meaning that the wallet is redirected with the URI but won’t prompt the user for approval.

### Goal

The solution is to find a protocol change that inherits the same capability of v1.0 to propose session and pairing simultaneously but also persists the decoupled property of v2.0 protocol
