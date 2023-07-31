# Error Codes

## INVALID

```sh
case .invalidProposal: return 1000
```

## REJECTED

```sh
case .userRejected return 5000
```

## REASON

```sh
case .userUnsubscribed return 6000
case .userHasExistingSubscription return 6001
```

## FAILURE

```sh
case .approvalFailed: return 7002
case .rejectionFailed: return 7003
```
