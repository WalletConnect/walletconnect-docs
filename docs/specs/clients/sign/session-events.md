import Table from '../../../components/Table';

# Session Events

## Events

You can set up event listeners to perform an action if these events are emitted.

<Table 
headers={[ "Event", "Description" ]}
data={[
{
event: "session_proposal",
description: "Emitted by the dapp when it makes a session proposal",
},
{
event: "session_connect",
description: "Sent by the WalletConnect serve when the wallet approves the session proposal",
},
{
event: "session_request",
description: "Sent by the WalletConnect client when it wants to create a new session with the server.",
},
{
event: "session_approve",
description: "Sent by the wallet once the user approves the session request",
},
{
event: "session_update",
description: "Sent by the WalletConnect client when it wants to update an existing session with the server.",
},
{
event: "session_delete",
description: "Either the wallet or the dapp can emit this event when a session is disconnected",
},
{
event: "session_event",
description: "Sent by the WalletConnect client when it wants to emit an event to the server.",
},
{
event: "session_ping",
description: "Sent by the WalletConnect client to keep a session alive.",
},
{
event: "session_expire",
description: "Sent by the WalletConnect server when a session expires.",
},
{
event: "session_extend",
description: "Sent by the WalletConnect client when it wants to extend an existing session with the server.",
},
]}
/>

## Triggering Events

To trigger one of the events from above, you generally need to call an action. Below are a list of methods and their associated events. This is not a full list of the function available, just the ones that emit an event.

<Table 
headers={[ "Method", "Event On", "Event Triggered" ]}
data={[
{
methodSign: "connect",
eventOn: "none",
eventTriggered: "session_connect"
},
{
methodSign: "pair",
eventOn: "none",
eventTriggered: "session_connect"
},
{
methodSign: "approve",
eventOn: "client.on('session_proposal')",
eventTriggered: "session_approve"
},
{
methodSign: "reject",
eventOn: "none",
eventTriggered: "session_rejected"
},
{
methodSign: "update",
eventOn: "none",
eventTriggered: "session_updated"
},
{
methodSign: "extend",
eventOn: "client.on('session_extend')",
eventTriggered: "session_extend"
},
{
methodSign: "request",
eventOn: "none",
eventTriggered: "session_request"
},
{
methodSign: "respond",
eventOn: "client.on('session_request')",
eventTriggered: "session_respond"
},
{
methodSign: "ping",
eventOn: "none",
eventTriggered: "session_ping"
},
{
methodSign: "emit",
eventOn: "none",
eventTriggered: "session_event"
},
{
methodSign: "disconnect",
eventOn: "none",
eventTriggered: "session_delete"
},
{
methodSign: "find",
eventOn: "none",
eventTriggered: "none"
},
{
methodSign: "getPendingSessionRequests",
eventOn: "none",
eventTriggered: "none"
},
{
methodSign: "getAll",
eventOn: "none",
eventTriggered: "none"
},
]}
/>
