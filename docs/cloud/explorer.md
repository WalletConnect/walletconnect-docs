# Explorer

The WalletConnect Cloud Explorer is an open-source solution to submit and showcase wallets and dApps that support WalletConnect. You can view existing entries over at our [Explorer](https://walletconnect.com/explorer) or use the [Cloud Explorer API](#cloud-explorer-api) to fetch them programmatically.

## Setting Up a New Project

In order to connect to WalletConnect Cloud, you need to create a new project:

1. Go to https://cloud.walletconnect.com/app
2. Tap New Project
3. Give it a name and tap Create button
4. Your new project should appear on the projects list
5. You should see a project ID string if you tap on your project

## Submitting a project

Head over to [cloud.walletconnect.com](https://cloud.walletconnect.com/) and create an account if you don't already have one. Once you sign in, simply fill out our project form under the "Explorer" section and submit it for review. To ensure fast approval make sure you follow our [submission guidelines](https://walletconnect.com/guidelines). Once approved your project will automatically appear on our website and API.

If you would like to edit or claim an existing cloud explorer item, email us at support@walletconnect.com to help migrate the listing to your account.

## Cloud Explorer API

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

By default chains endpoint returns all the chains supported by WalletConnect. 
#### Query Parameters
You can use following query params to query chains by its namespace and exclude testnets:

| Param      | Description                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| testnets   | Determines if testnets should be included in the response <br/> (e.g. `?testnets=false`, defaults to `true` if not provided)  |
| namespaces | Returns chains that belong to one of the provided namespaces<br/>(e.g. `?namespaces=eip155,cosmos,solana`)                  |

#### `GET /v3/chains`

Returns all the chains supported by WalletConnect.

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