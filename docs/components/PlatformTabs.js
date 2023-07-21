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
    value: 'react-native',
    label: 'React Native'
  },
  {
    value: 'unity',
    label: 'Unity'
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
      <Tabs className="platform-tabs" queryString="platform" values={values} {...props} />
    </>
  )
}
