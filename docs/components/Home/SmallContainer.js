import React from 'react'

const SmallContainer = ({ href, name, icon }) => {
  return (
    <a href={href} className="home__small-container">
      <span>{name}</span>
      <div className="home__small-container__img-container">
        <img src={icon} alt={name} />
      </div>
    </a>
  )
}

export default SmallContainer
