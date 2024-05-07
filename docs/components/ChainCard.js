import React, { useState } from 'react'

const ChainCard = ({ chainName, namespace }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(namespace)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
    console.log(chainName, namespace)
  }
  return (
    <button className="card__small-container" onClick={handleCopy}>
      {copied ? <span>Chain ID copied!</span> : <span>{chainName}</span>}
    </button>
  )
}

export default ChainCard
