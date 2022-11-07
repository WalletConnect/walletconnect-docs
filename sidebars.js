// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  mainSidebar: [
    {
      type: "category",
      label: "Introduction",
      className: "menu_outer_list",
      collapsible: false,
      items: ["readme", "how-to-read-the-docs"],
    },
    {
      type: "category",
      label: "Products",
      className: "menu_outer_list",
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Web3Modal",
          collapsible: true,
          items: [
            [
              {
                type: "category",
                label: "Ecosystems",
                className: "menu_outer_list",
                collapsible: false,
                items: [
                  {
                    type: "category",
                    label: "Ethereum",
                    collapsible: true,
                    items: ["products/web3-modal/ethereum/overview"],
                  },
                  {
                    type: "category",
                    label: "Solana",
                    collapsible: true,
                    items: ["products/web3-modal/solana/overview"],
                  },
                ],
              },
            ],
          ],
        },
        {
          type: "category",
          label: "SDKs",
          collapsible: true,
          items: [
            {
              type: "category",
              label: "Ecosystems",
              className: "menu_outer_list",
              collapsible: false,
              items: [
                {
                  type: "category",
                  label: "Ethereum",
                  collapsible: true,
                  items: [
                    {
                      type: "category",
                      label: "dApps",
                      className: "menu_outer_list",
                      collapsible: false,
                      items: [
                        {
                          type: "category",
                          label: "Auth",
                          collapsed: true,
                          items: ["products/sdks/ethereum/dApps/auth/overview"],
                        },
                        {
                          type: "category",
                          label: "Sign",
                          collapsed: true,
                          items: ["products/sdks/ethereum/dApps/sign/overview"],
                        },
                        {
                          type: "category",
                          label: "Push",
                          collapsed: true,
                          items: ["products/sdks/ethereum/dApps/push/overview"],
                        },
                        {
                          type: "category",
                          label: "Chat",
                          collapsed: true,
                          items: ["products/sdks/ethereum/dApps/chat/overview"],
                        },
                      ],
                    },
                    {
                      type: "category",
                      label: "Wallets",
                      className: "menu_outer_list",
                      collapsible: false,
                      items: [
                        {
                          type: "category",
                          label: "Auth",
                          collapsed: true,
                          items: ["products/sdks/ethereum/wallets/auth/overview"],
                        },
                        {
                          type: "category",
                          label: "Sign",
                          collapsed: true,
                          items: ["products/sdks/ethereum/wallets/sign/overview"],
                        },
                        {
                          type: "category",
                          label: "Push",
                          collapsed: true,
                          items: ["products/sdks/ethereum/wallets/push/overview"],
                        },
                        {
                          type: "category",
                          label: "Chat",
                          collapsed: true,
                          items: ["products/sdks/ethereum/wallets/chat/overview"],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "category",
                  label: "Solana",
                  collapsible: true,
                  items: [
                    {
                      type: "category",
                      label: "dApps",
                      className: "menu_outer_list",
                      collapsible: false,
                      items: [
                        {
                          type: "category",
                          label: "Auth",
                          collapsed: true,
                          items: ["products/sdks/solana/dApps/auth/overview"],
                        },
                        {
                          type: "category",
                          label: "Sign",
                          collapsed: true,
                          items: ["products/sdks/solana/dApps/sign/overview"],
                        },
                        {
                          type: "category",
                          label: "Push",
                          collapsed: true,
                          items: ["products/sdks/solana/dApps/push/overview"],
                        },
                        {
                          type: "category",
                          label: "Chat",
                          collapsed: true,
                          items: ["products/sdks/solana/dApps/chat/overview"],
                        },
                      ],
                    },
                    {
                      type: "category",
                      label: "Wallets",
                      className: "menu_outer_list",
                      collapsible: false,
                      items: [
                        {
                          type: "category",
                          label: "Auth",
                          collapsed: true,
                          items: ["products/sdks/solana/wallets/auth/overview"],
                        },
                        {
                          type: "category",
                          label: "Sign",
                          collapsed: true,
                          items: ["products/sdks/solana/wallets/sign/overview"],
                        },
                        {
                          type: "category",
                          label: "Push",
                          collapsed: true,
                          items: ["products/sdks/solana/wallets/push/overview"],
                        },
                        {
                          type: "category",
                          label: "Chat",
                          collapsed: true,
                          items: ["products/sdks/solana/wallets/chat/overview"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Cloud Explorer",
          collapsible: true,
          items: ["products/cloud-explorer/overview"],
        },
      ],
    },
    {
      type: "category",
      label: "Advanced",
      collapsible: false,
      className: "menu_outer_list",
      items: [
        "advanced/migrating-from-v1.0",
        "advanced/relay-server",
        {
          type: "category",
          label: "RPC Reference",
          items: [
            "advanced/rpc-reference/ethereum-rpc",
            "advanced/rpc-reference/cosmos-rpc",
            "advanced/rpc-reference/solana-rpc",
            "advanced/rpc-reference/stellar-rpc",
          ],
        },
      ],
    },
  ],
  specs: [
    {
      type: "autogenerated",
      dirName: "specs",
    },
  ],
};
