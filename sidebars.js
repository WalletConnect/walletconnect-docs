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
        "introduction/cloud",
        "introduction/registry",
        {
          type: "category",
          label: "Products",
          items: [
            "introduction/walletconnect",
            "introduction/walletmail",
            "introduction/walletpush",
          ],
        },
        "introduction/glosary",
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
            "javascript/walletconnect/usage",
            "javascript/walletconnect/api-reference",
          ],
        },
        {
          type: "category",
          label: "WalletMail",
          items: [
            "javascript/walletmail/installation",
            "javascript/walletmail/usage",
            "javascript/walletmail/api-reference",
          ],
        },
        {
          type: "category",
          label: "WalletPush",
          items: [
            "javascript/walletpush/installation",
            "javascript/walletpush/usage",
            "javascript/walletpush/api-reference",
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
        {
          type: "category",
          label: "Examples",
          items: ["javascript/examples/wallet", "javascript/examples/dapp"],
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
            "swift/walletconnect/api-reference",
          ],
        },
        {
          type: "category",
          label: "WalletMail",
          items: [
            "swift/walletmail/installation",
            "swift/walletmail/usage",
            "swift/walletmail/api-reference",
          ],
        },
        {
          type: "category",
          label: "WalletPush",
          items: [
            "swift/walletpush/installation",
            "swift/walletpush/usage",
            "swift/walletpush/api-reference",
          ],
        },
        {
          type: "category",
          label: "Examples",
          items: ["swift/examples/wallet", "swift/examples/dapp"],
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
            "kotlin/walletconnect/api-reference",
          ],
        },
        {
          type: "category",
          label: "WalletMail",
          items: [
            "kotlin/walletmail/installation",
            "kotlin/walletmail/usage",
            "kotlin/walletmail/api-reference",
          ],
        },
        {
          type: "category",
          label: "WalletPush",
          items: [
            "kotlin/walletpush/installation",
            "kotlin/walletpush/usage",
            "kotlin/walletpush/api-reference",
          ],
        },
        {
          type: "category",
          label: "Examples",
          items: ["kotlin/examples/wallet", "kotlin/examples/dapp"],
        },
      ],
    },

    {
      type: "category",
      label: "Advanced",
      collapsible: false,
      className: "menu_outer_list",
      items: [
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
