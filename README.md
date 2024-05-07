# WalletConnect Docs

This repo runs [docs.walletconnect.com](https://docs.walletconnect.com).

Source can be viewed in [`docs`](./docs/) directory.

## Running Locally

1. `pnpm install`
2. `pnpm start`
3. Open `http://localhost:3000/`

## Adding a New Page

1. Create a new file in `docs/`
2. Configure `sidebars.js` to create the sidebar link.

## Editing a Page

1. Open the file in `docs/`

Older versions are available in `versioned_docs/`.

## Modifying routes

Whenever a route is changed DocSearch needs to crawl the website in order to keep the search engine working properly, this is scheduled once a week, it is therefore
recommended to use redirects to avoid broken links. See [link](https://vercel.com/docs/concepts/projects/project-configuration#redirects).

## Customize Settings & Theme

1. Open `docusaurus.config.js`

# Tab Components

> [!IMPORTANT]
> While creating titles inside a tab it is recommended to use **four** number signs (#) to avoid overpopulating the table of content.

### Platform Tabs

In your mdx file first import `PlatformTabs` and `PlatformTabItem` from `docs/components/PlatformTabs` and `docs/components/PlatformTabItem` relatively and wrap your content around them

You can find the supported platform in `docs/components/PlatformTabs.js`, they are grouped in an array called `PLATFORM_MAP`

```mdx
import PlatformTabs from '../components/PlatformTabs'
import PlatformTabItem from '../components/PlatformTabItem'

<PlatformTabs
	groupId="anyId"
	activeOptions={["web","ios","android"]}
>
<PlatformTabItem value="web">

#### Heading here

Information related to web

</PlatformTabItem>
<PlatformTabItem value="ios">

#### Heading here

Information related to ios

</PlatformTabItem>
<PlatformTabItem value="android">

#### Heading here

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

#### Heading here

Here you can add all the information related to Custom A

</TabItem>
<TabItem value="custom-b" label="Custom B">

#### Heading here

Here you can add all the information related to Custom B

</TabItem>
</Tabs>
```

## More

For more options, check the [Docusaurus docs](https://docusaurus.io/).

Archived v1.0 docs can be viewed in the [v1.0 branch](https://github.com/WalletConnect/walletconnect-docs/tree/v1.0).
