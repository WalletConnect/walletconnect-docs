# Client SDK API Reference

## Register Event Subscription

```typescript
function on(
  event: string,
  callback: (error: Error | null, payload: any | null) => void
): void;
```

Events: `connect`, `disconnect`, `session_update`, `call_request`, `wc_sessionRequest`, `wc_sessionUpdate`, `wc_exchangeKey`

## Create New Session

```typescript
async function createSession(): Promise<void>;
```

## Approve Session Request

```typescript
function approveSession({
  chainId: number, // Required
  accounts: string[] // Required
}): void;
```

## Reject Session Request

```typescript
function rejectSession({
  message: string // Optional
}): void;
```

## Update Session

```typescript
function updateSession({
  chainId: number, // Required
  accounts: string[] // Required
}): void;
```

## Kill Session \(disconnect\)

```typescript
function killSession({
  message: string // Optional
}): void;
```

## Send Transaction \(eth_sendTransaction\)

```typescript
async function sendTransaction({
  from: string, // Required
  to: string, // Required
  gasLimit: string, // Required
  gasPrice: string, // Required
  value: string, // Required
  data: string, // Required
  nonce: string // Required
}): Promise<string>;
```

Returns: Transaction hash

## Sign Message \(eth_sign\)

```typescript
async function signMessage(params: string[]): Promise<string>;
```

Returns: Signature

## Sign Typed Data \(eth_signTypedData\)

```typescript
async function signTypedData(params: any[]): Promise<string>;
```

## Send Custom Request

```javascript
/**
 *  Draft Custom Request
 */
const customRequest = {
  id: 1,
  jsonrpc: "2.0",
  method: "eth_signTransaction",
  params: [
    {
      from: "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
      to: "0x0000000000000000000000000000000000000000",
      nonce: 1,
      gas: 100000,
      value: 0,
      data: "0x0"
    }
  ]
};

/**
 *  Send Custom Request
 */
walletConnector
  .sendCustomRequest(customRequest)
  .then(console.log)
  .catch(console.error);
```

Returns: Signature

## Approve Call Request

```typescript
function approveRequest({
  id: number, // Required
  result: any // Required
}): void;
```

## Reject Call Request

```typescript
function rejectRequest({
  id: number, // Required
  result: null // Required
}): void;
```
