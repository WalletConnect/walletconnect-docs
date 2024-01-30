import React from 'react'
import wcGlassImage from '../../static/assets/wc-logo-glass-full.webp'
import Link from '@docusaurus/Link'

export const CloudBanner = ({ title, description, href, image = wcGlassImage }) => {
  return (
    <div className="cloud__wrapper cloud__wrapper--special">
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
      {image === wcGlassImage ? (
        <img
          style={{
            transform: 'scale(1.5) scaleX(-1)'
          }}
          className="cloud__image"
          src={image}
          alt="cloud illustration"
        />
      ) : (
        <img
          className="cloud__image"
          src={image}
          alt="cloud illustration"
          style={{
            transform: 'scale(0.75)'
          }}
        />
      )}
    </div>
  )
}

export default CloudBanner
