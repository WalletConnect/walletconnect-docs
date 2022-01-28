# Registry API

The Registry API currently offers the following functionality:

- [Listings API](#listings-api) - Allows for fetching of wallets and dApps listed in the [WalletConnect Cloud Registry](https://walletconnect.com/registry).
- [Logo API](#logo-api) - Provides logo assets in different sizes for a given registry entry.

## Listings API

### `GET /api/v1/wallets`

#### Response

Returns a JSON object containing all wallets listed in the public registry.

#### Example

```bash
curl https://registry.walletconnect.com/api/v1/wallets

# {
#  "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369": {
#    "id": "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
#    "name": "Rainbow",
#   ...

```

### `GET /api/v1/dapps`

#### Response

Returns a JSON object containing all dApps listed in the public registry.

#### Example

```bash
curl https://registry.walletconnect.com/api/v1/dapps

# {
#   "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110": {
#     "id": "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110",
#     "name": "Etherscan",
#     ...
```

### `GET /api/v1/all`

#### Response

Returns a JSON object containing all entries listed in the public registry.

#### Example

```bash
curl https://registry.walletconnect.com/api/v1/all

# {
#   "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369": {
#     "id": "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
#     "name": "Rainbow",
#     ...
#    },
#   "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110": {
#     "id": "d2ae9c3c2782806fd6db704bf40ef0238af9470d7964ae566114a033f4a9a110",
#     "name": "Etherscan",
#     ...
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
