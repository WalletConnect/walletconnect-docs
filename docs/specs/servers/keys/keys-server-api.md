# Keys Server API

## Invite Keys

### Register Invite Key

Used to register a new invite key

`POST /invite`

##### Body

```jsonc
{
    "idAuth": string
}
```

#### Example

`POST https://keys.walletconnect.com/invite`

##### Body
```jsonc
{
  "idAuth": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtrS3pHRHBRdjRtUjhHa2FtdDFXYnNyejRtRmpqUXBBZ0RGR0U5MTl2SDdUcyIsInN1YiI6ImVmZDA2MzlmYTVmYTdjYTMwODg4YzMzNzA2ZjZjMzk1ZTkyOGY0ZWM0NGQ3YmJlMzI2MmMzODc2NjhjY2Q4NDEiLCJhdWQiOiJodHRwOi8vMTAuMC4yLjI6ODA4MCIsImlhdCI6MTY3Mzk4NzU0NSwiZXhwIjoxNjc0MDczOTQ1LCJwa2giOiJkaWQ6cGtoOmVpcDE1NToxOjB4ZTk4MGNjZjkxMjRlODBjNDc3NDVkYjQwOTgyYzMwMWVkODM5ODAwZiJ9.AdgvaE52oI_Rg46QbYLO9hJP-pukcyLKbpzVShiwR4eUjVnxBhZ7-bJjT77Xa3sY6eCGrgOH1ARkby7H3tVzCg"
}
```

### Resolve Invite Key

Used to get an invite key for an account

`GET /invite`

##### Query Params

```jsonc
{
    "account": string,
}
```

##### ResolveInviteKeyResponse
```jsonc
{
    "inviteKey": String
}
```

##### Response

```jsonc
{
    "status": String,
    "error": ResponseError?,
    "value": ResolveInviteKeyResponse?
}
```

#### Example

`GET https://keys.walletconnect.com/invite?account=eip155:1:0xe980ccf9124e80c47745db40982c301ed839800f`

##### Success Response
```jsonc
{
    "status": "SUCCESS",
    "error": null,
    "value": {
        "inviteKey": "efd0639fa5fa7ca30888c33706f6c395e928f4ec44d7bbe3262c387668ccd841"
    }
}
```

##### Failure Response
```jsonc
{
    "status": "FAILURE",
    "error": {
        "name": "Invite key not found",
        "message": "Cannot find Invite key with specified identifier eip155:1:0xe980ccf9124e80c47745db40982c301ed839800f"
    },
    "value": null
}
```

### Remove Invite Key

Used to remove an invite key from the server

`DELETE /invite`

##### Body

```jsonc
{
    "idAuth": string
}
```

#### Example

`DELETE https://keys.walletconnect.com/invite`

##### Body
```jsonc
{
  "idAuth": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtrS3pHRHBRdjRtUjhHa2FtdDFXYnNyejRtRmpqUXBBZ0RGR0U5MTl2SDdUcyIsInN1YiI6ImVmZDA2MzlmYTVmYTdjYTMwODg4YzMzNzA2ZjZjMzk1ZTkyOGY0ZWM0NGQ3YmJlMzI2MmMzODc2NjhjY2Q4NDEiLCJhdWQiOiJodHRwOi8vMTAuMC4yLjI6ODA4MCIsImlhdCI6MTY3Mzk4NzU0NSwiZXhwIjoxNjc0MDczOTQ1LCJwa2giOiJkaWQ6cGtoOmVpcDE1NToxOjB4ZTk4MGNjZjkxMjRlODBjNDc3NDVkYjQwOTgyYzMwMWVkODM5ODAwZiJ9.AdgvaE52oI_Rg46QbYLO9hJP-pukcyLKbpzVShiwR4eUjVnxBhZ7-bJjT77Xa3sY6eCGrgOH1ARkby7H3tVzCg"
}
```

## Identity Keys

### Register Identity Key

Used to register a new identity key

`POST /identity`

##### Body

```jsonc
{
    "cacao": Cacao
}
```

#### Example

`POST https://keys.walletconnect.com/identity`

##### Body
```jsonc
{
  "cacao": {
    "h": {
      "t": "eip4361"
    },
    "p": {
      "iss": "did:pkh:eip155:1:0xe980ccf9124e80c47745db40982c301ed839800f",
      "domain": "walletconnect.com",
      "aud": "https://keys.walletconnect.com",
      "version": "1",
      "nonce": "Some Random Nonce",
      "iat": "2023-01-17T21:32:19+01:00",
      "resources": [
        "did:key:z6MkkKzGDpQv4mR8Gkamt1Wbsrz4mFjjQpAgDFGE919vH7Ts"
      ]
    },
    "s": {
      "t": "eip191",
      "s": "0x8e52b8c2b9adb4f84c179ef68d10b139c20c6b26a65ad4735a41e035b39a0a5b49ffc77f6626119f4e2f6b63c017e195d6d890c6a54e748e22a64ae3a33ad68d1c"
    }
  }
}
```


### Resolve Identity Key

Used to get a cacao matching an identity key

`GET /identity`

##### Query Params

```jsonc
{
    "publicKey": string,
}
```

##### ResolveIdentityKeyResponse
```jsonc
{
    "cacao": Cacao
}
```

##### Response

```jsonc
{
    "status": String,
    "error": ResponseError?,
    "value": ResolveIdentityKeyResponse?
}
```

#### Example

`GET https://keys.walletconnect.com/identity?publicKey=z6MkkKzGDpQv4mR8Gkamt1Wbsrz4mFjjQpAgDFGE919vH7Ts`

##### Success Response
```jsonc
{
  "cacao": {
    "h": {
      "t": "eip4361"
    },
    "p": {
      "iss": "did:pkh:eip155:1:0xe980ccf9124e80c47745db40982c301ed839800f",
      "domain": "walletconnect.com",
      "aud": "https://keys.walletconnect.com",
      "version": "1",
      "nonce": "Some Random Nonce",
      "iat": "2023-01-17T21:32:19+01:00",
      "resources": [
        "did:key:z6MkkKzGDpQv4mR8Gkamt1Wbsrz4mFjjQpAgDFGE919vH7Ts"
      ]
    },
    "s": {
      "t": "eip191",
      "s": "0x8e52b8c2b9adb4f84c179ef68d10b139c20c6b26a65ad4735a41e035b39a0a5b49ffc77f6626119f4e2f6b63c017e195d6d890c6a54e748e22a64ae3a33ad68d1c"
    }
  }
}
```

##### Failure Response 
```jsonc
{
    "status": "FAILURE",
    "error": {
        "name": "Identity key not found",
        "message": "Cannot find Identity key with specified identifier z6MkkKzGDpQv4mR8Gkamt1Wbsrz4mFjjQpAgDFGE919vH7Ts"
    },
    "value": null
}
```


### Remove Identity Key

Used to remove an identity key from the server

`DELETE /identity`

##### Body

```jsonc
{
    "cacao": Cacao
}
```

#### Example

`DELETE https://keys.walletconnect.com/identity`

##### Body
```jsonc
{
  "cacao": {
    "h": {
      "t": "eip4361"
    },
    "p": {
      "iss": "did:pkh:eip155:1:0xe980ccf9124e80c47745db40982c301ed839800f",
      "domain": "walletconnect.com",
      "aud": "https://keys.walletconnect.com",
      "version": "1",
      "nonce": "Some Random Nonce",
      "iat": "2023-01-17T21:32:19+01:00",
      "resources": [
        "did:key:z6MkkKzGDpQv4mR8Gkamt1Wbsrz4mFjjQpAgDFGE919vH7Ts"
      ]
    },
    "s": {
      "t": "eip191",
      "s": "0x8e52b8c2b9adb4f84c179ef68d10b139c20c6b26a65ad4735a41e035b39a0a5b49ffc77f6626119f4e2f6b63c017e195d6d890c6a54e748e22a64ae3a33ad68d1c"
    }
  }
}
```

---

## Data structures

#### ResponseError
```jsonc
{
    "name": String,
    "message": String
}  
```