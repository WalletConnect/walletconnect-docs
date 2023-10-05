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
      items: ['readme', 'quickstart']
    },
    {
      type: 'category',
      label: 'SDKs',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        {
          type: 'category',
          label: 'Web3Modal',
          collapsed: true,
          collapsible: true,
          items: [
            'web3modal/about',
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--react',
              label: 'React',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/react/about' },
                'web3modal/react/options',
                'web3modal/react/hooks',
                'web3modal/react/components',
                'web3modal/react/theming',
                'web3modal/react/experimental'
              ]
            },
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--vue',
              label: 'Vue',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/vue/about' },
                'web3modal/vue/options',
                'web3modal/vue/composables',
                'web3modal/vue/components',
                'web3modal/vue/theming',
                'web3modal/vue/experimental'
              ]
            },
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--html',
              label: 'HTML',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/html/about' },
                'web3modal/html/options',
                'web3modal/html/actions',
                'web3modal/html/components',
                'web3modal/html/theming',
                'web3modal/html/experimental'
              ]
            },
            {
              type: 'category',
              label: 'Flutter',
              className: 'sidebar__logo sidebar__logo--flutter',
              items: [
                ,
                { type: 'doc', label: 'Getting started', id: 'web3modal/flutter/installation' },
                { type: 'doc', label: 'Usage', id: 'web3modal/flutter/options' },
                { type: 'doc', label: 'Options', id: 'web3modal/flutter/custom-wallets' },
                'web3modal/flutter/actions',
                'web3modal/flutter/theming',
                'web3modal/flutter/custom-chains',
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/Web3ModalFlutter/tree/master/example/sign'
                }
              ]
            },
            {
              type: 'category',
              label: 'Android',
              className: 'sidebar__logo sidebar__logo--android',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/android/about' },
                'web3modal/android/options',
                'web3modal/android/usage',
                'web3modal/android/actions',
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/WalletConnectKotlinV2/tree/master/sample/modals/src/main/kotlin/com/walletconnect/modals'
                }
              ]
            },
            {
              type: 'category',
              label: 'iOS',
              className: 'sidebar__logo sidebar__logo--ios',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/ios/about' },
                'web3modal/ios/options',
                'web3modal/ios/usage',
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/web3modal-swift/tree/develop/Example'
                }
              ]
            },
            'web3modal/resources',
            'web3modal/upgrade',
            'web3modal/v2/about'
          ]
        },
        {
          type: 'category',
          label: 'Web3Wallet',
          collapsed: true,
          collapsible: true,
          items: [
            'web3wallet/about',
            'web3wallet/wallet-usage',
            'web3wallet/verify',
            {
              type: 'category',
              label: 'Notify',
              items: [
                'web3wallet/notify/installation',
                'web3wallet/notify/usage',
                'web3wallet/notify/spam-protection',
                'web3wallet/notify/examples'
              ]
            },
            'web3wallet/resources',
            'web3wallet/mobileLinking'
          ]
        },
        {
          type: 'category',
          label: 'Web3Inbox',
          collapsed: true,
          collapsible: true,
          items: [
            'web3inbox/about',
            'web3inbox/setup',
            {
              type: 'category',
              label: 'Core components',
              items: [
                'web3inbox/core-components/about',
                'web3inbox/core-components/usage',
                'web3inbox/core-components/api',
                'web3inbox/core-components/examples'
              ]
            },
            'web3inbox/sending-notifications',
            'web3inbox/demo'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Cloud',
      collapsible: false,
      className: 'menu_outer_list',
      items: ['cloud/explorer', 'cloud/verify', 'cloud/relay', 'cloud/blockchain-api']
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        {
          type: 'category',
          label: 'Providers',
          collapsible: true,
          collapsed: true,
          items: ['advanced/providers/ethereum', 'advanced/providers/universal']
        },
        {
          type: 'category',
          label: 'APIs',
          collapsed: true,
          collapsible: true,
          items: [
            {
              type: 'category',
              label: 'Auth',
              items: [
                'api/auth/overview',
                'api/auth/dapp-usage',
                'api/auth/wallet-usage',
                'api/auth/signer-factory',
                'api/auth/resources'
              ]
            },
            {
              type: 'category',
              label: 'Chat',
              items: ['api/chat/about', 'api/chat/usage', 'api/chat/resources']
            },
            {
              type: 'category',
              label: 'Core',
              items: ['api/core/pairing', 'api/core/relay', 'api/core/shared-core']
            },
            {
              type: 'category',
              label: 'Notify',
              items: ['api/notify/about', 'api/notify/usage']
            },
            {
              type: 'category',
              label: 'Sign',
              items: [
                'api/sign/overview',
                'api/sign/dapp-usage',
                'api/sign/wallet-usage',
                'api/sign/smart-contract-wallet-usage'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'WalletConnectModal',
          collapsed: true,
          collapsible: true,
          items: [
            'advanced/walletconnectmodal/about',
            'advanced/walletconnectmodal/usage',
            'advanced/walletconnectmodal/options',
            'advanced/walletconnectmodal/theming',
            'advanced/walletconnectmodal/resources'
          ]
        },
        {
          type: 'category',
          label: 'Multi-Chain',
          items: [
            'advanced/multichain/overview',
            'advanced/multichain/chain-list',
            {
              type: 'category',
              label: 'Polkadot',
              items: [
                'advanced/multichain/polkadot/dapp-integration-guide',
                'advanced/multichain/polkadot/wallet-integration-guide',
                'advanced/multichain/polkadot/namespaces-guide'
              ]
            }
          ]
        },
        'advanced/echo-server',
        {
          type: 'category',
          label: 'Migration from v1.x',
          items: [
            {
              type: 'doc',
              id: 'advanced/migration-from-v1.x/overview',
              label: 'Overview'
            },
            {
              type: 'category',
              label: 'Dapps',
              items: [
                'advanced/migration-from-v1.x/dapps/dapps',
                'advanced/migration-from-v1.x/dapps/dapp-checklist'
              ]
            },
            {
              type: 'category',
              label: 'Wallets',
              items: [
                'advanced/migration-from-v1.x/wallets/wallets',
                'advanced/migration-from-v1.x/wallets/wallet-checklist'
              ]
            },
            'advanced/migration-from-v1.x/what-changed-from-v1.0',
            'advanced/migration-from-v1.x/migration-faq',
            'advanced/migration-from-v1.x/explorer-submission'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Technical Reference',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        {
          type: 'link',
          label: 'Specs',
          href: 'https://specs.walletconnect.com/'
        },
        'advanced/faq'
      ]
    }
  ],
  'web3modal/v2': [
    {
      type: 'html',
      value:
        '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"><img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>',
      defaultStyle: true
    },
    {
      type: 'category',
      label: 'General',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'ref',
          label: 'Overview',
          id: 'web3modal/v2/about'
        }
      ]
    },
    {
      type: 'category',
      label: 'Web',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'React',
          className: 'sidebar__logo sidebar__logo--react',
          items: [
            'web3modal/v2/react/wagmi/installation',
            'web3modal/v2/react/wagmi/components',
            'web3modal/v2/react/wagmi/hooks',
            'web3modal/v2/react/wagmi/options',
            'web3modal/v2/react/wagmi/theming',
            'web3modal/v2/react/wagmi/custom-wallets',
            'web3modal/v2/react/wagmi/custom-chains',
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
          className: 'sidebar__logo sidebar__logo--html',
          items: [
            'web3modal/v2/html/wagmi/installation',
            'web3modal/v2/html/wagmi/components',
            'web3modal/v2/html/wagmi/actions',
            'web3modal/v2/html/wagmi/options',
            'web3modal/v2/html/wagmi/theming',
            'web3modal/v2/html/wagmi/custom-wallets',
            'web3modal/v2/html/wagmi/custom-chains',
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
