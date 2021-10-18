# Client API Reference

## Register Event Subscription

```typescript
function on(
  event: string,
  callback: (error: Error | null, payload: any | null) => void
): void;
```

Events: `connect`, `disconnect`, `session_request`, `session_update`, `call_request`, `wc_sessionRequest`, `wc_sessionUpdate`

## Create New Session \(session\_request\)

```typescript
async function createSession(): Promise<void>;
```

## Approve Session Request \(connect\)

```typescript
function approveSession({
  chainId: number, // Required
  accounts: string[] // Required
}): void;
```

## Reject Session Request \(disconnect\)

```typescript
function rejectSession({
  message: 'OPTIONAL_ERROR_MESSAGE'
}): void;
```

## Update Session \(session\_update\)

```typescript
function updateSession({
  chainId: number, // Required
  accounts: string[] // Required
}): void;
```

## Kill Session \(disconnect\)

```typescript
function killSession(): void;
```

## Send Transaction \(eth\_sendTransaction\)

```typescript
async function sendTransaction({
  from: string, // Required
  to: string, // Required
  gas: string, // Required
  gasPrice: string, // Required
  value: string, // Required
  data: string, // Required
  nonce: string, // Required
}): Promise<string>;
```

Returns: Transaction hash

## Sign Transaction \(eth\_signTransaction\)

```typescript
async function signTransaction({
  from: string, // Required
  to: string, // Required
  gas: string, // Required
  gasPrice: string, // Required
  value: string, // Required
  data: string, // Required
  nonce: string, // Required
}): Promise<string>;
```

Returns: Signed Transaction

## Sign Message \(eth\_sign\)

```typescript
async function signMessage(params: string[]): Promise<string>;
```

Returns: Signature

## Sign Personal Message \(personal\_sign\)

```typescript
async function signPersonalMessage(params: string[]): Promise<string>;
```

Returns: Signature

## Sign Typed Data \(eth\_signTypedData\)

```typescript
async function signTypedData(params: any[]): Promise<string>;
```

Returns: Signature

## Send Custom Request

```javascript
async function sendCustomRequest(payload: IJsonRpcRequest): Promise<any>;
```

Returns: JSON-RPC Response

## Approve Call Request

```typescript
function approveRequest({
  id: number, // Required
  result: any, // Required
}): void;
```

## Reject Call Request

```typescript
function rejectRequest({
  id: 1,
  error: {
    message: "OPTIONAL_ERROR_MESSAGE"
  }
}): void;
```

