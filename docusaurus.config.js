// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WalletConnect Docs',
  tagline: 'WalletConnect is an open protocol to communicate securely between Dapps and Wallets.',
  url: 'https://docs.walletconnect.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  //favicon: 'img/favicon.ico',
  organizationName: 'walletconnect', // Usually your GitHub org/user name.
  projectName: 'walletconnect-docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/WalletConnect/walletconnect-docs/blob/main/',
          lastVersion: "current",
          versions: {
            "current": {
              "label": "2.0 beta"
            },
          },
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'WalletConnect',
        logo: {
          alt: 'WalletConnect Logo',
          src: 'img/walletconnect-logo.svg',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'left',
            label: '2.0',
          },
          {
            href: 'https://www.walletconnect.com/',
            position: 'left',
            label: 'Website',
          },
          {
            href: 'https://discord.gg/q2BKTBVxYu',
            position: 'left',
            label: 'Discord',
          },
          {
            href: 'https://twitter.com/walletconnect',
            position: 'left',
            label: 'Twitter',
          },
          {
            href: 'https://github.com/walletconnect/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/#getting-started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/cB54BwPGru',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/walletconnect',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://medium.com/walletconnect',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/walletconnect/walletconnect-docs/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WalletConnect, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['swift','kotlin'],
      },
      algolia: {
        appId: 'BH4D9OD16A',
        apiKey: '4cf6bd4618643027dd526ed4ff272978',
        indexName: 'walletconnect',
      },
    }),
};

module.exports = config;
