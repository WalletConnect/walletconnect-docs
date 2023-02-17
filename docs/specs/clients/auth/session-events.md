import Table from '../../../components/Table';

# Session Events

## Events

You can set up event listeners to perform an action when these events are emitted.

<Table 
headers={[ "Event", "Description", "Who Should Listen" ]}
data={[
{
    event: "auth_request",
    description: "Emitted by wallet when there is a request for authentication from a dapp.",
    whoShouldListen: "Wallets"
  },
  {
    event: "auth_response",
    description: "Emitted by a dapp when there is a response from a wallet accepting/rejecting an authorization request.",
    whoShouldListen: "Dapps"
  }
]}
/>

### auth_request

When the wallet receives an authorization request, it will emit the `auth_request` event. The wallet should listen for this event and respond by either accepting or rejecting the request.

An example of a payload from `auth_request`:

```ts
{
    "id": 1675888751218236,
    "topic": "5d76793fc9120b07cd3555eab7dd7b28b62f2111dde168ea3ccebd5996f25179",
    "params": {
        "requester": {
            "publicKey": "6c4e9d9f1647c521b15cb991e8beba5ff06a2ec9049f09e2fd9d459b59a4ee6f",
            "metadata": {
                "name": "react-dapp-auth",
                "description": "React Example Dapp for Auth",
                "url": "react-auth-dapp.walletconnect.com",
                "icons": []
            }
        },
        "cacaoPayload": {
            "aud": "https://react-auth-dapp.walletconnect.com/",
            "domain": "walletconnect.com",
            "version": "1",
            "nonce": "t8brJc6ij9NB1b8nR",
            "iat": "2023-02-08T20:39:11.217Z",
            "statement": "Sign in with wallet."
        }
    }
}
```

### auth_response

Once the wallet receives the request, the user will have the option to either approve or reject it. The following payloads represent what is emitted by `auth_response` for an approved request and a rejected request, respectively.

#### Wallet Approved Request

```ts
{
    "id": 1675889041848803,
    "topic": "4837ed5fd3ee6d0353c792b913f53548a1dff7d60760698c03eb96080ad59106",
    "params": {
        "id": 1675889041848803,
        "jsonrpc": "2.0",
        "result": {
            "h": {
                "t": "eip4361"
            },
            "p": {
                "aud": "http://localhost:3000/",
                "domain": "localhost",
                "version": "1",
                "nonce": "KPqIBL240nywhVdRw",
                "iat": "2023-02-08T20:44:01.847Z",
                "statement": "Sign in with wallet.",
                "iss": "did:pkh:eip155:1:0x977aeFEC1879160eC9560cd16f08e12B6DF52ed1"
            },
            "s": {
                "s": "0x953e1b7e92454d444628d5852b902e1ebe33687c2b51b84d799bf06399b59695449fb882abb661f342e94708cdc8186d4d53472b6aa90a780ef616d3a89bce931c",
                "t": "eip191"
            }
        }
    }
}
```

#### Wallet Rejects Request

```ts
{
    "id": 1675889292613258,
    "topic": "ba49b21e73c4b6875c63911a545c71743b589c51389f92e0daed0c3ae815b8ab",
    "params": {
        "id": 1675889292613258,
        "jsonrpc": "2.0",
        "error": {
            "message": "User rejected.",
            "code": 5000
        }
    }
}
```