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

The wallet can then approve or reject the proposal using either of the following:

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

## WalletConnect Methods

All sign methods require the `topic` of the session to be given. This can be found in the `SessionStruct` object given when a session has been given approval by the user.

```csharp
var sessionTopic = sessionData.Topic;
```

### Update Session

Update a session, adding/removing additional namespaces in the given topic.

```csharp
var newNamespaces = new Namespaces(...);
var request = await walletClient.UpdateSession(sessionTopic, newNamespaces);
await request.Acknowledged();
```

### Extend Session

Extend a session's expiry time so the session remains open

```csharp
var request = await walletClient.Extend(sessionTopic);
await request.Acknowledged();
```

### Ping

Send a ping to the session

```csharp
var request = await walletClient.Ping(sessionTopic);
await request.Acknowledged();
```

## Responding to Session Requests

Responding to session requests is very similar to sending session requests. See dApp usage on how sending session requests works. All custom session requests requires a request class **and** response class to be created that matches the `params` field type in the custom session request. C# is a staticly typed language, so these types must be given whenever you do a session request (or do any querying for session requests). 

Currently, **WalletConnectSharp does not automatically assume the object type for `params` is an array**. This is very important, since most EVM RPC requests have `params` as an array type. **Use List<T> to workaround this**. For example, for `eth_sendTransaction`, use `List<Transaction>` instead of `Transaction`. 

Newtonsoft.Json is used for JSON serialization/deserialization, therefor you can use Newtonsoft.Json attributes when defining fields in your request/response classes.

### Building a Response type

Create a class for the response and populate it with the JSON properties the response object has. For this example, we will use `eth_getTransactionReceipt`

The `params` field for `eth_getTransactionReceipt` has the object type

```csharp
using Newtonsoft.Json;
using System.Numerics;

[RpcMethod("eth_getTransactionReceipt"), RpcRequestOptions(Clock.ONE_MINUTE, 99995)]
public class TransactionReceipt
{
    [JsonProperty("transactionHash")]
    public string TransactionHash;
    
    [JsonProperty("transactionIndex")]
    public BigInteger TransactionIndex;
    
    [JsonProperty("blockHash")]
    public string BlockHash;
    
    [JsonProperty("blockNumber")]
    public BigInteger BlockNumber;
    
    [JsonProperty("from")]
    public string From;
            
    [JsonProperty("to")]
    public string To;
    
    [JsonProperty("cumulativeGasUsed")]
    public BigInteger CumulativeGasUsed;
    
    [JsonProperty("effectiveGasPrice ")]
    public BigInteger EffectiveGasPrice ;
    
    [JsonProperty("gasUsed")]
    public BigInteger GasUsed;
    
    [JsonProperty("contractAddress")]
    public string ContractAddress;
    
    [JsonProperty("logs")]
    public object[] Logs;
    
    [JsonProperty("logsBloom")]
    public string LogBloom;
    
    [JsonProperty("type")]
    public BigInteger Type;
    
    [JsonProperty("status")]
    public BigInteger Status;
}
```

The `RpcMethod` class attributes defines the rpc method this response uses, this is optional. The `RpcResponseOptions` class attributes define the expiry time and tag attached to the response, **this is required**. 

### Sending a response

To respond to requests from a dApp, you must define the class representing the request object type. The request type for `eth_getTransactionReceipt` is the following:

```csharp
[RpcMethod("eth_getTransactionReceipt"), RpcRequestOptions(Clock.ONE_MINUTE, 99994)]
public class EthGetTransactionReceipt : List<string>
{
    public EthGetTransactionReceipt(params string[] hashes) : base(hashes)
    {
    }
}
```

We can handle the `eth_getTransactionReceipt` session request by doing the following:

```csharp
walletClient.Engine.SessionRequestEvents<EthGetTransactionReceipt, TransactionReceipt>().OnRequest += OnEthTransactionReceiptRequest;

private Task OnEthTransactionReceiptRequest(RequestEventArgs<EthGetTransactionReceipt, TransactionReceipt> e)
{
    // logic for request goes here
    // set e.Response to return a response
}
```

The callback function gets invoked whenever the wallet receives the `eth_getTransactionReceipt` request from a connected dApp. You may optionally filter further which requests are handled using the `FilterRequests` function 

```csharp
walletClient.Engine.SessionRequestEvents<EthGetTransactionReceipt, TransactionReceipt>()
    .FilterRequests(r => r.Topic == sessionTopic)
    .OnRequest += OnEthTransactionReceiptRequest;
```

The callback returns a `Task`, so the callback can be made async. To return a response, **you must** set the `Response` field in `RequestEventArgs<T, TR>` with the desired response.

```csharp
private async Task OnEthTransactionReceiptRequest(RequestEventArgs<EthGetTransactionReceipt, TransactionReceipt> e)
{
    var txHash = e.Request.Params[0];
    var receipt = await EthGetTransactionReceipt(txHash);
    e.Response = receipt;
}
```

## Disconnecting

To disconnect a session, use the `Disconnect` function. You may optional provide a reason for the disconnect

```csharp
await walletClient.Disconnect(sessionTopic);

// or

await walletClient.Disconnect(sessionTopic, Error.FromErrorType(ErrorType.USER_DISCONNECTED));
```
