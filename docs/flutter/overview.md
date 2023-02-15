import Container from './../components/Container';

# Overview

WalletConnect Dart v2 library for Flutter, heavily inspired by the WalletConnect V2 Javacript Monorepo.  
Original work for this library is attributed to [Eucalyptus Labs](https://eucalyptuslabs.com/) and Sterling Long for [Koala Wallet](https://koalawallet.io/), a wallet built for the Kadena blockchain.

# Getting Started



<Container
items={[
{
name: "Dapps",
description: "Web3Modal offers out of the box support for React and integrates very well with wagmi.",
url: `/2.0/flutter/dapp-usage`
},
{
name: "Wallets",
description: "Your vanilla JS solution. Use it on any front-end environment.",
url: `/2.0/flutter/wallet-usage`
}
]}
/>


## Pair, Approve, and Sign/Auth

### dApp Flow
```dart
// To create both an Auth and Sign API, you can use the Web3App
// If you just need one of the other, replace Web3App with SignClient or AuthClient
// SignClient wcClient = await SignClient.createInstance(
// AuthClient wcClient = await AuthClient.createInstance(
Web3App wcClient = await Web3App.createInstance(
  core: Core(
    relayUrl: 'wss://relay.walletconnect.com', // The relay websocket URL
    projectId: '123',
  ),
  metadata: PairingMetadata(
    name: 'dApp (Requester)',
    description: 'A dapp that can request that transactions be signed',
    url: 'https://walletconnect.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  ),
);

// For a dApp, you would connect with specific parameters, then display
// the returned URI.
ConnectResponse resp = await wcClient.connect(
  requiredNamespaces: {
    'eip155': RequiredNamespace(
      chains: ['eip155:1'], // Ethereum chain
      methods: ['eth_signTransaction'], // Requestable Methods
    ),
    'kadena': RequiredNamespace(
      chains: ['kadena:mainnet01'], // Kadena chain
      methods: ['kadena_quicksign_v1'], // Requestable Methods
    ),
  }
)
Uri? uri = resp.uri;

// Once you've display the URI, you can wait for the future, and hide the QR code once you've received session data
final SessionData session = await resp.session.future;

// Now that you have a session, you can request signatures
final sig = await wcClient.request(
  topic: session.topic,
  chainId: 'eip155:1',
  request: SessionRequestParams(
    method: 'eth_signTransaction',
    params: 'json serializable parameters',
  ),
);

// You can also respond to events from the wallet, like chain changed, etc.
wcClient.onSessionEvent.subscribe((SessionEvent? session) {
  // Do something with the event
});
wcClient.registerEventHandler(
  namespace: 'kadena',
  method: 'kadena_transaction_updated',
);
```

### Wallet Flow
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

// For a wallet, setup the proposal handler that will display the proposal to the user after the URI has been scanned.
late int id;
wcClient.onSessionProposal.subscribe((SessionProposal? args) async {
  // Handle UI updates using the args.params
  // Keep track of the args.id for the approval response
  id = args!.id;
})

// Also setup the methods and chains that your wallet supports
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

// Setup the auth handling
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

// Then, scan the QR code and parse the URI, and pair with the dApp
// On the first pairing, you will immediately receive onSessionProposal and onAuthRequest events.
Uri uri = Uri.parse(scannedUriString);
await wcClient.pair(uri: uri);

// Present the UI to the user, and allow them to reject or approve the proposal
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
// Or to reject...
// Error codes and reasons can be found here: https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes
await wcClient.reject(
  id: id,
  reason: ErrorResponse(
    code: 4001,
    message: "User rejected request",
  ),
);

// For auth, you can do the same thing: Present the UI to them, and have them approve the signature.
// Then respond with that signature
String sig = 'your sig here';
await wcClient.respondAuthRequest(
  id: args.id,
  iss: 'did:pkh:eip155:1:0x06C6A22feB5f8CcEDA0db0D593e6F26A3611d5fa',
  signature: CacaoSignature(t: CacaoSignature.EIP191, s: sig),
);
// Or rejected
// Error codes and reasons can be found here: https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes
await wcClient.respondAuthRequest(
  id: args.id,
  iss: 'did:pkh:eip155:1:0x06C6A22feB5f8CcEDA0db0D593e6F26A3611d5fa',
  error: WalletConnectErrorResponse(code: 12001, message: 'User rejected the signature request'),
);

// Your wallet is setup and ready to go!
```

# To Build

- Example project and dapp
- Reduce number of crypto libraries used for encryption, shared key, etc.
- Push API

# To Test

Run tests using `flutter test`.
Expected flutter version is: >`3.3.10`

# Useful Commands

* `flutter pub run build_runner build --delete-conflicting-outputs` - Regenerates JSON Generators
* `flutter doctor -v` - get paths of everything installed.
* `flutter pub get`
* `flutter upgrade`
* `flutter clean`
* `flutter pub cache clean`
* `flutter pub deps`
* `flutter pub run dependency_validator` - show unused dependencies and more
* `dart format lib/* -l 120`
* `flutter analyze`