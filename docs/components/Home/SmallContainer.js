import React from 'react'

const SmallContainer = ({ href, name, icon, isWhite, hasEmoji }) => {
  const emoji = name.split(' ').slice(-1)
  const newName = hasEmoji ? name.split(' ').slice(0, -1).join(' ') : name
  return (
    <a href={href} className="home__small-container">
      <span>{newName}</span>
      {hasEmoji && <span className="emoji">{emoji}</span>}
      {icon && <img src={icon} alt={name} className={isWhite ? `white` : undefined} />}
    </a>
  )
}

export default SmallContainer
