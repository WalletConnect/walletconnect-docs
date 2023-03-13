// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WalletConnect Docs',
  tagline: 'WalletConnect is an open protocol to communicate securely between Dapps and Wallets.',
  url: 'https://docs.walletconnect.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'walletconnect',
  projectName: 'walletconnect-docs',
  scripts: [
    {
      src: 'https://plausible.io/js/plausible.js',
      defer: true,
      'data-domain': 'docs.walletconnect.com'
    }
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          breadcrumbs: false,
          lastVersion: 'current',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          editUrl: 'https://github.com/WalletConnect/walletconnect-docs/blob/main/',
          versions: {
            '1.0': {
              badge: false,
              label: 'v1.x.x',
              path: '1.0'
            },
            current: {
              badge: false,
              label: 'v2.x.x',
              path: '2.0'
            }
          },
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        items: [
          {
            type: 'html',
            value:
              '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg" alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>'
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'readme',
            label: 'Overview'
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'javascript',
            label: 'JavaScript'
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'kotlin',
            label: 'Kotlin'
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'flutter',
            label: 'Flutter'
          },
          {
            href: 'https://github.com/walletconnect/',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'V1.0 Getting Started',
                to: '/#getting-started'
              },
              {
                label: 'v2.0 Getting Started',
                to: '/2.0/#getting-started'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github Discussions',
                href: 'https://github.com/WalletConnect/walletconnect-monorepo/discussions'
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/kdTQHQ6AFQ'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/walletconnect'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://medium.com/walletconnect'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/walletconnect/walletconnect-docs/'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WalletConnect, Inc.`
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false
      },
      prism: {
        darkTheme: darkCodeTheme,
        additionalLanguages: ['swift', 'kotlin']
      },
      algolia: {
        appId: 'KEO8ND6AUT',
        apiKey: '5921626237dc9040afc258af25d4e77d',
        indexName: 'walletconnect',
        contextualSearch: true
      },
      announcementBar: {
        id: 'support_us',
        content:
          '🚨 v1.0 has been sunset. Wallets and Dapps must upgrade to v2.0 before June 28. <a rel="noopener noreferrer" href="/2.0/advanced/migrating-from-v1.0">Learn more</a>. 🚨',
        backgroundColor: '#3182ce',
        textColor: '#fff',
        isCloseable: true
      }
    }
}

module.exports = config
