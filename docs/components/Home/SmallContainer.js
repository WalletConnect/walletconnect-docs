import React from 'react'

const SmallContainer = ({ href, name, icon, isWhite }) => {
  return (
    <a href={href} className="home__small-container">
      <span>{name}</span>
      <img src={icon} alt={name} className={isWhite && `white`} />
    </a>
  )
}

export default SmallContainer
