# Crypto Authentication

In this module we will handle also authentication payloads used by multiple high-level SDKs which require an Ed25519 key pair to sign did-jwt payloads for multiple purposes.

## DID-JWT

[DID-JWT](https://github.com/decentralized-identity/did-jwt) are [JSON Web Tokens (JWT)](https://jwt.io/) which are self-issued using cryptographic key pairs in elliptic curves such as `ed25519`.

As per the JWT spec, all fields are serialized as base64url encoding and separated by full stops (`.`).

```sh
serialized_did_jwt = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtvZEhad25lVlJTaHRhTGY4SktZa3hwREdwMXZHWm5wR21kQnBYOE0yZXh4SCIsInN1YiI6ImM0NzlmZTVkYzQ2NGU3NzFlNzhiMTkzZDIzOWE2NWI1OGQyNzhjYWQxYzM0YmZiMGI1NzE2ZTViYjUxNDkyOGUiLCJhdWQiOiJ3c3M6Ly9yZWxheS53YWxsZXRjb25uZWN0LmNvbSIsImlhdCI6MTY1NjkxMDA5NywiZXhwIjoxNjU2OTk2NDk3fQ.bAKl1swvwqqV_FgwvD4Bx3Yp987B9gTpZctyBviA-EkAuWc8iI8SyokOjkv9GJESgid4U8Tf2foCgrQp2qrxBA"
```

### Header

The header will allow you to identify the JWT type and the algorithm used. `ed25519` is exclusively used which is labelled as `EdDSA` in the header.

```jsonc
// header
{
  "alg": "EdDSA",
  "typ": "JWT"
}
```

Public keys are resolved using the Decentralized ID (DID) of the signing identity of the token, which is passed as the `iss` attribute of the JWT payload. We will exclusively identify them to as [did:key](https://w3c-ccg.github.io/did-method-key/)

```sh
public_key = "did:key:z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp"
```

### Payload

The payload will include multiple claims. The context can be identified by the first claim `act`, which will describe the payload's action/intent.

Our protocols will share the following claims with different context:

`act` - description of action intent

`iat` - timestamp when jwt was issued

`exp` - timestamp when jwt must expire

`iss` - did:key of the key used to sign

`aud` - it varies (usually the recipient of the payload)

`sub` - it varies (usually provides context about the payload)

### Signature

The header and payload must each be stringified JSON and then concatenated as bytes with the header first followed by the payload. This will be signed with the private key.

The signature payload is the resulting signature bytes using ed25519 keypair and it will be encoded at the end as base64url.

The verification should be performed every time a did-jwt is received and the recovered public key must match the `iss` public key described with the did:key method.

## API

```typescript
// ---------- API ----------------------------------------------- //

function signJWT(subject: string, keyPair: ed25519.KeyPair): Promise<string>;
function verifyJWT(jwt: string): Promise<boolean>;

// ---------- Utilities ----------------------------------------------- //

function decodeJSON(str: string): any;
function encodeJSON(val: any): string;

function encodeIss(publicKey: Uint8Array): string;
function decodeIss(issuer: string): Uint8Array;

function encodeSig(bytes: Uint8Array): string;
function decodeSig(encoded: string): Uint8Array;

function encodeData(params: JWTData): string;
function decodeData(jwt: string): JWTData;

function encodeJWT(params: JWTSigned): string;
function decodeJWT(jwt: string): JWTSigned;
```

### Reference Implementation

```typescript
import * as ed25519 from "@stablelib/ed25519";
import { concat } from "uint8arrays/concat";
import { toString } from "uint8arrays/to-string";
import { fromString } from "uint8arrays/from-string";
import { fromMiliseconds } from "@walletconnect/time";
import { safeJsonParse, safeJsonStringify } from "@walletconnect/safe-json";

// ---------- Interfaces ----------------------------------------------- //

interface JWTHeader {
  alg: "EdDSA";
  typ: "JWT";
}

interface JWTPayload {
  iss: string;
  sub: string;
}

interface JWTData {
  header: JWTHeader;
  payload: JWTPayload;
}

interface JWTSigned extends JWTData {
  signature: Uint8Array;
}

// ---------- Constants ----------------------------------------------- //

const JWT_ALG: JWTHeader["alg"] = "EdDSA";

const JWT_TYP: JWTHeader["typ"] = "JWT";

const JWT_DELIMITER = ".";

const JWT_ENCODING = "base64url";

const JSON_ENCODING = "utf8";

const DATA_ENCODING = "utf8";

const DID_DELIMITER = ":";

const DID_PREFIX = "did";

const DID_METHOD = "key";

const MULTICODEC_ED25519_ENCODING = "base58btc";

const MULTICODEC_ED25519_BASE = "z";

const MULTICODEC_ED25519_HEADER = "K36";

const MULTICODEC_ED25519_LENGTH = 32;

const MULTIBASE_BASE58BTC_PREFIX = 'z'

// ---------- JSON ----------------------------------------------- //

function decodeJSON(str: string): any {
  return safeJsonParse(toString(fromString(str, JWT_ENCODING), JSON_ENCODING));
}

function encodeJSON(val: any): string {
  return toString(
    fromString(safeJsonStringify(val), JSON_ENCODING),
    JWT_ENCODING
  );
}

// ---------- Issuer ----------------------------------------------- //

function encodeIss(publicKey: Uint8Array): string {
  const keyType = fromString(
    MULTICODEC_ED25519_KEY_TYPE,
    MULTICODEC_ED25519_ENCODING
  );
  const header = fromString(MULTICODEC_ED25519_HEADER, MULTICODEC_ED25519_ENCODING);
  const multicodec = toString(
    concat([header, publicKey]),
    MULTICODEC_ED25519_ENCODING
  );
  const multibase = MULTIBASE_BASE58BTC_PREFIX + multicodec;
  return [DID_PREFIX, DID_METHOD, multibase].join(DID_DELIMITER);
}

function decodeIss(issuer: string): Uint8Array {
  const [prefix, method, multibase] = issuer.split(DID_DELIMITER);
  if (prefix !== DID_PREFIX || method !== DID_METHOD) {
    throw new Error(`Issuer must be a DID with method "key"`);
  }
  const base = multibase.slice(0, 1);
  if (base !== MULTIBASE_BASE58BTC_PREFIX) {
    throw new Error(`Issuer must be a multibase with encoding base58btc`);
  }
  const multicodec = fromString(
    multibase.slice(1),
    MULTICODEC_ED25519_ENCODING
  );
  const keyType = toString(multicodec.slice(0, 2), MULTICODEC_ED25519_ENCODING);
  if (keyType !== MULTICODEC_ED25519_HEADER) {
    throw new Error(`Issuer must be a public key with type "Ed25519"`);
  }
  const publicKey = multicodec.slice(2);
  if (publicKey.length !== MULTICODEC_ED25519_LENGTH) {
    throw new Error(`Issuer must be a public key with length 32 bytes`);
  }
  return publicKey;
}

// ---------- Sig ----------------------------------------------- //

function encodeSig(bytes: Uint8Array): string {
  return toString(bytes, JWT_ENCODING);
}

function decodeSig(encoded: string): Uint8Array {
  return fromString(encoded, JWT_ENCODING);
}

// ---------- Data ----------------------------------------------- //

function encodeData(params: JWTData): Uint8Array {
  return fromString(
    [encodeJSON(params.header), encodeJSON(params.payload)].join(JWT_DELIMITER),
    DATA_ENCODING
  );
}

function decodeData(data: Uint8Array): JWTData {
  const params = toString(data, DATA_ENCODING).split(JWT_DELIMITER);
  const header = decodeJSON(params[0]);
  const payload = decodeJSON(params[1]);
  return { header, payload };
}

// ---------- JWT ----------------------------------------------- //

function encodeJWT(params: JWTSigned): string {
  return [
    encodeJSON(params.header),
    encodeJSON(params.payload),
    encodeSig(params.signature),
  ].join(JWT_DELIMITER);
}

function decodeJWT(jwt: string): JWTSigned {
  const params = jwt.split(JWT_DELIMITER);
  const header = decodeJSON(params[0]);
  const payload = decodeJSON(params[1]);
  const signature = decodeSig(params[2]);
  return { header, payload, signature };
}

// ---------- API ----------------------------------------------- //

async function signJWT(
  act: string,
  sub: string,
  aud: string,
  ttl: number,
  keyPair: ed25519.KeyPair
) {
  const header = { alg: JWT_ALG, typ: JWT_TYP };
  const iss = encodeIss(keyPair.publicKey);
  const iat = fromMiliseconds(Date.now());
  const exp = iat + ttl;
  const payload = { iat, exp, act, iss, sub, aud };
  const data = encodeData({ header, payload });
  const signature = ed25519.sign(keyPair.secretKey, data);
  return encodeJWT({ header, payload, signature });
}

async function verifyJWT(jwt: string) {
  const { header, payload, signature } = decodeJWT(jwt);
  if (header.alg !== JWT_ALG || header.typ !== JWT_TYP) {
    throw new Error("JWT must use EdDSA algorithm");
  }
  const publicKey = decodeIss(payload.iss);
  const data = encodeData({ header, payload });
  return ed25519.verify(publicKey, data, signature);
}
```

### Test Cases

```JavaScript
// Action intent for this did-jwt
const act = "client_register"

//  Client will sign a unique identifier as the subject
const sub =
  "c479fe5dc464e771e78b193d239a65b58d278cad1c34bfb0b5716e5bb514928e";

// Client will include the server endpoint as audience
const aud = "wss://relay.walletconnect.com";

// Client will use the JWT for 24 hours
const ttl = 86400;

// Fixed seed to generate the same key pair
const seed = fromString(
  "58e0254c211b858ef7896b00e3f36beeb13d568d47c6031c4218b87718061295",
  "base16"
);

// Fixed issuedAt timestamp in seconds
const iat = 1656910097;

// Generate key pair from seed
const keyPair = ed25519.generateKeyPairFromSeed(seed);
// secretKey = "58e0254c211b858ef7896b00e3f36beeb13d568d47c6031c4218b87718061295884ab67f787b69e534bfdba8d5beb4e719700e90ac06317ed177d49e5a33be5a"
// publicKey = "884ab67f787b69e534bfdba8d5beb4e719700e90ac06317ed177d49e5a33be5a"

// Expected JWT for given payload
const expected = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtvZEhad25lVlJTaHRhTGY4SktZa3hwREdwMXZHWm5wR21kQnBYOE0yZXh4SCIsInN1YiI6ImM0NzlmZTVkYzQ2NGU3NzFlNzhiMTkzZDIzOWE2NWI1OGQyNzhjYWQxYzM0YmZiMGI1NzE2ZTViYjUxNDkyOGUiLCJhdWQiOiJ3c3M6Ly9yZWxheS53YWxsZXRjb25uZWN0LmNvbSIsImlhdCI6MTY1NjkxMDA5NywiZXhwIjoxNjU2OTk2NDk3fQ.bAKl1swvwqqV_FgwvD4Bx3Yp987B9gTpZctyBviA-EkAuWc8iI8SyokOjkv9GJESgid4U8Tf2foCgrQp2qrxBA";

async function test() {
  const jwt = await signJWT(act, sub, aud, ttl, keyPair);
  console.log("jwt", jwt);
  console.log("matches", jwt === expected);
  const verified = await verifyJWT(jwt);
  console.log("verified", verified);
}

test();
```