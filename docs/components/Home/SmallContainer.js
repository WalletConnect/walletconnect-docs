import Link from '@docusaurus/Link'
import React from 'react'

const SmallContainer = ({ href, name, icon, isWhite }) => {
  return (
    <Link to={href} className="home__small-container">
      <span>{name}</span>
      <img src={icon} alt={name} className={isWhite ? `white` : undefined} />
    </Link>
  )
}

export default SmallContainer
