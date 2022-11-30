# Error Codes

## INVALID

```sh
case .invalidMethod: return 1001
case .invalidEvent: return 1002
case .invalidUpdateRequest: return 1003
case .invalidExtendRequest: return 1004
case .invalidSessionSettleRequest: return 1005
```

## UNAUTHORIZED

```sh
case .unauthorizedMethod: return 3001
case .unauthorizedEvent: return 3002
case .unauthorizedUpdateRequest: return 3003
case .unauthorizedExtendRequest: return 3004
case .unauthorizedChain: return 3005
```

## EIP-1193

```sh
case .userRejectedRequest return 4001
```

## REJECTED (CAIP-25)

```sh
case .userRejected return 5000
case .userRejectedChains: return 5001
case .userRejectedMethods: return 5002
case .userRejectedEvents: return 5003

case .unsupportedChains: return 5100
case .unsupportedMethods: return 5101
case .unsupportedEvents: return 5102
case .unsupportedAccounts: return 5103
case .unsupportedNamespaceKey: return 5104
```

## REASON

```sh
case .userDisconnected: return 6000
```

## FAILURE

```sh
case .sessionSettlementFailed: return 7000
case .noSessionForTopic: return 7001
```

## SESSION REQUEST

```sh
case .sessionRequestExpired: return 8000
```
