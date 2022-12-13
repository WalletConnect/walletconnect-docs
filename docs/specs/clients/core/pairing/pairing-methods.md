# Pairing Methods Validation Test Cases


## 1. Peer B matches the required list and the optional list

### Peer A's pairing uri:
    uri = "...req-methods="wc_sessionPropose,wc_authRequest"&opt-methods="wc_authBatchRequest"" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose", "wc_authRequest"]
    var optionalList = ["wc_authBatchRequest"]


is valid? Yes

---

## 2. Peer B matches the required list and partially matches the optional list

### Peer A's pairing uri:
    uri = "...req-methods="wc_sessionPropose"&opt-methods="wc_authBatchRequest,wc_pushMessage"" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = ["wc_authBatchRequest"]


is valid? Yes

---

## 3. Peer B matches the required list and does not paritially match the optional list

### Peer A's pairing uri:
    uri = "...req-methods="wc_sessionPropose"&opt-methods="wc_authBatchRequest,wc_pushMessage"" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = []


is valid? Yes

---

## 4. Required list is empty and Peer B's paritially matches the optional list

### Peer A's pairing uri:
    uri = "...opt-methods="wc_authBatchRequest,wc_pushMessage"" 
    
### Peer B's registered methods:
    var requiredList = []
    var optionalList = ["wc_pushMessage"]


is valid? Yes

---

## 5. Peer B does not match the required list and matches the optional list

### Peer A's pairing uri:
    uri = "...req-methods="wc_sessionRequest"&opt-methods="wc_authBatchRequest,wc_pushMessage"" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = ["wc_authBatchRequest","wc_pushMessage"]


is valid? No

---

## 6. Peer B does not match the required list and partially matches the optional list

### Peer A's pairing uri:
    uri = "...req-methods="wc_sessionRequest"&opt-methods="wc_authBatchRequest,wc_pushMessage"" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = ["wc_authBatchRequest"]


is valid? No

---

## 7. Peer B does not match the required list and does not partially matches the optional list

### Peer A's pairing uri:
    uri = "...req-methods="wc_sessionRequest"&opt-methods="wc_authBatchRequest,wc_pushMessage"" 
    
### Peer B's registered methods:
    var requiredList = ["wc_sessionPropose"]
    var optionalList = []


is valid? No