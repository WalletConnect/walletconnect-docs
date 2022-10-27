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
          items: ["introduction/cloud-explorer", "introduction/web3modal"],
        },
        "introduction/examples-and-resources",
        "introduction/glossary",
      ],
    },

    {
      type: "category",
      label: "Web - JavaScript",
      collapsible: true,
      className: "menu_outer_list",
      items: [
        {
          type: "category",
          label: "Sign",
          items: [
            "javascript/sign/installation",
            "javascript/sign/wallet-usage",
            "javascript/sign/dapp-usage",
          ],
        },
        {
          type: "category",
          label: "Auth",
          items: [
            "javascript/auth/installation",
            "javascript/auth/dapp-usage",
            "javascript/auth/wallet-usage",
          ],
        },
        {
          type: "category",
          label: "Chat",
          items: ["javascript/chat/installation", "javascript/chat/usage"],
        },
        {
          type: "category",
          label: "Push",
          items: ["javascript/push/installation"],
        },
        {
          type: "category",
          label: "Core",
          items: ["javascript/core/pairing-api"],
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
            "javascript/guides/shared-core",
          ],
        },
      ],
    },

    {
      type: "category",
      label: "iOS - Swift",
      collapsible: true,
      className: "menu_outer_list",
      items: [
        {
          type: "category",
          label: "Sign",
          items: [
            "swift/sign/installation",
            "swift/sign/wallet-usage",
            "swift/sign/dapp-usage",
          ],
        },
        {
          type: "category",
          label: "Auth",
          items: [
            "swift/auth/installation",
            "swift/auth/wallet-usage",
            "swift/auth/dapp-usage",
          ],
        },
        {
          type: "category",
          label: "Chat",
          items: ["swift/chat/installation"],
        },
        {
          type: "category",
          label: "Core",
          items: [
            "swift/core/installation",
            "swift/core/networking-configuration",
            "swift/core/pairing-usage",
          ],
        },
        {
          type: "category",
          label: "Push",
          items: ["swift/push/installation"],
        },
        {
          type: "category",
          label: "Guides",
          items: ["swift/guides/mobile-linking", "swift/router/installation"],
        },
      ],
    },

    {
      type: "category",
      label: "Android - Kotlin",
      collapsible: true,
      className: "menu_outer_list",
      items: [
        {
          type: "category",
          label: "Sign",
          items: [
            "kotlin/sign/installation",
            "kotlin/sign/wallet-usage",
            "kotlin/sign/dapp-usage",
          ],
        },
        {
          type: "category",
          label: "Auth",
          items: [
            "kotlin/auth/installation",
            "kotlin/auth/dapp-or-requester-usage",
            "kotlin/auth/wallet-or-responder-usage",
          ],
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
        {
          type: "category",
          label: "Core",
          items: [
            "kotlin/core/installation",
            "kotlin/core/pairing",
            "kotlin/core/relay",
          ],
        },
        {
          type: "category",
          label: "Guides",
          items: ["kotlin/guides/mobile-linking"],
        },
      ],
    },

    {
      type: "category",
      label: "Advanced",
      collapsible: true,
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
