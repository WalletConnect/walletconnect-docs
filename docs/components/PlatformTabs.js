import React from 'react'
import Tabs from './Tabs'

const PLATFORM_MAP = [
  {
    value: 'web',
    label: 'Web'
  },
  {
    value: 'ios',
    label: 'iOS'
  },
  {
    value: 'android',
    label: 'Android'
  },
  {
    value: 'flutter',
    label: 'Flutter'
  },
  {
    value: 'react',
    label: 'React'
  },
  {
    value: 'vue',
    label: 'Vue'
  },
  {
    value: 'html',
    label: 'HTML'
  },
  {
    value: 'javascript',
    label: 'JavaScript'
  },
  {
    value: 'react-native',
    label: 'React Native'
  },
  {
    value: 'unity',
    label: 'Unity'
  },
  {
    value: 'csharp',
    label: 'C#'
  },
  {
    value: 'mobile',
    label: 'Mobile'
  },
  {
    value: 'wagmi',
    label: 'Wagmi'
  },
  {
    value: 'wagmi1',
    label: 'Wagmi v1'
  },
  {
    value: 'other',
    label: 'Other'
  },
  {
    value: 'viem',
    label: 'Viem'
  },
  {
    value: 'ethers',
    label: 'Ethers'
  },
  {
    value: 'ethers5',
    label: 'Ethers v5'
  },
  {
    value: 'web3js',
    label: 'Web3.js'
  },
  {
    value: 'evm',
    label: 'EVM'
  },
  {
    value: 'solana',
    label: 'Solana'
  }
]

const valuesBuilder = activeOptions => {
  const values = PLATFORM_MAP.filter(({ value }) => activeOptions.includes(value))
  return values.length ? values : PLATFORM_MAP
}

export default function PlatformTabs(props) {
  const values = valuesBuilder(props.activeOptions)
  return (
    <>
      <Tabs
        className="platform-tabs"
        queryString={props.queryString || 'platform'}
        values={values}
        {...props}
      />
    </>
  )
}
