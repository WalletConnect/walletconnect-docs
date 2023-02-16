# Dapp Usage

## Initialzation

To create an instance of `AuthClient`, you need to pass in the core and metadata parameters.

```dart
AuthClient authClient = await AuthClient.createInstance(
    core: Core(
        relayUrl: 'wss://relay.walletconnect.com', // The relay websocket URL
        projectId: '123',
    ),
    metadata: PairingMetadata(
        name: 'dapp (Requester)',
        description: 'A dapp that can request that transactions be signed',
        url: 'https://walletconnect.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
    ),
);
```

## Subscribe to `auth_response`

TODO

## Request Authentication


```dart
final auth = await wcClient.requestAuth(
  params: AuthRequestParams(
    aud: 'http://localhost:3000/login',
    domain: 'localhost:3000',
    chainId: 'eip155:1',
    nonce: AuthUtils.generateNonce(),
    statement: 'Sign in with your wallet!',
  ),
  pairingTopic: resp.pairingTopic,
);
```

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
