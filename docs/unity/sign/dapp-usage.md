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

Then await connection approval using the `Approval` Task object.

```csharp
Task<SessionStruct> sessionConnectTask = connectData.Approval;
SessionStruct sessionData = await sessionConnectTask;

// or
// SessionStruct sessionData = await connectData.Approval;
```

This `Task` will return the `SessionStruct` when the session was approved, or throw an exception when the session rquest has either

* Timed out
* Been Rejected

## Connected Address

To get the currently connected address, use the following function

```csharp
public class Caip25Address 
{
    public string Address;
    public string ChainId;
}

public Caip25Address GetCurrentAddress(string chain)
{
    if (string.IsNullOrWhiteSpace(chain))
        return null;

    var defaultNamespace = currentSession.Namespaces[chain];

    if (defaultNamespace.Accounts.Length == 0)
        return null;
        
    var fullAddress = defaultNamespace.Accounts[0];
    var addressParts = fullAddress.Split(":");
        
    var address = addressParts[2];
    var chainId = string.Join(':', addressParts.Take(2));

    return new Caip25Address() 
    {
        Address = address,
        ChainId = chainId,
    };
}

public Caip25Address GetCurrentAddress()
{
    var currentSession = dappClient.Session.Get(dappClient.Session.Keys[0]);

    var defaultChain = currentSession.Namespaces.Keys.FirstOrDefault();
        
    if (string.IsNullOrWhiteSpace(defaultChain))
        return null;

    return GetCurrentAddress(defaultChain);
}
```

## WalletConnect Methods

All sign methods require the `topic` of the session to be given. This can be found in the `SessionStruct` object given when a session has been given approval by the user.

```csharp
var sessionTopic = sessionData.Topic;
```

### Update Session

Update a session, adding/removing additional namespaces in the given topic.

```csharp
var newNamespaces = new Namespaces(...);
var request = await dappClient.UpdateSession(sessionTopic, newNamespaces);
await request.Acknowledged();
```

### Extend Session

Extend a session's expiry time so the session remains open

```csharp
var request = await dappClient.Extend(sessionTopic);
await request.Acknowledged();
```

### Ping

Send a ping to the session

```csharp
var request = await dappClient.Ping(sessionTopic);
await request.Acknowledged();
```


## Session Requests

Sending session requests as a dapp requires to build the request **and** response classes that the session request `params` will be structured. C# is a staticly typed language, so these types must be given whenever you do a session request (or do any querying for session requests). 

Currently, **WalletConnectSharp does not automatically assume the object type for `params` is an array**. This is very important, since most EVM RPC requests have `params` as an array type. **Use List<T> to workaround this**. For example, for `eth_sendTransaction`, use `List<Transaction>` instead of `Transaction`. 

Newtonsoft.Json is used for JSON serialization/deserialization, therefor you can use Newtonsoft.Json attributes when defining fields in your request/response classes.

### Building a Request type

Create a class for the request and populate it with the JSON properties the request object has. For this example, we will use `eth_sendTransaction`

The `params` field for `eth_sendTransaction` has the object type

```csharp
using Newtonsoft.Json;

public class Transaction
{
    public string from;
    
    // Newtonsoft.Json attributes can be used
    [JsonProperty("to")]
    public string To;
    
    [JsonProperty("gas", NullValueHandling = NullValueHandling.Ignore)]
    public string Gas;
    
    // Properties have limited support
    [JsonProperty("gasPrice", NullValueHandling = NullValueHandling.Ignore)]
    public string GasPrice { get; set; }
    
    [JsonProperty("value")]
    public string Value { get; set; }

    [JsonProperty("data", NullValueHandling = NullValueHandling.Ignore)]
    public string Data { get; set; } = "0x";
}
```

NOTE: [**the `params` field is an array of this object**](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)

```json
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```


Now, let's define the actual request class we'll use in `dappClient.Request`

```csharp
[RpcMethod("eth_sendTransaction"), RpcRequestOptions(Clock.ONE_MINUTE, 99997)]
public class EthSendTransaction : List<Transaction>
{
    public EthSendTransaction(params Transaction[] transactions) : base(transactions)
    {
    }
}
```

The `RpcMethod` class attributes defines the rpc method this request uses. The `RpcRequestOptions` class attributes define the expiry time and tag attached to the request. **Both of these attributes are required**

We use `List<Transaction>` since the `params` field for `eth_sendTransaction` is actually sent as an object array. If the `params` field was a normal object, then we could use `Transaction` or define the fields directly into this class.

### Sending a request

The response type for `eth_sendTransaction` is a `string`, so no response type is required to be made. You only need to create a response type if the response type is a custom object. 

```csharp
var wallet = GetCurrentAddress();
var result = new EthSendTransaction(new Transaction()
{
    From = wallet.Address,
    To = wallet.Address,
    Value = "0"
});

// Returns the transaction hash or throws an error
string result = await dappClient.Request<EthSendTransaction, string>(sessionTopic, request, wallet.ChainId);
```

## Disconnecting

To disconnect a session, use the `Disconnect` function. You may optional provide a reason for the disconnect

```csharp
await dappClient.Disconnect(sessionTopic);

// or

await dappClient.Disconnect(sessionTopic, Error.FromErrorType(ErrorType.USER_DISCONNECTED));
```