# TTL Extension

TTL extension allows clients to set custom expiration for specific RPC methods. 

#### RPC Methods that support TTL Extension:
- `wc_sessionRequest`
- `wc_sessionPropose`

#### TTL extension
For supported TTL extension methods `ttl` params passing through Client API and setting into Relay Publish payload method. Check [Relay Publish payload method](../../servers/relay/relay-server-rpc.md)

#### Expiry validation
For supported TTL extension methods `ttl` params should be between `MIN_INTERVAL` and `MAX_INTERVAL` where:
- `MIN_INTERVAL` is 300 (5 mins)
- `MAX_INTERVAL` is 604800 (7 days)

If ttl validation failed wallet should respond with `.sessionRequestExpired (code 8000)` error

#### Expired requests filtering
Records of methods that support TTL extension should be filtered by expiration before returning to clients. 