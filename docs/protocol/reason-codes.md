# Reason Codes

Whenever a state change event or error is emitted between two clients it will include a reason code with a message which will be included in the list of reasons below:

```yaml
	# 0 (Generic)
	code: 0
	message: message

  # 1000 (Internal)
	code: 1000
	message: "Missing or invalid ${name}"

	code: 1001
	message: "Response is required for approved ${context} proposals"

	code: 1002
	message: "Decrypt params required for ${context}"

	code: 1003
	message: "Invalid ${context} update request"

	code: 1004
	message: "Invalid ${context} upgrade request"

	code: 1005
	message: "Invalid storage key name: ${name}"

	code: 1100
	message: "Record already exists for ${context} matching id: ${id}"

	code: 1200
	message: "Restore will override already set ${context}"

	code: 1300
	message: "No matching ${context} with id: ${id}"

	code: 1301
	message: "No matching ${context} with topic: ${topic}"

	code: 1302
	message: "No response found in pending ${context} proposal"

	code: 1303
	message: "No matching key with tag: ${tag}"

	code: 1400
	message: "Unknown JSON-RPC Method Requested: ${method}"

	code: 1500
	message: "Mismatched topic for ${context} with id: ${id}"

	code: 1501
	message: "Invalid accounts with mismatched chains: ${mismatched_array}"

	code: 1600
	message: "${context} settled"

	code: 1601
	message: "${context} not approved"

	code: 1602
	message: "${context} proposal responded"

	code: 1603
	message: "${context} response acknowledge"

	code: 1604
	message: "${context} expired"

	code: 1605
	message: "${context} deleted"

	code: 1606
	message: "Subscription resubscribed with topic: ${topic}"

  # 2000 (Timeout)
	code: 2000
	message: "${context} failed to settle after ${timeout} seconds"

	code: 2001
	message: "JSON-RPC Request timeout after ${timeout} seconds: ${method}"

  # 3000 (Unauthorized)
	code: 3000
	message: "Unauthorized Target ChainId Requested: ${chainId}"

	code: 3001
	message: "Unauthorized JSON-RPC Method Requested: ${method}"

	code: 3002
	message: "Unauthorized Notification Type Requested: ${type}"

	code: 3003
	message: "Unauthorized ${context} update request"

	code: 3004
	message: "Unauthorized ${context} upgrade request"

	code: 3005
	message: "Unauthorized: peer is also ${"" | "not"} controller"

  # 4000 (EIP-1193)
	code: 4001
	message: "User rejected the request."

	code: 4100
	message: "The requested account and/or method has not been authorized by the user."

	code: 4200
	message: "The requested method is not supported by this ${blockhain} provider."

	code: 4900
	message: "The provider is disconnected from all chains."

	code: 4901
	message: "The provider is disconnected from the specified chain."

  # 5000 (CAIP-25)
	code: 5000
	message: "User disapproved requested chains"

	code: 5001
	message: "User disapproved requested json-rpc methods"

	code: 5002
	message: "User disapproved requested notification types"

	code: 5100
	message: "Requested chains are not supported: ${chains_array}"

	code: 5101
	message: "Requested json-rpc methods are not supported: ${methods_array}"

	code: 5102
	message: "Requested notification types are not supported: ${types_array}"

	code: 5103
	message: "Proposed ${context} signal is unsupported"

	code: 5900
	message: "User disconnected ${context}"

  # 9000 (Unknown)
	code: 9000
	message: "Unknown error${"" || ": ${error_message}"}"
```
