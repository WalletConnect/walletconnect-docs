import Table from '../../../components/Table';

# Session Events

## Events

You can set up event listeners to perform an action when these events are emitted.

<Table 
headers={[ "Event", "Description", "Who Should Listen" ]}
data={[
{
    event: "auth_request",
    description: "Emitted wallet when there is a request for authentication from a dapp.",
    whoShouldListen: "Dapps"
  },
  {
    event: "auth_response",
    description: "Emitted by a dapp when there is a response from a wallet accepting/rejecting an authorization request.",
    whoShouldListen: "Wallets"
  }
]}
/>

### auth_request


### auth_response