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
                'web3modal/react/about',
                {
                  type: 'category',
                  label: 'Wagmi',
                  items: [
                    { type: 'doc', label: 'Getting started', id: 'web3modal/react/wagmi/about' },
                    'web3modal/react/wagmi/options',
                    'web3modal/react/wagmi/hooks',
                    'web3modal/react/wagmi/components',
                    'web3modal/react/wagmi/theming',
                  ]
                },
                {
                  type: 'category',
                  label: 'Ethers',
                  items: [
                    { type: 'doc', label: 'Getting started', id: 'web3modal/react/ethers/about' },
                    'web3modal/react/ethers/options',
                    'web3modal/react/ethers/hooks',
                    'web3modal/react/ethers/components',
                    'web3modal/react/ethers/theming',
                  ]
                },
                'web3modal/react/resources',
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
              ]
            },
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--javascript',
              label: 'JavaScript',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/javascript/about' },
                'web3modal/javascript/options',
                'web3modal/javascript/actions',
                'web3modal/javascript/components',
                'web3modal/javascript/theming',
              ]
            },
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--react-native',
              label: 'React Native',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/react-native/about' },
                'web3modal/react-native/options',
                'web3modal/react-native/hooks',
                'web3modal/react-native/components',
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
            'web3wallet/mobileLinking',
            'web3wallet/namespaces'
          ]
        },
        {
          type: 'category',
          label: 'Web3Inbox',
          collapsed: true,
          collapsible: true,
          items: [
            'web3inbox/about',
            'web3inbox/domain-setup',
            {
              type: 'category',
              label: 'Frontend Integration',
              items: [
                'web3inbox/frontend-integration/about',
                'web3inbox/frontend-integration/usage',
                'web3inbox/frontend-integration/api',
                'web3inbox/frontend-integration/examples'
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
              label: 'Notify API',
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
          label: 'JavaScript',
          className: 'sidebar__logo sidebar__logo--javascript',
          items: [
            'web3modal/v2/javascript/wagmi/installation',
            'web3modal/v2/javascript/wagmi/components',
            'web3modal/v2/javascript/wagmi/actions',
            'web3modal/v2/javascript/wagmi/options',
            'web3modal/v2/javascript/wagmi/theming',
            'web3modal/v2/javascript/wagmi/custom-wallets',
            'web3modal/v2/javascript/wagmi/custom-chains',
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
