# WalletConnect Docs

This repo runs [docs.walletconnect.com](https://docs.walletconnect.com).

Source can be viewed in [`docs`](./docs/) directory.

## Running Locally

1. `yarn install`
2. `yarn start`
3. Open `http://localhost:3000/`

## Adding a New Page

1. Create a new file in `docs/`
2. Configure `sidebars.js` to create the sidebar link.

## Editing a Page

1. Open the file in `docs/`

Older versions are available in `versioned_docs/`.

## Modifying routes

Whenever a route is changed DocSearch needs to crawls the website in order to keep the search engine working properly, this is scheduled once a week, it is therefore
recommended to use the redirect plugin to avoid broken links. See [link](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects).

## Customize Settings & Theme

1. Open `docusaurus.config.js`

## More

For more options, check the [Docusaurus docs](https://docusaurus.io/).

Archived v1.0 docs can be viewed in the [v1.0 branch](https://github.com/WalletConnect/walletconnect-docs/tree/v1.0).