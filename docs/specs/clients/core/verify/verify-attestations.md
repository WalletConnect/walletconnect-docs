# Verify Attestations

## Browser Attestations

Browser-based applications will generate attestations by using the Verify Enclave rendered by the Verify Server inside of an iframe which will use the [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) available in browsers to identify the origin of a message.

The Verify Client will call [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) with just the attestaion id and the Verify Enclave can match the attestation id to an origin from the parent browser page

```typescript
// method called by Verify Client
postMessage("<Attestation_Id>", "<Verify_Enclave_URL>")

// event subscribed by Verify Enclave
window.addEventListener("message", (event) => {
  const attestationId = event.data
  const origin = event.origin
  fetch("<Verify_Server_URL>", { method: "POST", body: { attestationId, origin }})
}, false);
```

## Mobile Attestations

TODO