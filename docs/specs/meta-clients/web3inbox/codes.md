# Error Codes

## Chat

### Signing

```sh
case .signatureRejected return 20001
```

### Messages
```sh
case .chatMessageTooLong return 20002

case .mediaDataTooLong return 20003
```

### Inviting 
```sh
case .inviteMessageTooLong return 20004

case .invitedPeerDoesNotExist return 20005

case .invitedPeerAlreadyInvited return 20006
```

