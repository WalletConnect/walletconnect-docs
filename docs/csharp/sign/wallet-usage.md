# Wallet Usage

First you must setup `SignClientOptions` which stores both the `ProjectId` and `Metadata`. You may also optionally specify the storage module to use. By default, the `FileSystemStorage` module is used if none is specified.

```csharp
var walletOptions = new SignClientOptions()
{
    ProjectId = "39f3dc0a2c604ec9885799f9fc5feb7c",
    Metadata = new Metadata()
    {
        Description = "An example wallet to showcase WalletConnectSharpv2",
        Icons = new[] { "https://walletconnect.com/meta/favicon.ico" },
        Name = "WalletConnectSharpv2 Wallet Example",
        Url = "https://walletconnect.com"
    },
    // Uncomment to disable persistant storage
    // Storage = new InMemoryStorage()
};
```

Once you have the options defined, you can initialize the SDK.

```csharp
var walletClient = await WalletConnectSignClient.Init(walletOptions);
```

Wallets can pair an incoming session using the session's Uri. Pairing a session lets the Wallet obtain the connection proposal which can then be approved or denied.

```csharp
ProposalStruct proposal = await walletClient.Pair(connectData.Uri);
```

The wallet can then approve or reject the proposal using either of the following

```csharp
string addressToConnect = ...;
var approveData = await walletClient.Approve(proposal, addressToConnect);
await approveData.Acknowledged();
```

```csharp
string[] addressesToConnect = ...;
var approveData = await walletClient.Approve(proposal, addressesToConnect);
await approveData.Acknowledged();
```

```csharp
await walletClient.Reject(proposal, "User rejected");
```