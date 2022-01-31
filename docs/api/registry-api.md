# Registry API

The Registry API currently offers the following functionality:

- [Listings API](#listings-api) - Allows for fetching of wallets and dApps listed in the [WalletConnect Cloud Registry](https://walletconnect.com/registry).
- [Logo API](#logo-api) - Provides logo assets in different sizes for a given registry entry.

## Listings API

By default listings endpoints return all data for provided type. You can use following query params to return paginated data or search for specific listing by its name:

| Name    | Description                                                                         |
| ------- | ----------------------------------------------------------------------------------- |
| entries | Specifies how many entries will be returned (must be used together with page param) |
| page    | Specifies current page (must be used with entries param)                            |
| search  | Returns listings whos name matches peovided search query                            |

### `GET /api/v1/wallets`

#### Response

Returns a JSON object containing all wallets listed in the public registry.

#### Example

```bash
curl https://registry.walletconnect.com/api/v1/wallets

# {
#  "count": 12,
#  "listings": [
#     "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369": {
#       "id": "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
#       "name": "Rainbow",
#   ...

```

### `GET /api/v1/dapps`

#### Response

Returns a JSON object containing all dApps listed in the public registry.

#### Example

```bash
curl https://registry.walletconnect.com/api/v1/dapps

# {
#   "count": 6,
#   "listings": [
#       "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110": {
#         "id": "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110",
#         "name": "Etherscan",
#           ...
```

### `GET /api/v1/all`

#### Response

Returns a JSON object containing all entries listed in the public registry.

#### Example

```bash
curl https://registry.walletconnect.com/api/v1/all

# {
#   "count": 18,
#   "listings": [
#       "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369": {
#         "id": "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
#         "name": "Rainbow",
#         ...
#       },
#       "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110": {
#         "id": "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110",
#         "name": "Etherscan",
#         ...
```

## Logo API

### `GET /api/v1/logo/:size/:id`

#### Request

- The `size` parameter can be one of: `sm | md | lg`
- The `id` parameter corresponds to a registry entry's `id` field as returned by the Listings API.

#### Response

Returns the image source of the logo for `id` sized according `size`.

#### Example

```bash
# Resolve the Etherscan logo in large (`lg`) format.
curl 'https://registry.walletconnect.com/api/v1/logo/lg/d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110'

# -> https://imagedelivery.net/...
```
