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
                    type: "link",
                    label: "Ethereum",
                    href: "https:web3modal.com",
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
                          label: "Web Applications",
                          collapsed: true,
                          items: [
                            {
                              type: "category",
                              label: "JavaScript",
                              collapsed: true,
                              items: [
                                "products/sdks/ethereum/dApps/web-applications/javascript/sign/overview",
                                "products/sdks/ethereum/dApps/web-applications/javascript/auth/overview",
                                "products/sdks/ethereum/dApps/web-applications/javascript/push/overview",
                                "products/sdks/ethereum/dApps/web-applications/javascript/chat/overview",
                              ],
                            },
                          ],
                        },
                        {
                          type: "category",
                          label: "Native Applications",
                          collapsed: true,
                          items: [
                            {
                              type: "category",
                              label: "iOS",
                              collapsed: true,
                              items: [
                                "products/sdks/ethereum/dApps/native-applications/ios/sign/overview",
                                "products/sdks/ethereum/dApps/native-applications/ios/auth/overview",
                                "products/sdks/ethereum/dApps/native-applications/ios/push/overview",
                                "products/sdks/ethereum/dApps/native-applications/ios/chat/overview",
                              ],
                            },
                            {
                              type: "category",
                              label: "Android",
                              collapsed: true,
                              items: [
                                "products/sdks/ethereum/dApps/native-applications/android/sign/overview",
                                "products/sdks/ethereum/dApps/native-applications/android/auth/overview",
                                "products/sdks/ethereum/dApps/native-applications/android/push/overview",
                                "products/sdks/ethereum/dApps/native-applications/android/chat/overview",
                              ],
                            },
                          ],
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
                          label: "Web Applications",
                          collapsed: true,
                          items: [
                            {
                              type: "category",
                              label: "JavaScript",
                              collapsed: true,
                              items: [
                                "products/sdks/ethereum/wallets/web-applications/javascript/sign/overview",
                                "products/sdks/ethereum/wallets/web-applications/javascript/auth/overview",
                                "products/sdks/ethereum/wallets/web-applications/javascript/push/overview",
                                "products/sdks/ethereum/wallets/web-applications/javascript/chat/overview",
                              ],
                            },
                          ],
                        },
                        {
                          type: "category",
                          label: "Native Applications",
                          collapsed: true,
                          items: [
                            {
                              type: "category",
                              label: "iOS",
                              collapsed: true,
                              items: [
                                "products/sdks/ethereum/wallets/native-applications/ios/sign/overview",
                                "products/sdks/ethereum/wallets/native-applications/ios/auth/overview",
                                "products/sdks/ethereum/wallets/native-applications/ios/push/overview",
                                "products/sdks/ethereum/wallets/native-applications/ios/chat/overview",
                              ],
                            },
                            {
                              type: "category",
                              label: "Android",
                              collapsed: true,
                              items: [
                                "products/sdks/ethereum/wallets/native-applications/android/sign/overview",
                                "products/sdks/ethereum/wallets/native-applications/android/auth/overview",
                                "products/sdks/ethereum/wallets/native-applications/android/push/overview",
                                "products/sdks/ethereum/wallets/native-applications/android/chat/overview",
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
                          label: "Web Applications",
                          collapsed: true,
                          items: [
                            "products/sdks/solana/dApps/web-applications/sign/overview",
                            "products/sdks/solana/dApps/web-applications/auth/overview",
                            "products/sdks/solana/dApps/web-applications/push/overview",
                            "products/sdks/solana/dApps/web-applications/chat/overview",
                          ],
                        },
                        {
                          type: "category",
                          label: "Native Applications",
                          collapsed: true,
                          items: [
                            {
                              type: "category",
                              label: "iOS",
                              collapsed: true,
                              items: [
                                "products/sdks/solana/dApps/native-applications/ios/sign/overview",
                                "products/sdks/solana/dApps/native-applications/ios/auth/overview",
                                "products/sdks/solana/dApps/native-applications/ios/push/overview",
                                "products/sdks/solana/dApps/native-applications/ios/chat/overview",
                              ],
                            },
                          ],
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
                          label: "Web Applications",
                          collapsed: true,
                          items: [
                            "products/sdks/solana/wallets/web-applications/sign/overview",
                            "products/sdks/solana/wallets/web-applications/auth/overview",
                            "products/sdks/solana/wallets/web-applications/push/overview",
                            "products/sdks/solana/wallets/web-applications/chat/overview",
                          ],
                        },
                        {
                          type: "category",
                          label: "Native Applications",
                          collapsed: true,
                          items: [
                            {
                              type: "category",
                              label: "iOS",
                              collapsed: true,
                              items: [
                                "products/sdks/solana/wallets/native-applications/ios/sign/overview",
                                "products/sdks/solana/wallets/native-applications/ios/auth/overview",
                                "products/sdks/solana/wallets/native-applications/ios/push/overview",
                                "products/sdks/solana/wallets/native-applications/ios/chat/overview",
                              ]
                            },
                            {
                              type: "category",
                              label: "Android",
                              collapsed: true,
                              items: [
                                "products/sdks/solana/wallets/native-applications/android/sign/overview",
                                "products/sdks/solana/wallets/native-applications/android/auth/overview",
                                "products/sdks/solana/wallets/native-applications/android/push/overview",
                                "products/sdks/solana/wallets/native-applications/android/chat/overview",
                              ]
                            }
                          ],
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
