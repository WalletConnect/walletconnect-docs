# Error Codes

## VALIDATION

```sh
case .malformedResponseParams return 11001
case .malformedRequestParams return 11002
case .messageCompromised return 11003
case .signatureVerificationFailed return 11004
case .requestExpired: return 11005
case .missingIssuer return 11006
```

## REJECTED

```sh
case .userRejectedRequest return 12001
case .userDisconnected: return 12002
```
