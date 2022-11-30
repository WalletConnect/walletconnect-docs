# Cloud Explorer

The WalletConnect Cloud Explorer is an open-source solution to submit and showcase wallets and dApps that support WalletConnect. You can view existing entries over at our [explorer website](https://explorer.walletconnect.com/) or use the [Cloud Explorer API](#cloud-explorer-api) to fetch them programmatically.

## Submitting a project

Head over to [cloud.walletconnect.com](https://cloud.walletconnect.com/) and create an account if you don't already have one. Once you sign in, simply fill out our project form under the "Explorer" section and submit it for review. To ensure fast approval make sure you follow our [submission guidelines](https://explorer.walletconnect.com/guidelines). Once approved your project will automatically appear on our website and API.

If you would like to edit or claim an existing cloud explorer item, email us at support@walletconnect.com to help migrate the listing to your account.

## Cloud Explorer API

The Cloud Explorer API currently offers the following functionality:

- [Listings](#listings) - Allows for fetching of wallets and dApps listed in the [WalletConnect Cloud Explorer](https://explorer.walletconnect.com/).
- [Logos](#logos) - Provides logo assets in different sizes for a given Cloud explorer entry.

### Listings

By default listings endpoints return all data for provided type. You can use following query params to return paginated data or search for a specific listing by its name:

| Param       | Required? | Description                                                                                                              |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| projectId   | Required  | Your WalletConnect Cloud Project ID (from [cloud.walletconnect.com](https://cloud.walletconnect.com/))                   |
| entries     |           | Specifies how many entries will be returned (must be used together with page param)                                      |
| page        |           | Specifies current page (must be used with entries param)                                                                 |
| search      |           | Returns listings whose name matches provided search query                                                                |
| chains      |           | Returns listings that support at least one of the provided chains<br/>(e.g. `?chains=eip155:1,eip155:137`)               |
| platforms   |           | Returns listings that support at least one of the provided platforms<br/>(e.g. `?platforms=ios,android,mac`)             |
| sdks        |           | Returns listings that support at least one of the provided WalletConnect SDKs<br/>(e.g. `?sdks=sign_v1,sign_v2,auth_v1`) |
| ~~version~~ |           | Deprecated - replaced by `sdks` param. Specifies supported Sign version (1 or 2)                                         |

#### `GET /v3/wallets`

Returns a JSON object containing all wallets listed in the cloud explorer.

Examples:

- `GET https://explorer-api.walletconnect.com/v3/wallets?projectId=YOUR_PROJECT_ID&entries=5&page=1`

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
