# Error Codes

## (Chat) Account
```
case .accountNotRegistered: 1000
case .accountHasNoInviteKeyStored: 1001
```

## (Chat) Inviting
```
case .accountAlreadyHaveThread: 2000
case .accountAlreadyInvitedSelf: 2001
case .accountAlreadyInvited: 2002
case .inviteMessageTooLong: 2003
```

## (Chat) Messages
```
case .messageTooLong: 3000
case .mediaDataTooLong: 3001
```

## Signature
```
case .signatureDenied: 4000
```

## Jwt Authentication
```
case .invalidActField: 5000
```

## (Notify) Session Request
```
case .sessionRequestExpired: 6000
```

