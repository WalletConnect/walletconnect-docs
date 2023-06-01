# Components

## w3m-core-button

Pre-styled connect/disconnect web-component button that reacts to modal's theme changes.

```html
<body>
  <w3m-core-button></w3m-core-button>
</body>
```

Following attributes can be set

```ts
interface Attributes {
  icon?: 'show' | 'hide'
  label?: string
  balance?: 'show' | 'hide'
}
```

## w3m-network-switch

Pre-styled network switch button that reacts to modal's theme and network changes.

```html
<body>
  <w3m-network-switch></w3m-network-switch>
</body>
```

## w3m-qrcode

WalletConnect styled QRCode that allows for an image in the center

```html
<body>
  <w3m-qrcode imageUrl="url/to/image" size=200 uri="data"></w3m-qrcode>
</body>
```

Following attributes can be set

```ts
interface Attributes {
  imageUrl?: string
  size?: number
  // The data embedded in the QRCode
  uri?: string
}
```
