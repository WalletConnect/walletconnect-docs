# Core API Overview

## Description

Core API consolidates several core modules that are shared between all other high-level APIs available to developers on WalletConnect 2.0

## Core Modules

### Relay API

Relay API is a low-level publish-subscribe module shared by the other APIs in order to send and receive encoded messages between peers using a decentralized messaging network.

### Crypto API

Crypto API exposes methods for managing keys on the keychain, deriving shared symmetric keys with X25519, encrypting and decrypting payloads with ChaCha20-Poly1035 using typed envelopes and finally authenticating the client using ed25519 did-jwt

### Storage API

Storage API enables high-level APIs to store persistent data for managing their state engines internally and compromises of a simple key-value storage API
