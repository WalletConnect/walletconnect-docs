import React from 'react'
import Link from '@docusaurus/Link'

export const SolanaBanner = () => {
  const title = 'Web3Modal Solana'
  const description = 'Web3Modal now supports Solana. Learn how to integrate it into your project.'
  const href = '/web3modal/features/solana'

  return (
    <div className="cloud__wrapper cloud__wrapper--special cloud__wrapper--solana">
      <div className="cloud__text-container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link to={href}>
        Learn More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          height={20}
          width={20}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  )
}

export default SolanaBanner
