import React from 'react'
import logo from '../../../static/assets/wc-logo-glass-big.webp'
import styles from '../../../src/css/banner.module.css'
import Link from '@docusaurus/Link'

const Banner = () => {
  return (
    <div className={styles.banner__container}>
      <div className={styles.banner__text}>
        <h2>WalletConnect Docs</h2>
        <p>
          WalletConnect provides developer toolkits empowering you to build engaging web3
          experiences.
        </p>
        <Link to="/getting-started">
          Get Started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </Link>
      </div>
      <div className={styles.banner__backdrop} />
      <img className={styles.banner__image} src={logo} alt="WalletConnect Logo" />
    </div>
  )
}

export default Banner
