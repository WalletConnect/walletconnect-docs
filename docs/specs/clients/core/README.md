import Container from '../../../components/Container';

# Core API Overview

## Description

Core API consolidates several core modules that are shared between all other high-level APIs available to developers on WalletConnect 2.0

<Container
items={[
{
name: "Relay API",
description: "Relay API is a low-level publish-subscribe module shared by the other APIs in order to send and receive encoded messages between peers using a decentralized messaging network.",
url: `/specs/clients/core/relay`
},
{
name: "Crypto API",
description: "Crypto API exposes methods for managing keys on the keychain, deriving shared symmetric keys with X25519, encrypting and decrypting payloads with ChaCha20-Poly1035 using typed envelopes and finally authenticating the client using ed25519 did-jwt.",
url: `/specs/clients/core/crypto`
},
{
name: "Storage API",
description: "Storage API enables high-level APIs to store persistent data for managing their state engines internally and compromises of a simple key-value storage API.",
url: `/specs/clients/core/storage`
},
{
name: "Pairing API",
description: "Pairing API is a lightweight API for establishing an encrypted, protocol agnostic communication layer between peers. It's purpose is to provide a secure channel for proposing protocols or sending requests.",
url: `/specs/clients/core/pairing`
},
{
name: "Sync API",
description: "Sync API allows a wallet user to sync private data between multiple clients using a single signature from an account. It works similarly to Storage API but it can be accessible through multiple clients using a blockchain account signature.",
url: `/specs/clients/core/sync`
},
{
name: "Verify API",
description: "Verify API is an attestation mechanism to verify the domain origin of a published message. The client will hash the contents of the encrypted envelope and attest with the verify enclave to register its attestation in the verify server for peers to compare with incoming messages from the Relay..",
url: `/specs/clients/core/verify`
},
]}
/>
