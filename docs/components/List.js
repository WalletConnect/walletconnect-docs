import React from 'react'
import { useEffect, useState, useRef } from 'react'

const List = () => {
  const [chains, setChains] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const updatedChains = Object.keys(chains).map(key => {
    return chains[key]
  })

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    fetch(
      'https://explorer-api.walletconnect.com/v3/chains?projectId=8e998cd112127e42dce5e2bf74122539'
    )
      .then(response => response.json())
      .then(data => setChains(data.chains))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="dropdown-container">
      <button className="dropdown-btn" onClick={handleClick}>
        Select an Item
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {updatedChains.map((chain, index) => (
            <li key={index} className="dropdown-item">
              {chain.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default List
