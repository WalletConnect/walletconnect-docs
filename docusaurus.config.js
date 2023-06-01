// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const lightCodeTheme = require('prism-react-renderer/themes/github')

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
              '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"><img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>'
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
            sidebarId: 'web',
            label: 'Web'
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'android',
            label: 'Android'
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'ios',
            label: 'iOS'
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'reactnative',
            label: 'React Native'
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'flutter',
            label: 'Flutter'
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "unity",
            label: "Unity",
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
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'v2.0 Getting Started',
                to: '/2.0/#getting-started'
              },
              {
                label: 'Web3Modal SDK',
                to: '/2.0/web3modal/about'
              },
              {
                label: 'Web3Wallet SDK',
                to: '/2.0/web3wallet/about'
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
        disableSwitch: false,
        respectPrefersColorScheme: false
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
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
          '🚨 v1.0 has been sunset. Wallets and Dapps must upgrade to v2.0 before June 28. <a rel="noopener noreferrer" href="/2.0/advanced/migration-from-v1.x/overview">Learn more</a>. 🚨',
        backgroundColor: '#3182ce',
        textColor: '#fff',
        isCloseable: true
      }
    }
}

module.exports = config
