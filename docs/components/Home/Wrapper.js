import React from 'react'
import SmallContainer from './SmallContainer'
import LargeContainer from './LargeContainer'

const Wrapper = ({ items, type, fit = true, ...props }) => {
  return (
    <div
      {...props}
      className="home__wrapper"
      style={{
        paddingTop: !fit ? '1rem' : 'inherit',
        ...props.style
      }}
    >
      {type === 'small'
        ? items.map((item, index) => (
            <SmallContainer
              key={index}
              href={item.href}
              name={item.name}
              icon={item.icon}
              isWhite={item.isWhite || false}
            />
          ))
        : items.map((item, index) => (
            <LargeContainer
              key={index}
              href={item.href}
              name={item.name}
              icon={item.icon}
              fit={fit}
              isWhite={item.isWhite || false}
              description={item.description}
            />
          ))}
    </div>
  )
}

export default Wrapper
