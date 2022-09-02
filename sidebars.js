// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  mainSidebar: [
    {
      type: "category",
      label: "Introduction",
      className: "menu_outer_list",
      collapsible: false,
      items: [
        "readme",



    {
      type: "category",
      label: "SDKs",
      collapsible: true,
      collapsible: false,
      className: "menu_outer_list",
      items: [
        {
          type: "category",
          label: "Sign",
          items: [
            "sign/quickstart",
            "sign/installation",
            "sign/wallet-usage",
            "sign/dapp-usage-standalone-client",
          ],
        },
        {
          type: "category",
          label: "Auth",
          items: [
            "auth/auth",
          ],
        },
        {
          type: "category",
          label: "Chat",
          items: ["chat/chat"],
        },
        {
          type: "category",
          label: "Push",
          items: ["push/push"],
        },
        // {
        //   type: "category",
        //   label: "Providers",
        //   items: [
        //     "old/javascript/providers/ethereum",
        //     "old/javascript/providers/cosmos",
        //     "old/javascript/providers/solana",
        //   ],
        // },
        // {
        //   type: "category",
        //   label: "Guides",
        //   items: [
        //     "old/javascript/guides/typescript",
        //     "old/javascript/guides/react-native",
        //     "old/javascript/guides/nodejs",
        //   ],
        // },
      ],
    },


    {
      type: "category",
      label: "Our Projects",
      collapsed: false,
      items: [
        "other/cloud", 
        "other/cloud-explorer"
      ],
    },
    "other/examples-and-resources",
    "other/glossary",
      ],
    },

    {
      type: "category",
      label: "Advanced",
      collapsible: true,
      className: "menu_outer_list",
      items: [
        "advanced/migrating-from-v1.0",
        {
          type: "category",
          label: "API Reference",
          items: ["advanced/api-reference/project-id"],
        },
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
};
