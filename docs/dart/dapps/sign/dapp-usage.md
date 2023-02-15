# Dapp Usage

:::info
If you're a wallet loooking to incorporarte Sign, please see [Web3Wallet SDK](../wallet-usage.md)..
:::

## Initialzation

To create an instance of `SignClient`, you need to pass in the core and metadata parameters.

```dart
SignClient wcClient = await SignClient.createInstance(
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
```

## Connection

To connect with specific parameters and display the returned URI, use `connect` with the required namespaces.

```dart
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
);
Uri? uri = resp.uri;
```

## Session Data

Once you've displayed the URI, you can wait for the future and hide the QR code once you've received session data.

```dart
final SessionData session = await resp.session.future;
```

## Request Signatures

Once the session had been created, you can request signatures.

```dart
final sig = await wcClient.request(
    topic: session.topic,
    chainId: 'eip155:1',
    request: SessionRequestParams(
    method: 'eth_signTransaction',
    params: 'json serializable parameters',
    ),
);
```

## Respond to Events

You can also respond to events from the wallet, like chain changed, using `onSessionEvent` and `registerEventHandler`.

```dart
wcClient.onSessionEvent.subscribe((SessionEvent? session) {
    // Do something with the event
});

wcClient.registerEventHandler(
    namespace: 'kadena',
    method: 'kadena_transaction_updated',
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
