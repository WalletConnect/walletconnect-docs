import Table from '../../../components/Table';

# Session Events

## Events

<Table 
headers={[ "Events", "Description" ]}
data={[
{
event: "auth_request",
description: "Sent by the WalletConnect client when requesting authentication from your wallet.",
},
{
event: "auth_response",
description: "Sent by the WalletConnect server when it acceps or rejects an authorization request."
},
]}
/>

## Methods

<Table 
headers={[ "Sign v2", "Web3Wallet", "Auth", "Description", "Event On", "Event Triggered" ]}
data={[
{
methodSign: "connect",
methodWallet: "?",
methodAuth: "?",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "connect",
methodWallet: "?",
methodAuth: "?",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "pair",
methodWallet: "?",
methodAuth: "jshadvas",
description: "Pair with a WalletConnect server using a pairing topic and URI",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "approve",
methodWallet: "approveSession",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "reject",
methodWallet: "rejectSession",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "update",
methodWallet: "updateSession",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "extend",
methodWallet: "extendSession",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "request",
methodWallet: "X",
methodAuth: "request",
description: "Send a method call request to a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "respond",
methodWallet: "respondSessionRequest",
methodAuth: "X",
description: "Responds to a session request",
eventOn: "client.on('session_request')",
eventTriggered: "session_respond"
},
{
methodSign: "ping",
methodWallet: "jshadvas",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "emit",
methodWallet: "emitSessionEvent",
methodAuth: "jshadvas",
description: "Emits an event to an active session",
eventOn: "N/A",
eventTriggered: "session_event"
},
{
methodSign: "disconnect",
methodWallet: "disconnectSession",
methodAuth: "jshadvas",
description: "Disconnects ",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "find",
methodWallet: "jshadvas",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "getPendingSessionRequests",
methodWallet: "jshadvas",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "getAll",
methodWallet: "jshadvas",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "proposal.getAll",
methodWallet: "getPendingSessionProposals",
methodAuth: "jshadvas",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "x",
methodWallet: "respondAuthRequest",
methodAuth: "respond",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "x",
methodWallet: "getPendingAuthRequests",
methodAuth: "getPendingRequests",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
{
methodSign: "x",
methodWallet: "formatMessage",
methodAuth: "formatMessage",
description: "Establishes a connection with a WalletConnect server",
eventOn: "N/A",
eventTriggered: "session_connect"
},
]}
/>
