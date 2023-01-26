# Pairing Methods Validation Test Cases


## 1. Peer B matches URI's list exactly

### Peer A's pairing uri:
    uri = "...methods=[wc_sessionPropose],[wc_authRequest,wc_authBatchRequest]"

    
### Peer B's registered methods:
    var registeredMethods = [{ method = "wc_sessionPropose", type = ProtocolType.Sign }, { method = "wc_authRequest", type = ProtocolType.Auth }, { method = "wc_authBatchRequest", type = ProtocolType.Auth }]


is valid? Yes

---

## 2. Peer B matches one inner array exactly and partially matches another inner array

### Peer A's pairing uri:
    uri = "...methods=[wc_sessionPropose],[wc_authBatchRequest]"

    
### Peer B's registered methods:
    var registeredMethods = [{ method = "wc_sessionPropose", type = ProtocolType.Sign }, { method = "wc_authRequest", type = ProtocolType.Auth }, { method = "wc_authBatchRequest", type = ProtocolType.Auth }]


is valid? Yes

---

## 3. Peer B contains more methods than URI's list of methods

### Peer A's pairing uri:
    uri = "...methods=[wc_sessionPropose]"

    
### Peer B's registered methods:
    var registeredMethods = [{ method = "wc_sessionPropose", type = ProtocolType.Sign }, { method = "wc_authRequest", type = ProtocolType.Auth }, { method = "wc_authBatchRequest", type = ProtocolType.Auth }]


is valid? Yes

---

## 4. Peer B matches an inner array and does not partially match the other inner array

### Peer A's pairing uri:
    uri = "...methods=[wc_sessionPropose],[wc_authRequest]"


### Peer B's registered methods:
    var registeredMethods = [{ method = "wc_sessionPropose", type = ProtocolType.Sign }]


is valid? No

---

## 5. Peer B does not match any inner arrays

### Peer A's pairing uri:
    uri = "...methods=[wc_sessionPropose],[wc_authRequest]"


### Peer B's registered methods:
    var registeredMethods = [{ method = "wc_sessionProposeV2", type = ProtocolType.Sign },{ method = "wc_authBatchRequest", type = ProtocolType.Auth }]


is valid? No