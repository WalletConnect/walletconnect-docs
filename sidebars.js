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
            "introduction/sign",
            "introduction/auth",
            "introduction/chat",
            "introduction/push",
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
          label: "Sign",
          items: [
            "javascript/sign/installation",
            "javascript/sign/wallet-usage",
            "javascript/sign/dapp-usage-standalone-client",
          ],
        },
        {
          type: "category",
          label: "Auth",
          items: ["javascript/auth/installation"],
        },
        {
          type: "category",
          label: "Chat",
          items: ["javascript/chat/installation"],
        },
        {
          type: "category",
          label: "Push",
          items: ["javascript/push/installation"],
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
            "javascript/guides/nodejs",
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
          label: "Sign",
          items: [
            "swift/sign/installation",
            "swift/sign/usage",
            "swift/sign/reference",
          ],
        },
        {
          type: "category",
          label: "Auth",
          items: ["swift/auth/installation"],
        },
        {
          type: "category",
          label: "Chat",
          items: ["swift/chat/installation"],
        },
        {
          type: "category",
          label: "Push",
          items: ["swift/push/installation"],
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
          label: "Sign",
          items: [
            "kotlin/sign/installation",
            "kotlin/sign/usage",
            "kotlin/sign/reference",
          ],
        },
        {
          type: "category",
          label: "Auth",
          items: ["kotlin/auth/installation"],
        },
        {
          type: "category",
          label: "Chat",
          items: ["kotlin/chat/installation"],
        },
        {
          type: "category",
          label: "Push",
          items: ["kotlin/push/installation"],
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
        "advanced/migrating-from-v2.0-beta.26",
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
