# Dapp Usage

First you must setup `SignClientOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var dappOptions = new SignClientOptions()
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

Then, you must setup the `ConnectOptions` which define what blockchain, RPC methods and events your dapp will use.

*C# Constructor*

```csharp
var dappConnectOptions = new ConnectOptions()
{
    RequiredNamespaces = new RequiredNamespaces()
    {
        {
            "eip155", new RequiredNamespace()
            {
                Methods = new[]
                {
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData",
                },
                Chains = new[]
                {
                    "eip155:1"
                },
                Events = new[]
                {
                    "chainChanged",
                    "accountsChanged",
                }
            }
        }
    }
};
```

*Builder Functions Style*

```csharp
var dappConnectOptions1 = new ConnectOptions()
    .RequireNamespace("eip155", new RequiredNamespace()
        .WithMethod("eth_sendTransaction")
        .WithMethod("eth_signTransaction")
        .WithMethod("eth_sign")
        .WithMethod("personal_sign")
        .WithMethod("eth_signTypedData")
        .WithChain("eip155:1")
        .WithEvent("chainChanged")
        .WithEvent("accountsChanged")
    );
```

With both options defined, you can initialize and connect the SDK.

```csharp
var dappClient = await WalletConnectSignClient.Init(dappOptions);
var connectData = await dappClient.Connect(dappConnectOptions);
```

You can grab the `Uri` for the connection request from `connectData`.

```csharp
ExampleShowQRCode(connectData.Uri);
```

and await for connection approval using the `Approval` Task object

```csharp
Task<SessionData> sessionConnectTask = connectData.Approval;
SessionData sessionData = await sessionConnectTask;

// or
// SessionData sessionData = await connectData.Approval;
```

This `Task` will return the `SessionData` when the session was approved, or throw an exception when the session rquest has either

* Timed out
* Been Rejected
