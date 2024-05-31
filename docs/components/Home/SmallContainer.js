import Link from '@docusaurus/Link'
import React from 'react'

const SmallContainer = ({ href, name, icon, isWhite }) => {
  function handleClick() {
    if (type) {
      /* This function is used to set the environment, framework or programming language
       that's going to be selected in the dropdown menu */
      setItemInStorage(type)
    }
  }

  return (
    <Link onClick={handleClick} to={href} className="home__small-container">
      <span>{name}</span>
      <img src={icon} alt={name} className={isWhite ? `white` : undefined} />
    </Link>
  )
}

export default SmallContainer
