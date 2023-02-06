import Table from '../../../components/Table';

# Session Events

## Events

You can set up event listeners to perform an action if these events are emitted.

<Table 
headers={[ "Event", "Description" ]}
data={[
{
    event: "session_proposal",
    description: "Emitted by the dApp when a new session with a user's wallet is initiated. The method the dapp uses is `connect`"
  },
  {
    event: "session_request",
    description: "Triggered by the dApp when it requires the wallet to perform an action, such as signing a transaction by calling the `request` method"
  },
  {
    event: "session_update",
    description: "Emitted by the wallet when a session is updated via the 'update' method"
  },
  {
    event: "session_delete",
    description: "Emitted by either the wallet or the dApp when a session is disconnected."
  },
  {
    event: "session_event",
    description: "Emitted by the dApp or wallet by calling the 'emit' or 'emitSessionEvent' method."
  },
  {
    event: "session_ping",
    description: "Emitted by the dApp to keep a session active."
  },
  {
    event: "session_expire",
    description: "Emitted by the wallet when a session has expired."
  },
  {
    event: "session_extend",
    description: "Emitted by the wallet to extend a session by calling the 'extendSession' method."
  },
  {
    event: "proposal_expire",
    description: "Emitted by the wallet when the session proposal has expired."
  }
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
