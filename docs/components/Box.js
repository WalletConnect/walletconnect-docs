import Link from '@docusaurus/Link'
import React from 'react'
import { useHistory } from 'react-router-dom'

const Box = ({ name, description, url }) => {
  let history = useHistory()

  const handleClick = e => {
    e.preventDefault()
    if (url.includes('https://')) {
      window.open(url, '_blank')
    } else {
      history.push(url)
    }
  }

  return (
    <div className="box">
      <Link to={url} onClick={handleClick}>
        <h1 style={{ fontSize: '20px' }}>{name}</h1>
        <p>{description}</p>
      </Link>
    </div>
  )
}

export default Box
