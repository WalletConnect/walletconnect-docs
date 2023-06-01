# Data Structures

## Request Params

```typescript
interface RequestParams {
  chainId: string;
  domain: string;
  aud: string;
  nonce: string;
  type?: string;
  nbf?: string;
  exp?: string;
  statement?: string;
  requestId?: string;
  resources?: string[];
}
```

## Respond Params

```typescript
type RespondParams = ResultResponse | ErrorResponse;
```

## Payload Params (partial Cacao)

Used for requester to authenticate wallet

```typescript
interface PayloadParams {
  type: string; // same as Cacao Header type (t)
  chainId: string;
  domain: string;
  aud: string;
  version: string;
  nonce: string;
  iat: string;
  nbf?: string;
  exp?: string;
  statement?: string;
  requestId?: string;
  resources?: string[];
}
```

## Response

```typescript
type Response = Cacao | ErrorResponse;
```

## Pending Request

```typescript
interface PendingRequest {
  id: number;
  pairingTopic: String;
  payloadParams: PayloadParams;
}
```

## Cacao Header ([CAIP-74](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-74.md))

```typescript
interface CacaoHeader {
  t: string;
}
```

## Cacao Payload ([CAIP-74](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-74.md))

```typescript
interface CacaoPayload {
  iss: string;
  domain: string;
  aud: string;
  version: string;
  nonce: string;
  iat: string;
  nbf?: string;
  exp?: string;
  statement?: string;
  requestId?: string;
  resources?: string[];
}
```

## Cacao Signature ([CAIP-74](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-74.md))

```typescript
interface CacaoSignature {
  t: string;
  s: string;
  m?: string;
}
```

## Cacao ([CAIP-74](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-74.md))

```typescript
interface Cacao {
  h: CacaoHeader;
  p: CacaoPayload;
  s: CacaoSignature;
}
```

## Result Response

```typescript
interface ResultResponse {
  id: number;
  signature: CacaoSignature;
}
```

## Error Response

```typescript
interface ErrorResponse {
  id: number;
  error: {
    code: number;
    message: string;
  };
}
```

## Verify Context

Verify Context is appended to Auth Requests to provide metadata that was constructed internally by the client that is relevant to the specific request

```jsonc
{
  "verified": {
    "origin": string,
    "validation": "UNKNOWN" | "VALID" | "INVALID",
    "verifyUrl": string
  }
}
```