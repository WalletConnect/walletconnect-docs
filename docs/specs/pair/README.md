# Pairing API Overview

## Description

Pairing API is a lightweight api for establishing an encrypted, protocol agnostic communication layer between peers. It's purpose is to provide a secure channel for proposing protocols or sending requests.


## Context

WalletConnect offers Sign, Auth and Push Protocols. In order to allow reusable communitaction channel between peers pairing API exposes a common interface and allows for sending and receiving multi-protocol requests over a single pairing.

This significantly improves end user experience by allowing to scan just a single QR code and receive requests from different protocols.

## User Flow

User visits a new website that requires Sign session for submitting transactions Auth for authentication

1. Website displays qrcode or deep link
2. User scans qrcode or redirects to wallet
3. Popup with session proposal and authentication request appears
3. User approves session request and authenticates
4. User returns to website after prompt success
5. User is now authenticated and has a sign session established with the dapp

## Request Protocol

1. A creates random symKey S and pairing topic that is a sha256 hash of symKey S.
2. A configures Pairing client with protocol P
3. A encrypts request with symKey S. Pairing client does not expects any response. P is responsible for response subscription.
4. A sends request on pairing topic.


// Successful request handling if B configures for protocol P
5. B configures Pairing Client for protocol P
6. B subscribes to pairing topic from provided URI
7. B's Pairing client receives protocol P request.
8. B's Pairing client emits event to notify P's client.

// Error case where B is not configured for handling protocol P
5. B subscribes to pairing topic from provided URI
6. B's Pairing client receives protocol P request.
7. B's Pairing client responds with error as is not configured for handling received request


