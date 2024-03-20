import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import ChainCard from './ChainCard'

const List = () => {
  const [chains, setChains] = useState([])
  const [originalChainsArray, setOriginalChainsArray] = useState([])
  const [isMainnetSelected, setIsMainnetSelected] = useState(false)
  const [isTestnetSelected, setIsTestnetSelected] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    fetch(
      'https://explorer-api.walletconnect.com/v3/chains?projectId=8e998cd112127e42dce5e2bf74122539'
    )
      .then(response => response.json())
      .then(data => {
        setChains(data.chains)
        setOriginalChainsArray(
          Object.keys(data.chains).map(key => ({ ...data.chains[key], namespace: key }))
        )
      })
      .catch(error => console.error(error))
  }, [])

  const chainsArray = Object.keys(chains).map(key => ({
    ...chains[key],
    namespace: chains[key].namespace || key
  }))

  useEffect(() => {
    if (isTestnetSelected && isMainnetSelected) {
      setChains(originalChainsArray)
    }
  }, [isTestnetSelected, isMainnetSelected])

  useEffect(() => {
    inputRef.current.value = ''
    if (isMainnetSelected) {
      const filteredChains = originalChainsArray.filter(chain => {
        return !chain.testnet
      })
      setChains(filteredChains)
    } else {
      setChains(originalChainsArray)
    }
  }, [isMainnetSelected])

  useEffect(() => {
    inputRef.current.value = ''
    if (isTestnetSelected) {
      const filteredChains = originalChainsArray.filter(chain => {
        return chain.testnet
      })
      setChains(filteredChains)
    } else {
      setChains(originalChainsArray)
    }
  }, [isTestnetSelected])

  return (
    <div className="chain-list">
      <div className="chain-list__header">
        <div className="chains-list__search__container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            name="search"
            className="chain-list__search"
            placeholder="Search for a chain..."
            ref={inputRef}
            onChange={e => {
              const search = e.target.value
              const filteredChains = originalChainsArray
                .filter(item => {
                  if (isTestnetSelected && isMainnetSelected) {
                    return true
                  }
                  if (isTestnetSelected) {
                    return item.testnet
                  }
                  if (isMainnetSelected) {
                    return !item.testnet
                  }
                  return true
                })
                .filter(chain => {
                  return chain.name.toLowerCase().includes(search.toLowerCase())
                })
              setChains(filteredChains)
            }}
          />
        </div>
        <div className="chains-list__checkbox__wrapper">
          <p
            style={{
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'space-between',
              color: 'var(--ifm-color-gray-700)',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              width={20}
              height={20}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
            Filter By
          </p>
          <div className="chains-list__checkbox__container">
            <button
              style={{
                borderColor: isTestnetSelected
                  ? 'var(--ifm-color-primary)'
                  : 'var(--ifm-border-color)',
                backgroundColor: isTestnetSelected
                  ? 'var(--ifm-color-primary-darkest)'
                  : 'var(--ifm-hover-overlay)',
                color: isTestnetSelected ? 'var(--ifm-color-white)' : 'inherit'
              }}
              className="chains-list__checkbox chains-list__checkbox--testnet"
              onClick={e => {
                setIsTestnetSelected(!isTestnetSelected)
              }}
            >
              Testnet
            </button>
            <button
              style={{
                borderColor: isMainnetSelected
                  ? 'var(--ifm-color-primary)'
                  : 'var(--ifm-border-color)',
                backgroundColor: isMainnetSelected
                  ? 'var(--ifm-color-primary-darkest)'
                  : 'var(--ifm-hover-overlay)',
                color: isMainnetSelected ? 'var(--ifm-color-white)' : 'inherit'
              }}
              className="chains-list__checkbox chains-list__checkbox--mainnet"
              onClick={e => {
                setIsMainnetSelected(!isMainnetSelected)
              }}
            >
              Mainnet
            </button>
          </div>
        </div>
      </div>
      <div className="chain-card-container">
        {chainsArray?.map((chain, index) => (
          <ChainCard key={index} chainName={chain.name} namespace={chain.namespace} />
        ))}
      </div>
    </div>
  )
}

export default List
