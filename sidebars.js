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
            "introduction/walletconnect",
            "introduction/walletmail",
            "introduction/walletpush",
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
          label: "WalletConnect",
          items: [
            "javascript/walletconnect/installation",
            "javascript/walletconnect/wallet-usage",
            {
              type: "category",
              label: "Reference",
              items: [
                "javascript/walletconnect/reference/client",
                "javascript/walletconnect/reference/crypto",
                "javascript/walletconnect/reference/encoder",
                "javascript/walletconnect/reference/heartbeat",
                "javascript/walletconnect/reference/pairing",
                "javascript/walletconnect/reference/engine",
                "javascript/walletconnect/reference/history",
                "javascript/walletconnect/reference/interfaces",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "WalletMail",
          items: [
            "javascript/walletmail/installation",
          ],
        },
        {
          type: "category",
          label: "WalletPush",
          items: [
            "javascript/walletpush/installation",
          ],
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
          label: "WalletConnect",
          items: [
            "swift/walletconnect/installation",
            "swift/walletconnect/usage",
            "swift/walletconnect/reference",
          ],
        },
        {
          type: "category",
          label: "WalletMail",
          items: [
            "swift/walletmail/installation",
            "swift/walletmail/usage",
            "swift/walletmail/reference",
          ],
        },
        {
          type: "category",
          label: "WalletPush",
          items: [
            "swift/walletpush/installation",
            "swift/walletpush/usage",
            "swift/walletpush/reference",
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
          label: "WalletConnect",
          items: [
            "kotlin/walletconnect/installation",
            "kotlin/walletconnect/usage",
            "kotlin/walletconnect/reference",
          ],
        },
        {
          type: "category",
          label: "WalletMail",
          items: [
            "kotlin/walletmail/installation",

          ],
        },
        {
          type: "category",
          label: "WalletPush",
          items: [
            "kotlin/walletpush/installation",
          ],
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
          label: "RPC Reference",
          items: [
            "advanced/ethereum-rpc",
            "advanced/cosmos-rpc",
            "advanced/solana-rpc",
            "advanced/polkadot-rpc",
            "advanced/stellar-rpc",
          ],
        },
      ],
    },
  ],
};
