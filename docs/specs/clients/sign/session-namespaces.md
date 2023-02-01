# Session Namespaces

Let's say a dapp wants access to Ethereum Mainnet, Polygon, Cosmos Mainnet.
It specifies the proposed execution environment for each blockchain in the form of namespaces. For example, for Ethereum Mainnet and Polygon, it requires: `eth_sign` method and `accountsChanged` event, and, for Cosmos Mainnet, it requires: `cosmos_signDirect` method and `someCosmosEvent` event. Let's say that Polygon also has a special method `personalSign` and an event `chainChanged` not available in Ethereum Mainnet.

## Example Proposal Namespaces request

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:137", "eip155:1"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    },
    "cosmos": {
      "chains": ["cosmos:cosmoshub-4"],
      "methods": ["cosmos_signDirect"],
      "events": ["someCosmosEvent"]
    }
  }
}
```

The Wallet then validates if the received Proposal Namespaces are valid. If they are not valid, then the session cannot be established and the Wallet rejects it with a `1006` code that tells the Dapp that the Proposal Namespaces are invalid. If they are valid, then the Wallet if free to decide whether to approve the proposal, or reject it.

If the Wallet (or the user) does NOT approve the session, then it is rejected. Otherwise, the Wallet responds with a slightly different namespace schema: Session Namespaces. Instead of having a list of `chains`, it has list of `accounts` compatible with the given methods and events. If the Wallet approves a session proposal, it needs to approve all methods and events of all Proposal Namespaces. If needed, the Wallet can add permissions for more methods and events than the ones requested, but never less.

## Example Session Namespaces response

```json
{
  "namespaces": {
    "eip155": {
      "accounts": [
        "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
        "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
      ],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    },
    "cosmos": {
      "accounts": [
        "cosmos:cosmoshub-4:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0"
      ],
      "methods": ["cosmos_signDirect", "personal_sign"],
      "events": ["someCosmosEvent", "proofFinalized"]
    }
  }
}
```

The Dapp then validates if the received Session Namespaces comply with the requested Proposal Namespaces. If so, the session is established / settled. If not, the session is not established and MUST delete all related cached data.

# Validation test cases

## Controller side validation of incoming Proposal Namespaces (Wallet)

---

### 1.1. Proposal Namespaces MUST NOT have chains empty

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "cosmos": {
      "chains": [],
      "methods": ["cosmos_signDirect"],
      "events": ["someCosmosEvent"]
    }
  }
}
```

Is valid?: No

Note: Proposal namespace doesn't have any chains, hence it's invalid

Throw Message: `Chains must not be empty`
Throw Error Code: `case .unsupportedChains: return 5100`

---

### 1.2. Chains MUST be CAIP-2 compliant

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["42"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Is valid?: No

Note: `42` is not CAIP-2 compliant. `eip155:42` is CAIP-2 compliant.

Throw Message: `Chains must be CAIP-2 compliant`
Throw Error Code: `case .unsupportedChains: return 5100`

---

### 1.3. Proposal namespace methods and events MAY be empty

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": [],
      "events": []
    }
  }
}
```

Is valid?: Yes

---

### 1.4. All chains in the namespace MUST contain the namespace prefix

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1", "cosmos:cosmoshub-4"],
      "methods": ["personalSign"],
      "events": ["chainChanged"]
    }
  }
}
```

Is valid?: No

Note: `cosmos:cosmoshub-4` does not contain `eip155` prefix

Throw Message: `Chains must be defined in matching namespace`
Throw Error Code: `case .unsupportedChains: return 5100`

---

### 1.5. Namespace key must comply with CAIP-2 specification

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "": {
      "chains": [":1"],
      "methods": ["personalSign"],
      "events": []
    },
    "**": {
      "chains": ["**:1"],
      "methods": ["personalSign"],
      "events": []
    }
  }
}
```

Is valid?: No

Note: Namespaces must match regex `[-a-z0-9]{3,8}`. Source: [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)

Throw Message: `Namespace formatting must match CAIP-2`
Throw Error Code: `case .unsupportedNamespaceKey: return 5104`

---

### 1.6. All namespaces MUST be valid

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": ["personalSign"],
      "events": []
    },
    "cosmos": {
      "chains": [],
      "methods": [],
      "events": []
    }
  }
}
```

Is valid?: No

Note: Even though, the first proposal namespace is valid the second being invalid makes whole proposal invalid

Throw Message should be the first one caught
Throw Error Code should be the first one caught

---

### 1.7. Proposal namespaces MAY be empty

Requested Proposal Namespaces:

```json
{}
```

Is valid?: Yes

Note: Empty Proposal Namespaces means that the DApp does not have required namespaces and can work with any provided chains. 

Wallet must provide namespaces for ALL supported chains with empty methods and events. 

For example if wallet supports eip155:1, eip155:137, cosmos:cosmoshub-1 chains, Session Namespaces should looks like: 

```json
{
  "requiredNamespaces": {
    "eip155": {
      "accounts": [
        "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
        "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
      ],
      "methods": [],
      "events": []
    },
    "cosmos": {
      "accounts": [
        "cosmos:cosmoshub-1:cosmos1pn5a6s4k063608cnt2zue208965lc0m06u9clj",
      ],
      "methods": [],
      "events": []
    }
  }
}
```

---

## Non-controller side validation of incoming Proposal Namespaces (Dapp)

---

### 2.1. Session Namespaces MUST NOT have accounts empty

Requested Proposal Namespaces:

```json
{
  "namespaces": {
    "cosmos": {
      "chains": ["cosmos:cosmoshub-4"],
      "methods": ["cosmos_signDirect"],
      "events": ["someCosmosEvent"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "cosmos": {
      "accounts": [],
      "methods": ["cosmos_signDirect"],
      "events": ["someCosmosEvent"]
    }
  }
}
```

Is valid?: No

Note: Proposal namespace doesn't have any accounts, hence it's invalid

Throw Message: `Accounts must not be empty`
Throw Error Code: `case .userRejectedChains: return 5001`

---

### 2.2. Session Namespaces addresses MUST be CAIP-10 compliant

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": ["eip155:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Is valid?: No

Note: `eip155:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb` is not CAIP-10 compliant.
`eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb` is CAIP-10 compliant

Throw Message: `Accounts must be CAIP-10 compliant`
Throw Error Code: `case .userRejectedChains: return 5001`

---

### 2.3. Session Namespaces MUST approve all methods

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": ["eth_sign"],
      "events": []
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": ["eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"],
      "methods": [],
      "events": []
    }
  }
}
```

Is valid?: No

Note: `eth_sign` method is missing in the session namespace

Throw Message: `All methods must be approved`
Throw Error Code: `case .userRejectedMethods: return 5002`

---

### 2.4. Session Namespaces MUST contain at least one account in requested chains

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1", "eip155:10"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": ["eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Is valid?: No

Note: There is no account specified for `eip155:10`

Throw Message: `All chains must have at least one account`
Throw Error Code: `case .userRejectedChains: return 5001`

---

### 2.5. Session Namespaces MAY contain multiple accounts for one chain

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": [
        "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
        "eip155:1:0x25caCa7f7Bf3A77b1738A8c98A666dd9e4C69A0C",
        "eip155:1:0x2Fe1cC9b1DCe6E8e16C48bc6A7ABbAB3d10DA954",
        "eip155:1:0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
        "eip155:1:0xEB2F31B0224222D774541BfF89A221e7eb15a17E"
      ],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Is valid?: Yes

---

### 2.6. Session Namespaces MAY extend methods and events of Proposal Namespaces

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": ["eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"],
      "methods": ["eth_sign", "personalSign"],
      "events": ["accountsChanged", "someEvent"]
    }
  }
}
```

Is valid?: Yes

---

### 2.7. All accounts in the namespace MUST contain the namespace prefix

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": [
        "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
        "cosmos:cosmoshub-4:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0"
      ],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Is valid?: No

Note: `cosmos:cosmoshub-4:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0` does not contain `eip155` prefix.

Throw Message: `Accounts must be defined in matching namespace`
Throw Error Code: `case .unsupportedAccounts: return 5103`

---

### 2.8. Session Namespaces MAY contain accounts from chains not defined in Proposal Namespaces

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": [
        "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
        "eip155:42:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
      ],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Is valid?: Yes

---

### 2.9. Session Namespaces MUST have at least the same namespaces as the Proposal Namespaces

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {    
    "eip155": {
        "chains": ["eip155:137", "eip155:1"],
        "methods": ["eth_sign"],
        "events": ["accountsChanged"]
    },
    "cosmos":{
        "chains": ["cosmos:cosmoshub-4"],
        "methods": ["cosmos_signDirect"],
        "events": ["someCosmosEvent"]
    }
  }
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": [
        "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
        "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
      ],
      "methods": ["eth_sign"],
      "events": ["accountsChanged"]
    }
  }
}
```

Is valid?: No

Note: `cosmos` namespace is missing in Session Namespaces

Throw Message: `All namespaces must be approved`
Throw Error Code: `case .userRejected return 5000`

---

### 2.10. Session Namespaces MUST approve all events

Requested Proposal Namespaces:

```json
{
  "requiredNamespaces": {
    "eip155": {
      "chains": ["eip155:1"],
      "methods": [],
      "events": ["chainChanged"]
    }
  } 
}
```

Received Session Namespaces:

```json
{
  "namespaces": {
    "eip155": {
      "accounts": ["eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"],
      "methods": [],
      "events": []
    }
  }
}
```

Is valid?: No

Note: `chainChanged` event is missing in the session namespace

Throw Message: `All events must be approved`
Throw Error Code: `case .userRejectedEvents: return 5003`

---

