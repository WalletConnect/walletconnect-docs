# Chains

Web3Modal works with any chain when using [`@web3modal/standalone`](../advanced/standalone/sign/about.md) package. Other packages like [`@web3modal/html`](../html-js/installation.md) and [`@web3modal/react`](../react/installation.md) will work with chains that are supported by [wagmi](https://wagmi.sh).

## Wagmi chains

Wagmi supports most of the popular evm chains out of the box, but also allows you to create custom configurations. Please see [wagmi](https://wagmi.sh/react/chains) or [@wagmi/core](https://wagmi.sh/core/chains) chains documentation for more information.

## Standalone chains

You can define standalone modal chains via [standaloneChains](../options.md#standalonechains-optional) option. These should adhere to [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md) chain standard.
