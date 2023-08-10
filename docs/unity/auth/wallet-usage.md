# Wallet Usage

## Setup

First you must setup `AuthOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var walletOptions = new AuthOptions()
{
    ProjectId = "39f3dc0a2c604ec9885799f9fc5feb7c",
    Metadata = new Metadata()
    {
        Description = "An example dapp to showcase WalletConnectSharpv2",
        Icons = new[] { "https://walletconnect.com/meta/favicon.ico" },
        Name = "WalletConnectSharpv2 Dapp Example",
        Url = "https://walletconnect.com"
    },
    // Uncomment to disable persistant storage
    // Storage = new InMemoryStorage()
};
```

Once you have `AuthOptions` defined, you can use `WalletConnectAuthClient.Init` to initalize the client

```csharp
var walletClient = await WalletConnectAuthClient.Init(walletOptions);
```

## Pairing

To pair with a dApp given a URI (either thru deep-linking or a QRCode), you must use `Core.Pairing.Pair(uri)` function. This process
is exactly the same as found in the Pairing API.

```csharp
string uri = GrabURIFromDapp();

await walletClient.Core.Pairing.Pair(uri);
```

## Responding to Authentication

Once you have the Auth client initialized, you can respond to auth request from any paired dApp. First, you listen for the `AuthRequested` event. The callback function for the `AuthRequested` event can be an `async void` function. Then, you must build an `iss` string that has the following format

```csharp
var walletAddress = "0x...";
var chainNamespace = "eip155";
var chainId = "1";

var iss = $"did:pkh:{chainNamespace}:{chainId}:{walletAddress}";
```

In the following example, we use NEthereum to sign the message using personal sign. Once the message has been signed, we use `walletClient.Respond` to respond to the auth request.

```csharp
// NEthereum wallet example
var wallet = new Wallet(Wordlist.English, WordCount.Twelve);

// Grab wallet address from new NEthereum wallet
var walletAddress = wallet.GetAddresses(1)[0];

// Example ISS string
var iss = $"did:pkh:eip155:1:{walletAddress}";

async void OnAuthRequested(object sender, AuthRequest request)
{
    var message = walletClient.FormatMessage(request.Parameters.CacaoPayload, iss);

    // Sign auth message using NEthereum
    var signature = await wallet.GetAccount(walletAddress).AccountSigningService.PersonalSign.SendRequestAsync(Encoding.UTF8.GetBytes(message));

    await walletClient.Respond(new Cacao() 
    { 
        Id = request.Id, 
        Signature = new Cacao.CacaoSignature.EIP191CacaoSignature(signature) 
    }, iss);
}

walletClient.AuthRequested += OnAuthRequested;
```

You do not need to respond to the authentication request inside the callback. You may respond to the request at anytime using `walletClient.Respond`, however **you must know the request id** of the requet you are responding to. 
