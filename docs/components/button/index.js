import React from 'react'
import s from './styles.module.css'
import Link from '@docusaurus/Link'

const Button = ({ name, url }) => {
  return (
    <div className={s.container}>
      <Link to={url}>
        {name}
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
  )
}

export default Button
