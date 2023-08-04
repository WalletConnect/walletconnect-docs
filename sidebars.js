// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  mainSidebar: [
    {
      type: 'html',
      value:
        '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"><img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>',
      defaultStyle: true
    },
    {
      type: 'category',
      label: 'Introduction',
      className: 'menu_outer_list',
      collapsible: false,
      items: ['readme']
    }
  ],
  web: [
    {
      type: 'html',
      value:
        '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"><img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>',
      defaultStyle: true
    },
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      className: 'menu_outer_list',
      items: ['web/about-web3modal']
    },
    {
      type: 'category',
      label: 'SDKs',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Web3Modal',
          items: [
            {
              type: 'category',
              label: 'React',
              items: [
                'web/web3modal/react/wagmi/installation',
                'web/web3modal/react/wagmi/components',
                'web/web3modal/react/wagmi/hooks',
                'web/web3modal/react/wagmi/options',
                'web/web3modal/react/wagmi/theming',
                'web/web3modal/react/wagmi/custom-wallets',
                'web/web3modal/react/wagmi/custom-chains',
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/web3modal-examples/tree/main/web3modal-wagmi-react'
                }
              ]
            },
            {
              type: 'category',
              label: 'HTML',
              items: [
                'web/web3modal/html/wagmi/installation',
                'web/web3modal/html/wagmi/components',
                'web/web3modal/html/wagmi/actions',
                'web/web3modal/html/wagmi/options',
                'web/web3modal/html/wagmi/theming',
                'web/web3modal/html/wagmi/custom-wallets',
                'web/web3modal/html/wagmi/custom-chains',
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/web3modal-examples/tree/main/web3modal-wagmi-html'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
