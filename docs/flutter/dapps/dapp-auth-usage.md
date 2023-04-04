# Dapp Usage

:::info
If you're a wallet looking to incorporarte Auth, please see [Web3Wallet SDK](../wallets/wallet-usage.md)..
:::

## Installation

Follow these [steps](../installation.md) to install the Flutter SDK.

## Initialization

To create an instance of `AuthClient`, you need to pass in the core and metadata parameters.

```dart
AuthClient authClient = await AuthClient.createInstance(
    relayUrl: 'wss://relay.walletconnect.com', // The relay websocket URL, leave blank to use the default
    projectId: '123',
    metadata: PairingMetadata(
        name: 'dapp (Requester)',
        description: 'A dapp that can request that transactions be signed',
        url: 'https://walletconnect.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
    ),
);
```

## Request Authentication

To request authentication use the `request` method on the `authClient` object.

```dart
final AuthRequestResponse auth = await authClient.request(
  params: AuthRequestParams(
    aud: 'http://localhost:3000/login',
    domain: 'localhost:3000',
    chainId: 'eip155:1',
    statement: 'Sign in with your wallet!',
  ),
  pairingTopic: resp.pairingTopic,
);

final uri = auth.uri;
```

The `uri` can then be displayed as a QRCode or as a deep link.

**Example deep link (preferred for desktop wallets):**

`mywallet://wc?uri={uri}`

**Example universal link (preferred for mobile wallets):**

`https://mywallet.com/wc?uri={uri}`

## Handling Session Approval and Rejection

To handle a session approval and rejection using `AuthResponse` await the response and check for a non-null result to determine approval or rejection.

```dart
final AuthResponse authResponse = await authResponse.completer.future;
if (authResponse.result != null) {
  // Having a result indicates that the signature has been verified.

  // Retrieve the wallet address from a successful response
  final walletAddress = AddressUtils.getDidAddress(authResponse.result!.p.iss);
}
else {
  // Otherwise, you might have received a WalletConnectError if there was an issue verifying the signature.
  final WalletConnectError? error = authResponse.error;
  // Or a JsonRpcError if something went wrong when signing with the wallet.
  final JsonRpcError? error = authResponse.jsonRpcError;
}
```

# To Test

Run tests using `flutter test`.
Expected flutter version is: >`3.3.10`

# Useful Commands

- `flutter pub run build_runner build --delete-conflicting-outputs` - Regenerates JSON Generators
- `flutter doctor -v` - get paths of everything installed.
- `flutter pub get`
- `flutter upgrade`
- `flutter clean`
- `flutter pub cache clean`
- `flutter pub deps`
- `flutter pub run dependency_validator` - show unused dependencies and more
- `dart format lib/* -l 120`
- `flutter analyze`
