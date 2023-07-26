import React from 'react'
import SmallContainer from './SmallContainer'
import LargeContainer from './LargeContainer'

const Wrapper = ({ items, type }) => {
  return (
    <div className="home__wrapper">
      {type === 'small'
        ? items.map((item, index) => (
            <SmallContainer key={index} href={item.href} name={item.name} icon={item.icon} />
          ))
        : items.map((item, index) => (
            <LargeContainer
              key={index}
              href={item.href}
              name={item.name}
              icon={item.icon}
              description={item.description}
            />
          ))}
    </div>
  )
}

export default Wrapper
