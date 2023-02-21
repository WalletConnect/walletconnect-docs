# Optional Namespaces

[**CAIP-25**](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md) requests require scope objects to ensure that both wallets and dapps agree on the syntax and semantics of specific methods and notifications, some of which may be specific to certain chains or subsets of wallets and dapp. This negotiation of semantic anchors and network routing is necessary to ensure that authorization occurs with the correct method or notification on the appropriate RPC endpoint.

**Required Namespaces** - It's the map of the required authorized chains, events, and methods that the wallet must satisfy to successfully establish an active session.

**Optional Namespaces** - It's the map of the optional authorized chains, events, and methods that it's up to the wallet choice to satisfy all, none, or some of them when approving a session.

## Receiving a Session Proposal

When a dapp sends a session proposal to the wallet to establish a session, the proposal will include the required and optional namespaces that the dapp is requesting permission for.

### Example of Proposal Namespaces (Required and Optional)

```
{
	"requiredNamespaces": {
		"eip155": {
			"chains": ["eip155:1", "eip155:137"],
			"methods": ["eth_sendTransaction", "eth_signTransaction", "eth_sign", "get_balance"],
			"events": ["accountsChanged", "chainChanged"]
		},
		"eip155:10": {
			"methods": ["get_balance"],
			"events": ["accountsChanged", "chainChanged"]
		},
		"cosmos": {
			...
		}
	},
	"optionalNamespaces": {
		"eip155:42161": {
			"methods": ["eth_sendTransaction", "eth_signTransaction", "get_balance", "personal_sign"],
			"events": ["accountsChanged", "chainChanged"]
		}
	}
}
```

## Responding to a Session Proposal

Once the wallet receives the session proposal, including the `requiredNamespaces` object, the wallet evaluates these required and optional namespaces and, if approved, sends back the session namespaces.

### Example of Session Namespace Response

```
"sessionNamespaces": {
	"eip155": {
		"chains": ["eip155:1", "eip155:137"],
		"methods": ["eth_sendTransaction", "eth_signTransaction", "get_balance", "eth_sign"]
		"events": ["accountsChanged", "chainChanged"],
		"accounts": ["eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb", "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"]
	},
	"eip155:10": {
		"methods": ["get_balance"],
		"events": ["accountsChanged", "chainChanged"],
		"accounts:" []
	},
	"eip155:42161": {
		"methods": ["personal_sign"],
		"events": ["accountsChanged", "chainChanged"],
		"accounts":["eip155:42161:0x0910e12C68d02B561a34569E1367c9AAb42bd810"]
	"cosmos": {
		...
	}
}
```

### Approving a Session Response

The validation is handled by the WalletConnect Sign API.

✅ Session namespaces **MUST** be included in the session approval response

✅ Both required and optional namespaces are indexed with [namespace](https://chainagnostic.org/CAIPs/caip-2#syntax) or [CAIP-2](https://chainagnostic.org/CAIPs/caip-2)

✅ All required namespaces **MUST** be satisfied by a wallet

✅ All, none or some of the optional namespaces **MUST** be satisfied by a wallet

✅ If both required and optional namespaces are empty in the session proposal object it means that there're no requirements regarding chains, events or methods

✅ Chains **MIGHT** be omitted if the [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) is defined in the index 

✅ Each object **MUST** contain the accounts[CAIP-10](https://chainagnostic.org/CAIPs/caip-10) array which **MIGHT** be empty, those accounts are authorized for a session and **MUST** be valid in the namespace or chain they are in

### Rejecting a Session Response

If the user does not approve the requested chains, methods, or accounts, or if the wallet does not support the requested chains or methods, the response should not be considered a success

:::tip
For a list of error codes, view [Failure States](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md#failure-states).
:::
