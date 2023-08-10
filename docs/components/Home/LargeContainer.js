import React from 'react'

const LargeContainer = ({ href, name, icon, description, fit }) => {
  return (
    <a href={href} className="home__large-container">
      {fit ? (
        <img src={icon} alt={name} />
      ) : (
        <div className="home__large-container--nofit">
          <img src={icon} alt={name} />
          <img className="blur" src={icon} alt={name} />
        </div>
      )}

      <div className="home__large-container--text">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </a>
  )
}

export default LargeContainer
