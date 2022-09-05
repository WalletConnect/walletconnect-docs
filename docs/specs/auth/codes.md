# Codes

## VALIDATION

```sh
case .malformedResponseParams return 11001
case .malformedRequestParams return 11002
case .messageCompromised return 11003
case .signatureVerificationFailed return 11004
```

## REJECTED

```sh
case .userRejectedRequest return 12001
case .userDisconnected: return 12002
```
