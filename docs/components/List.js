import React from 'react'
import { useEffect, useState } from 'react'
import ChainCard from './ChainCard'

const List = () => {
  const [chains, setChains] = useState([])

  useEffect(() => {
    fetch(
      'https://explorer-api.walletconnect.com/v3/chains?projectId=8e998cd112127e42dce5e2bf74122539'
    )
      .then(response => response.json())
      .then(data => setChains(data.chains))
      .catch(error => console.error(error))
  }, [])

  const chainsArray = Object.keys(chains).map(key => chains[key])

  return (
    <div className="chain-list">
      <div className="chain-card-container">
        {chainsArray?.map((chain, index) => (
          <ChainCard key={index} chainName={chain.name} />
        ))}
      </div>
    </div>

  )
}

export default List
