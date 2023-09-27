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
recommended to use redirects to avoid broken links. See [link](https://vercel.com/docs/concepts/projects/project-configuration#redirects).

## Customize Settings & Theme

1. Open `docusaurus.config.js`

## Components

### Installation tabs

````
```bash npm2yarn
npm install package
```
````

### Platform Tabs

In your mdx file first import PlatformTabs and PlatformTabItem from the docs/components folder and wrap your content around them

```mdx
import PlatformTabs from '../components/PlatformTabs'
import PlatformTabItem from '../components/PlatformTabItem'

<PlatformTabs
	groupId="w3w"
	activeOptions={["web","ios","android"]}
>
<PlatformTabItem value="web">

Information related to web

</PlatformTabItem>
<PlatformTabItem value="ios">

Information related to ios

</PlatformTabItem>
<PlatformTabItem value="android">

Information related to android

</PlatformTabItem>
</PlatformTabs>
```

### Custom Tabs

In your mdx file first import Tabs and TabItem and wrap your content around them

```mdx
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

<Tabs>
<TabItem value="custom-a" label="Custom A">

Here you can add all the information related to Custom A

</TabItem>
<TabItem value="custom-b" label="Custom B">

Here you can add all the information related to Custom B

</TabItem>
</Tabs>
```

## More

For more options, check the [Docusaurus docs](https://docusaurus.io/).

Archived v1.0 docs can be viewed in the [v1.0 branch](https://github.com/WalletConnect/walletconnect-docs/tree/v1.0).