import Link from '@docusaurus/Link'
import { setItemInStorage } from '@site/src/theme/Dropdown/utils'
import React from 'react'

const LargeContainer = ({ href, type, name, icon, description, fit, isWhite }) => {
  function handleClick() {
    if (type) {
      /* This function is used to set the environment, framework or programming language
       that's going to be selected in the dropdown menu */
      setItemInStorage(type)
    }
  }

  return (
    <Link onClick={handleClick} to={href} className="home__large-container">
      {fit ? (
        <img src={icon} alt={name} />
      ) : (
        <div className="home__large-container--nofit">
          <img src={icon} alt={name} className={isWhite ? `white` : undefined} />
          <img className={`blur ${isWhite ? `white` : undefined}`} src={icon} alt={name} />
        </div>
      )}

      <div className="home__large-container--text">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </Link>
  )
}

export default LargeContainer
