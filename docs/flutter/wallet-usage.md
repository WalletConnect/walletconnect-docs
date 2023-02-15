# Wallet Usage

## Initialization

To create an instance of Web3Wallet, you need to pass in the `core` and `metadata` parameters.

```dart
Web3Wallet wcClient = await Web3Wallet.createInstance(
  core: Core(
    relayUrl: 'wss://relay.walletconnect.com', // The relay websocket URL
    projectId: '123',
  ),
  metadata: PairingMetadata(
    name: 'Wallet (Responder)',
    description: 'A wallet that can be requested to sign transactions',
    url: 'https://walletconnect.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  ),
);

```

## Proposal Handling

For a wallet, setup the proposal handler that will display the proposal to the user after the URI has been scanned.

```dart
late int id;
wcClient.onSessionProposal.subscribe((SessionProposal? args) async {
  // Handle UI updates using the args.params
  // Keep track of the args.id for the approval response
  id = args!.id;
})
```

## Responding to Request

Also set up the methods and chains that your wallet supports.

```dart
wcClient.onSessionRequest.subscribe((SessionRequestEvent? request) async {
  // You can respond to requests in this manner
  await clientB.respondSessionRequest(
    topic: request.topic,
    response: JsonRpcResponse<String>(
      id: request.id,
      result: 'Signed!',
    ),
  );
});
wcClient.registerRequestHandler(
  namespace: 'kadena',
  method: 'kadena_sign',
);
```

## Auth Handling

Set up the auth handling.

```dart
clientB.onAuthRequest.subscribe((AuthRequest? args) async {
    // This is where you would
    // 1. Store the information to be signed
    // 2. Display to the user that an auth request has been received

    // You can create the message to be signed in this manner
    String message = clientB.formatAuthMessage(
        iss: TEST_ISSUER_EIP191,
        cacaoPayload: CacaoRequestPayload.fromPayloadParams(
        args!.payloadParams,
        ),
    );
});
```

## Pairing

Scan the QR code and parse the URI, and pair with the dApp. On the first pairing, you will immediately receive `onSessionProposal` and `onAuthRequest` events.

```dart
Uri uri = Uri.parse(scannedUriString);
await wcClient.pair(uri: uri);
```

## Approving the Sign Request

Present the UI and to approve.

```dart
final walletNamespaces = {
    'eip155': Namespace(
        accounts: ['eip155:1:abc'],
        methods: ['eth_signTransaction'],
    ),
    'kadena': Namespace(
        accounts: ['kadena:mainnet01:abc'],
        methods: ['kadena_sign_v1', 'kadena_quicksign_v1'],
        events: ['kadena_transaction_updated'],
    ),
}
await wcClient.approve(
    id: id,
    namespaces: walletNamespaces // This will have the accounts requested in params
);
```

## Rejecting the Sign Request

To reject the request, pass in an error code and reason. They can be found [here](https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes).

```dart
await wcClient.reject(
    id: id,
    reason: ErrorResponse(
        code: 4001,
        message: "User rejected request",
    ),
);
```

## Approving an Auth Request

You can approve a dapp's auth request by responding with the user's signature.

```dart
String sig = 'your sig here';
await wcClient.respondAuthRequest(
  id: args.id,
  iss: 'did:pkh:eip155:1:0x06C6A22feB5f8CcEDA0db0D593e6F26A3611d5fa',
  signature: CacaoSignature(t: CacaoSignature.EIP191, s: sig),
);
```

## Rejecting an Auth Request

To reject the request, pass in an error code and reason. They can be found [here](https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes).

```dart
await wcClient.respondAuthRequest(
  id: args.id,
  iss: 'did:pkh:eip155:1:0x06C6A22feB5f8CcEDA0db0D593e6F26A3611d5fa',
  error: WalletConnectErrorResponse(code: 12001, message: 'User rejected the signature request'),
);
```
