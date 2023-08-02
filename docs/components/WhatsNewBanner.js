import React from 'react'
import wcGlassImage from '../../static/assets/wc-logo-glass-full.webp'

export const CloudBanner = ({ title, description, href }) => {
  return (
    <div className="cloud__wrapper cloud__wrapper--special">
      <div className="cloud__text-container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <a href={href}>
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
      </a>
      <img
        style={{
          transform: 'scale(1.5)'
        }}
        className="cloud__image"
        src={wcGlassImage}
        alt="cloud illustration"
      />
    </div>
  )
}

export default CloudBanner
