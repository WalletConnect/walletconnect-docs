# Dapp Usage

## Setup

First you must setup `AuthOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var dappOptions = new AuthOptions()
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
var dappClient = await WalletConnectAuthClient.Init(dappOptions);
```

## Requesting Authentication

Once you have the Auth client initialized, you can make an auth request to a wallet. Making an auth request will give you a `uri` that can be placed into a QR Code or used to open a deeplink.

To setup an auth request, you must build a `RequestParams` that specifies the dApp that is being authenticated

```csharp
var localhostAuthRequest = new RequestParams()
{
    Aud = "http://localhost:3000/login",
    Domain = "localhost:3000",
    ChainId = "eip155:1",
    Nonce = CryptoUtils.GenerateNonce()
};
```

Once you have created the `RequestParams`, you can send the request to be authenticated.

```csharp
var uriData = await dappClient.Request(localhostAuthRequest);
var uri = uriData.Uri;
```

You can grab the `Uri` for the authentication request from `uriData`.

```csharp
ExampleShowQRCode(uriData.Uri);
```

## Listening to Events

You can listen to authentication responses using the `AuthResponded` event

```csharp
void OnAuthResponded(object sender, AuthResponse args)
{
    var sessionTopic = args.Topic;
    var cacao = args.Response.Result;
    var signature = cacao.Signature;
    Console.WriteLine($"{sessionTopic}: {signature}");
}

dappClient.AuthResponded += OnAuthResponded;
```

You can also listen to authentication errors using the `AuthError` event

```csharp
void OnAuthError(object sender, AuthErrorResponse args)
{
    var sessionTopic = args.Topic;
    var error = args.Error;
    Console.WriteLine($"{sessionTopic}: {error}");
}

dappClient.AuthError += OnAuthError;
```