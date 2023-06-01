import Table from "../components/Table";

# Theming

In addition to [`themeMode`](./options.md#thememode-optional) config, Web3Modal uses [css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for majority of it's styles. You can override these variables via `themeVariables` config to customize the look and feel of the modal to match your own design.

## Example

Below is an example of overriding the default font and main accent color in `@web3modal/react`

```tsx
<Web3Modal
  themeVariables={{
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#F5841F'
  }}
/>
```

And equivalend for `@web3modal/html` and `@web3modal/standalone`

```ts
const web3Modal = new Web3Modal({
  themeVariables: {
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#F5841F'
  }
})
```

## Modal Variables

Core styling variables for the modal. Any valid css value associated to the style rule is accepted.

<Table
  headers={["Variable", "Description", "Example"]}
  data={[
    {
      variable: { code: "--w3m-font-family" },
      description: "Base font family",
      example: { code: "Roboto, sans-serif" },
    },
    {
      variable: { code: "--w3m-z-index" },
      description: "Z-index position",
      example: { code: "10" },
    },
    {
      variable: { code: "--w3m-accent-color" },
      description: "Color used for buttons, icons, labels, etc.",
      example: { code: "#FFFFFF" },
    },
    {
      variable: { code: "--w3m-accent-fill-color" },
      description: "Color used for text and icons inside elements with accent color background",
      example: { code: "#000000" },
    },
    {
      variable: { code: "--w3m-background-color" },
      description: "Background color to be used isntead of default animated gradient",
      example: { code: "#CECECE" },
    },
    {
      variable: { code: "--w3m-background-image-url" },
      description: "Background image url to be used instead of default animated gradient",
      example: { code: "https://..." },
    },
    {
      variable: { code: "--w3m-logo-image-url" },
      description: "Image url to be used instead of WalletConnect logo",
      example: { code: "https://..." },
    },
    {
      variable: { code: "--w3m-background-border-radius" },
      description: "Border radius applied to the modal background",
      example: { code: "12px" },
    },
    {
      variable: { code: "--w3m-container-border-radius" },
      description: "Border radius applied to main modal content area",
      example: { code: "24px" },
    },
    {
      variable: { code: "--w3m-wallet-icon-border-radius" },
      description: "Border radius applied to wallet icons",
      example: { code: "2em" },
    },
    {
      variable: { code: "--w3m-wallet-icon-large-border-radius" },
      description: "Border radius applied to large wallet icons",
      example: { code: "3em" },
    },
    {
      variable: { code: "--w3m-wallet-icon-small-border-radius " },
      description: "Border radius applied to small wallet icons",
      example: { code: "1em" },
    },
    {
      variable: { code: "--w3m-input-border-radius" },
      description: "Border radius applied to text inputs",
      example: { code: "50%" },
    },
    {
      variable: { code: "--w3m-notification-border-radius" },
      description: "Border radius applied to toast notification",
      example: { code: "2rem" },
    },
    {
      variable: { code: "--w3m-button-border-radius" },
      description: "Border radius applied to primary buttons like 'Connect' or 'Account'",
      example: { code: "8px" },
    },
    {
      variable: { code: "--w3m-secondary-button-border-radius" },
      description: "Border radius applied to secondary buttons, ones inside modal views",
      example: { code: "8px" },
    },
    {
      variable: { code: "--w3m-icon-button-border-radius" },
      description: "Border radius applied to icon only buttons like 'Copy' or 'Disconnect'",
      example: { code: "50%" },
    },
    {
      variable: { code: "--w3m-button-hover-highlight-border-radius" },
      description: "Border radius applied to hover highlight on wallet or chain buttons",
      example: { code: "2rem" },
    },
  ]}
/>

## Text Variables

Granular text style variables for when `--w3m-font-family` is not enough.

<Table
  headers={["Variable", "Description", "Example"]}
  data={[
    {
      variable: { code: "--w3m-text-big-bold-size" },
      description: "Font size of big-bold text variant (modal and page titles)",
      example: { code: "2rem" },
    },
    {
      variable: { code: "--w3m-text-big-bold-weight" },
      description: "Font weight of big-bold text variant (modal and page titles)",
      example: { code: "bold" },
    },
    {
      variable: { code: "--w3m-text-big-bold-line-height" },
      description: "Line height of big-bold text variant (modal and page titles)",
      example: { code: "14px" }
    },
    {
      variable: { code: "--w3m-text-big-bold-letter-spacing" },
      description: "Letter spacing of big-bold text variant (modal and page titles)",
      example: { code: "1px" }
    },
    {
      variable: { code: "--w3m-text-big-bold-text-transform" },
      description: "Text transform of big-bold text variant (modal and page titles)",
      example: { code: "uppercase" }
    },
    {
      variable: { code: "--w3m-text-big-bold-font-family" },
      description: "Font family of big-bold text variant (modal and page titles)",
      example: { code: "Helvetica, sans-serif" },
    },
    {
      variable: { code: "--w3m-text-medium-regular-size" },
      description: "Font size of medium-regular text variant (button and data labels)",
      example: { code: "1rem" },
    },
    {
      variable: { code: "--w3m-text-medium-regular-weight" },
      description: "Font weight of medium-regular text variant (button and data labels)",
      example: { code: "normal" },
    },
    {
      variable: { code: "--w3m-text-medium-regular-line-height" },
      description: "Line height of medium-regular text variant (button and data labels)",
      example: { code: "14px" }
    },
    {
      variable: { code: "--w3m-text-medium-regular-letter-spacing" },
      description: "Letter spacing of medium-regular text variant (button and data labels)",
      example: { code: "1px" }
    },
    {
      variable: { code: "--w3m-text-medium-regular-text-transform" },
      description: "Text transform of medium-regular text variant (button and data labels)",
      example: { code: "capitalize" }
    },
    {
      variable: { code: "--w3m-text-medium-regular-font-family" },
      description: "Font family of medium-regular text variant (button and data labels)",
      example: { code: "Arial, sans-serif" },
    },
    {
      variable: { code: "--w3m-text-small-regular-size" },
      description: "Font size of small-regular text variant (secondary buttons, toast notification and labels)",
      example: { code: "0.75rem" },
    },
    {
      variable: { code: "--w3m-text-small-regular-weight" },
      description: "Font weight of small-regular text variant (secondary buttons, toast notification and labels)",
      example: { code: "normal" },
    },
    {
      variable: { code: "--w3m-text-small-regular-line-height" },
      description: "Line height of small-regular text variant (secondary buttons, toast notification and labels)",
      example: { code: "14px" }
    },
    {
      variable: { code: "--w3m-text-small-regular-letter-spacing" },
      description: "Letter spacing of small-regular text variant (secondary buttons, toast notification and labels)",
      example: { code: "1px" }
    },
    {
      variable: { code: "--w3m-text-small-regular-text-transform" },
      description: "Text transform of small-regular text variant (secondary buttons, toast notification and labels)",
      example: { code: "capitalize" }
    },
    {
      variable: { code: "--w3m-text-small-regular-font-family" },
      description: "Font family of small-regular text variant (secondary buttons, toast notification and labels)",
      example: { code: "Helvetica, sans-serif" },
    },
    {
      variable: { code: "--w3m-text-small-thin-size" },
      description: "Font size of small-thin text variant (input placeholder and help text)",
      example: { code: "0.65rem" },
    },
    {
      variable: { code: "--w3m-text-small-thin-weight" },
      description: "Font weight of small-thin text variant (input placeholder and help text)",
      example: { code: "lighter" },
    },
    {
      variable: { code: "--w3m-text-small-thin-line-height" },
      description: "Line height of small-thin text variant (input placeholder and help text)",
      example: { code: "0.8rem" }
    },
    {
      variable: { code: "--w3m-text-small-thin-letter-spacing" },
      description: "Letter spacing of small-thin text variant (input placeholder and help text)",
      example: { code: "0.01em" }
    },
    {
      variable: { code: "--w3m-text-small-thin-text-transform" },
      description: "Text transform of small-thin text variant (input placeholder and help text)",
      example: { code: "none" }
    },
    {
      variable: { code: "--w3m-text-small-thin-font-family" },
      description: "Font family of small-thin text variant (input placeholder and help text)",
      example: { code: "Arial, sans-serif" },
    },
    {
      variable: { code: "--w3m-text-xsmall-bold-size" },
      description: "Font size of xsmall-bold text variant (sublabels)",
      example: { code: "0.5rem" },
    },
    {
      variable: { code: "--w3m-text-xsmall-bold-weight" },
      description: "Font weight of xsmall-bold text variant (sublabels)",
      example: { code: "bold" },
    },
    {
      variable: { code: "--w3m-text-xsmall-bold-line-height" },
      description: "Line height of xsmall-bold text variant (sublabels)",
      example: { code: "10px" }
    },
    {
      variable: { code: "--w3m-text-xsmall-bold-letter-spacing" },
      description: "Letter spacing of xsmall-bold text variant (sublabels)",
      example: { code: "-0.03em" }
    },
    {
      variable: { code: "--w3m-text-xsmall-bold-text-transform" },
      description: "Text transform of xsmall-bold text variant (sublabels)",
      example: { code: "uppercase" }
    },
    {
      variable: { code: "--w3m-text-xsmall-bold-font-family" },
      description: "Font family of xsmall-bold text variant (sublabels)",
      example: { code: "Arial, sans-serif" },
    },
    {
      variable: { code: "--w3m-text-xsmall-regular-size" },
      description: "Font size of xsmall-regular text variant (wallet and network button labels)",
      example: { code: "0.5rem" },
    },
    {
      variable: { code: "--w3m-text-xsmall-regular-weight" },
      description: "Font weight of xsmall-regular text variant (wallet and network button labels)",
      example: { code: "normal" },
    },
    {
      variable: { code: "--w3m-text-xsmall-regular-line-height" },
      description: "Line height of xsmall-regular text variant (wallet and network button labels)",
      example: { code: "10px" },
    },
    {
      variable: { code: "--w3m-text-xsmall-regular-letter-spacing" },
      description: "Letter spacing of xsmall-regular text variant (wallet and network button labels)",
      example: { code: "0.1em" },
    },
    {
      variable: { code: "--w3m-text-xsmall-regular-text-transform" },
      description: "Text transform of xsmall-regular text variant (wallet and network button labels)",
      example: { code: "none" },
    },
    {
      variable: { code: "--w3m-text-xsmall-regular-font-family" },
      description: "Font family of xsmall-regular text variant (wallet and network button labels)",
      example: { code: "Helvetica, sans-serif" },
    },
  ]}
/>
