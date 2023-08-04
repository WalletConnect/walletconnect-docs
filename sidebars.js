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
      items: [
        'readme',
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
      label: 'SDKs',
      collapsible: false,
      className: 'menu_outer_list',
      items: [
        'web3modal/about',
        {
          type: 'category',
          label: 'Web3Wallet',
          collapsed: true,
          collapsible: true,
          items: ['web3wallet/about', 'web3wallet/wallet-usage', 'web3wallet/resources']
        },
        'web3inbox/about'
      ]
    },
    {
      type: 'category',
      label: 'Cloud',
      collapsible: false,
      className: 'menu_outer_list',
      items: ['cloud/explorer', 'cloud/relay']
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
          items: ['providers/ethereum', 'providers/universal']
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
                'api/auth/installation',
                'api/auth/dapp-usage',
                'api/auth/wallet-usage'
              ]
            },
            {
              type: 'category',
              label: 'Chat',
              items: ['api/chat/overview']
            },
            {
              type: 'category',
              label: 'Core',
              items: ['api/core/overview']
            },
            {
              type: 'category',
              label: 'Push',
              items: ['api/push/overview']
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
            'walletconnectmodal/about',
            'walletconnectmodal/usage',
            'walletconnectmodal/options',
            'walletconnectmodal/theming',
            'walletconnectmodal/resources'
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
                'web3modal/polkadot/dapp-integration-guide',
                'web3wallet/polkadot/wallet-integration-guide',
                'web3wallet/polkadot/namespaces-guide'
              ]
            }
          ]
        },
        'advanced/echo-server'
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
      items: ['web/about-web3modal', 'web/about-web3wallet']
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
        },

        {
          type: 'category',
          label: 'Web3Wallet',
          collapsible: true,
          collapsed: true,
          items: [
            'web/web3wallet/installation',
            'web/web3wallet/wallet-usage',
            'web/web3wallet/upgrade-guide'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Advanced',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'APIs',
          collapsed: true,
          collapsible: true,
          items: [
            {
              type: 'category',
              label: 'Sign',
              collapsible: true,
              collapsed: true,
              items: [
                'web/sign/installation',
                'web/sign/dapp-usage',
                'web/sign/wallet-usage',
                'web/sign/smart-wallets'
              ]
            },
            {
              type: 'category',
              label: 'Auth',
              collapsible: true,
              collapsed: true,
              items: ['web/auth/installation', 'web/auth/dapp-usage', 'web/auth/wallet-usage']
            },
            {
              type: 'category',
              label: 'Push',
              collapsible: true,
              collapsed: true,
              items: ['web/push/installation', 'web/push/dapp-usage', 'web/push/wallet-usage']
            },
            {
              type: 'category',
              label: 'Chat',
              collapsible: true,
              collapsed: true,
              items: ['web/chat/installation', 'web/chat/usage']
            },
            {
              type: 'category',
              label: 'Core',
              collapsible: true,
              collapsed: true,
              items: ['web/core/pairing-api']
            }
          ]
        },
        {
          type: 'category',
          label: 'Providers',
          collapsible: true,
          collapsed: true,
          items: ['web/providers/ethereum', 'web/providers/universal']
        },
        // WalletConnectModal
        {
          type: 'category',
          label: 'WalletConnectModal',
          items: [
            {
              type: 'category',
              label: 'Just Modal',
              items: [
                'web/walletConnectModal/modal/installation',
                'web/walletConnectModal/modal/options',
                'web/walletConnectModal/modal/actions',
                'web/walletConnectModal/modal/theming'
              ]
            },
            {
              type: 'category',
              label: 'With Sign API',
              items: [
                {
                  type: 'category',
                  label: 'HTML',
                  items: [
                    'web/walletConnectModal/sign/html/installation',
                    'web/walletConnectModal/sign/html/options',
                    'web/walletConnectModal/sign/html/actions',
                    'web/walletConnectModal/sign/html/theming',
                    {
                      type: 'link',
                      label: 'Example',
                      href: 'https://github.com/WalletConnect/web3modal-examples/tree/main/walletconnect-modal-sign-html'
                    }
                  ]
                },
                {
                  type: 'category',
                  label: 'React',
                  items: [
                    'web/walletConnectModal/sign/react/installation',
                    'web/walletConnectModal/sign/react/components',
                    'web/walletConnectModal/sign/react/hooks',
                    'web/walletConnectModal/sign/react/options',
                    'web/walletConnectModal/sign/react/theming',
                    {
                      type: 'link',
                      label: 'Example',
                      href: 'https://github.com/WalletConnect/web3modal-examples/tree/main/walletconnect-modal-sign-react'
                    }
                  ]
                }
              ]
            },
            {
              type: 'category',
              label: 'With Auth API',
              items: [
                {
                  type: 'category',
                  label: 'HTML',
                  items: [
                    'web/walletConnectModal/auth/html/installation',
                    'web/walletConnectModal/auth/html/options',
                    'web/walletConnectModal/auth/html/actions',
                    'web/walletConnectModal/auth/html/theming',
                    {
                      type: 'link',
                      label: 'Example',
                      href: 'https://github.com/WalletConnect/web3modal-examples/tree/main/walletconnect-modal-auth-html'
                    }
                  ]
                },
                {
                  type: 'category',
                  label: 'React',
                  items: [
                    'web/walletConnectModal/auth/react/installation',
                    'web/walletConnectModal/auth/react/components',
                    'web/walletConnectModal/auth/react/hooks',
                    'web/walletConnectModal/auth/react/options',
                    'web/walletConnectModal/auth/react/theming',
                    {
                      type: 'link',
                      label: 'Example',
                      href: 'https://github.com/WalletConnect/web3modal-examples/tree/main/walletconnect-modal-auth-react'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      className: 'menu_outer_list',
      collapsible: false,
      items: ['web/guides/examples-and-resources', 'web/guides/nodejs', 'web/guides/shared-core']
    }
  ],
  android: [
    {
      type: 'html',
      value:
        '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"><img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>',
      defaultStyle: true
    },
    {
      type: 'category',
      label: 'SDKs',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Web3Wallet',
          collapsible: true,
          collapsed: true,
          items: [
            'android/web3wallet/installation',
            'android/web3wallet/wallet-usage',
            'android/web3wallet/upgrade-guide'
          ]
        },
        {
          type: 'category',
          label: 'Web3Inbox',
          collapsible: true,
          collapsed: true,
          items: ['android/web3inbox/installation', 'android/web3inbox/usage']
        },
        {
          type: 'category',
          label: 'WalletConnectModal',
          collapsible: true,
          collapsed: true,
          items: ['android/walletconnectmodal/installation', 'android/walletconnectmodal/usage']
        }
      ]
    },
    {
      type: 'category',
      label: 'Advanced',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Sign',
          collapsible: true,
          collapsed: true,
          items: [
            'android/sign/installation',
            'android/sign/dapp-usage',
            'android/sign/wallet-usage'
          ]
        },
        {
          type: 'category',
          label: 'Auth',
          collapsible: true,
          collapsed: true,
          items: [
            'android/auth/installation',
            'android/auth/dapp-or-requester-usage',
            'android/auth/wallet-or-responder-usage'
          ]
        },
        {
          type: 'category',
          label: 'Push',
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Dapp Usage',
              collapsible: true,
              collapsed: true,
              items: [['android/push/getting-started']]
            },
            {
              type: 'category',
              label: 'Wallet Usage',
              collapsible: true,
              collapsed: true,
              items: ['android/push/getting-started']
            }
          ]
        },
        {
          type: 'category',
          label: 'Echo',
          collapsible: true,
          collapsed: true,
          items: ['android/echo/usage']
        },
        {
          type: 'category',
          label: 'Chat',
          collapsible: true,
          collapsed: true,
          items: ['android/chat/installation', 'android/chat/usage']
        },
        {
          type: 'category',
          label: 'Core',
          collapsible: true,
          collapsed: true,
          items: ['android/core/installation', 'android/core/pairing', 'android/core/relay']
        }
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      className: 'menu_outer_list',
      collapsible: false,
      items: ['android/guides/examples-and-resources', 'android/guides/mobile-linking']
    }
  ],
  ios: [
    {
      type: 'html',
      value:
        '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"><img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>',
      defaultStyle: true
    },
    {
      type: 'category',
      label: 'SDKs',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Web3Wallet',
          collapsible: true,
          collapsed: true,
          items: [
            'ios/web3wallet/installation',
            'ios/web3wallet/wallet-usage',
            'ios/web3wallet/upgrade-guide'
          ]
        },
        {
          type: 'category',
          label: 'WalletConnectModal',
          collapsible: true,
          collapsed: true,
          items: ['ios/walletconnectmodal/installation', 'ios/walletconnectmodal/usage']
        },
        {
          type: 'category',
          label: 'Web3Inbox',
          collapsed: true,
          collapsible: true,
          items: ['ios/web3inbox/installation', 'ios/web3inbox/wallet-usage']
        }
      ]
    },
    {
      type: 'category',
      label: 'Advanced',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Sign',
          collapsible: true,
          collapsed: true,
          items: ['ios/sign/installation', 'ios/sign/dapp-usage', 'ios/sign/wallet-usage']
        },
        {
          type: 'category',
          label: 'Auth',
          collapsible: true,
          collapsed: true,
          items: ['ios/auth/installation', 'ios/auth/dapp-usage', 'ios/auth/wallet-usage']
        },
        {
          type: 'category',
          label: 'Push',
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Dapp Usage',
              collapsible: true,
              collapsed: true,
              items: [['ios/push/dapp-usage/getting-started']]
            },
            {
              type: 'category',
              label: 'Wallet Usage',
              collapsible: true,
              collapsed: true,
              items: [['ios/push/wallet-usage/getting-started']]
            }
          ]
        },
        {
          type: 'category',
          label: 'Echo',
          collapsible: true,
          collapsed: true,
          items: ['ios/echo/installation', 'ios/echo/usage']
        },
        {
          type: 'category',
          label: 'Chat',
          collapsible: true,
          collapsed: true,
          items: ['ios/chat/installation', 'ios/chat/usage']
        },
        {
          type: 'category',
          label: 'Core',
          collapsible: true,
          collapsed: true,
          items: [
            'ios/core/installation',
            'ios/core/pairing-usage',
            'ios/core/networking-configuration'
          ]
        },
        {
          type: 'category',
          label: 'Router',
          collapsible: true,
          collapsed: true,
          items: ['ios/router/installation']
        }
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      className: 'menu_outer_list',
      collapsible: false,
      items: ['ios/guides/examples-and-resources', 'ios/guides/mobile-linking']
    }
  ],
  reactnative: [
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
      items: ['reactnative/overview']
    },
    {
      type: 'category',
      label: 'SDKs',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Web3Wallet',
          collapsible: true,
          collapsed: true,
          items: ['reactnative/web3wallet/Installation', 'reactnative/web3wallet/wallet-usage']
        },
        {
          type: 'category',
          label: 'WalletConnectModal',
          collapsible: true,
          collapsed: true,
          items: [
            'reactnative/walletconnectmodal/about',
            'reactnative/walletconnectmodal/installation',
            'reactnative/walletconnectmodal/dapp-usage',
            'reactnative/walletconnectmodal/options'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      className: 'menu_outer_list',
      collapsible: false,
      items: ['reactnative/guides/tutorials']
    }
  ],
  flutter: [
    {
      type: 'html',
      value:
        '<a class="navbar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"><img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>',
      defaultStyle: true
    },
    {
      type: 'category',
      label: 'SDKs',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'WalletConnect Modal',
          collapsible: true,
          collapsed: true,
          items: [
            'flutter/walletconnectmodal/about',
            'flutter/walletconnectmodal/installation',
            'flutter/walletconnectmodal/dapp-usage'
          ]
        },
        {
          type: 'category',
          label: 'Web3Wallet',
          collapsible: true,
          collapsed: true,
          items: ['flutter/web3wallet/installation', 'flutter/web3wallet/wallet-usage']
        }
      ]
    },
    {
      type: 'category',
      label: 'Advanced',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Sign',
          collapsible: true,
          collapsed: true,
          items: ['flutter/dapps/dapp-sign-usage']
        },
        {
          type: 'category',
          label: 'Auth',
          collapsible: true,
          collapsed: true,
          items: ['flutter/dapps/dapp-auth-usage']
        }
      ]
    }
  ],
  unity: [
    {
      type: 'html',
      value:
        '<a class="navbar__brand sidebar__brand" href="/"><div class="navbar__logo"><img src="/img/walletconnect-logo-white.svg" alt="WalletConnect Logo"></div>WalletConnect<span>Docs<span></a>',
      defaultStyle: true
    },
    {
      type: 'category',
      label: 'SDKs',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Web3Wallet',
          collapsible: true,
          collapsed: true,
          items: ['unity/sign/installation', 'unity/sign/dapp-usage', 'unity/sign/wallet-usage']
        }
      ]
    },
    {
      type: 'category',
      label: 'Advanced',
      className: 'menu_outer_list',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Core',
          collapsible: true,
          collapsed: true,
          items: ['unity/core/pairing-api']
        }
      ]
    }
  ]
}
