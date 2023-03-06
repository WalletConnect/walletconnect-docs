# Dapp Usage

:::info
If you're a wallet looking to incorporarte Sign, please see [Web3Wallet SDK](../../wallets/installation.md)..
:::

## Initialzation

To create an instance of `SignClient`, you need to pass in the core and metadata parameters.

```dart
SignClient signClient = await SignClient.createInstance(
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

## Connection

To connect with specific parameters and display the returned URI, use `connect` with the required namespaces.

```dart
ConnectResponse response = await signClient.connect(
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

Uri? uri = response.uri;
```

## Session Data

Once you've displayed the URI, you can wait for the future and hide the QR code once you've received session data.

```dart
final SessionData session = await response.session.future;
```

## Request Signatures

Once the session had been created, you can request signatures.

```dart
final signature = await signClient.request(
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
signClient.onSessionEvent.subscribe((SessionEvent? session) {
    // Do something with the event
});

signClient.registerEventHandler(
    namespace: 'kadena',
    event: 'kadena_transaction_updated',
);
```
