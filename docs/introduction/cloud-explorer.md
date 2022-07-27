# Cloud Explorer

The WalletConnect Cloud Explorer is an open-source solution to submit and showcase wallets and dApps that support WalletConnect. You can view existing entries over at our [explorer website](https://explorer.walletconnect.com/) or use the [Cloud Explorer API](#cloud-explorer-api) to fetch them programmatically.

## Submitting a project

Head over to [cloud.walletconnect.com](https://cloud.walletconnect.com/) and create an account if you don't already have one. Once you sign in, simply fill out our project form under the "Explorer" section and submit it for review. To ensure fast approval make sure you follow our [submission guidelines](https://explorer.walletconnect.com/guidelines). Once approved your project will automatically appear on our website and API.

If you would like to edit or claim an existing cloud explorer item, email us at support@walletconnect.com to help migrate the listing to your account.

## Cloud Explorer API

The Cloud Explorer API currently offers the following functionality:

- [Listings](#listings-api) - Allows for fetching of wallets and dApps listed in the [WalletConnect Cloud Explorer](https://explorer.walletconnect.com/).
- [Logo](#logo-api) - Provides logo assets in different sizes for a given Cloud explorer entry.

### Listings

By default listings endpoints return all data for provided type. You can use following query params to return paginated data or search for a specific listing by its name:

| Param   | Description                                                                         |
| ------- | ----------------------------------------------------------------------------------- |
| entries | Specifies how many entries will be returned (must be used together with page param) |
| page    | Specifies current page (must be used with entries param)                            |
| search  | Returns listings whose name matches provided search query                           |
| version | Specifies WalletConnect supported version (1 or 2)                                  |

#### `GET /v1/wallets`

Returns a JSON object containing all wallets listed in the cloud explorer. <br />
[See Example](https://explorer-api.walletconnect.com/v1/wallets?entries=5&page=1)

#### `GET /v1/dapps`

Returns a JSON object containing all dApps listed in the public cloud explorer. <br />
[See Example](https://explorer-api.walletconnect.com/v1/dapps?entries=5&page=1)

#### `GET /v1/hybrid`

Returns a JSON object containing all hybrids listed in the public cloud explorer. <br />
[See Example](https://explorer-api.walletconnect.com/v1/hybrid?entries=5&page=1)

#### `GET /v1/all`

Returns a JSON object containing all entries listed in the public cloud explorer. <br />
[See Example](https://explorer-api.walletconnect.com/v1/all?entries=5&page=1)

### Logo v1

| Param | Description                                                                      |
| ----- | -------------------------------------------------------------------------------- |
| size  | Determines resolution of returned image can be one of: `sm`, `md` or `lg`        |
| id    | Corresponds to a cloud explorer entry's id field as returned by the Listings API |

#### `GET /v1/logo/:size/:id`

Returns the image source of the logo for `id` sized according `size`. <br />
[See Example](https://explorer-api.walletconnect.com/v1/logo/lg/d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110)

### Logo v2

| Param | Description                                                                              |
| ----- | ---------------------------------------------------------------------------------------- |
| size  | Determines resolution of returned image can be one of: `sm`, `md` or `lg`                |
| id    | Corresponds to a cloud explorer entry's `image_id` field as returned by the Listings API |

#### `GET /v2/logo/:size/:image_id`

Returns the image source of the logo for `image_id` sized according `size`. <br />
[See Example](https://explorer-api.walletconnect.com/v2/logo/md/32a77b79-ffe8-42c3-61a7-3e02e019ca00)
