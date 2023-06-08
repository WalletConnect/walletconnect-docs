# Verify Client

## Description

Verify Client will authenticate and verify the origin of a message by registering an attestation on the Verify Server.

To ensure that attestations are privacy-perserving we use the decrytped contents of the Relay messages and hash them.

High-level APIs will stringify a JSON-RPC payload before encrypting therefore we will use the stringified JSON and hash it.

```sh
attestation_id = sha256(stringify(json_rpc_payload))
```

Thus both the sender and recipient can derive the same attestation id before or after decrypting messages sent through the Relay.

The Verify Server only needs to map an attestation id to an origin which will be a URL for browser-based applications.

## Client API

```typescript
interface Verify Client {
  // initializes the client 
  public abstract init(params: { verifyUrl?: string }): Promise<void>;
  
  // register attestation on the Verify Server
  public abstract register(params: { attestationId: string }): Promise<void>;

  // resolve attestation from the Verify Server
  public abstract resolve(params: { attestationId: string, verifyUrl?: string }): Promise<string>;
}
```
