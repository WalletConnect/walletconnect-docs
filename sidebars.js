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
      items: ['readme', 'getting-started']
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
                'web3modal/react/hooks',
                'web3modal/react/options',
                'web3modal/react/components',
                'web3modal/react/email',
                'web3modal/react/siwe',
                'web3modal/react/smart-accounts',
                'web3modal/react/onramp',
                'web3modal/react/theming',
                'web3modal/react/resources'
              ]
            },
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--nextjs',
              label: 'Next.js',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/nextjs/about' },
                'web3modal/nextjs/hooks',
                'web3modal/nextjs/options',
                'web3modal/nextjs/components',
                'web3modal/nextjs/email',
                'web3modal/nextjs/onramp',
                'web3modal/nextjs/siwe',
                'web3modal/nextjs/smart-accounts',
                'web3modal/nextjs/theming',
                'web3modal/nextjs/resources'
              ]
            },
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--vue',
              label: 'Vue',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/vue/about' },
                'web3modal/vue/composables',
                'web3modal/vue/options',
                'web3modal/vue/components',
                'web3modal/vue/email',
                'web3modal/vue/onramp',
                'web3modal/vue/siwe',
                'web3modal/vue/smart-accounts',
                'web3modal/vue/theming',
                'web3modal/vue/resources'
              ]
            },
            {
              type: 'category',
              className: 'sidebar__logo sidebar__logo--javascript',
              label: 'JavaScript',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/javascript/about' },
                'web3modal/javascript/actions',
                'web3modal/javascript/options',
                'web3modal/javascript/components',
                'web3modal/javascript/email',
                'web3modal/javascript/siwe',
                'web3modal/javascript/smart-accounts',
                'web3modal/javascript/onramp',
                'web3modal/javascript/theming',
                'web3modal/javascript/resources'
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
                'web3modal/react-native/email',
                'web3modal/react-native/resources'
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
                { type: 'doc', label: 'Email Wallets', id: 'web3modal/flutter/email-wallets' },
                'web3modal/flutter/actions',
                'web3modal/flutter/events',
                'web3modal/flutter/theming',
                'web3modal/flutter/custom-chains',
                { type: 'doc', label: 'Migration', id: 'web3modal/flutter/migration' },
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/Web3ModalFlutter/tree/master/example'
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
                'web3modal/android/components',
                'web3modal/android/theming',
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/WalletConnectKotlinV2/tree/master/sample/modal/src/main/kotlin/com/walletconnect/sample/modal'
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
                'web3modal/ios/actions',
                'web3modal/ios/usage',
                'web3modal/ios/custom-chains',
                {
                  type: 'link',
                  label: 'Example',
                  href: 'https://github.com/WalletConnect/web3modal-swift/tree/develop/Sample/Example'
                }
              ]
            },
            {
              type: 'category',
              label: 'Unity',
              className: 'sidebar__logo sidebar__logo--unity',
              items: [
                { type: 'doc', label: 'Getting started', id: 'web3modal/unity/about' },
                'web3modal/unity/usage',
                'web3modal/unity/options',
                'web3modal/unity/actions',
                'web3modal/unity/events'
              ]
            },
            {
              type: 'category',
              label: 'Features',
              items: [
                { type: 'doc', label: 'One-Click Auth', id: 'web3modal/features/one-click-auth' },
                { type: 'doc', label: 'Email Wallets', id: 'web3modal/features/email' },
                { type: 'doc', label: 'Onramp', id: 'web3modal/features/onramp' },
                { type: 'doc', label: 'Solana', id: 'web3modal/features/solana' }
              ]
            },
            'web3modal/upgrade',
            'web3modal/v2/about'
          ]
        },
        {
          type: 'category',
          label: 'Web3Inbox',
          collapsed: true,
          collapsible: true,
          items: [
            {
              type: 'category',
              label: 'Apps',
              items: [
                'web3inbox/about',
                'web3inbox/cloud-setup',
                'web3inbox/cloud-sending',
                {
                  type: 'category',
                  label: 'Frontend Integration',
                  items: [
                    'web3inbox/frontend-integration/usage',
                    'web3inbox/frontend-integration/api',
                    'web3inbox/frontend-integration/examples',
                    'web3inbox/frontend-integration/migration-guide'
                  ]
                },
                'web3inbox/backend-integration',
                'web3inbox/demo',
                {
                  type: 'category',
                  label: 'Authorization Signatures',
                  items: [
                    { type: 'doc', label: 'About', id: 'web3inbox/authorization-signatures/about' },
                    {
                      type: 'doc',
                      label: 'This App',
                      id: 'web3inbox/authorization-signatures/this-app'
                    },
                    {
                      type: 'doc',
                      label: 'All Apps',
                      id: 'web3inbox/authorization-signatures/all-apps'
                    }
                  ]
                }
              ]
            },
            { type: 'doc', label: 'Wallets', id: 'web3inbox/wallets' }
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
            'web3wallet/authenticatedSessions',
            'web3wallet/namespaces',
            'web3wallet/mobileLinking',
            'web3wallet/verify',
            { type: 'doc', label: 'Modern Wallets (EIP-5792)', id: 'web3wallet/eip5792' },
            'web3wallet/push-notifications',
            {
              type: 'category',
              label: 'Notify API',
              items: [
                'web3wallet/notify/introduction',
                'web3wallet/notify/installation',
                'web3wallet/notify/usage',
                'web3wallet/notify/spam-protection',
                'web3wallet/notify/resources',
                {
                  type: 'category',
                  label: 'React Native Wallets',
                  items: [
                    'web3wallet/notify/react-native-sdk',
                    'web3inbox/frontend-integration/usage',
                    'web3inbox/frontend-integration/api'
                  ]
                }
              ]
            },
            'web3wallet/best_practises',
            'web3wallet/resources'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Cloud',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        'cloud/explorer',
        'cloud/explorer-submission',
        {
          type: 'category',
          label: 'Explorer Chains',
          items: [
            'cloud/chains/overview',
            'cloud/chains/chain-list'
          ]
        },
        'cloud/verify',
        'cloud/relay',
        'cloud/blockchain-api',
        'cloud/analytics'
      ]
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        
        {
          type: 'category',
          label: 'Multi-Chain',
          items: [
            {
              type: 'category',
              label: 'RPC Reference',
              items: [
                'advanced/multichain/rpc-reference/cosmos-rpc',
                'advanced/multichain/rpc-reference/ethereum-rpc',
                'advanced/multichain/rpc-reference/solana-rpc',
                'advanced/multichain/rpc-reference/near-rpc',
                'advanced/multichain/rpc-reference/starknet-rpc',
                'advanced/multichain/rpc-reference/stellar-rpc',
                'advanced/multichain/rpc-reference/tezos-rpc',
                'advanced/multichain/rpc-reference/xrpl-rpc',
                'advanced/multichain/rpc-reference/casper-rpc',
                'advanced/multichain/rpc-reference/everscale-rpc'
              ]
            },
            {
              type: 'category',
              label: 'Examples',
              items: [,
                {
                  type: 'category',
                  label: 'Polkadot',
                  items: [
                    'advanced/multichain/polkadot/dapp-integration-guide',
                    'advanced/multichain/polkadot/namespaces-guide',
                    'advanced/multichain/polkadot/wallet-integration-guide'
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Providers',
          collapsible: true,
          collapsed: true,
          items: ['advanced/providers/ethereum', 'advanced/providers/universal']
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
              label: 'Core',
              items: ['api/core/pairing', 'api/core/relay', 'api/core/shared-core']
            },
            {
              type: 'category',
              label: 'Notify',
              items: ['api/notify/about']
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
        'advanced/push-server'
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
