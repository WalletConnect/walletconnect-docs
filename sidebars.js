// @ts-check



/* Global Sections */
const dropdown_placeholder = { 
  type: 'html',
  value: '<div class="dropdown_placeholder"></div>',
  defaultStyle: true
}

const cloud = {
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
}

const advanced = {
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
}

const specs = {
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

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  mainSidebar: [
    { 
      type: 'doc',
      label: 'Home',
      className: 'kill',
      id: 'readme'
    },
    {
      type: 'category',
      label: 'SDKs',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        {
          type: 'doc',
          label: 'AppKit',
          id: 'appkit/overview'
        },
        {
          type: 'doc',
          label: 'WalletKit',
          id: 'walletkit/overview'
        },
      ]
    },
    cloud,
    advanced,
    specs,
  ],
  AppKit_React: [
    {
      type: 'category',
      label: 'SDKs',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        {
          type: 'category',
          label: 'Core',
          items: [
            'appkit/react/core/installation',
            'appkit/react/core/hooks',
            'appkit/react/core/options',
            'appkit/react/core/components',
            'appkit/react/core/siwe',
            'appkit/react/core/theming'
          ]
        },
        {
          type: 'category',
          label: 'Accounts',
          items: [
            {
              type: 'category',
              label: 'Universal Wallets',
              items: [
                'appkit/react/accounts/universal-wallets/email',
                'appkit/react/accounts/universal-wallets/socials',
                'appkit/react/accounts/universal-wallets/wallet-features',
                'appkit/react/accounts/universal-wallets/graduation',
                'appkit/react/accounts/universal-wallets/smart-accounts',
                'appkit/react/accounts/universal-wallets/ens'
              ]
            },
            'appkit/react/accounts/multi-accounts'
          ]
        },
        {
          type: 'category',
          label: 'Transactions',
          items: [
            'appkit/react/transactions/onramp',
            'appkit/react/transactions/transaction-history',
            'appkit/react/transactions/swaps',
          ]
        },
        {
          type: 'category',
          label: 'Notifications',
          items: [
            'appkit/react/notifications/notifications',
          ]
        },
        'appkit/react/upgrade',
        {
          type: 'category',
          label: 'Cloud',
          collapsible: false,
          className: 'menu_outer_list',
          items: [
            'appkit/react/cloud/verify',
            'appkit/react/cloud/relay',
            'appkit/react/cloud/blockchain-api',
            'appkit/react/cloud/analytics'
          ]
        }
      ]
    },
    dropdown_placeholder,
  ],
  AppKit_Vue: [
    {
      type: 'category',
      label: 'SDKs',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        {
          type: 'category',
          label: 'Core',
          items: [
            'appkit/vue/core/installation',
            'appkit/vue/core/compositions',
            'appkit/vue/core/options',
            'appkit/vue/core/components',
            'appkit/vue/core/siwe',
            'appkit/vue/core/theming'
          ]
        },
        {
          type: 'category',
          label: 'Accounts',
          items: [
            {
              type: 'category',
              label: 'Universal Wallets',
              items: [
                'appkit/vue/accounts/universal-wallets/email',
                'appkit/vue/accounts/universal-wallets/socials',
                'appkit/vue/accounts/universal-wallets/wallet-features',
                'appkit/vue/accounts/universal-wallets/graduation',
                'appkit/vue/accounts/universal-wallets/smart-accounts',
                'appkit/vue/accounts/universal-wallets/ens'
              ]
            },
            'appkit/vue/accounts/multi-accounts'
          ]
        },
        {
          type: 'category',
          label: 'Transactions',
          items: [
            'appkit/vue/transactions/onramp',
            'appkit/vue/transactions/transaction-history',
            'appkit/vue/transactions/swaps',
          ]
        },
        {
          type: 'category',
          label: 'Notifications',
          items: [
            'appkit/vue/notifications/notifications',
          ]
        },
        'appkit/vue/upgrade',
        {
          type: 'category',
          label: 'Cloud',
          collapsible: false,
          className: 'menu_outer_list',
          items: [
            'appkit/vue/cloud/verify',
            'appkit/vue/cloud/relay',
            'appkit/vue/cloud/blockchain-api',
            'appkit/vue/cloud/analytics'
          ]
        }
      ]
    }
  ],
  walletKit: []
}
