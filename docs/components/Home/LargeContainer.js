import React from 'react'

const LargeContainer = ({ href, name, icon, description }) => {
  return (
    <a href={href} className="home__large-container">
      <img src={icon} alt={name} />
      <div className="home__large-container--text">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </a>
  )
}

export default LargeContainer
