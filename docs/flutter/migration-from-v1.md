# Migration From V1
The main thing that has changed is that WalletConnect v2 supports both wallet and dapp from the same spec.

The second things that has changed is that WalletConnect v2 is chain agnostic, and so no longer relies on Ethereum specific methods.

Assuming you were using the [wallet_connect](https://pub.dev/packages/wallet_connect) by Orange Wallet, the migration is straightforward.

This migration guide will be focused on migrating as a wallet, since that is what the original v1 library supported.

## Initialization

To create an instance of Web3Wallet, you need to pass in the `core` and `metadata` parameters. The metadata should be familiar to you.

We recommend adding a redirect to ensure that your wallet functions well when trying to open it using deep links.

```dart
Web3Wallet web3Wallet = await Web3Wallet.createInstance(
  projectId: '123',
  metadata: PairingMetadata(
    name: 'Wallet (Responder)',
    description: 'A wallet that can be requested to sign transactions',
    url: 'https://walletconnect.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  ),
);
```

Any sessions that already existed will automatically be reconnected when you create the instance.

There is no need to call `connectFromSessionStore`.

## Setup Sign Request Handling

Set up the methods and chains that your wallet supports.  
This is a major thing that is different between v1 and v2.  
We aren't locked into `ethSign`, `ethSendTransaction`, or `ethSignTransaction` anymore. We are chain agnostic. So we can define any of the methods that we want to support, for any chain we want.

```dart
final personalSignHandler = (String topic, dynamic parameters) async {
  // Handling Steps
  // 1. Parse the request, if there are any errors thrown while trying to parse
  // the client will automatically respond to the requester with a 
  // JsonRpcError.invalidParams error
  final parsedResponse = parameters;

  // 2. Show a modal to the user with the signature info: Allow approval/rejection
  bool userApproved = await showDialog( // This is an example, you will have to make your own changes to make it work.
    context: context,
    builder: (context) {
      return AlertDialog(
        title: const Text('Sign Transaction'),
        content: SizedBox(
          width: 300,
          height: 350,
          child: Text(parsedResponse.toString()),
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text('Accept'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text('Reject'),
          ),
        ],
      );
    },
  );

  // 3. Respond to the dApp based on user response
  if (userApproved) {
    return 'Signed!';
  }
  else {
    throw Errors.getSdkError(Errors.USER_REJECTED_SIGN);
  }
}

web3Wallet.registerRequestHandler(
  namespace: 'eip155:1',
  method: 'personal_sign',
  handler: personalSignHandler,
);
```

## Setup Response to a Session Proposal

Set up the proposal handler that will display the proposal to the user after the URI has been scanned.

This is similar to the `onSessionRequest` event in v1.

```dart
late int id;
web3Wallet.onSessionProposal.subscribe((SessionProposal? args) async {
  // Handle UI updates using the args.params
  // Keep track of the args.id for the approval response
  id = args!.id;
})
```

## Pairing

Scan the QR code and parse the URI, and pair with the dapp.  
Upon the first pairing, you will immediately receive `onSessionProposal` and `onAuthRequest` events.  

This step has no equivalent in v1, as a pairing didn't exist. There are now two layers in WalletConnect v2: pairing and sessions. Calling this function will subscribe the wallet to the pairing topic, and will allow the wallet to receive session proposals, which is our next step!

```dart
Uri uri = Uri.parse(scannedUriString);
await web3Wallet.pair(uri: uri);
```

## Approve a Session Proposal

Present the UI for approval.

This is inherently different from v1. Remember, we aren't limited to just EVM, we can do any chain, so we define the chains and methods our wallet supports and respond with those.

The `accounts` list has the format `namespace:chainId:address`.

```dart
final walletNamespaces = {
    'eip155': Namespace(
        accounts: ['eip155:1:abc'],
        methods: ['eth_signTransaction'],
    ),
}
await web3Wallet.approve(
    id: id,
    namespaces: walletNamespaces // This will have the accounts requested in params
);
```

## Reject a Session Proposal

To reject the request, pass in an error code and reason. They can be found [here](https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes).

```dart
await web3Wallet.reject(
    id: id,
    reason: Errors.getSdkError(Errors.USER_REJECTED_SIGN),
);
```