# Verify Server Enclave

The Verify Server will render a webpage for browser-based apps to render an iframe that will verify the origin by using it as an enclave for registering the origin of an attestion id.

This way the `POST /attestation` endpoint is only authorized by the enclave rendered from the same origin which is guaranteing the origin of the browser URL.
