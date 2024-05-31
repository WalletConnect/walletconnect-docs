# Relay

## Project ID

The Project ID is consumed through URL parameters.

URL parameters used:

- `projectId`: Your Project ID can be obtained from [walletconnect.com](https://walletconnect.com)

Example URL:

`https://relay.walletconnect.com/?projectId=c4f79cc821944d9680842e34466bfbd`

This can be instantiated from the client with the `projectId` in the `SignClient` constructor.

```javascript
import SignClient from '@walletconnect/sign-client'
const signClient = await SignClient.init({
  projectId: 'c4f79cc821944d9680842e34466bfb'
})
```

## Allowlist

To help prevent malicious use of your project ID you are strongly encouraged to set an allowlist of [origins](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) or application/bundle ids for mobile applications where the project ID is used. Requests from other origins will be denied.

- Allowlist supports a list of origins in the format `[scheme://]<hostname[:port]`.
- [Application ID](https://developer.android.com/build/configure-app-module#set-application-id)/[Bundle IDs](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids) typically are defined using the [reverse domain name notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation)

Using `localhost` (or `127.0.0.1`) is always permitted, and if empty all origins are allowed. Updates take 15 minutes to apply.

If scheme or port is specified, it must match exactly. Hostname must also match exactly, but wildcards can be used for individual labels within the hostname.

Example of possible origins in the allowlist:

- `example.com` - allows `https://example.com` or `http://example.com` but not `https://www.example.com`
- `https://example.com` - allows `https://example.com` but not `http://example.com`
- `https://www.example.com` - allows `https://www.example.com` but not `https://example.com`
- `https://example.com:8080` - allows `https://example.com:8080` but not `https://example.com`
- `https://*.example.com` - allows `https://www.example.com` but not `https://example.com`
- `https://*.*.example.com` - allows `https://www.subdomain.example.com` but not `https://www.example.com` or `https://example.com`
- `https://www.*.example.com` - allows `https://www.subdomain.example.com` but not `https://www.example.com`
- `https://www-*.example.com` - invalid; `*` must be the full label

## Error Codes

| Reason                                     | Error Code |
| ------------------------------------------ | ---------- |
| Project ID doesn't exist OR JWT is expired | 401        |
| Exists and is invalid                      | 403        |
| Too many requests                          | 1013       |

## Websocket Close Codes

| Code | Description                                                                  | Reconnect   |
| ---- | ---------------------------------------------------------------------------- | ----------- |
| 1001 | Server terminating                                                           | Yes         |
| 4008 | Client stale: connected without a prior subscription and is not sending data | When needed |
| 4010 | Load Rebalancing                                                             | Yes         |

## Best Practices

- Create a new `projectId` for each project. This allows for more granular control, dedicated explorer listings, and project metrics.
- Don't reuse a `projectId`.
- Use the AllowList to limit unauthorized usage.
- Avoid committing projects keys to the repo. Use env variables instead.
