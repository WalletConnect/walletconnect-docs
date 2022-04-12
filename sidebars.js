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
        "about",
        {
          type: "category",
          label: "Our SDKs",
          collapsed: false,
          items: [
            "introduction/authentication",
            "introduction/messaging",
            "introduction/notifications",
          ],
        },
        {
          type: "category",
          label: "Our Projects",
          collapsed: false,
          items: ["introduction/cloud", "introduction/registry"],
        },
        "introduction/examples-and-resources",
        "introduction/glossary",
      ],
    },

    {
      type: "category",
      label: "Web - JavaScript",
      collapsible: false,
      className: "menu_outer_list",
      items: [
        {
          type: "category",
          label: "Authentication",
          items: [
            "javascript/authentication/installation",
            "javascript/authentication/wallet-usage",
            {
              type: "category",
              label: "Reference",
              items: [
                "javascript/authentication/reference/client",
                "javascript/authentication/reference/crypto",
                "javascript/authentication/reference/encoder",
                "javascript/authentication/reference/heartbeat",
                "javascript/authentication/reference/pairing",
                "javascript/authentication/reference/engine",
                "javascript/authentication/reference/history",
                "javascript/authentication/reference/interfaces",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Messaging",
          items: ["javascript/messaging/installation"],
        },
        {
          type: "category",
          label: "Notifications",
          items: ["javascript/notifications/installation"],
        },
        {
          type: "category",
          label: "Providers",
          items: [
            "javascript/providers/ethereum",
            "javascript/providers/cosmos",
            "javascript/providers/solana",
          ],
        },
        {
          type: "category",
          label: "Guides",
          items: [
            "javascript/guides/typescript",
            "javascript/guides/react-native",
          ],
        },
      ],
    },

    {
      type: "category",
      label: "iOS - Swift",
      collapsible: false,
      className: "menu_outer_list",
      items: [
        {
          type: "category",
          label: "Authentication",
          items: [
            "swift/authentication/installation",
            "swift/authentication/usage",
            "swift/authentication/reference",
          ],
        },
        {
          type: "category",
          label: "Messaging",
          items: [
            "swift/messaging/installation",
            "swift/messaging/usage",
            "swift/messaging/reference",
          ],
        },
        {
          type: "category",
          label: "Notifications",
          items: [
            "swift/notifications/installation",
            "swift/notifications/usage",
            "swift/notifications/reference",
          ],
        },
      ],
    },

    {
      type: "category",
      label: "Android - Kotlin",
      collapsible: false,
      className: "menu_outer_list",
      items: [
        {
          type: "category",
          label: "Authentication",
          items: [
            "kotlin/authentication/installation",
            "kotlin/authentication/usage",
            "kotlin/authentication/reference",
          ],
        },
        {
          type: "category",
          label: "Messaging",
          items: ["kotlin/messaging/installation"],
        },
        {
          type: "category",
          label: "Notifications",
          items: ["kotlin/notifications/installation"],
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
            "advanced/rpc-reference/polkadot-rpc",
            "advanced/rpc-reference/stellar-rpc",
          ],
        },
      ],
    },
  ],
};
