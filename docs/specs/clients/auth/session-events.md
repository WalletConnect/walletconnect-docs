import Table from '../../../components/Table';

# Session Events
## Events

You can set up event listeners to perform an action when these events are emitted.

<Table 
headers={[ "Events", "Description" ]}
data={[
{
event: "auth_request",
description: "Emitted by the wallet when there is a request for authentication from a dapp.",
},
{
event: "auth_response",
description: "Emitted by the dapp when there is a response from a wallet accepting/rejecting an authorization request."
},
]}
/>

## Triggering Events

To trigger one of the events from above, you generally need to call an action. Below is a list of methods and their associated events. This is not a full list of available methods, just the ones that emit an event.

<Table 
headers={[ "Method", "Description", "Event On", "Event Triggered on Peer" ]}
data={[
{
methodAuth: "request",
description: "Send a method call request to a WalletConnect server",
eventOn: "none",
eventTriggered: "auth_request"
},
{
methodAuth: "respond",
description: "Responds to an authoirzation request",
eventOn: "client.on('auth_request')",
eventTriggered: "auth_response"
},
{
methodAuth: "getPendingRequests",
description: "Establishes a connection with a WalletConnect server",
eventOn: "none",
eventTriggered: "none"
},
{
methodAuth: "formatMessage",
description: "Establishes a connection with a WalletConnect server",
eventOn: "none",
eventTriggered: "none"
},
]}
/>
