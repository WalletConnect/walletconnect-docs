# Explorer API

:::info

Some of our Legacy Explorer endpoints will be deprecated from 30 Jan 2024 onwards. Please read [here](#legacy-endpoints) for further information.
:::

The Cloud Explorer API currently offers the following functionality:

- [Listings](#listings) - Allows for fetching of wallets and dApps listed in the [WalletConnect Cloud Explorer](https://walletconnect.com/explorer).
- [Logos](#logos) - Provides logo assets in different sizes for a given Cloud explorer entry.

### Listings

By default listings endpoints return all data for provided type. You can use following query params to return paginated data or search for a specific listing by its name:

| Param       | Required? | Description                                                                                                              |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| projectId   | Required  | Your WalletConnect Cloud Project ID (from [cloud.walletconnect.com](https://cloud.walletconnect.com/))                   |
| entries     |           | Specifies how many entries will be returned (must be used together with page param)                                      |
| page        |           | Specifies current page (must be used with entries param)                                                                 |
| search      |           | Returns listings whose name matches provided search query                                                                |
| ids         |           | Returns listings whose id matches provided ids (e.g. `&ids=LISTING_ID1,LISTING_ID2`)                                     |
| chains      |           | Returns listings that support at least one of the provided chains<br/>(e.g. `?chains=eip155:1,eip155:137`)               |
| platforms   |           | Returns listings that support at least one of the provided platforms<br/>(e.g. `?platforms=ios,android,mac,injected`)    |
| sdks        |           | Returns listings that support at least one of the provided WalletConnect SDKs<br/>(e.g. `?sdks=sign_v1,sign_v2,auth_v1`) |
| standards   |           | Returns listings that support at least one of the provided standards<br/>(e.g. `?standards=eip-712,eip-3085`)            |
| ~~version~~ |           | Deprecated - replaced by `sdks` param. Specifies supported Sign version (1 or 2)                                         |

#### `GET /v3/wallets`

Returns a JSON object containing all wallets listed in the cloud explorer.

Examples:

- `GET https://explorer-api.walletconnect.com/v3/wallets?projectId=YOUR_PROJECT_ID&entries=5&page=1` (will return the first 5 wallets from the first page)
- `GET https://explorer-api.walletconnect.com/v3/wallets?projectId=YOUR_PROJECT_ID&platforms=injected` (will only return injected wallets)

#### `GET /v3/dapps`

Returns a JSON object containing all dApps listed in the public cloud explorer.

Examples:

- `GET https://explorer-api.walletconnect.com/v3/dapps?projectId=YOUR_PROJECT_ID&entries=5&page=1`

#### `GET /v3/hybrid`

Returns a JSON object containing all hybrids listed in the public cloud explorer.

Examples:

- `GET https://explorer-api.walletconnect.com/v3/hybrid?projectId=YOUR_PROJECT_ID&entries=5&page=1`

#### `GET /v3/all`

Returns a JSON object containing all entries listed in the public cloud explorer.

Examples:

- `GET https://explorer-api.walletconnect.com/v3/all?projectId=YOUR_PROJECT_ID&entries=5&page=1`

#### `GET /v3/all?projectId=YOUR_PROJECT_ID&ids=LISTING_ID1,LISTING_ID2`

Returns a JSON object containing the entry listings by ID, which can be useful for allowlisting purposes. <br/>
You can find and copy listing ids from our [Explorer](https://walletconnect.com/explorer)

Examples:

- `GET https://explorer-api.walletconnect.com/v3/all?projectId=YOUR_PROJECT_ID&ids=be49f0a78d6ea1beed3804c3a6b62ea71f568d58d9df8097f3d61c7c9baf273d,4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0`

### Chains

By default chains endpoint returns all chains registered under [CASA Namespace](https://github.com/ChainAgnostic/CASA) and that were approved by following our [Add Chain issue template](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=)

#### Query Parameters

You can use following query params to query chains by its namespace and exclude testnets:

| Param      | Description                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| testnets   | Determines if testnets should be included in the response <br/> (e.g. `?testnets=false`, defaults to `true` if not provided) |
| namespaces | Returns chains that belong to one of the provided namespaces<br/>(e.g. `?namespaces=eip155,cosmos,solana`)                   |

#### `GET /v3/chains`

Returns all chains registered under [CASA Namespace](https://github.com/ChainAgnostic/CASA) and that were approved by following our [Add Chain issue template](https://github.com/WalletConnect/walletconnect-monorepo/issues/new?assignees=&labels=type%3A+new+chain+request&template=new_chain_to_explorer.md&title=)

Examples:

- `GET https://explorer-api.walletconnect.com/v3/chains?projectId=YOUR_PROJECT_ID`
- `GET https://explorer-api.walletconnect.com/v3/chains?projectId=YOUR_PROJECT_ID&testnets=false`
- `GET https://explorer-api.walletconnect.com/v3/chains?projectId=YOUR_PROJECT_ID&namespaces=eip155,cosmos`

### Logos

#### Path Parameters

| Param | Description                                                                              |
| ----- | ---------------------------------------------------------------------------------------- |
| size  | Determines resolution of returned image can be one of: `sm`, `md` or `lg`                |
| id    | Corresponds to a Cloud Explorer entry's `image_id` field as returned by the Listings API |

#### Query Parameters

| Param     | Required? | Description                                                                                            |
| --------- | --------- | ------------------------------------------------------------------------------------------------------ |
| projectId | Required  | Your WalletConnect Cloud Project ID (from [cloud.walletconnect.com](https://cloud.walletconnect.com/)) |

#### `GET /v3/logo/:size/:image_id`

Returns the image source of the logo for `image_id` sized according `size`.

Examples:

- `GET https://explorer-api.walletconnect.com/v3/logo/md/32a77b79-ffe8-42c3-61a7-3e02e019ca00?projectId=YOUR_PROJECT_ID`

### Legacy Endpoints

As part of our ongoing commitment to providing secure, efficient, and up-to-date services, we are announcing the deprecation of certain legacy endpoints within the Explorer API.

#### Why are we deprecating these endpoints?

These endpoints are legacy artifacts from the WalletConnect Protocol v1.0 era. The decision to deprecate these endpoints is driven by our commitment to maintaining the highest standards of security, performance, and scalability.

#### What does this mean for you?

This deprecation only affects you if you are still relying on: registry.walletconnect.**ORG** and/or the affected endpoints listed below

The following will no longer be supported from **1pm (13:00) GMT on January 30, 2024 onwards.**

#### Affected domains

The `registry.walletconnect.org` subdomain will be shut down, while the registry subdomain on .com (i.e. `registry.walletconnect.com`) will continue to operate

#### Affected endpoints

`/data/{type}.json`

https://registry.walletconnect.org/data/wallets.json

`/logo/{size}/{id}`

https://registry.walletconnect.org/logo/md/c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96.jpeg

`/v1/logo/{size}/{id}` and `/api/v1/logo/{size}/{id}`
https://registry.walletconnect.com/api/v1/logo/md/d01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974

https://registry.walletconnect.com/v1/logo/md/d01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974

`/v1/{type}`

https://registry.walletconnect.com/v1/wallets

https://registry.walletconnect.com/v1/dapps

https://registry.walletconnect.com/v1/all

`/v2/logo/{size}/{id}` and `/api/v2/logo/{size}/{id}`
https://registry.walletconnect.com/api/v2/logo/lg/32a77b79-ffe8-42c3-61a7-3e02e019ca00

https://registry.walletconnect.com/v2/logo/lg/32a77b79-ffe8-42c3-61a7-3e02e019ca00

`/v2/{type}`

https://registry.walletconnect.com/v2/wallets

https://registry.walletconnect.com/v2/dapps

https://registry.walletconnect.com/v2/all

#### What do you need to do?

If you are still using these legacy endpoints, all you need to do is simply upgrade before **January 30, 2024**. You can do so by updating any custom API requests to:

- use the `/v3/` prefix
- adding your dapp’s/wallet’s projectId to each request via `?projectId=` query parameter

Below are a few upgrade examples that you can refer to.

### Upgrade examples

#### Scenario 1

Your dapp is querying the deprecated [registry.walletconnect.org/data/wallets.json](https://registry.walletconnect.org/data/wallets.json) endpoint for wallet metadata.

**Issues:**

- [registry.walletconnect.org](https://registry.walletconnect.org) - the registry...org subdomain will be shut down.
- The `/data/wallets.json` endpoint will be shut down.

**Solution:**

- You should upgrade to the `explorer-api.walletconnect.com/v3/wallets` endpoint, which returns the equivalent data with additional filtering options.
- The equivalent, upgraded request would be: GET https://explorer-api.walletconnect.com/v3/wallets?projectId=YOUR_PROJECT_ID

#### Scenario 2

Your dapp is querying the deprecated `registry.walletconnect.com/v2/wallets` endpoint for wallet metadata

**Issues:**

- The `/v2/wallets` endpoint will be shut down.

**Solution:**

- You should upgrade to the `explorer-api.walletconnect.com/v3/wallets` endpoint, which returns the equivalent data with additional filtering options.
- The equivalent, upgraded request would be: GET https://explorer-api.walletconnect.com/v3/wallets?projectId=YOUR_PROJECT_ID

#### Scenario 3

Your dapp is querying the deprecated `registry.walletconnect.org/logo/{size}/{id}.jpeg` endpoint for wallet logos.

**Issues:**

- [registry.walletconnect.org](https://registry.walletconnect.org) - the registry...org subdomain will be shut down.
- The `/logo/` endpoints (without /v3/ prefix) will be shut down.

**Solution:**

- You should upgrade to the `explorer-api.walletconnect.com/v3/logo/{size}/{image_id}` endpoint, which returns the equivalent logo.
- A specific dapp’s/wallet’s image_id can be looked up via the data endpoints, e.g. /`v3/wallets`, as shown above.
- For your convenience, **endpoints like /v3/wallets already provide an image_url object with the relevant `/logo/` requests for each entry.**
- Taking MetaMask as an example:
  - Deprecated: GET https://registry.walletconnect.org/logo/md/c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96.jpeg
  - Equivalent upgraded request: GET [explorer-api.walletconnect.com/v3/logo/md/5195e9db-94d8-4579-6f11-ef553be95100?projectId=YOUR_PROJECT_ID](https://explorer-api.walletconnect.com/v3/logo/md/5195e9db-94d8-4579-6f11-ef553be95100?projectId=YOUR_PROJECT_ID)
