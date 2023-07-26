import React from 'react'

const SmallContainer = ({ href, name, icon }) => {
  return (
    <a href={href} className="home__small-container">
      <span>{name}</span>
      <img src={icon} alt={name} />
    </a>
  )
}

export default SmallContainer
