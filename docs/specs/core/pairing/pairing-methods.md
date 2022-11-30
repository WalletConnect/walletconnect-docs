# Pairing Methods Validation Test Cases


## 1. Peer B matches the required list and the optional list

### Peer A's pairing uri:
    uri = "...req-methods=["wc_sessionPropose"]&opt-methods=["wc_authBatchRequest","wc_authRequest"]" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = ["wc_authBatchRequest","wc_authRequest"]


is valid? Yes

---

## 2. Peer B matches the required list and partially matches the optional list

### Peer A's pairing uri:
    uri = "...req-methods=["wc_sessionPropose"]&opt-methods=["wc_authBatchRequest","wc_authRequest"]" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = ["wc_authRequest"]


is valid? Yes

---

## 3. Peer B matches the required list and does not paritially match the optional list

### Peer A's pairing uri:
    uri = "...req-methods=["wc_sessionPropose"]&opt-methods=["wc_authBatchRequest","wc_authRequest"]" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = []


is valid? No

---

## 4. Peer B does not match the required list and matches the optional list

### Peer A's pairing uri:
    uri = "...req-methods=["wc_sessionRequest"]&opt-methods=["wc_authBatchRequest","wc_authRequest"]" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = ["wc_authBatchRequest","wc_authRequest"]


is valid? No

---

## 5. Peer B does not match the required list and partially matches the optional list

### Peer A's pairing uri:
    uri = "...req-methods=["wc_sessionRequest"]&opt-methods=["wc_authBatchRequest","wc_authRequest"]" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = ["wc_authBatchRequest"]


is valid? No

---

## 6. Peer B does not match the required list and does not partially matche the optional list

### Peer A's pairing uri:
    uri = "...req-methods=["wc_sessionRequest"]&opt-methods=["wc_authBatchRequest","wc_authRequest"]" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = []


is valid? No