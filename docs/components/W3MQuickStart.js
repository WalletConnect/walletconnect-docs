import React from 'react'
import wcGlassImage from '../../static/assets/wc-logo-glass.png'
import Link from '@docusaurus/Link'
import CodeBlock from '@theme/CodeBlock'

export const CloudBanner = props => {
  const handleAnalytics = () => {
    const props = {
      path: window.location.pathname
    }
    plausible('cloud-banner-click', {
      props
    })
  }
  return (
    <div className="w3m-qs__wrapper">
      <div className="w3m-qs__text-container">
        <h2>⚡️ QuickStart</h2>
        <p>Setup a dapp with Web3Modal in minutes!</p>
      </div>
      <CodeBlock
        className="w3m-qs__code-block"
        language="bash"
      >{`npx create-wc-dapp@latest -y w3m`}</CodeBlock>
    </div>
  )
}

export default CloudBanner
